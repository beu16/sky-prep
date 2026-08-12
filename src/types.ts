export type ExamCategory = 'English' | 'Numerical Reasoning' | 'Verbal Reasoning' | 'General Knowledge';

export type AviationRole = 'Cabin Crew' | 'Pilot / Cadet' | 'Aircraft Maintenance (AMT)' | 'Ground Operations' | 'All';

export type Language = 'en' | 'am';

export interface UserProfile {
  id: string;
  phone_number: string;
  full_name?: string;
  department?: string;
  stage?: string;
  email?: string;
  is_paid: boolean;
  paid_at?: string | null;
  free_exam_used: boolean;
  selected_role?: AviationRole;
  created_at: string;
}

export interface ExamQuestion {
  id: string;
  category: ExamCategory;
  role?: AviationRole;
  question: string;
  amharicQuestion?: string;
  options: string[];
  amharicOptions?: string[];
  correctIndex: number;
  explanation: string;
  amharicExplanation?: string;
}

export interface ExamAttempt {
  id: string;
  user_id: string;
  category: ExamCategory;
  role?: AviationRole;
  score: number;
  total_questions: number;
  time_taken_seconds: number;
  completed_at: string;
}

export interface GroupDiscussionTopic {
  id: string;
  role?: AviationRole;
  title: string;
  amharicTitle?: string;
  scenario: string;
  amharicScenario?: string;
  evaluatorCriteria: string[];
  dos: string[];
  donts: string[];
  starterPhrases: string[];
}

export interface StarFramework {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface InterviewQuestion {
  id: string;
  role?: AviationRole;
  question: string;
  amharicQuestion?: string;
  category: 'Aviation Knowledge' | 'Behavioral & Scenario' | 'Customer Service' | 'Leadership & Pressure';
  isFreePreview: boolean;
  starFramework: StarFramework;
  keyPhrases: string[];
}

export interface PaymentSubmission {
  id: string;
  user_id: string;
  telebirr_transaction_id: string;
  receipt_image_url: string;
  amount_claimed: number;
  status: 'pending' | 'verified' | 'rejected' | 'duplicate';
  submitted_at: string;
  verified_at?: string | null;
  rejection_reason?: string | null;
}

export interface AudioRecording {
  questionId: string;
  audioUrl: string;
  recordedAt: string;
  durationSeconds: number;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  merchantNumber: string;
}
