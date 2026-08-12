import React from 'react';
import { UserProfile, ExamAttempt, ExamCategory, Language } from '../types';
import { TRANSLATION } from '../data/translations';
import { BookOpen, BarChart3, Brain, Plane, Clock, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

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
      desc: lang === 'en' ? 'Grammar, vocabulary, comprehension & aviation operational terms.' : 'የአቪዬሽን እንግሊዝኛ ቋንቋ፣ ሰዋሰው እና ቃላት መፈተሻ።',
      icon: BookOpen,
      examsCount: '10 Exams',
      color: 'bg-blue-50 text-[#2E86FF] border-blue-200',
    },
    {
      id: 'Numerical Reasoning' as const,
      title: t.numericalReasoning,
      desc: lang === 'en' ? 'Fuel burn calculations, speed-distance-time, percentages & charts.' : 'የነዳጅ ስሌት፣ ርቀት፣ ሰአት እና ቁጥራዊ አስተሳሰብ።',
      icon: BarChart3,
      examsCount: '10 Exams',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      id: 'Verbal Reasoning' as const,
      title: t.verbalReasoning,
      desc: lang === 'en' ? 'Logical deduction, safety protocol inference & passage analysis.' : 'ሎጂክ እና የደህንነት መመሪያዎችን የመረዳት ችሎታ።',
      icon: Brain,
      examsCount: '10 Exams',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      id: 'General Knowledge' as const,
      title: t.generalKnowledge,
      desc: lang === 'en' ? 'ICAO standards, cabin safety equipment, aerodynamics & airline facts.' : 'የICAO ህጎች፣ የአደጋ ጊዜ መሳሪያዎች እና የአየር መንገድ እውቀት።',
      icon: Plane,
      examsCount: '10 Exams',
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
  ];

  // Get recent attempts sorted by date
  const recentAttempts = [...attempts]
    .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8 pb-28">
      
      {/* Title Header with Flight Deck Banner */}
      <div className="relative rounded-3xl p-6 text-white shadow-xl overflow-hidden border border-slate-800">
        <img
          src="/src/assets/images/flight_simulator_1786443425493.jpg"
          alt="Flight Simulator Training"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-black px-3 py-1 rounded-full border border-blue-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-blue-300" />
              <span>ASSESSMENT PRACTICE MODULES</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Aviation Practice Exams</span>
            </h1>
            <p className="text-xs text-slate-200 font-medium mt-1 max-w-md leading-relaxed">
              Test your proficiency with 15-minute timed examinations designed for airline assessment standards.
            </p>
          </div>

          {!isPaid && (
            <button
              onClick={onOpenPaywall}
              className="bg-[#F2B134] hover:bg-amber-400 text-[#0B2545] font-black text-xs px-3.5 py-2.5 rounded-xl shadow gold-glow flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 fill-[#0B2545]" />
              <span>Unlock All</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Grid (2x2) */}
      <div className="space-y-3">
        <h2 className="text-sm font-black uppercase tracking-wider text-slate-500">
          Choose a Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-200/80 transition-all cursor-pointer flex flex-col justify-between space-y-4 group active:scale-[0.99]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border group-hover:scale-105 transition-transform ${cat.color}`}>
                      <CatIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#0B2545]">
                        {cat.title}
                      </h3>
                      <span className="text-[11px] font-bold text-slate-400">
                        {cat.examsCount}
                      </span>
                    </div>
                  </div>

                  {bestScore !== null ? (
                    <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${
                      bestScore >= 70 ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {bestScore}%
                    </span>
                  ) : null}
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {cat.desc}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-xs font-extrabold text-[#2E86FF] group-hover:underline flex items-center gap-1">
                    <span>Start Practice Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  {!isPaid && user.free_exam_used && (
                    <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      PREMIUM
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Attempts Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-500">
            Recent Attempts
          </h2>

          <span className="text-xs font-bold text-slate-400">
            {attempts.length} total
          </span>
        </div>

        {recentAttempts.length > 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden shadow-sm">
            {recentAttempts.map((attempt) => {
              const pct = Math.round((attempt.score / attempt.total_questions) * 100);
              const isPassed = pct >= 70;
              const dateStr = new Date(attempt.completed_at).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              });

              return (
                <div key={attempt.id} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                      isPassed ? 'bg-emerald-100 text-[#1FAA59]' : 'bg-rose-100 text-[#E4483E]'
                    }`}>
                      {pct}%
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#0B2545]">
                        {attempt.category}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{Math.floor(attempt.time_taken_seconds / 60)}m {attempt.time_taken_seconds % 60}s</span>
                        <span>•</span>
                        <span>{dateStr}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${
                    isPassed ? 'bg-emerald-50 text-[#1FAA59] border-emerald-200' : 'bg-rose-50 text-[#E4483E] border-rose-200'
                  }`}>
                    {isPassed ? 'PASSED' : 'RETAKE'}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-700">No attempts completed yet</p>
            <p className="text-[11px] text-slate-400">Complete your first practice exam to start building your score history.</p>
          </div>
        )}
      </div>

    </div>
  );
};
