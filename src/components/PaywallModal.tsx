import React from 'react';
import { Sparkles, CheckCircle2, Shield, X, Users, Smartphone, ArrowRight, Check } from 'lucide-react';
import { UserProfile, Language } from '../types';
import { TRANSLATION } from '../data/translations';
import { IMAGES } from '../assets/images';
import { AviationImage } from './AviationImage';

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
  onProceedToPayment,
  onClose,
}) => {
  const t = TRANSLATION[lang];

  const handleUpgradeClick = () => {
    if (onProceedToPayment) {
      onProceedToPayment();
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

        {/* Top Header with Cabin Crew Banner */}
        <div className="relative p-6 text-white text-center overflow-hidden border-b border-amber-400/30">
          <AviationImage
            src={IMAGES.cabinCrewSvc}
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

          {/* Telebirr Payment Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 flex items-center justify-between text-xs text-slate-900">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#2E86FF] text-white flex items-center justify-center font-bold shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Accepted: Telebirr Only</span>
                <p className="text-[11px] text-slate-600">Send to <strong>0920017478</strong> (Biniyam Haile)</p>
              </div>
            </div>
            <span className="font-black text-xs text-blue-900 bg-blue-100 px-2 py-1 rounded-lg">
              99 ETB
            </span>
          </div>

          {/* Price Box */}
          <div className="text-center bg-amber-50 border border-amber-200 rounded-2xl p-3.5">
            <span className="text-[10px] font-bold uppercase text-amber-900 tracking-wider block">One-Time Lifetime Access</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">99 ETB</div>
            <p className="text-[10px] text-amber-800 mt-0.5">Pay once with Telebirr, keep lifetime access forever.</p>
          </div>

          {/* Primary Unlock / Proceed Button */}
          <div className="space-y-2">
            <button
              onClick={handleUpgradeClick}
              className="w-full bg-[#F2B134] hover:bg-amber-500 text-slate-950 font-black text-sm py-4 px-6 rounded-2xl shadow-xl gold-glow transition-all flex items-center justify-center gap-2 active:scale-95 min-h-[48px]"
            >
              <Sparkles className="w-5 h-5 text-slate-950 fill-slate-950" />
              <span>
                {lang === 'en' ? 'Pay with Telebirr & Verify (99 ETB)' : 'በቴሌብር ይክፈሉና ፕሪሚየምን ያረጋግጡ (99 ብር)'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1 pt-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant automated verification via Ethio Telecom gateway.</span>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
