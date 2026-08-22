import React from 'react';
import { UserProfile, Language, TrainingSchool } from '../types';
import { TRANSLATION } from '../data/translations';
import { IMAGES } from '../assets/images';
import { AviationImage } from './AviationImage';
import { 
  Play, 
  BookOpen, 
  Mic, 
  Users, 
  Award, 
  Crown, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Flame,
  ChevronRight,
  Plane,
  Wrench,
  Briefcase
} from 'lucide-react';

interface HomeScreenProps {
  user: UserProfile;
  lang: Language;
  onStartExam: () => void;
  onOpenPractice: () => void;
  onOpenInterview: () => void;
  onOpenGroupDiscussion: () => void;
  onOpenPaywall: () => void;
  onSelectSchool: (school: TrainingSchool) => void;
  onViewCertificate: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  lang,
  onStartExam,
  onOpenPractice,
  onOpenInterview,
  onOpenGroupDiscussion,
  onOpenPaywall,
  onSelectSchool,
  onViewCertificate
}) => {
  const t = TRANSLATION[lang];

  const getSchoolDetails = () => {
    switch (user.school) {
      case 'cabin_crew':
        return { name: t.cabinCrew, image: IMAGES.cabinCrewSvc, badge: 'In-Flight Cabin Crew' };
      case 'pilot':
        return { name: t.pilotAcademy, image: IMAGES.pilotCockpit, badge: 'Commercial Flight Deck' };
      case 'amt':
        return { name: t.amtTitle, image: IMAGES.amtMaintenance, badge: 'Aviation Engineering' };
      case 'commercial':
        return { name: t.commercialTitle, image: IMAGES.groundOps, badge: 'Airport Ground Operations' };
    }
  };

  const currentSchool = getSchoolDetails();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10 pb-20">
      {/* Candidate Hero Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B2545] to-[#133E6D] p-6 sm:p-10 border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <AviationImage
            src={currentSchool.image}
            alt="Candidate Banner"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-black uppercase tracking-wider">
                {currentSchool.badge}
              </span>
              {user.isPremier && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold flex items-center gap-1">
                  <Crown className="w-3 h-3 text-amber-400" />
                  PREMIER CANDIDATE
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Welcome Back, {user.name}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Target Assessment: <strong>{user.targetAirline}</strong> • ID: <span className="font-mono">{user.candidateNumber}</span>
            </p>

            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold bg-slate-950/40 px-3 py-1.5 rounded-xl border border-white/10">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>{user.streakDays} Day Prep Streak</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-blue-300 font-bold bg-slate-950/40 px-3 py-1.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Avg Score: {user.averageScore || 85}%</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onStartExam}
              type="button"
              className="px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t.mockExam}</span>
            </button>

            {user.completedExams > 0 && (
              <button
                onClick={onViewCertificate}
                type="button"
                className="px-5 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>View Certificate</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Core Preparation Modules */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>Candidate Training Modules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module 1: Timed Mock Exam */}
          <div
            onClick={onStartExam}
            className="group bg-slate-900/80 rounded-3xl p-6 border border-slate-800 hover:border-amber-500 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white leading-tight">
                {t.mockExam}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Full-length timed assessment mimicking real airline hiring criteria with immediate score breakdown and feedback.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-amber-400 pt-3 border-t border-slate-800">
              <span>Start Assessment</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 2: STAR Interview Simulator */}
          <div
            onClick={onOpenInterview}
            className="group bg-slate-900/80 rounded-3xl p-6 border border-slate-800 hover:border-blue-500 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white leading-tight">
                {t.starInterview}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Model answers formulated with Situation-Task-Action-Result structure, AI audio playback, and interviewer scoring rubrics.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-blue-400 pt-3 border-t border-slate-800">
              <span>Practice Questions</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 3: Group Discussion Mastery */}
          <div
            onClick={onOpenGroupDiscussion}
            className="group bg-slate-900/80 rounded-3xl p-6 border border-slate-800 hover:border-emerald-500 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white leading-tight">
                {t.groupDiscussion}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Learn winning consensus tactics, diplomatic phrases, overbooking case studies, and evaluator red flags to avoid.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400 pt-3 border-t border-slate-800">
              <span>View Strategies</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Switch Career Department Row */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-black text-white tracking-tight">
          Switch Specialized Track
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => onSelectSchool('cabin_crew')}
            type="button"
            className={`p-4 rounded-2xl border text-left transition flex flex-col gap-2 ${
              user.school === 'cabin_crew'
                ? 'bg-blue-600/20 border-blue-500 text-white'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-black">Cabin Crew</span>
          </button>

          <button
            onClick={() => onSelectSchool('pilot')}
            type="button"
            className={`p-4 rounded-2xl border text-left transition flex flex-col gap-2 ${
              user.school === 'pilot'
                ? 'bg-sky-600/20 border-sky-500 text-white'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Plane className="w-5 h-5 text-sky-400" />
            <span className="text-xs font-black">Commercial Pilot</span>
          </button>

          <button
            onClick={() => onSelectSchool('amt')}
            type="button"
            className={`p-4 rounded-2xl border text-left transition flex flex-col gap-2 ${
              user.school === 'amt'
                ? 'bg-amber-600/20 border-amber-500 text-white'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Wrench className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-black">Aircraft Maintenance (AMT)</span>
          </button>

          <button
            onClick={() => onSelectSchool('commercial')}
            type="button"
            className={`p-4 rounded-2xl border text-left transition flex flex-col gap-2 ${
              user.school === 'commercial'
                ? 'bg-emerald-600/20 border-emerald-500 text-white'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-black">Ground Services</span>
          </button>
        </div>
      </div>
    </div>
  );
};
