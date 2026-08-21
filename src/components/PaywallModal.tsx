import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Shield, X, Users, Hammer, Send, ExternalLink, ArrowRight, Check } from 'lucide-react';
import { UserProfile, Language } from '../types';
import { TRANSLATION } from '../data/translations';
import { registerUpgradeInterest } from '../services/supabase';

interface PaywallModalProps {
  user?: UserProfile | null;
  lang?: Language;
  onUserUpdated?: (updatedUser: UserProfile) => void;
  onProceedToPayment?: () => void;
  onClose: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  user,
  lang = 'en',
  onUserUpdated,
  onClose,
}) => {
  const t = TRANSLATION[lang];
  const [isRegistering, setIsRegistering] = useState(false);
  const [showBuildingState, setShowBuildingState] = useState(Boolean(user?.interested_to_upgrade));
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleRegisterInterest = async () => {
    if (!user) {
      setShowBuildingState(true);
      return;
    }
    setIsRegistering(true);
    try {
      const result = await registerUpgradeInterest(user);
      if (onUserUpdated && result.user) {
        onUserUpdated(result.user);
      }
      setRegisteredSuccess(true);
      setShowBuildingState(true);
    } catch (e) {
      console.error(e);
      setShowBuildingState(true);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-amber-400/40 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {showBuildingState ? (
          /* "ON BUILDING / REGISTERED IN SUPABASE" State */
          <div className="p-6 space-y-5 text-center">
            <div className="relative p-6 -mx-6 -mt-6 bg-gradient-to-b from-[#0B2545] to-[#133E6D] text-white border-b border-amber-400/30 overflow-hidden">
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 font-black text-xs px-3.5 py-1 rounded-full border border-amber-400/30 mb-2">
                <Hammer className="w-3.5 h-3.5 text-amber-300" />
                <span>ON BUILDING • UPGRADE NOTICE</span>
              </div>
              <h3 className="text-xl font-black text-white">
                {lang === 'en' ? 'Payment System Under Construction' : 'የክፍያ ስርዓቱ በግንባታ ላይ ይገኛል'}
              </h3>
              <p className="text-xs text-blue-200 mt-1">
                {lang === 'en' 
                  ? 'We have recorded your interest in our database.'
                  : 'የእርስዎ የማሻሻያ ፍላጎት በዳታቤዝ ውስጥ ተመዝግቧል።'}
              </p>
            </div>

            {/* Success Registration Box */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'en' ? 'Candidate Registered' : 'ተፈታኙ ተመዝግቧል'}
                </span>
              </div>
              {user && (
                <div className="text-[11px] text-slate-700 bg-white/80 rounded-xl p-3 border border-emerald-100 space-y-1">
                  <div><strong className="text-slate-900">Name:</strong> {user.full_name || 'Candidate'}</div>
                  <div><strong className="text-slate-900">Phone:</strong> {user.phone_number}</div>
                  <div><strong className="text-slate-900">School:</strong> {user.training_school || user.department || 'Aviation School'}</div>
                  <div><strong className="text-slate-900">Status:</strong> <span className="inline-block text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.5 rounded">Interested in Upgrade (Saved)</span></div>
                </div>
              )}
              <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
                {lang === 'en'
                  ? 'The automated payment gateway is currently on building. You do not need to make any payment right now. You are prioritized on our candidate upgrade list.'
                  : 'የክፍያ ስርዓቱ በግንባታ ላይ ስለሆነ አሁን ምንም አይነት ክፍያ መፈጸም አያስፈልግዎትም። በቅድሚያ ማሻሻያ ዝርዝራችን ውስጥ ተካተዋል።'}
              </p>
            </div>

            {/* Direct Telegram Support Link */}
            <div className="space-y-2 text-left">
              <p className="text-xs font-bold text-slate-700">
                {lang === 'en' ? 'Questions or manual assistance? Reach out on Telegram:' : 'ጥያቄ ካለዎት ወይም ፈጣን ድጋፍ ከፈለጉ በቴሌግራም ያግኙን፡'}
              </p>
              <a
                href="https://t.me/skywardsupports"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#2E86FF] hover:bg-[#1b72e8] text-white p-3.5 rounded-2xl font-black text-xs flex items-center justify-between shadow-md shadow-blue-500/20 transition-all active:scale-95 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                    <Send className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-medium text-blue-100">Official Telegram Desk</span>
                    <span className="block text-xs font-black text-white">@skywardsupports</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-100 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Back Button */}
            <button
              onClick={onClose}
              className="w-full bg-[#0B2545] hover:bg-slate-900 text-white font-black text-xs py-3.5 rounded-xl transition-all"
            >
              {lang === 'en' ? 'Continue Practicing Free Content' : 'ወደ ነጻ ልምምድ ይመለሱ'}
            </button>
          </div>
        ) : (
          /* Normal Paywall Overview with "Register Interest to Upgrade" */
          <>
            {/* Top Header with Cabin Crew Banner */}
            <div className="relative p-6 text-white text-center overflow-hidden border-b border-amber-400/30">
              <img
                src="/src/assets/images/intl_cabin_crew_svc_1787160538797.jpg"
                alt="Cabin Crew Service"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[1px]" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/30 text-amber-300 font-black text-xs px-3.5 py-1 rounded-full border border-amber-500/40 mb-3">
                  <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
                  <span>SKY PREP PREMIER UNLIMITED PASS</span>
                </div>

                <h2 className="text-2xl font-black text-white tracking-tight">
                  "{lang === 'en' ? 'Invest in your aviation career.' : 'ለአቪዬሽን ስኬትዎ አሁኑኑ ይዘጋጁ።'}"
                </h2>
                <p className="text-xs text-slate-200 mt-1 max-w-xs mx-auto leading-relaxed font-medium">
                  {t.oneTimePay}
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-5">
              
              {/* Comparison Table */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="grid grid-cols-3 text-xs font-black uppercase text-slate-900 border-b border-slate-200 pb-2">
                  <span>Feature</span>
                  <span className="text-center text-slate-400">Free</span>
                  <span className="text-right text-amber-600 font-extrabold">Premier Pass</span>
                </div>

                {[
                  { name: 'Practice Exams', free: '1 Attempt', paid: 'Unlimited Retakes' },
                  { name: 'Group Discussion', free: '15 Topics', paid: '15 Topics' },
                  { name: 'Interview Bank', free: '3 Questions', paid: 'Full 25 Questions' },
                  { name: 'STAR Models', free: 'Limited', paid: 'All 25 Outlines' },
                  { name: 'Self-Record & Voice', free: '✕', paid: '✓ Unlimited Voice' },
                  { name: 'Score Analytics', free: '✕', paid: '✓ Full History' },
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 text-xs items-center py-1 border-b border-slate-100 last:border-0">
                    <span className="font-semibold text-slate-900">{row.name}</span>
                    <span className="text-center text-slate-500 font-medium">{row.free}</span>
                    <span className="text-right font-bold text-emerald-700 flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" /> {row.paid}
                    </span>
                  </div>
                ))}
              </div>

              {/* Value Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center gap-3 text-xs text-slate-900">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Structured Airline Exam Preparation</span>
                  <p className="text-[11px] text-slate-600">Tailored questions for Cabin Crew, Pilots, Maintenance (AMT) & Ground roles.</p>
                </div>
              </div>

              {/* Price Box */}
              <div className="text-center bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <span className="text-xs font-bold uppercase text-amber-900 tracking-wider block">One-Time Lifetime Access</span>
                <div className="text-3xl font-black text-slate-900 mt-1">99 ETB</div>
                <p className="text-[11px] text-amber-800 mt-0.5">Pay once, keep lifetime access forever. Automated payments currently on building.</p>
              </div>

              {/* Primary Unlock / Register Interest Button */}
              <div className="space-y-2">
                <button
                  onClick={handleRegisterInterest}
                  disabled={isRegistering}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm py-4 px-6 rounded-2xl shadow-xl gold-glow transition-all flex items-center justify-center gap-2 active:scale-95 min-h-[48px] disabled:opacity-75"
                >
                  <Sparkles className="w-5 h-5 text-slate-950 fill-slate-950" />
                  <span>
                    {isRegistering 
                      ? (lang === 'en' ? 'Registering Upgrade Interest...' : 'በመመዝገብ ላይ...') 
                      : (lang === 'en' ? 'Register Interest to Upgrade' : 'የማሻሻያ ፍላጎትዎን ይመዝግቡ')}
                  </span>
                </button>

                <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1 pt-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Your registration will be securely synced with the candidate server.</span>
                </p>
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
};
