import React from 'react';
import { UserProfile, ExamAttempt, AviationRole, Language, TRAINING_SCHOOLS_DATA } from '../types';
import { TRANSLATION } from '../data/translations';
import { Shield, Sparkles, BookOpen, Users, Mic, Award, Crown, ArrowRight, Play, CheckCircle2, Layers, ChevronRight, GraduationCap, Briefcase, Plane, BarChart3, Clock, CheckCircle, HelpCircle } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { AviationImage } from './AviationImage';

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
      return IMAGES.pilotCockpit;
    }
    if (schoolName.includes('MAINTENANCE') || schoolName.includes('AMT') || schoolName.includes('MECHANIC')) {
      return IMAGES.academyGrad;
    }
    if (schoolName.includes('COMMERCIAL') || schoolName.includes('GROUND')) {
      return IMAGES.terminalWalk;
    }
    return IMAGES.cabinCrewSvc;
  };

  const recentAttempts = [...attempts]
    .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 animate-fadeIn pb-16 w-full max-w-full overflow-x-hidden">
      
      {/* Top Welcome Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                ACTIVE CANDIDATE DASHBOARD
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B2545] tracking-tight">
              Welcome back, {displayName}!
            </h1>
            <p className="text-sm text-slate-600">
              Prepare for your airline recruitment screening with standardized exam simulators, audio STAR interview questions, and group discussion scenarios.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isPaid ? (
              <div className="bg-[#F2B134]/15 border border-[#F2B134]/40 text-[#0B2545] px-4 py-2.5 rounded-2xl flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span className="text-xs font-black">LIFETIME PREMIUM PASS</span>
              </div>
            ) : (
              <button
                onClick={onOpenPaywall}
                className="bg-[#0B2545] hover:bg-[#07192F] text-white text-xs font-black px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#F2B134]" />
                <span>Unlock All Features (99 ETB)</span>
              </button>
            )}
          </div>

        </div>

        {/* Training School & Candidate Credentials Badges */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#0B2545] text-white shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                Training School
              </span>
              <p className="text-xs font-black text-[#0B2545] truncate">
                {schoolName}
              </p>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black text-blue-900/60 uppercase tracking-wider block">
                Target Program
              </span>
              <p className="text-xs font-black text-blue-950 truncate">
                {programName}
              </p>
            </div>
          </div>

          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black text-indigo-900/60 uppercase tracking-wider block">
                Current Assessment Stage
              </span>
              <p className="text-xs font-black text-indigo-950 truncate">
                {currentStage}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8-Column: Assessment Tools & Department Banner */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Department Assessment Banner */}
          <div className="relative rounded-3xl p-8 text-white shadow-xl overflow-hidden border border-slate-800">
            <AviationImage
              src={getBannerImage()}
              alt={schoolName}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-900/60" />

            <div className="relative z-10 space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#F2B134]/25 text-amber-300 text-xs font-black px-3 py-1 rounded-full border border-[#F2B134]/40">
                <Plane className="w-3.5 h-3.5 fill-[#F2B134]" />
                <span>PRIMARY TRAINING MODULE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                {schoolName}
              </h2>

              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                Comprehensive training curriculum and timed multiple-choice assessments tailored specifically for <strong>{programName}</strong> candidates.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onStartExam('Technical Aptitude')}
                  className="bg-[#2E86FF] hover:bg-blue-600 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Department Exam</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenInterview}
                  className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-white/20 backdrop-blur-sm flex items-center gap-2 transition-all"
                >
                  <Mic className="w-4 h-4 text-amber-400" />
                  <span>STAR Interview Prep</span>
                </button>

                <button
                  onClick={onOpenGD}
                  className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-white/20 backdrop-blur-sm flex items-center gap-2 transition-all"
                >
                  <Users className="w-4 h-4 text-sky-400" />
                  <span>Group Discussion</span>
                </button>
              </div>
            </div>
          </div>

          {/* Core Preparation Modules Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-500">
              Assessment Modules
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Module 1 */}
              <div
                onClick={() => onStartExam('English')}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2E86FF] flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#0B2545] group-hover:text-blue-600 transition-colors">
                    Written Assessment Bank
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {user.selected_role === 'Cabin Crew' || (user.training_school && user.training_school.includes('CABIN CREW'))
                      ? '15-min timed exams in English: Situational Judgment (SJT), Vocabulary, Grammar, and Reading Comprehension.'
                      : '15-min timed exams covering English, Technical Aptitude, Aviation Regulations, and Logic.'}
                  </p>
                </div>
                <div className="flex items-center text-xs font-black text-blue-600 gap-1.5 pt-2 border-t border-slate-100">
                  <span>Take Practice Test</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Module 2 */}
              <div
                onClick={onOpenInterview}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#0B2545] group-hover:text-purple-600 transition-colors">
                    STAR Interview Suite
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Model behavioral answers with AI narration and candidate voice recording.
                  </p>
                </div>
                <div className="flex items-center text-xs font-black text-purple-600 gap-1.5 pt-2 border-t border-slate-100">
                  <span>Practice Q&A</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Module 3 */}
              <div
                onClick={onOpenGD}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 hover:border-sky-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#0B2545] group-hover:text-sky-600 transition-colors">
                    Group Discussion (GD)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    15 airline scenarios, evaluator criteria, Do's & Don'ts, and starter phrases.
                  </p>
                </div>
                <div className="flex items-center text-xs font-black text-sky-600 gap-1.5 pt-2 border-t border-slate-100">
                  <span>Explore GD Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right 4-Column: Analytics, Recent Tests & Hiring Metric */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Candidate Readiness Score Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#0B2545] tracking-tight">
                Assessment Readiness
              </h3>

              <button
                onClick={onOpenProgress}
                className="text-xs font-black text-[#2E86FF] hover:underline flex items-center gap-0.5"
              >
                <span>Analytics</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
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
                <span className="absolute text-base font-black text-[#0B2545]">
                  {readinessPercentage}%
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-black text-[#0B2545]">
                  Hiring Probability Metric
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {totalCompleted > 0 
                    ? `Completed ${totalCompleted} mock assessments with ${avgScore}% average.`
                    : 'Take your first written mock test to calculate your hiring readiness.'}
                </p>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={onOpenProgress}
                className="w-full bg-slate-100 hover:bg-slate-200 text-[#0B2545] font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>View Verified Ready Certificate</span>
              </button>
            </div>
          </div>

          {/* Recent Exam Attempts */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-4">
            <h3 className="text-sm font-black text-[#0B2545]">
              Recent Mock Tests
            </h3>

            {recentAttempts.length === 0 ? (
              <div className="text-center py-6 text-slate-400 space-y-2">
                <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs">No completed tests yet.</p>
                <button
                  onClick={() => onStartExam('English')}
                  className="text-xs font-black text-[#2E86FF] hover:underline"
                >
                  Take a 15-minute test →
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentAttempts.map((att) => {
                  const pct = Math.round((att.score / att.total_questions) * 100);
                  const isPass = pct >= 70;
                  return (
                    <div
                      key={att.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 truncate">
                          {att.category}
                        </p>
                        <span className="text-[10px] text-slate-400">
                          {new Date(att.completed_at).toLocaleDateString()}
                        </span>
                      </div>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                        isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Telebirr Pass Promotion Card (if not paid) */}
          {!isPaid && (
            <div className="bg-gradient-to-br from-[#0B2545] to-blue-950 rounded-3xl p-6 text-white border border-blue-900/80 shadow-lg space-y-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h4 className="text-sm font-black text-white">Unlock Full Question Bank</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Get unlimited exam retakes, full interview question audio bank, and downloadable certificate for 99 ETB.
              </p>
              <button
                onClick={onOpenPaywall}
                className="w-full bg-[#F2B134] hover:bg-amber-400 text-[#0B2545] font-black text-xs py-3 rounded-xl shadow transition-all active:scale-95"
              >
                Unlock Lifetime Pass (99 ETB)
              </button>
            </div>
          )}

        </div>

      </div>

      {/* 4 Immersive Airline Careers Showcase ("Experience Working in Commercial Aviation") */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                {lang === 'en' ? 'YOUR FUTURE IN COMMERCIAL AVIATION' : 'የእርስዎ የወደፊት የአቪዬሽን የስራ መስክ'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0B2545] tracking-tight">
              {lang === 'en' ? 'Step Into Your Dream Aviation Career' : 'የህልምዎን የአቪዬሽን ስራ በተግባር ይለማመዱ'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {lang === 'en' 
                ? 'Visualize yourself on duty across leading international carriers with specialized department prep modules.'
                : 'በቀዳሚ አለምአቀፍ አየር መንገዶች ውስጥ እራስዎን በተመደቡበት የስራ ክፍል ውስጥ ሆነው ለፈተናዎች ይዘጋጁ።'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* 1. Cabin Crew on Duty */}
          <div 
            onClick={() => {
              setSelectedRole('Cabin Crew');
              onStartExam('Customer & Flight Operations');
            }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 hover:border-blue-400 transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative h-48 w-full overflow-hidden bg-[#0B2545]">
              <AviationImage
                src={IMAGES.cabinCrewSvc}
                alt="Commercial Airline Cabin Crew Welcoming Passengers"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 bg-[#0B2545]/90 backdrop-blur-sm border border-white/20 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                <Users className="w-3 h-3 text-amber-400" />
                <span>Cabin Crew Active</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold text-amber-300 block tracking-wider uppercase">Welcome Aboard</span>
                <h4 className="text-sm font-black leading-tight drop-shadow-sm">In-Flight Service & Safety</h4>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
              <p className="text-xs text-slate-600 leading-relaxed">
                Step into your official flight attendant role delivering luxury guest hospitality and passenger safety.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-600 group-hover:text-blue-700">
                <span>Practice Flight Attendant Prep</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* 2. Cockpit Flight Deck Command */}
          <div 
            onClick={() => {
              setSelectedRole('Pilot / Cadet');
              onStartExam('Technical Aptitude');
            }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 hover:border-sky-400 transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative h-48 w-full overflow-hidden bg-[#0B2545]">
              <AviationImage
                src={IMAGES.pilotCockpit}
                alt="Commercial Airline Pilot in Flight Deck Cockpit"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 bg-[#0B2545]/90 backdrop-blur-sm border border-white/20 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                <Plane className="w-3.5 h-3.5 text-sky-400" />
                <span>Pilot in Command</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold text-sky-300 block tracking-wider uppercase">Flight Deck</span>
                <h4 className="text-sm font-black leading-tight drop-shadow-sm">Cruising at 38,000 Feet</h4>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
              <p className="text-xs text-slate-600 leading-relaxed">
                Take the pilot seat in modern glass-cockpit flight simulators with aviation physics and navigation mastery.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-sky-600 group-hover:text-sky-700">
                <span>Practice Cadet Pilot Tests</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* 3. Concourse Crew Briefing & Walk to Aircraft */}
          <div 
            onClick={() => {
              setSelectedRole('Ground Operations');
              onStartExam('Customer & Flight Operations');
            }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 hover:border-sky-400 transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative h-48 w-full overflow-hidden bg-[#0B2545]">
              <AviationImage
                src={IMAGES.terminalWalk}
                alt="Airline Crew Walking to Aircraft Concourse"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 bg-[#0B2545]/90 backdrop-blur-sm border border-white/20 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                <span>Flight Departure</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold text-sky-300 block tracking-wider uppercase">Airport Terminal</span>
                <h4 className="text-sm font-black leading-tight drop-shadow-sm">Duty Briefing & Departure</h4>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
              <p className="text-xs text-slate-600 leading-relaxed">
                Walk through the terminal with your flight crew team heading directly to your scheduled international flight.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-sky-600 group-hover:text-sky-700">
                <span>Practice Ground Ops & Crew</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* 4. Academy Graduation & Wings Day */}
          <div 
            onClick={() => {
              setSelectedRole('Aircraft Maintenance (AMT)');
              onStartExam('Technical Aptitude');
            }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 hover:border-amber-400 transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative h-48 w-full overflow-hidden bg-[#0B2545]">
              <AviationImage
                src={IMAGES.academyGrad}
                alt="Aviation Academy Wings Graduation Ceremony"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 bg-[#0B2545]/90 backdrop-blur-sm border border-white/20 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Graduation Day</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold text-amber-300 block tracking-wider uppercase">Wings & Diploma Award</span>
                <h4 className="text-sm font-black leading-tight drop-shadow-sm">Official Employment Milestone</h4>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive your golden wings pin, airline employment badge, and celebrate completing the Academy screening.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-600 group-hover:text-amber-700">
                <span>Pass Academy Exam Simulator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
