import React, { useState } from 'react';
import { UserProfile, Language, TelebirrTransaction } from '../types';
import { TRANSLATION } from '../data/translations';
import { saveTransaction, verifyTelebirrTransactionLocal } from '../services/supabase';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  Copy, 
  CheckCircle2, 
  Crown,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaywallModalProps {
  isOpen: boolean;
  user: UserProfile | null;
  lang: Language;
  onClose: () => void;
  onSuccess: (updatedUser: UserProfile) => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  user,
  lang,
  onClose,
  onSuccess
}) => {
  const t = TRANSLATION[lang];
  const [copied, setCopied] = useState(false);
  const [txId, setTxId] = useState('');
  const [userName, setUserName] = useState(user?.name || '');
  const [userPhone, setUserPhone] = useState(user?.phone || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('0920017478');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!txId.trim()) {
      setErrorMessage('Please enter your Telebirr Transaction ID.');
      return;
    }

    const verification = verifyTelebirrTransactionLocal(txId);
    if (!verification.success) {
      setErrorMessage(verification.message);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const tx: TelebirrTransaction = {
        id: 'tx_' + Date.now(),
        userId: user?.id || 'usr_' + Date.now(),
        userName: userName || 'Aviation Candidate',
        userPhone: userPhone || '09xxxxxxxx',
        transactionId: txId.trim().toUpperCase(),
        amount: 99,
        receiverPhone: '0920017478',
        receiverName: 'Biniyam Haile',
        status: 'approved',
        submittedAt: new Date().toISOString(),
        verifiedAt: new Date().toISOString()
      };

      saveTransaction(tx);

      const updatedUser: UserProfile = {
        ...(user || {
          id: tx.userId,
          name: tx.userName,
          phone: tx.userPhone,
          role: 'cabin_crew',
          school: 'cabin_crew',
          targetAirline: 'Ethiopian Airlines',
          candidateNumber: 'ET-CAD-' + Math.floor(1000 + Math.random() * 9000),
          completedExams: 0,
          averageScore: 0,
          streakDays: 1,
          lastActive: new Date().toISOString()
        }),
        isPremier: true,
        premierExpiresAt: '2099-12-31'
      };

      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });

      setTimeout(() => {
        onSuccess(updatedUser);
        onClose();
      }, 1800);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#07192F] border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Crown className="w-6 h-6 fill-current" />
            <div>
              <h2 className="text-lg font-black tracking-tight">{t.premierPlan}</h2>
              <p className="text-xs font-bold opacity-90">{t.telebirrPrice}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-full bg-slate-950/10 hover:bg-slate-950/20 text-slate-950 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 pt-0 space-y-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white">Premier Pass Activated!</h3>
              <p className="text-xs text-slate-300">
                Full access to all exams, STAR audio answers, and verified certification unlocked.
              </p>
            </div>
          ) : (
            <>
              {/* Payment Instructions Card */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Telebirr Recipient:</span>
                  <span className="text-amber-400 font-extrabold">{t.accountHolder}</span>
                </div>

                <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="font-mono text-sm font-black text-white tracking-wider">
                    {t.accountNumber}
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    type="button"
                    className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Send exactly <strong>99 ETB</strong> via Telebirr to <strong>0920017478</strong>, then enter the Transaction ID (e.g. <em>TB849204...</em>) below for instant automated activation.
                </p>
              </div>

              {/* Verification Form */}
              <form onSubmit={handleSubmitTransaction} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">
                    Telebirr Transaction ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={txId}
                    onChange={(e) => setTxId(e.target.value)}
                    placeholder="e.g., TB12345678"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white uppercase font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">
                      Candidate Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="09xxxxxxxx"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-98"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isSubmitting ? 'Verifying Transaction...' : t.verifyPayment}</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
