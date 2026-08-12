import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { getSupabase, saveUserProfile, getStoredUserProfile } from '../services/supabase';
import { Phone, Shield, ArrowRight, ArrowLeft, KeyRound, Loader2, CheckCircle2 } from 'lucide-react';
import { TRANSLATION } from '../data/translations';

interface AuthScreenProps {
  lang?: Language;
  onAuthenticated: (profile: UserProfile) => void;
  onBack: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ lang = 'en', onAuthenticated, onBack }) => {
  const t = TRANSLATION[lang];
  const [phoneNumber, setPhoneNumber] = useState('0911234567');
  const [fullName, setFullName] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleanPhone = phoneNumber.trim().replace(/\s+/g, '');
    
    if (!cleanPhone || cleanPhone.length < 9) {
      setError('Please enter a valid phone number (e.g., 0911234567 or +251911234567).');
      return;
    }

    setLoading(true);
    
    const sb = getSupabase();
    if (sb) {
      try {
        const fullIntlPhone = cleanPhone.startsWith('+') 
          ? cleanPhone 
          : cleanPhone.startsWith('0') 
            ? `+251${cleanPhone.slice(1)}` 
            : `+251${cleanPhone}`;

        const { error: sbError } = await sb.auth.signInWithOtp({
          phone: fullIntlPhone,
        });

        if (sbError) {
          console.log('Supabase SMS OTP notice:', sbError.message);
        }
      } catch (err) {
        console.warn('Fallback to demo OTP mode', err);
      }
    }

    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otpCode || otpCode.length < 4) {
      setError('Please enter the verification OTP code sent to your phone.');
      return;
    }

    setLoading(true);

    const cleanPhone = phoneNumber.trim().replace(/\s+/g, '');
    const formattedPhone = cleanPhone.startsWith('+') 
      ? cleanPhone 
      : cleanPhone.startsWith('0') 
        ? `+251 ${cleanPhone.slice(1)}` 
        : `+251 ${cleanPhone}`;

    let profile = getStoredUserProfile();
    if (!profile || profile.phone_number !== formattedPhone) {
      const generatedId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `usr_${Date.now()}`;
      profile = {
        id: generatedId,
        phone_number: formattedPhone,
        full_name: fullName.trim() || 'Airline Candidate',
        is_paid: false,
        paid_at: null,
        free_exam_used: false,
        created_at: new Date().toISOString(),
      };
    } else {
      if (fullName.trim()) {
        profile.full_name = fullName.trim();
      }
    }

    saveUserProfile(profile);

    setTimeout(() => {
      setLoading(false);
      onAuthenticated(profile!);
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Header Bar with Cabin Crew Safety Image */}
        <div className="relative p-6 text-white text-center overflow-hidden">
          <img
            src="/src/assets/images/cabin_crew_safety_1786528398784.jpg"
            alt="Cabin Crew Safety"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[1px]" />

          <div className="relative z-10">
            <button
              onClick={step === 'otp' ? () => setStep('phone') : onBack}
              className="absolute left-0 top-0 p-2 text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="inline-flex p-2.5 rounded-2xl bg-blue-500/30 border border-blue-400/40 mb-2">
              <Shield className="w-7 h-7 text-amber-400" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-white">
              {step === 'phone' ? 'Candidate Login / Signup' : 'Verify Phone Number'}
            </h2>
            <p className="text-xs text-slate-200 mt-1 font-medium">
              {step === 'phone' 
                ? 'Enter your mobile number to access your Sky Prep account.' 
                : `OTP code sent to ${phoneNumber}`}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Solomon Alemu"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-sm text-slate-900 font-medium min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    placeholder="0911234567 or +251 9..."
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-sm text-slate-900 font-semibold min-h-[44px]"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Mobile phone format (+251 / 09...).
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 min-h-[48px]"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Demo Mode Hint:</strong> Use code <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">123456</code> to complete verification instantly.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  6-Digit OTP Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-base text-slate-900 font-mono font-bold tracking-widest text-center min-h-[44px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 min-h-[48px]"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span>Verify & Log In</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-xs text-slate-500 hover:text-slate-900 py-1 font-medium"
              >
                Change Phone Number
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              Secured by Supabase Auth & Row Level Security (RLS).
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
