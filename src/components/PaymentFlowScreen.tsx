import React, { useEffect } from 'react';
import { UserProfile, Language } from '../types';
import { registerUpgradeInterest } from '../services/supabase';
import { Shield, CheckCircle2, ArrowLeft, Send, ExternalLink, Hammer, Sparkles } from 'lucide-react';
import { TRANSLATION } from '../data/translations';

interface PaymentFlowScreenProps {
  user: UserProfile;
  lang?: Language;
  onPaymentSuccess?: () => void;
  onBack: () => void;
  onOpenAdmin?: () => void;
  onUserUpdated?: (updatedUser: UserProfile) => void;
}

export const PaymentFlowScreen: React.FC<PaymentFlowScreenProps> = ({
  user,
  lang = 'en',
  onBack,
  onUserUpdated,
}) => {
  const t = TRANSLATION[lang];

  // Auto-register candidate upgrade interest to Supabase on mount
  useEffect(() => {
    registerUpgradeInterest(user).then(({ user: updatedUser }) => {
      if (onUserUpdated && updatedUser) {
        onUserUpdated(updatedUser);
      }
    });
  }, [user.id]);

  const schoolName = user.training_school || user.department || 'CABIN CREW TRAINING SCHOOL';
  const programName = user.training_program || user.field || 'CABIN CREW TRAINEE (ET-SPONSORED)';

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Back Navigation */}
      <button
        onClick={onBack}
        className="text-xs font-black text-[#2E86FF] hover:underline flex items-center gap-1.5 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{lang === 'en' ? 'Back to Dashboard' : 'ወደ ዋናው ገጽ'}</span>
      </button>

      {/* Main Status Container */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Banner */}
        <div className="relative p-6 text-white text-center bg-gradient-to-b from-[#0B2545] to-[#133E6D] border-b border-amber-400/30 overflow-hidden">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 font-black text-xs px-3.5 py-1 rounded-full border border-amber-400/30 mb-2">
            <Hammer className="w-3.5 h-3.5 text-amber-300" />
            <span>SYSTEM NOTICE • ON BUILDING</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {lang === 'en' ? 'Automated Payments Under Construction' : 'የክፍያ ስርዓቱ በግንባታ ላይ ይገኛል'}
          </h2>
          <p className="text-xs text-blue-200 mt-1 max-w-sm mx-auto font-medium">
            {lang === 'en'
              ? 'We have successfully registered your upgrade interest in our database.'
              : 'የማሻሻያ ፍላጎትዎ በዳታቤዝ ውስጥ በሚገባ ተመዝግቧል።'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          {/* Supabase Registration Confirmation Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{lang === 'en' ? 'Upgrade Interest Registered in Supabase' : 'ተፈታኙ በዳታቤዝ ተመዝግቧል'}</span>
            </div>

            <div className="text-xs text-slate-700 bg-white/90 rounded-xl p-3.5 border border-emerald-100 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Full Name:</span>
                <span className="font-bold text-slate-900">{user.full_name || 'Candidate'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Phone Number:</span>
                <span className="font-mono font-bold text-slate-900">{user.phone_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Training School:</span>
                <span className="font-bold text-blue-900 text-[11px] text-right">{schoolName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Program:</span>
                <span className="font-bold text-slate-800 text-[11px] text-right">{programName}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span className="text-slate-500 font-medium">Status:</span>
                <span className="font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded text-[11px]">
                  Interested in Upgrade (Saved)
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
              {lang === 'en'
                ? 'You do not need to make any payment right now. Our technical team is actively building the automated payment and verification gateway. In the meantime, you retain priority status on our upgrade waitlist.'
                : 'አሁን ምንም አይነት ክፍያ መፈጸም አያስፈልግዎትም። የክፍያ ስርዓቱ በግንባታ ላይ ስለሆነ በቅድሚያ ማሻሻያ ዝርዝራችን ውስጥ ተመዝግበዋል።'}
            </p>
          </div>

          {/* Telegram Assistance Action */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 space-y-3">
            <div>
              <h4 className="text-xs font-black text-[#0B2545]">
                {lang === 'en' ? 'Direct Candidate Support' : 'የእጩዎች የቴሌግራም ድጋፍ'}
              </h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {lang === 'en'
                  ? 'Have questions about Ethiopian Airlines recruitment or training programs? Chat with our team:'
                  : 'ስለ አየር መንገድ ቅጥር እና ፈተናዎች ማንኛውም ጥያቄ ካለዎት በቴሌግራም ያግኙን፡'}
              </p>
            </div>

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
                  <span className="block text-[10px] font-medium text-blue-100">Telegram Support Desk</span>
                  <span className="block text-xs font-black text-white">@skywardsupports</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-blue-100 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Action Back Button */}
          <button
            onClick={onBack}
            className="w-full bg-[#0B2545] hover:bg-slate-900 text-white font-black text-xs py-4 rounded-xl shadow-lg transition-all active:scale-95"
          >
            {lang === 'en' ? 'Return to Practice & Preparation' : 'ወደ ልምምድ ፈተናዎች ይመለሱ'}
          </button>

        </div>

      </div>

    </div>
  );
};
