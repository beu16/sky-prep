import React from 'react';
import { UserProfile, ExamAttempt, AviationRole, Language } from '../types';
import { TRANSLATION } from '../data/translations';
import { Shield, Sparkles, BookOpen, Users, Mic, Award, Crown, ArrowRight, Play, CheckCircle2, Layers, ChevronRight, TrendingUp } from 'lucide-react';

interface HomeScreenProps {
  user: UserProfile;
  attempts: ExamAttempt[];
  selectedRole: AviationRole;
  setSelectedRole: (role: AviationRole) => void;
  lang: Language;
  onStartExam: (category: 'English' | 'Numerical Reasoning' | 'Verbal Reasoning' | 'General Knowledge') => void;
  onOpenGD: () => void;
  onOpenInterview: () => void;
  onOpenProgress: () => void;
  onOpenPaywall: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  attempts,
  selectedRole,
  setSelectedRole,
  lang,
  onStartExam,
  onOpenGD,
  onOpenInterview,
  onOpenProgress,
  onOpenPaywall,
}) => {
  const t = TRANSLATION[lang];
  const isPaid = user.is_paid;

  // Calculate overall readiness percentage based on attempts
  const totalCompleted = attempts.length;
  const avgScore = totalCompleted > 0
    ? Math.round(attempts.reduce((acc, curr) => acc + (curr.score / curr.total_questions) * 100, 0) / totalCompleted)
    : 0;
  
  const readinessPercentage = Math.min(100, totalCompleted === 0 ? 0 : Math.max(25, avgScore));

  const displayName = user.full_name || 'Candidate';

  return (
    <div className="max-w-xl mx-auto px-4 py-5 space-y-6 pb-28">
      
      {/* Top Greeting */}
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-[#0B2545] tracking-tight">
          Welcome back, {displayName}!
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Let's get you hired-ready.
        </p>
      </div>

      {/* Premium Upgrade Card / Premium Member Banner */}
      {!isPaid ? (
        <div className="bg-[#0B2545] text-white rounded-3xl p-5 shadow-xl border border-slate-800 space-y-4 relative overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2B134]/20 text-[#F2B134] flex items-center justify-center">
              <Crown className="w-5 h-5 fill-[#F2B134]" />
            </div>
            <h2 className="text-base font-black text-white">
              Unlock Full Access
            </h2>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Unlimited practice exams, full interview question bank, STAR model answer frameworks, and score tracking.
          </p>

          <div className="pt-1">
            <button
              onClick={onOpenPaywall}
              className="w-full bg-[#F2B134] hover:bg-amber-400 text-[#0B2545] font-black text-sm py-3.5 px-6 rounded-2xl shadow-lg gold-glow transition-all active:scale-95 flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Sparkles className="w-4 h-4 fill-[#0B2545]" />
              <span>Unlock for 99 ETB</span>
            </button>

            <p className="text-[10px] text-center text-slate-400 font-medium mt-2">
              One-time payment • Lifetime access
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[#0B2545] text-white rounded-3xl p-5 shadow-xl border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F2B134] text-[#0B2545] flex items-center justify-center shadow">
              <Crown className="w-6 h-6 fill-[#0B2545]" />
            </div>
            <div>
              <span className="text-xs font-black text-[#F2B134] uppercase tracking-wider block">
                PREMIUM UNLOCKED
              </span>
              <p className="text-xs text-slate-300">Unlimited exams & full interview bank active.</p>
            </div>
          </div>
        </div>
      )}

      {/* Your Progress Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-[#0B2545] tracking-tight">
            Your Progress
          </h3>

          <button
            onClick={onOpenProgress}
            className="text-xs font-extrabold text-[#2E86FF] hover:underline flex items-center gap-0.5"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {/* Readiness Circle Badge */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#2E86FF]"
                strokeDasharray={`${readinessPercentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-black text-[#0B2545]">
              {readinessPercentage}%
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-black text-[#0B2545]">
              Overall Readiness
            </h4>
            <p className="text-[11px] text-slate-500">
              {totalCompleted > 0 
                ? `Completed ${totalCompleted} practice exams. Keep practicing to reach 100%.`
                : 'Complete your first practice exam to calculate your readiness score.'}
            </p>
          </div>
        </div>
      </div>

      {/* Featured Aviation Career Banner Card */}
      <div className="relative rounded-3xl p-5 text-white shadow-xl overflow-hidden border border-slate-800">
        <img
          src="/src/assets/images/aviation_cockpit_1786443092393.jpg"
          alt="Aviation Flight Deck"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-900/60" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/30 text-blue-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-blue-400/30">
            <Sparkles className="w-3 h-3 fill-blue-300" />
            <span>GLOBAL AIRLINE ASSESSMENTS</span>
          </div>
          <h3 className="text-base font-black text-white leading-tight">
            Ethiopian Airlines & Global Carrier Training
          </h3>
          <p className="text-xs text-slate-200 font-medium max-w-sm leading-relaxed">
            Practice written questions, group discussion scenarios & STAR interviews calibrated for airline hiring.
          </p>
        </div>
      </div>

      {/* Career Track Visual Gallery */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
          Aviation Assessment Modules
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* Cabin Crew Track */}
          <div className="relative rounded-2xl overflow-hidden h-32 border border-slate-200/80 shadow-sm group cursor-pointer" onClick={onOpenInterview}>
            <img
              src="/src/assets/images/cabin_crew_team_1786443414204.jpg"
              alt="Cabin Crew"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
              <span className="text-[9px] font-extrabold text-amber-300 uppercase tracking-widest">Cabin Crew</span>
              <h4 className="text-xs font-black text-white">Interview & Grooming</h4>
            </div>
          </div>

          {/* Pilot Cadet Track */}
          <div className="relative rounded-2xl overflow-hidden h-32 border border-slate-200/80 shadow-sm group cursor-pointer" onClick={() => onStartExam('General Knowledge')}>
            <img
              src="/src/assets/images/pilot_cadet_1786443364864.jpg"
              alt="Pilot Cadet"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
              <span className="text-[9px] font-extrabold text-blue-300 uppercase tracking-widest">Pilot Cadet</span>
              <h4 className="text-xs font-black text-white">General Knowledge</h4>
            </div>
          </div>

          {/* Flight Service Track */}
          <div className="relative rounded-2xl overflow-hidden h-32 border border-slate-200/80 shadow-sm group cursor-pointer" onClick={onOpenGD}>
            <img
              src="/src/assets/images/cabin_crew_service_1786443350670.jpg"
              alt="Cabin Crew Service"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
              <span className="text-[9px] font-extrabold text-emerald-300 uppercase tracking-widest">Group Discussion</span>
              <h4 className="text-xs font-black text-white">Team Communication</h4>
            </div>
          </div>

          {/* Flight Simulator & Tech Track */}
          <div className="relative rounded-2xl overflow-hidden h-32 border border-slate-200/80 shadow-sm group cursor-pointer" onClick={() => onStartExam('Numerical Reasoning')}>
            <img
              src="/src/assets/images/flight_simulator_1786443425493.jpg"
              alt="Flight Simulator"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
              <span className="text-[9px] font-extrabold text-purple-300 uppercase tracking-widest">Reasoning & Tech</span>
              <h4 className="text-xs font-black text-white">Aviation Calculations</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 gap-3">
          
          {/* Start Practice Exam */}
          <div
            onClick={() => onStartExam('English')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex items-center justify-between cursor-pointer hover:border-blue-300 transition-all active:scale-[0.99] group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E86FF] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#0B2545]">
                  Start Practice Exam
                </h4>
                <p className="text-[11px] text-slate-500">
                  Timed multiple-choice tests
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 text-[#2E86FF] transition-transform" />
          </div>

          {/* Interview Practice */}
          <div
            onClick={onOpenInterview}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex items-center justify-between cursor-pointer hover:border-purple-300 transition-all active:scale-[0.99] group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#0B2545]">
                  Interview Practice
                </h4>
                <p className="text-[11px] text-slate-500">
                  25+ questions with STAR answers
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 text-purple-600 transition-transform" />
          </div>

          {/* Group Discussion */}
          <div
            onClick={onOpenGD}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-all active:scale-[0.99] group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1FAA59] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#0B2545]">
                  Group Discussion Guide
                </h4>
                <p className="text-[11px] text-slate-500">
                  15 aviation group scenarios (Free)
                </p>
              </div>
            </div>
            <span className="text-[10px] font-black text-[#1FAA59] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              FREE
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};
