import React from 'react';
import { UserProfile, ExamAttempt, AviationRole, Language, TRAINING_SCHOOLS_DATA } from '../types';
import { TRANSLATION } from '../data/translations';
import { Shield, Sparkles, BookOpen, Users, Mic, Award, Crown, ArrowRight, Play, CheckCircle2, Layers, ChevronRight, GraduationCap, Briefcase, Plane } from 'lucide-react';

interface HomeScreenProps {
  user: UserProfile;
  attempts: ExamAttempt[];
  selectedRole: AviationRole;
  setSelectedRole: (role: AviationRole) => void;
  lang: Language;
  onStartExam: (category: any) => void;
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
  const schoolName = user.training_school || user.department || 'CABIN CREW TRAINING SCHOOL';
  const programName = user.training_program || user.field || 'INITIAL CABIN CREW (FLIGHT ATTENDANT)';
  const currentStage = user.stage || 'Written Assessment';

  // Get matching image for department banner
  const getBannerImage = () => {
    if (schoolName.includes('PILOT')) {
      return '/src/assets/images/pilot_cadet_1786443364864.jpg';
    }
    if (schoolName.includes('MAINTENANCE') || schoolName.includes('AMT') || schoolName.includes('MECHANIC')) {
      return '/src/assets/images/maintenance_hangar_1786528421884.jpg';
    }
    if (schoolName.includes('COMMERCIAL') || schoolName.includes('GROUND')) {
      return '/src/assets/images/ground_services_ramp_1786528434771.jpg';
    }
    return '/src/assets/images/cabin_crew_safety_1786528398784.jpg';
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-6 pb-28 animate-fadeIn">
      
      {/* Top Candidate Profile Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                ACTIVE CANDIDATE PORTAL
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0B2545] tracking-tight">
              Welcome, {displayName}!
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Stage: <strong className="text-blue-700">{currentStage}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isPaid ? (
              <div className="bg-[#F2B134]/20 border border-[#F2B134]/40 text-[#0B2545] px-3 py-1.5 rounded-2xl flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span className="text-xs font-black">PREMIUM ACTIVE</span>
              </div>
            ) : (
              <button
                onClick={onOpenPaywall}
                className="bg-[#0B2545] hover:bg-[#07192F] text-white text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Unlock All (99 ETB)</span>
              </button>
            )}
          </div>
        </div>

        {/* Assigned Training School & Program Badges */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 flex items-start gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black text-blue-900/60 uppercase tracking-wider block">
                Training School
              </span>
              <p className="text-xs font-black text-blue-950 truncate">
                {schoolName}
              </p>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-3 flex items-start gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black text-amber-900/60 uppercase tracking-wider block">
                Course / Field
              </span>
              <p className="text-xs font-black text-amber-950 truncate">
                {programName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Department Assessment Banner */}
      <div className="relative rounded-3xl p-6 text-white shadow-xl overflow-hidden border border-slate-800">
        <img
          src={getBannerImage()}
          alt={schoolName}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/60" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#F2B134]/25 text-[#F2B134] text-[10px] font-black px-3 py-1 rounded-full border border-[#F2B134]/40">
            <Plane className="w-3 h-3 fill-[#F2B134]" />
            <span>DEPARTMENT TARGETED EXAMS</span>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
            {schoolName}
          </h2>

          <p className="text-xs text-slate-200 font-medium max-w-md leading-relaxed">
            Practice questions, technical systems, and STAR behavioral interview scenarios designed specifically for <strong>{programName}</strong> candidates.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => onStartExam('Technical Aptitude')}
              className="bg-[#2E86FF] hover:bg-blue-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Start Department Exam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenInterview}
              className="bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-sm flex items-center gap-1.5 transition-all"
            >
              <Mic className="w-3.5 h-3.5 text-amber-400" />
              <span>STAR Interviews</span>
            </button>
          </div>
        </div>
      </div>

      {/* Candidate Readiness Score Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-[#0B2545] tracking-tight">
            Your Assessment Readiness
          </h3>

          <button
            onClick={onOpenProgress}
            className="text-xs font-extrabold text-[#2E86FF] hover:underline flex items-center gap-0.5"
          >
            <span>View detailed analytics</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
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
              Hiring Probability Metric
            </h4>
            <p className="text-[11px] text-slate-500">
              {totalCompleted > 0 
                ? `Completed ${totalCompleted} assessment tests. High-scoring candidates pass airline screening.`
                : 'Take your first written assessment to establish your baseline candidate score.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Preparation Modules Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
          Preparation Modules
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Module 1: Department Written Exams */}
          <div
            onClick={() => onStartExam('Technical Aptitude')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between cursor-pointer hover:border-blue-300 transition-all active:scale-[0.99] group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E86FF] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#0B2545] group-hover:text-blue-600 transition-colors">
                Written Exam Bank
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Timed multiple-choice tests calibrated for {user.selected_role || 'your department'}.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-blue-600 gap-1 pt-1">
              <span>Start Exam</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 2: STAR Interview Questions */}
          <div
            onClick={onOpenInterview}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between cursor-pointer hover:border-purple-300 transition-all active:scale-[0.99] group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#0B2545] group-hover:text-purple-600 transition-colors">
                Interview Prep
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                STAR methodology model answers & audio recording simulator.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-purple-600 gap-1 pt-1">
              <span>Practice Q&A</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 3: Group Discussion (GD) */}
          <div
            onClick={onOpenGD}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between cursor-pointer hover:border-emerald-300 transition-all active:scale-[0.99] group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1FAA59] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#0B2545] group-hover:text-emerald-600 transition-colors">
                Group Discussion
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Real airline GD scenarios with Do's, Don'ts & Evaluator criteria.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-600 gap-1 pt-1">
              <span>Explore Topics</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
