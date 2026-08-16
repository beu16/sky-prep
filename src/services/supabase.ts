import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserProfile, PaymentSubmission, ExamAttempt, SupabaseConfig, AudioRecording } from '../types';

// Default configuration keys (replaceable by user in settings modal)
const LIVE_SUPABASE_URL = ((import.meta as any).env?.VITE_SUPABASE_URL as string) || 'https://gxaovwgxbrfesnbolrkh.supabase.co';
const LIVE_SUPABASE_ANON_KEY = ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4YW92d2d4YnJmZXNuYm9scmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1Mjg3MjYsImV4cCI6MjEwMjEwNDcyNn0.CeAGpVFvoyJ6suTtVu9gufzmEQh1E70HsxXWpubiRgc';
export const DEFAULT_TELEBIRR_MERCHANT = '0911234567';

const CONFIG_STORAGE_KEY = 'skyprep_supabase_config';
const USER_STORAGE_KEY = 'skyprep_current_user_profile';
const ATTEMPTS_STORAGE_KEY = 'skyprep_exam_attempts';
const SUBMISSIONS_STORAGE_KEY = 'skyprep_payment_submissions';
const AUDIO_RECORDINGS_KEY = 'skyprep_audio_recordings';

export function getStoredConfig(): SupabaseConfig {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Clean up legacy placeholder URL if present
      if (parsed.url === 'https://skyprep-ethiopia.supabase.co') {
        parsed.url = LIVE_SUPABASE_URL;
        parsed.anonKey = LIVE_SUPABASE_ANON_KEY;
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse stored config', e);
  }
  return {
    url: LIVE_SUPABASE_URL,
    anonKey: LIVE_SUPABASE_ANON_KEY,
    merchantNumber: DEFAULT_TELEBIRR_MERCHANT,
  };
}

export function saveConfig(cfg: SupabaseConfig): void {
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(cfg));
  initSupabaseClient(cfg.url, cfg.anonKey);
}

let supabaseInstance: SupabaseClient | null = null;

export function initSupabaseClient(rawUrl: string, anonKey: string): SupabaseClient {
  try {
    let cleanUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `https://${cleanUrl}`;
    }
    supabaseInstance = createClient(cleanUrl, anonKey.trim());
  } catch (e) {
    console.warn('Could not initialize live Supabase client, using fallback mode', e);
  }
  return supabaseInstance!;
}

export function getSupabase(): SupabaseClient | null {
  if (!supabaseInstance) {
    const cfg = getStoredConfig();
    initSupabaseClient(cfg.url, cfg.anonKey);
  }
  return supabaseInstance;
}

// Initialize on boot
getSupabase();

// --- LOCAL PERSISTENCE + SUPABASE SYNC ENGINE ---

export function getStoredUserProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return null;
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
  
  // Try sync with Supabase if online
  const sb = getSupabase();
  if (sb) {
    sb.from('profiles').upsert({
      id: profile.id,
      phone_number: profile.phone_number,
      full_name: profile.full_name || null,
      training_school: profile.training_school || profile.department || null,
      training_program: profile.training_program || profile.field || null,
      department: profile.department || profile.training_school || null,
      field: profile.field || profile.training_program || null,
      stage: profile.stage || null,
      email: profile.email || null,
      selected_role: profile.selected_role || null,
      is_paid: profile.is_paid,
      paid_at: profile.paid_at,
      interested_to_upgrade: profile.interested_to_upgrade || false,
      upgrade_interest_at: profile.upgrade_interest_at || null,
      free_exam_used: profile.free_exam_used,
      created_at: profile.created_at,
    }).then(({ error }) => {
      if (error) console.log('Supabase profile sync note:', error.message);
    });
  }
}

export async function registerUpgradeInterest(user: UserProfile): Promise<{ success: boolean; user: UserProfile }> {
  const timestamp = new Date().toISOString();
  const updatedUser: UserProfile = {
    ...user,
    interested_to_upgrade: true,
    upgrade_interest_at: timestamp,
  };

  // Save to local storage & sync profile
  saveUserProfile(updatedUser);

  // Also log into dedicated upgrade_interests table in Supabase
  const sb = getSupabase();
  if (sb) {
    try {
      await sb.from('upgrade_interests').insert({
        id: `interest_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        user_id: user.id,
        phone_number: user.phone_number,
        full_name: user.full_name || 'Candidate',
        training_school: user.training_school || user.department || 'CABIN CREW TRAINING SCHOOL',
        training_program: user.training_program || user.field || 'CABIN CREW TRAINEE (ET-SPONSORED)',
        status: 'interested_to_upgrade',
        registered_at: timestamp,
      });
    } catch (e) {
      console.log('Supabase upgrade_interests insert note:', e);
    }
  }

  return { success: true, user: updatedUser };
}

export function getStoredExamAttempts(userId: string): ExamAttempt[] {
  try {
    const raw = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    if (raw) {
      const all: ExamAttempt[] = JSON.parse(raw);
      return all.filter(a => a.user_id === userId);
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function saveExamAttempt(attempt: ExamAttempt): void {
  try {
    const raw = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    const all: ExamAttempt[] = raw ? JSON.parse(raw) : [];
    all.push(attempt);
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(all));

    // Also mark free_exam_used in profile if this is 1st exam
    const profile = getStoredUserProfile();
    if (profile && profile.id === attempt.user_id) {
      profile.free_exam_used = true;
      saveUserProfile(profile);
    }

    const sb = getSupabase();
    if (sb) {
      sb.from('exam_attempts').insert({
        id: attempt.id,
        user_id: attempt.user_id,
        category: attempt.category,
        score: attempt.score,
        total_questions: attempt.total_questions,
        time_taken_seconds: attempt.time_taken_seconds,
        completed_at: attempt.completed_at,
      }).then(({ error }) => {
        if (error) console.log('Supabase attempt insert note:', error.message);
      });
    }
  } catch (e) {
    console.error('Failed to save exam attempt', e);
  }
}

// --- PAYMENT SUBMISSIONS & DUPLICATE CHECKS ---

export function getPaymentSubmissions(userId?: string): PaymentSubmission[] {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
    if (raw) {
      const all: PaymentSubmission[] = JSON.parse(raw);
      if (userId) return all.filter(s => s.user_id === userId);
      return all;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function createPaymentSubmission(submission: PaymentSubmission): { success: boolean; error?: string } {
  const all = getPaymentSubmissions();

  // Check for duplicate transaction ID (unique constraint)
  const isDuplicate = all.some(
    s => s.telebirr_transaction_id.trim().toUpperCase() === submission.telebirr_transaction_id.trim().toUpperCase()
  );

  if (isDuplicate) {
    return {
      success: false,
      error: 'This Telebirr Transaction ID has already been submitted or verified. Please check your payment receipt.'
    };
  }

  all.push(submission);
  localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(all));

  const sb = getSupabase();
  if (sb) {
    sb.from('payment_submissions').insert({
      id: submission.id,
      user_id: submission.user_id,
      telebirr_transaction_id: submission.telebirr_transaction_id,
      receipt_image_url: submission.receipt_image_url,
      amount_claimed: submission.amount_claimed,
      status: submission.status,
      submitted_at: submission.submitted_at,
    }).then(({ error }) => {
      if (error) console.log('Supabase submission insert note:', error.message);
    });
  }

  return { success: true };
}

export function updatePaymentSubmissionStatus(
  submissionId: string,
  status: 'pending' | 'verified' | 'rejected' | 'duplicate',
  rejectionReason?: string
): void {
  const all = getPaymentSubmissions();
  const index = all.findIndex(s => s.id === submissionId);
  if (index !== -1) {
    all[index].status = status;
    all[index].verified_at = new Date().toISOString();
    if (rejectionReason) all[index].rejection_reason = rejectionReason;
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(all));

    // If verified, unlock premium on the user profile!
    if (status === 'verified') {
      const profile = getStoredUserProfile();
      if (profile && profile.id === all[index].user_id) {
        profile.is_paid = true;
        profile.paid_at = new Date().toISOString();
        saveUserProfile(profile);
      }
    }

    const sb = getSupabase();
    if (sb) {
      sb.from('payment_submissions').update({
        status,
        verified_at: new Date().toISOString(),
        rejection_reason: rejectionReason || null,
      }).eq('id', submissionId).then(() => {
        if (status === 'verified') {
          sb.from('profiles').update({
            is_paid: true,
            paid_at: new Date().toISOString()
          }).eq('id', all[index].user_id);
        }
      });
    }
  }
}

// --- AUDIO RECORDINGS STORAGE ---

export function getAudioRecordings(questionId?: string): AudioRecording[] {
  try {
    const raw = localStorage.getItem(AUDIO_RECORDINGS_KEY);
    if (raw) {
      const all: AudioRecording[] = JSON.parse(raw);
      if (questionId) return all.filter(r => r.questionId === questionId);
      return all;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function saveAudioRecording(rec: AudioRecording): void {
  const all = getAudioRecordings();
  // Filter out previous recording for same question if replacing
  const updated = all.filter(r => r.questionId !== rec.questionId);
  updated.push(rec);
  localStorage.setItem(AUDIO_RECORDINGS_KEY, JSON.stringify(updated));
}

export function deleteAudioRecording(questionId: string): void {
  const all = getAudioRecordings();
  const updated = all.filter(r => r.questionId !== questionId);
  localStorage.setItem(AUDIO_RECORDINGS_KEY, JSON.stringify(updated));
}

// SQL Schema Generator string for user reference
export const PART_3_SUPABASE_SQL = `-- Sky Prep Supabase Database Schema (Paste into Supabase SQL Editor)

-- 1. Profiles Table (with Candidate Registration details)
create table if not exists public.profiles (
  id uuid default gen_random_uuid() primary key,
  phone_number text unique,
  full_name text,
  training_school text,
  training_program text,
  department text,
  field text,
  stage text,
  email text,
  selected_role text,
  is_paid boolean default false,
  paid_at timestamptz,
  interested_to_upgrade boolean default false,
  upgrade_interest_at timestamptz,
  free_exam_used boolean default false,
  created_at timestamptz default now()
);

-- Ensure columns exist if table was created previously
alter table public.profiles add column if not exists full_name text;
alter table public.profiles add column if not exists training_school text;
alter table public.profiles add column if not exists training_program text;
alter table public.profiles add column if not exists department text;
alter table public.profiles add column if not exists field text;
alter table public.profiles add column if not exists stage text;
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists selected_role text;
alter table public.profiles add column if not exists interested_to_upgrade boolean default false;
alter table public.profiles add column if not exists upgrade_interest_at timestamptz;

-- 2. Upgrade Interests Table
create table if not exists public.upgrade_interests (
  id text primary key,
  user_id text not null,
  phone_number text,
  full_name text,
  training_school text,
  training_program text,
  status text default 'interested_to_upgrade',
  registered_at timestamptz default now()
);

-- 2. Payment Submissions Table
create table if not exists public.payment_submissions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  telebirr_transaction_id text not null,
  receipt_image_url text not null,
  amount_claimed numeric not null,
  status text default 'pending' check (status in ('pending','verified','rejected','duplicate')),
  submitted_at timestamptz default now(),
  verified_at timestamptz,
  rejection_reason text,
  constraint unique_transaction unique (telebirr_transaction_id)
);

-- 3. Exam Attempts Table
create table if not exists public.exam_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  category text not null,
  score int not null,
  total_questions int not null,
  time_taken_seconds int,
  completed_at timestamptz default now()
);

-- 4. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.payment_submissions enable row level security;
alter table public.exam_attempts enable row level security;

-- 5. RLS Policies
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can view own submissions" on public.payment_submissions for select using (auth.uid() = user_id);
create policy "Users can insert own submissions" on public.payment_submissions for insert with check (auth.uid() = user_id);

create policy "Users can view own attempts" on public.exam_attempts for select using (auth.uid() = user_id);
create policy "Users can insert own attempts" on public.exam_attempts for insert with check (auth.uid() = user_id);
`;
