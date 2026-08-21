import React from 'react';
import { UserProfile, ExamAttempt, ExamCategory, Language } from '../types';
import { TRANSLATION } from '../data/translations';
import { BookOpen, BarChart3, Brain, Plane, Clock, ArrowRight, Sparkles, ChevronRight, CheckCircle2, Shield } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { AviationImage } from './AviationImage';

interface PracticeScreenProps {
  user: UserProfile;
  attempts: ExamAttempt[];
  lang: Language;
  onStartExam: (category: ExamCategory) => void;
  onOpenGD: () => void;
  onOpenPaywall: () => void;
}

export const PracticeScreen: React.FC<PracticeScreenProps> = ({
  user,
  attempts,
  lang,
  onStartExam,
  onOpenGD,
  onOpenPaywall,
}) => {
  const t = TRANSLATION[lang];
  const isPaid = user.is_paid;

  const categories = [
    {
      id: 'English' as const,
      title: t.englishProficiency,
      desc: lang === 'en' ? 'Grammar, aviation terminology, comprehension, and radio communication phrases.' : 'የአቪዬሽን እንግሊዝኛ ቋንቋ፣ ሰዋሰው እና ቃላት መፈተሻ።',
      icon: BookOpen,
      examsCount: '10 Timed Exams',
      color: 'bg-blue-50 text-[#2E86FF] border-blue-200',
    },
    {
      id: 'Numerical Reasoning' as const,
      title: t.numericalReasoning,
      desc: lang === 'en' ? 'Fuel burn calculations, speed-distance-time, percentages, weight and balance charts.' : 'የነዳጅ ስሌት፣ ርቀት፣ ሰአት እና ቁጥራዊ አስተሳሰብ።',
      icon: BarChart3,
      examsCount: '10 Timed Exams',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    },
    {
      id: 'Verbal Reasoning' as const,
      title: t.verbalReasoning,
      desc: lang === 'en' ? 'Logical deduction, safety protocol inference, passage analysis, and critical reasoning.' : 'ሎጂክ እና የደህንነት መመሪያዎችን የመረዳት ችሎታ።',
      icon: Brain,
      examsCount: '10 Timed Exams',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      id: 'General Knowledge' as const,
      title: t.generalKnowledge,
      desc: lang === 'en' ? 'ICAO standards, cabin safety equipment, aircraft aerodynamics, and airline history.' : 'የICAO ህጎች፣ የአደጋ ጊዜ መሳሪያዎች እና የአየር መንገድ እውቀት።',
      icon: Plane,
      examsCount: '10 Timed Exams',
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
  ];

  // Get recent attempts sorted by date
  const recentAttempts = [...attempts]
    .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
    .slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 pb-16 w-full max-w-full overflow-x-hidden">
      
      {/* Title Header with Flight Deck Banner */}
      <div className="relative rounded-3xl p-8 text-white shadow-xl overflow-hidden border border-slate-800">
        <AviationImage
          src={IMAGES.flightSimulator}
          alt="Flight Simulator Training"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[1px]" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-black px-3.5 py-1 rounded-full border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 fill-blue-300" />
              <span>OFFICIAL EXAM SIMULATION ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Aviation Written Assessment Practice
            </h1>
            <p className="text-sm text-slate-200 font-medium leading-relaxed">
              Test your proficiency with 15-minute timed examinations modeled on commercial airline recruitment standards with immediate rationales.
            </p>
          </div>

          {!isPaid && (
            <button
              onClick={onOpenPaywall}
              className="bg-[#F2B134] hover:bg-amber-400 text-[#0B2545] font-black text-sm px-6 py-3.5 rounded-2xl shadow-xl gold-glow flex items-center gap-2 transition-all active:scale-95 shrink-0"
            >
              <Sparkles className="w-4 h-4 fill-[#0B2545]" />
              <span>Unlock Full Question Bank (99 ETB)</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Grid (4 Column on Desktop) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-500">
            Select an Assessment Subject
          </h2>
          <span className="text-xs font-bold text-slate-400">
            4 Core Pillars • 40+ Examinations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const catAttempts = attempts.filter(a => a.category === cat.id);
            const bestScore = catAttempts.length > 0 
              ? Math.max(...catAttempts.map(a => Math.round((a.score / a.total_questions) * 100)))
              : null;
            const CatIcon = cat.icon;

            return (
              <div
                key={cat.id}
                onClick={() => onStartExam(cat.id)}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-slate-200/90 transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border group-hover:scale-105 transition-transform ${cat.color}`}>
                      <CatIcon className="w-7 h-7" />
                    </div>

                    {bestScore !== null ? (
                      <span className={`text-xs font-black px-3 py-1 rounded-full border ${
                        bestScore >= 70 ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        Best: {bestScore}%
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <h3 className="text-base font-black text-[#0B2545] group-hover:text-blue-600 transition-colors">
                      {cat.title}
                    </h3>
                    <span className="text-xs font-bold text-slate-400 block mt-0.5">
                      {cat.examsCount}
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed mt-2.5">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                  <span className="text-xs font-black text-[#2E86FF] group-hover:underline flex items-center gap-1">
                    <span>Launch 15-Min Test</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  {!isPaid && user.free_exam_used && (
                    <span className="text-[10px] font-black text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                      PREMIUM
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Attempts History Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-500">
            Assessment Attempt Records
          </h2>

          <span className="text-xs font-bold text-slate-400">
            {attempts.length} total attempts logged
          </span>
        </div>

        {recentAttempts.length > 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 divide-y divide-slate-100 overflow-hidden shadow-sm">
            {recentAttempts.map((attempt) => {
              const pct = Math.round((attempt.score / attempt.total_questions) * 100);
              const isPassed = pct >= 70;
              const dateStr = new Date(attempt.completed_at).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div key={attempt.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${
                      isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {pct}%
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-[#0B2545]">
                        {attempt.category}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{Math.floor(attempt.time_taken_seconds / 60)}m {attempt.time_taken_seconds % 60}s</span>
                        </div>
                        <span>•</span>
                        <span>{dateStr}</span>
                        <span>•</span>
                        <span>Score: {attempt.score} / {attempt.total_questions}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-xs font-black px-4 py-1.5 rounded-full border self-start sm:self-auto ${
                    isPassed ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {isPassed ? 'PASSED (≥70%)' : 'RETAKE SUGGESTED'}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-base font-black text-slate-800">No Assessment Records Yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Select one of the categories above to launch your first 15-minute simulated examination and establish your score.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
