import React, { useState, useEffect } from 'react';
import { UserProfile, PaymentSubmission, Language } from '../types';
import { createPaymentSubmission, getPaymentSubmissions, updatePaymentSubmissionStatus, getStoredConfig, saveUserProfile } from '../services/supabase';
import { Shield, Copy, Check, Upload, Loader2, CheckCircle2, AlertCircle, ArrowLeft, RefreshCw, Zap, User, Building, Phone, Layers, Mail, Edit3, ArrowRight } from 'lucide-react';
import { TRANSLATION } from '../data/translations';

interface PaymentFlowScreenProps {
  user: UserProfile;
  lang?: Language;
  onPaymentSuccess: () => void;
  onBack: () => void;
  onOpenAdmin: () => void;
  onUserUpdated?: (updatedUser: UserProfile) => void;
}

export const PaymentFlowScreen: React.FC<PaymentFlowScreenProps> = ({
  user,
  lang = 'en',
  onPaymentSuccess,
  onBack,
  onOpenAdmin,
  onUserUpdated,
}) => {
  const t = TRANSLATION[lang];
  const config = getStoredConfig();
  const merchantNumber = config.merchantNumber || '0911234567';

  // Candidate Details Form State
  const [fullName, setFullName] = useState(user.full_name || '');
  const [department, setDepartment] = useState(user.department || user.selected_role || 'Cabin Crew');
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || '');
  const [stage, setStage] = useState(user.stage || 'Initial Screening');
  const [email, setEmail] = useState(user.email || '');

  // Flow State: step 1 = Candidate Registration Form, step 2 = Payment Transfer & Receipt Upload
  const [activeStep, setActiveStep] = useState<'form' | 'payment'>('form');

  // Payment Submission State
  const [txId, setTxId] = useState('');
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active submission state
  const [currentSubmission, setCurrentSubmission] = useState<PaymentSubmission | null>(null);

  // Check if user already has a pending or verified submission on load
  useEffect(() => {
    const existing = getPaymentSubmissions(user.id);
    if (existing.length > 0) {
      const latest = existing[existing.length - 1];
      if (latest.status === 'pending') {
        setCurrentSubmission(latest);
      } else if (latest.status === 'verified') {
        onPaymentSuccess();
      }
    }
  }, [user.id]);

  // Polling / listening simulation for pending status changes
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (currentSubmission && currentSubmission.status === 'pending') {
      interval = setInterval(() => {
        const all = getPaymentSubmissions(user.id);
        const match = all.find(s => s.id === currentSubmission.id);
        if (match && match.status !== 'pending') {
          setCurrentSubmission(match);
          if (match.status === 'verified') {
            onPaymentSuccess();
          }
        }
      }, 1500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentSubmission, user.id]);

  const handleSaveCandidateInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!department.trim()) {
      setError('Please select or specify your department.');
      return;
    }
    if (!phoneNumber.trim()) {
      setError('Please enter your mobile phone number.');
      return;
    }
    if (!stage.trim()) {
      setError('Please select your target assessment stage.');
      return;
    }

    // Save updated info to user profile and sync to Supabase
    const updatedUser: UserProfile = {
      ...user,
      full_name: fullName.trim(),
      department: department.trim(),
      phone_number: phoneNumber.trim(),
      stage: stage.trim(),
      email: email.trim() || undefined,
    };

    saveUserProfile(updatedUser);
    if (onUserUpdated) onUserUpdated(updatedUser);

    setActiveStep('payment');
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(merchantNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDemoReceiptSample = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 250;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, 400, 250);
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('telebirr', 20, 40);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '14px sans-serif';
      ctx.fillText('Payment Successful', 20, 80);
      ctx.fillText('Amount: 99 ETB', 20, 110);
      ctx.fillText(`Merchant: ${merchantNumber}`, 20, 140);
      ctx.fillText(`TxID: TB${Math.floor(Math.random() * 899999 + 100000)}`, 20, 170);
      ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, 20, 200);
      setReceiptImage(canvas.toDataURL('image/png'));
      if (!txId) setTxId(`TB${Math.floor(Math.random() * 899999 + 100000)}`);
      setError(null);
    }
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txId.trim()) {
      setError('Please enter your Telebirr Transaction ID.');
      return;
    }
    if (!receiptImage) {
      setError('Please upload or generate your Telebirr payment receipt.');
      return;
    }

    setLoading(true);
    setError(null);

    // Save final updated user profile
    const updatedUser: UserProfile = {
      ...user,
      full_name: fullName.trim() || user.full_name,
      department: department.trim() || user.department,
      phone_number: phoneNumber.trim() || user.phone_number,
      stage: stage.trim() || user.stage,
      email: email.trim() || user.email,
    };
    saveUserProfile(updatedUser);

    setTimeout(() => {
      const newSub: PaymentSubmission = {
        id: `sub_${Date.now()}`,
        user_id: user.id,
        telebirr_transaction_id: txId.trim(),
        receipt_image_url: receiptImage,
        amount_claimed: 99,
        status: 'pending',
        submitted_at: new Date().toISOString(),
      };

      const result = createPaymentSubmission(newSub);
      setLoading(false);

      if (!result.success) {
        setError(result.error || 'Duplicate Transaction ID detected. This TxID was already submitted.');
        return;
      }

      setCurrentSubmission(newSub);
    }, 1000);
  };

  const handleSimulateInstantVerify = () => {
    if (currentSubmission) {
      updatePaymentSubmissionStatus(currentSubmission.id, 'verified');
      setCurrentSubmission(prev => prev ? { ...prev, status: 'verified' } : null);
      onPaymentSuccess();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 pb-24 md:pb-12">
      
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={onOpenAdmin}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 underline"
        >
          Admin Verification Console
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Header with Cabin Crew Banner */}
        <div className="relative p-6 text-white text-center space-y-2 overflow-hidden border-b border-amber-400/30">
          <img
            src="/src/assets/images/cabin_crew_service_1786443350670.jpg"
            alt="Cabin Crew Service"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[1px]" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1 bg-amber-500/30 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full border border-amber-500/40 uppercase">
              <Shield className="w-3.5 h-3.5 fill-amber-300" />
              <span>CANDIDATE UNLOCK FORM & TELEBIRR CHECKOUT</span>
            </div>

            <h1 className="text-2xl font-black text-white mt-1">
              Unlock Premier Pass (99 ETB)
            </h1>
            <p className="text-xs text-slate-200 max-w-sm mx-auto font-medium">
              Fill candidate details to sync your account with Supabase & activate lifetime access.
            </p>

            {/* Stepper Indicator */}
            <div className="flex items-center justify-center gap-3 mt-4 pt-2 border-t border-white/10">
              <button
                onClick={() => setActiveStep('form')}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full transition-all ${
                  activeStep === 'form'
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white'
                }`}
              >
                <span>1. Candidate Form</span>
              </button>
              <span className="text-slate-500 text-xs">→</span>
              <button
                onClick={() => setActiveStep('payment')}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full transition-all ${
                  activeStep === 'payment'
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white'
                }`}
              >
                <span>2. 99 ETB Telebirr Payment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">
          
          {currentSubmission && currentSubmission.status === 'pending' ? (
            /* PENDING STATUS SCREEN */
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto animate-spin">
                <RefreshCw className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {t.verifyingPayment}
                </h3>
                <p className="text-xs text-amber-900 mt-1">
                  Transaction ID: <span className="font-mono font-bold">{currentSubmission.telebirr_transaction_id}</span>
                </p>
                <p className="text-[11px] text-amber-800 mt-2">
                  Verification usually takes 1-3 minutes. This screen will auto-refresh when approved.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSimulateInstantVerify}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 px-5 rounded-xl shadow transition-all active:scale-95 flex items-center justify-center gap-1.5 mx-auto"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Simulate Instant Admin Verification</span>
                </button>
              </div>
            </div>
          ) : activeStep === 'form' ? (
            /* STEP 1: CANDIDATE REGISTRATION FORM */
            <form onSubmit={handleSaveCandidateInfo} className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-600" />
                  Candidate Account Information
                </h3>
                <p className="text-[11px] text-amber-800">
                  This information will be attached to your user record in Supabase database.
                </p>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Solomon Alemu Bekele"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-sm text-slate-900 font-semibold min-h-[44px]"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Aviation Department *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-sm text-slate-900 font-semibold min-h-[44px] bg-white"
                  >
                    <option value="Cabin Crew">Cabin Crew / In-flight Services</option>
                    <option value="Pilot / Cadet">Pilot / Flight Operations (Cadet)</option>
                    <option value="Aircraft Maintenance (AMT)">Aircraft Maintenance (AMT / Avionics)</option>
                    <option value="Ground Operations">Ground Operations / Passenger Handling</option>
                    <option value="Customer Service">Customer Service & Airport Check-In</option>
                    <option value="Flight Dispatch">Flight Dispatch & Load Control</option>
                    <option value="Aerospace Engineering">Aerospace Engineering</option>
                  </select>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="0911234567 or +251 9..."
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-sm text-slate-900 font-semibold min-h-[44px]"
                  />
                </div>
              </div>

              {/* Target Stage */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Target Assessment Stage *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-sm text-slate-900 font-semibold min-h-[44px] bg-white"
                  >
                    <option value="Initial Screening">Initial Screening & CV Review</option>
                    <option value="Written Assessment">Written Aptitude & Knowledge Exam</option>
                    <option value="Group Discussion">Group Discussion & Roleplay</option>
                    <option value="Panel Interview">Panel Behavioral Interview (STAR Framework)</option>
                    <option value="Final Selection & Medical">Final Selection & Medical Assessment</option>
                  </select>
                </div>
              </div>

              {/* Email Address (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Email Address</span>
                  <span className="text-[10px] text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="e.g. solomon@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-sm text-slate-900 font-medium min-h-[44px]"
                  />
                </div>
              </div>

              {/* Proceed Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm py-4 px-6 rounded-2xl shadow-xl gold-glow transition-all flex items-center justify-center gap-2 active:scale-95 min-h-[48px]"
                >
                  <span>Save Info & Proceed to Telebirr Payment (99 ETB)</span>
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </button>
              </div>
            </form>
          ) : (
            /* STEP 2: ACTIVE TELEBIRR PAYMENT FORM */
            <form onSubmit={handleSubmitPayment} className="space-y-6">
              
              {/* Candidate Info Summary Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{fullName || 'Candidate'}</span>
                    <span className="bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {department}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Phone: <span className="font-mono font-bold text-slate-800">{phoneNumber}</span> • Stage: <span className="font-bold text-slate-800">{stage}</span>
                    {email && <span> • Email: <span className="font-medium text-slate-800">{email}</span></span>}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStep('form')}
                  className="text-blue-700 hover:text-blue-900 font-bold underline flex items-center gap-1 shrink-0 ml-2"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Step 1: Telebirr Transfer Instructions */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Step 1: Send 99 ETB via Telebirr
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Official Merchant
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      {t.telebirrNumber}
                    </span>
                    <span className="font-mono font-black text-slate-900 text-lg">
                      {merchantNumber}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all shadow min-h-[44px]"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? t.copied : t.copyNumber}</span>
                  </button>
                </div>
              </div>

              {/* Step 2: TxID and Receipt Upload */}
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                  Step 2: Submit Telebirr Transaction ID & Receipt
                </span>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.transactionId} *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TB1849204829"
                    value={txId}
                    onChange={(e) => setTxId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none font-mono text-sm min-h-[44px]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-800">
                      {t.uploadReceipt} *
                    </label>
                    <button
                      type="button"
                      onClick={handleDemoReceiptSample}
                      className="text-xs font-extrabold text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                    >
                      <Zap className="w-3.5 h-3.5 fill-blue-600" />
                      <span>Auto-Generate Sample Receipt</span>
                    </button>
                  </div>

                  {receiptImage ? (
                    <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-sm group">
                      <img src={receiptImage} alt="Receipt preview" className="w-full h-40 object-cover" />
                      <button
                        type="button"
                        onClick={() => setReceiptImage(null)}
                        className="absolute right-2 top-2 bg-slate-900/80 text-white p-1.5 rounded-full text-xs hover:bg-slate-900"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-300 hover:border-blue-600 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-slate-50 min-h-[120px]">
                      <Upload className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-xs font-bold text-slate-700">Click to upload screenshot</span>
                      <span className="text-[11px] text-slate-400">PNG or JPG up to 5MB</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-sm py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 min-h-[48px]"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                  <span>{t.submitPayment}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStep('form')}
                  className="w-full text-xs text-slate-500 hover:text-slate-800 py-1 font-medium text-center"
                >
                  ← Edit Candidate Details
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
