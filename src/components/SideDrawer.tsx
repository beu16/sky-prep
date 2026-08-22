import React from 'react';
import { UserProfile, Language, TrainingSchool } from '../types';
import { 
  X, 
  Home, 
  BookOpen, 
  Mic, 
  Users, 
  Award, 
  Crown, 
  ShieldCheck, 
  Plane,
  Smartphone,
  Globe
} from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  user: UserProfile | null;
  lang: Language;
  onClose: () => void;
  onNavigateHome: () => void;
  onStartExam: () => void;
  onOpenInterview: () => void;
  onOpenGroupDiscussion: () => void;
  onOpenPaywall: () => void;
  onViewCertificate: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  user,
  lang,
  onClose,
  onNavigateHome,
  onStartExam,
  onOpenInterview,
  onOpenGroupDiscussion,
  onOpenPaywall,
  onViewCertificate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xs bg-[#07192F] border-l border-slate-800 h-full p-6 flex flex-col justify-between overflow-y-auto">
        {/* Drawer Top */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                <Plane className="w-4 h-4 -rotate-45" />
              </div>
              <span className="font-black text-white text-base">SKY PREP</span>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Candidate Status Mini Card */}
          {user && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400">
                Candidate Profile
              </span>
              <p className="text-sm font-bold text-white truncate">{user.name}</p>
              <p className="text-[11px] text-slate-400 font-mono">{user.candidateNumber}</p>
            </div>
          )}

          {/* Navigation Links */}
          <div className="space-y-1.5">
            <button
              onClick={() => { onNavigateHome(); onClose(); }}
              type="button"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 text-xs font-bold text-left transition"
            >
              <Home className="w-4 h-4 text-amber-400" />
              <span>Dashboard Home</span>
            </button>

            <button
              onClick={() => { onStartExam(); onClose(); }}
              type="button"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 text-xs font-bold text-left transition"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Timed Mock Exam</span>
            </button>

            <button
              onClick={() => { onOpenInterview(); onClose(); }}
              type="button"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 text-xs font-bold text-left transition"
            >
              <Mic className="w-4 h-4 text-emerald-400" />
              <span>STAR Behavioral Interview</span>
            </button>

            <button
              onClick={() => { onOpenGroupDiscussion(); onClose(); }}
              type="button"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 text-xs font-bold text-left transition"
            >
              <Users className="w-4 h-4 text-purple-400" />
              <span>Group Discussion Guide</span>
            </button>

            {user && (
              <button
                onClick={() => { onViewCertificate(); onClose(); }}
                type="button"
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 text-xs font-bold text-left transition"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Readiness Certificate</span>
              </button>
            )}

            <button
              onClick={() => { onOpenPaywall(); onClose(); }}
              type="button"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold text-left border border-amber-500/20 transition"
            >
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Telebirr Pass (99 ETB)</span>
            </button>
          </div>
        </div>

        {/* Drawer Bottom */}
        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
          <p className="font-bold text-slate-300">Telebirr Support:</p>
          <p className="font-mono text-amber-400 font-bold">0920017478 (Biniyam Haile)</p>
          <p className="text-[10px] text-slate-400 pt-2">Sky Prep Aviation v1.0</p>
        </div>
      </div>
    </div>
  );
};
