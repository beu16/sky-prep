import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { TRANSLATION } from '../data/translations';
import { User, Shield, CreditCard, Award, HelpCircle, Info, LogOut, Settings, ChevronRight, Sparkles, CheckCircle2, Copy } from 'lucide-react';

interface ProfileScreenProps {
  user: UserProfile;
  lang: Language;
  onOpenPaywall: () => void;
  onOpenCertificate: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  lang,
  onOpenPaywall,
  onOpenCertificate,
  onLogout,
}) => {
  const t = TRANSLATION[lang];
  const isPaid = user.is_paid;
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(user.phone_number);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6 pb-28">
      
      {/* Title */}
      <h1 className="text-2xl font-black text-[#0B2545] tracking-tight">
        Profile
      </h1>

      {/* User Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 text-center space-y-4 relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-slate-900 text-white mx-auto flex items-center justify-center font-black text-2xl shadow-lg border-4 border-slate-100 relative">
          {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'Y'}
          {isPaid && (
            <div className="absolute -bottom-1 -right-1 bg-[#F2B134] text-[#0B2545] p-1.5 rounded-full shadow">
              <Sparkles className="w-3.5 h-3.5 fill-[#0B2545]" />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-black text-[#0B2545]">
            {user.full_name || 'Yared Bekele'}
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
            <span>{user.phone_number || '+251 91 123 4567'}</span>
            <button
              onClick={handleCopyPhone}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              title="Copy phone"
            >
              <Copy className="w-3 h-3" />
            </button>
            {copiedPhone && <span className="text-[10px] text-emerald-600 font-sans">Copied!</span>}
          </div>
        </div>

        {/* Candidate Info Grid */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            <span>Candidate Record (Supabase Synced)</span>
            <button onClick={onOpenPaywall} className="text-blue-600 hover:underline">Edit Info</button>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 text-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Department</span>
              <span className="font-bold text-slate-900">{user.department || user.selected_role || 'Cabin Crew'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Target Stage</span>
              <span className="font-bold text-slate-900">{user.stage || 'Initial Screening'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Phone</span>
              <span className="font-mono font-medium text-slate-900">{user.phone_number || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Email</span>
              <span className="font-medium text-slate-900">{user.email || 'Not provided'}</span>
            </div>
          </div>
        </div>

        {/* Tier Status Badge */}
        <div>
          {isPaid ? (
            <div className="inline-flex items-center gap-1.5 bg-[#F2B134]/20 text-[#0B2545] border border-[#F2B134]/50 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F2B134] fill-[#F2B134]" />
              <span>PREMIUM</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2">
              <span className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                FREE TIER
              </span>
              <button
                onClick={onOpenPaywall}
                className="bg-[#F2B134] hover:bg-amber-400 text-[#0B2545] font-black text-xs px-3.5 py-1.5 rounded-full gold-glow transition-all active:scale-95"
              >
                Upgrade (99 ETB)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pilot Cadet & Aviation Readiness Profile Banner */}
      <div className="relative rounded-3xl p-5 text-white shadow-lg overflow-hidden border border-slate-800">
        <img
          src="/src/assets/images/pilot_cadet_1786443364864.jpg"
          alt="Airline Pilot Cadet"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/30 text-blue-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-blue-400/30">
            <Sparkles className="w-3 h-3 fill-blue-300" />
            <span>GLOBAL AVIATION CAREER PROFILE</span>
          </div>
          <h3 className="text-sm font-black text-white leading-tight">
            Target Airline: Ethiopian Airlines & Star Alliance
          </h3>
          <p className="text-xs text-slate-200 font-medium leading-relaxed">
            Your candidate assessment record is calibrated against standard aviation panel benchmarks.
          </p>
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden shadow-sm">
        
        {/* Account Settings */}
        <button
          onClick={() => setShowSettingsModal(true)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group min-h-[52px]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2E86FF] flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <span className="text-xs font-extrabold text-[#0B2545]">
              Account Settings
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Payment & Subscription */}
        <button
          onClick={onOpenPaywall}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group min-h-[52px]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#F2B134] flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-[#0B2545]">
                Payment & Subscription
              </span>
              <p className="text-[10px] text-slate-400">
                {isPaid ? 'Lifetime Premium Active' : 'Upgrade to Premium for 99 ETB'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* My Certificate */}
        <button
          onClick={onOpenCertificate}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group min-h-[52px]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1FAA59] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#0B2545]">
                My Certificate / Verified Ready
              </span>
              <span className="text-[9px] font-black bg-emerald-100 text-[#1FAA59] px-2 py-0.5 rounded-full">
                New
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Help & Support */}
        <button
          onClick={() => setShowHelpModal(true)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group min-h-[52px]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-extrabold text-[#0B2545]">
              Help & Support
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* About Sky Prep */}
        <button
          onClick={() => setShowAboutModal(true)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group min-h-[52px]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <span className="text-xs font-extrabold text-[#0B2545]">
              About Sky Prep
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Log Out */}
        <button
          onClick={onLogout}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-rose-50 transition-colors group min-h-[52px]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#E4483E] flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="text-xs font-extrabold text-[#E4483E]">
              Log Out
            </span>
          </div>
        </button>

      </div>

      {/* Account Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-black text-[#0B2545]">Account Settings</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Phone Number</span>
                <span className="font-bold text-slate-800">{user.phone_number}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Full Name</span>
                <span className="font-bold text-slate-800">{user.full_name || 'Candidate'}</span>
              </div>
            </div>
            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full bg-[#0B2545] text-white font-bold text-xs py-3 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-black text-[#0B2545]">Help & Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If you have payment issues or questions regarding Ethiopian Airlines recruitment preparation, contact our Telegram support desk at <strong className="text-[#2E86FF]">@SkyPrepSupport</strong>.
            </p>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full bg-[#0B2545] text-white font-bold text-xs py-3 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-black text-[#0B2545]">About Sky Prep</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Sky Prep — Get hired-ready.</strong>
              <br /><br />
              Professional airline job assessment prep suite for Cabin Crew, Flight Cadets, Aircraft Maintenance Technicians, and Ground Operations.
            </p>
            <button
              onClick={() => setShowAboutModal(false)}
              className="w-full bg-[#0B2545] text-white font-bold text-xs py-3 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
