import React, { useState, useEffect } from 'react';
import { UserProfile, Language } from '../types';
import { verifyTelebirrPaymentOnline, registerUpgradeInterest } from '../services/supabase';
import {
  Shield,
  CheckCircle2,
  ArrowLeft,
  Send,
  ExternalLink,
  Sparkles,
  Copy,
  Check,
  Smartphone,
  CreditCard,
  Lock,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Award,
  BookOpen,
  Mic,
  Users,
  TrendingUp,
  FileText
} from 'lucide-react';
import { TRANSLATION } from '../data/translations';

interface PaymentFlowScreenProps {
  user: UserProfile;
  lang?: Language;
  onPaymentSuccess?: () => void;
  onBack: () => void;
  onOpenAdmin?: () => void;
  onUserUpdated?: (updatedUser: UserProfile) => void;
  onNavigateToTab?: (tab: 'home' | 'practice' | 'interview' | 'progress' | 'profile') => void;
}

export const PaymentFlowScreen: React.FC<PaymentFlowScreenProps> = ({
  user,
  lang = 'en',
  onPaymentSuccess,
  onBack,
  onUserUpdated,
  onNavigateToTab,
}) => {
  const t = TRANSLATION[lang];

  // Payment details
  const TELEBIRR_NUMBER = '0920017478';
  const TELEBIRR_NAME = 'Biniyam Haile';
  const PRICE_ETB = '99';

  const [transactionId, setTransactionId] = useState('');
  const [smsText, setSmsText] = useState('');
  const [showSmsInput, setShowSmsInput] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedName, setCopiedName] = useState(false);
  const [verifiedDetails, setVerifiedDetails] = useState<{
    txId?: string;
    amount?: string;
    date?: string;
  } | null>(null);

  // Auto-register candidate upgrade interest to cloud database on mount
  useEffect(() => {
    registerUpgradeInterest(user).then(({ user: updatedUser }) => {
      if (onUserUpdated && updatedUser) {
        onUserUpdated(updatedUser);
      }
    });
  }, [user.id]);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(TELEBIRR_NUMBER);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleCopyName = () => {
    navigator.clipboard.writeText(TELEBIRR_NAME);
    setCopiedName(true);
    setTimeout(() => setCopiedName(false), 2500);
  };

  // Smart SMS auto-extraction
  const handleSmsPaste = (text: string) => {
    setSmsText(text);
    // Look for Telebirr transaction patterns
    // e.g. "Transaction No: CL12345", "Txn ID: 7J1234", "Receipt No: ...", or general code
    const txMatch = text.match(/(?:transaction\s*(?:no|id|#)|receipt\s*(?:no|#)|txn\s*id|የግብይት\s*ቁጥር)\s*[:：\s]*([A-Za-z0-9_-]{5,25})/i) ||
                    text.match(/([A-Z0-9]{8,16})/);
    if (txMatch && txMatch[1]) {
      setTransactionId(txMatch[1].trim());
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanInput = transactionId.trim();
    if (!cleanInput) {
      setErrorMessage(
        lang === 'en'
          ? 'Please enter your Telebirr Transaction ID.'
          : 'እባክዎ የቴሌብር የግብይት ቁጥር (Transaction ID) ያስገቡ።'
      );
      return;
    }

    setIsVerifying(true);

    try {
      const res = await verifyTelebirrPaymentOnline({
        transactionId: cleanInput,
        userId: user.id,
        smsText: smsText,
      });

      if (res.verified && res.success) {
        const updatedUser: UserProfile = {
          ...user,
          is_paid: true,
          paid_at: new Date().toISOString(),
        };

        if (onUserUpdated) {
          onUserUpdated(updatedUser);
        }

        setVerifiedDetails({
          txId: res.transactionId || cleanInput,
          amount: `${PRICE_ETB} ETB`,
          date: new Date().toLocaleDateString(),
        });

        setSuccessMessage(
          lang === 'en'
            ? 'Payment verified successfully! Welcome to SkyPrep Premier Lifetime Access.'
            : 'ክፍያዎ በተሳካ ሁኔታ ተረጋግጧል! ወደ SkyPrep ፕሪሚየም እንኳን ደህና መጡ።'
        );

        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
      } else {
        setErrorMessage(
          res.error ||
            (lang === 'en'
              ? 'Could not verify transaction. Please ensure the payment was sent to Biniyam Haile (0920017478).'
              : 'ግብይቱን ማረጋገጥ አልተቻለም። ክፍያው ወደ Biniyam Haile (0920017478) መላኩን ያረጋግጡ።')
        );
      }
    } catch (err: any) {
      setErrorMessage(
        lang === 'en'
          ? 'Verification error. Please retry or contact support on Telegram @skywardsupports.'
          : 'የማረጋገጫ ችግር አጋጥሟል። እባክዎ በድጋሚ ይሞክሩ ወይም በቴሌግራም @skywardsupports ያግኙን።'
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const isPaid = Boolean(user.is_paid);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10 space-y-6 animate-in fade-in duration-300">
      
      {/* Top Back Navigation */}
      <button
        onClick={onBack}
        className="text-xs font-black text-[#2E86FF] hover:underline flex items-center gap-1.5 transition-all active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{lang === 'en' ? 'Back to Dashboard' : 'ወደ ዋናው ገጽ ተመለስ'}</span>
      </button>

      {/* ========================================================== */}
      {/* CASE 1: USER IS ALREADY PREMIER (VIP MEMBER PORTAL)         */}
      {/* ========================================================== */}
      {isPaid ? (
        <div className="bg-white rounded-3xl shadow-xl border border-amber-400/40 overflow-hidden space-y-6">
          
          {/* Active VIP Header Banner */}
          <div className="relative p-6 sm:p-8 text-white text-center bg-gradient-to-b from-[#0B2545] via-[#133E6D] to-[#0B2545] border-b border-amber-400/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#F2B134] text-[#0B2545] font-black text-xs px-4 py-1.5 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4 fill-[#0B2545]" />
                <span>PREMIER VIP LIFETIME PASS ACTIVE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {lang === 'en' ? 'Welcome to SkyPrep Premier' : 'ወደ SkyPrep ፕሪሚየም እንኳን ደህና መጡ'}
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 max-w-lg mx-auto leading-relaxed">
                {lang === 'en'
                  ? 'All aviation assessment categories, STAR interview models, AI voice evaluation, and Verified Ready Certificate are 100% unlocked.'
                  : 'ሁሉም የአቪዬሽን ፈተናዎች፣ የSTAR ቃለ-መጠይቅ መልሶች፣ የድምፅ ልምምድ እና ይፋዊ ሰርተፊኬት ሙሉ በሙሉ ክፍት ናቸው።'}
              </p>
            </div>
          </div>

          {/* Candidate Status Card */}
          <div className="p-6 sm:p-8 space-y-6">
            
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Candidate:</span>
                  <span className="text-sm font-black text-slate-900">{user.full_name || 'Aviation Candidate'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Phone:</span>
                  <span className="text-xs font-mono font-bold text-slate-800">{user.phone_number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Training School:</span>
                  <span className="text-xs font-bold text-blue-900">{user.training_school || user.department || 'CABIN CREW TRAINING SCHOOL'}</span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="block text-[10px] font-black uppercase text-emerald-700">Access Tier</span>
                  <span className="block text-xs font-black text-emerald-950">Lifetime Verified</span>
                </div>
              </div>
            </div>

            {/* Unlocked Modules Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                {lang === 'en' ? 'Your Unlocked Premier Modules' : 'የተከፈቱ የፕሪሚየም ዝግጅቶች'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                <button
                  onClick={() => onNavigateToTab ? onNavigateToTab('interview') : onBack()}
                  className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-400/30 text-left hover:border-amber-400 transition-all flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                      Full 25 STAR Interviews & Voice AI
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      All structured behavioural questions, audio playback, & AI self-recording.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => onNavigateToTab ? onNavigateToTab('practice') : onBack()}
                  className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-400/30 text-left hover:border-blue-400 transition-all flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                      Unlimited Exam Question Banks
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      English proficiency, Ethiopian Airlines aviation knowledge, aptitude, and reasoning.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => onNavigateToTab ? onNavigateToTab('practice') : onBack()}
                  className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-400/30 text-left hover:border-emerald-400 transition-all flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                      All 15 Group Discussion Scenarios
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Model phrases, emergency dilemma handling, and consensus leadership frameworks.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => onNavigateToTab ? onNavigateToTab('progress') : onBack()}
                  className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-400/30 text-left hover:border-purple-400 transition-all flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                      Verified Ready Certificate
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Official candidate readiness certificate with unique verification credential.
                    </p>
                  </div>
                </button>

              </div>
            </div>

            {/* Return to Dashboard */}
            <button
              onClick={onBack}
              className="w-full bg-[#0B2545] hover:bg-slate-900 text-white font-black text-xs py-4 rounded-xl shadow-lg transition-all active:scale-95"
            >
              {lang === 'en' ? 'Open Dashboard & Start Practicing' : 'ወደ ዳሽቦርድ ሂድና ልምምድ ጀምር'}
            </button>

          </div>

        </div>
      ) : (
        /* ========================================================== */
        /* CASE 2: FREE USER UPGRADE & TELEBIRR PAYMENT FLOW          */
        /* ========================================================== */
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden space-y-6">
          
          {/* Header Banner */}
          <div className="relative p-6 sm:p-8 text-white text-center bg-gradient-to-b from-[#0B2545] via-[#133E6D] to-[#0B2545] border-b border-amber-400/30 overflow-hidden">
            <div className="inline-flex items-center gap-1.5 bg-[#F2B134]/20 text-[#F2B134] font-black text-xs px-3.5 py-1 rounded-full border border-[#F2B134]/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-[#F2B134]" />
              <span>SKY PREP PREMIER UPGRADE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'en' ? 'Unlock Full Premier Lifetime Access' : 'ሙሉ የፕሪሚየም ፈተናዎችንና ቃለ-መጠይቆችን ይክፈቱ'}
            </h1>
            <p className="text-xs text-blue-200 mt-1 max-w-md mx-auto font-medium leading-relaxed">
              {lang === 'en'
                ? 'We only accept Telebirr. Follow the simple steps below to activate instant access.'
                : 'ክፍያ የምንቀበለው በቴሌብር ብቻ ነው። ከታች ያሉትን ቀላል ቅደም ተከተሎች በመከተል ፈጣን ፈቃድ ያግኙ።'}
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">

            {/* Official Telebirr Payment Box */}
            <div className="bg-gradient-to-br from-blue-50 via-slate-50 to-amber-50/40 rounded-3xl p-5 sm:p-6 border-2 border-blue-200/90 shadow-sm space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#2E86FF] text-white flex items-center justify-center font-black text-sm shadow-md">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Accepted Payment Method
                    </span>
                    <span className="text-sm font-black text-[#0B2545]">
                      Telebirr Direct Transfer
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
                    One-Time Lifetime
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    {PRICE_ETB} ETB
                  </div>
                </div>
              </div>

              {/* Recipient Details Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                
                {/* Phone Card with 1-click copy */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Send Money To (Telebirr):</span>
                    <span className="text-base font-black font-mono text-slate-900">{TELEBIRR_NUMBER}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className="p-2 bg-blue-50 hover:bg-blue-100 text-[#2E86FF] rounded-xl transition-all flex items-center gap-1 text-xs font-bold"
                    title="Copy Phone Number"
                  >
                    {copiedNumber ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Receiver Name Card with 1-click copy */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Receiver Name:</span>
                    <span className="text-base font-black text-slate-900">{TELEBIRR_NAME}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyName}
                    className="p-2 bg-blue-50 hover:bg-blue-100 text-[#2E86FF] rounded-xl transition-all flex items-center gap-1 text-xs font-bold"
                    title="Copy Receiver Name"
                  >
                    {copiedName ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>

            {/* 3 Easy Steps Guide */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                {lang === 'en' ? 'How to complete payment in 3 steps:' : 'ክፍያውን በ 3 ቀላል ቅደም ተከተሎች ይፈጽሙ፡'}
              </h3>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#0B2545] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    1
                  </div>
                  <p>
                    {lang === 'en' ? (
                      <>
                        Open the <strong>Telebirr App</strong> or dial <code className="bg-white px-1 py-0.5 rounded font-mono font-bold">*127#</code>. Choose <strong>Send Money</strong> and transfer <strong>{PRICE_ETB} ETB</strong> to <strong>{TELEBIRR_NUMBER}</strong> (<strong>{TELEBIRR_NAME}</strong>).
                      </>
                    ) : (
                      <>
                        የ <strong>ቴሌብር መተግበሪያን</strong> ይክፈቱ ወይም በስልክዎ <code className="bg-white px-1 py-0.5 rounded font-mono font-bold">*127#</code> ይደውሉ። <strong>{PRICE_ETB} ብር</strong> ወደ <strong>{TELEBIRR_NUMBER}</strong> (<strong>{TELEBIRR_NAME}</strong>) ያስተላልፉ።
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#0B2545] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    2
                  </div>
                  <p>
                    {lang === 'en' ? (
                      <>
                        After completing the transfer, copy the <strong>Transaction ID</strong> (Receipt No.) from your Telebirr SMS confirmation (e.g. <code className="bg-white px-1.5 py-0.5 rounded font-mono text-slate-900 font-bold">CL9820194</code>).
                      </>
                    ) : (
                      <>
                        ክፍያውን እንደፈጸሙ ከቴሌብር የደረስዎትን አጭር የጽሁፍ መልዕክት (SMS) ላይ የሚገኘውን <strong>የግብይት ቁጥር (Transaction ID)</strong> ኮፒ ያድርጉ።
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#0B2545] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    3
                  </div>
                  <p>
                    {lang === 'en' ? (
                      <>
                        Paste the Transaction ID in the verification field below and click <strong>"Verify & Activate Premier"</strong> for instant automated approval.
                      </>
                    ) : (
                      <>
                        የግብይት ቁጥሩን ከታች ባለው ሳጥን ውስጥ ያስገቡና <strong>"ክፍያውን አረጋግጥ"</strong> የሚለውን ይጫኑ።
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Smart Verification Form */}
            <form onSubmit={handleVerify} className="bg-white rounded-2xl border-2 border-amber-400/40 p-5 sm:p-6 space-y-4 shadow-md">
              
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                  {lang === 'en' ? 'Telebirr Transaction ID / Receipt Number' : 'የቴሌብር የግብይት ቁጥር (Transaction ID)'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g. CL89218201 or https://transactioninfo.ethiotelecom.et/receipt/..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm font-mono font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2E86FF] focus:border-transparent transition-all"
                    disabled={isVerifying}
                  />
                  <div className="absolute right-3 top-3 text-slate-400">
                    <Shield className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Optional SMS Paste Helper */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setShowSmsInput(!showSmsInput)}
                  className="text-[11px] font-bold text-[#2E86FF] hover:underline flex items-center gap-1"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>
                    {showSmsInput
                      ? (lang === 'en' ? 'Hide SMS paste box' : 'የSMS ሳጥኑን ደብቅ')
                      : (lang === 'en' ? '+ Or paste entire Telebirr SMS text' : '+ ወይም ሙሉውን የቴሌብር SMS እዚህ ይለጥፉ')}
                  </span>
                </button>

                {showSmsInput && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 animate-in fade-in duration-150">
                    <span className="text-[10px] font-bold text-slate-500 block">
                      Paste confirmation SMS from Telebirr:
                    </span>
                    <textarea
                      rows={2}
                      value={smsText}
                      onChange={(e) => handleSmsPaste(e.target.value)}
                      placeholder="e.g. Dear Customer, you have transferred ETB 99.00 to Biniyam Haile (0920017478)..."
                      className="w-full text-xs font-mono bg-white p-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs animate-in shake">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">{errorMessage}</p>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-emerald-800 text-xs animate-in zoom-in-95">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">{successMessage}</p>
                    {verifiedDetails && (
                      <p className="text-[11px] text-emerald-700">
                        Transaction: <strong className="font-mono">{verifiedDetails.txId}</strong> • Amount: {verifiedDetails.amount}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-[#F2B134] hover:bg-amber-500 text-slate-950 font-black text-sm py-4 px-6 rounded-2xl shadow-xl gold-glow transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 cursor-pointer min-h-[48px]"
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>{lang === 'en' ? 'Verifying Receipt with Telebirr...' : 'ከቴሌብር ጋር በማረጋገጥ ላይ...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    <span>{lang === 'en' ? 'Verify & Activate Premier (99 ETB)' : 'ክፍያውን አረጋግጥና ፕሪሚየምን ክፈት (99 ብር)'}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>Instant automated receipt verification via Ethio Telecom gateway.</span>
              </div>

            </form>

            {/* Telegram Support Assistant */}
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-black text-[#0B2545]">
                    {lang === 'en' ? 'Need Help or Manual Assistance?' : 'እርዳታ ወይም ተጨማሪ መረጃ ይፈልጋሉ?'}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {lang === 'en'
                      ? 'Our aviation technical desk is available on Telegram to verify transactions or answer questions:'
                      : 'የቴክኒክ ቡድናችንን በቴሌግራም በማናገር ፈጣን እርዳታ ማግኘት ይችላሉ፡'}
                  </p>
                </div>
              </div>

              <a
                href="https://t.me/skywardsupports"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#2E86FF] hover:bg-[#1b72e8] text-white p-3.5 rounded-xl font-black text-xs flex items-center justify-between shadow-md shadow-blue-500/20 transition-all active:scale-95 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
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

            {/* Comparison Highlights */}
            <div className="border-t border-slate-200 pt-5 space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                {lang === 'en' ? 'What Premier Unlocks for You' : 'ፕሪሚየም የሚያካትታቸው ጥቅሞች'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlimited Retakes on all exams</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full 25 STAR interview model answers</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Audio & AI Voice simulation</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official Verified Ready Certificate</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
