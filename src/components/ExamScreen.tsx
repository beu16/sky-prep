import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, ExamCategory, ExamQuestion, ExamAttempt, AviationRole, Language } from '../types';
import { EXAM_QUESTIONS } from '../data/examQuestions';
import { saveExamAttempt } from '../services/supabase';
import { Clock, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle, Sparkles, BookOpen, GraduationCap, Briefcase } from 'lucide-react';
import { TRANSLATION } from '../data/translations';

interface ExamScreenProps {
  user: UserProfile;
  selectedRole?: AviationRole;
  lang?: Language;
  onAttemptSaved: (attempt: ExamAttempt) => void;
  onOpenPaywall: () => void;
  onBackToHome: () => void;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  user,
  selectedRole = 'All',
  lang = 'en',
  onAttemptSaved,
  onOpenPaywall,
  onBackToHome,
}) => {
  const t = TRANSLATION[lang];
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory | 'All'>('All');
  const [examState, setExamState] = useState<'setup' | 'active' | 'results'>('setup');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes = 900 seconds
  const [startTime, setStartTime] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const schoolName = user.training_school || user.department || 'CABIN CREW TRAINING SCHOOL';
  const programName = user.training_program || user.field || 'INITIAL CABIN CREW (FLIGHT ATTENDANT)';

  // Check if free user already used 1 free exam
  const cannotTakeExam = !user.is_paid && user.free_exam_used;

  const handleStartExam = () => {
    if (cannotTakeExam) {
      onOpenPaywall();
      return;
    }

    // Filter questions first by user's training school if present
    let filtered = EXAM_QUESTIONS.filter(q => {
      if (q.training_school && q.training_school !== schoolName) {
        return false;
      }
      return true;
    });

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    // If filter is too restrictive, fallback to all questions for that category
    if (filtered.length < 5) {
      if (selectedCategory !== 'All') {
        filtered = EXAM_QUESTIONS.filter(q => q.category === selectedCategory);
      } else {
        filtered = EXAM_QUESTIONS;
      }
    }

    // Prepare up to 20 questions
    let full20Questions = [...filtered];
    while (full20Questions.length < 20 && EXAM_QUESTIONS.length > 0) {
      full20Questions = [...full20Questions, ...EXAM_QUESTIONS].slice(0, 20);
    }
    const shuffled = full20Questions.slice(0, 20).sort(() => Math.random() - 0.5);

    setQuestions(shuffled);
    setCurrentIdx(0);
    setUserAnswers({});
    setTimeLeft(900);
    setStartTime(Date.now());
    setExamState('active');
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (examState === 'active') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examState]);

  const handleSelectOption = (optIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const finishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    const duration = Math.round((Date.now() - startTime) / 1000);
    setTimeTaken(duration);

    // Calculate score
    let score = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });

    const categoryToSave: ExamCategory = selectedCategory === 'All' ? 'English' : selectedCategory;

    const newAttempt: ExamAttempt = {
      id: `attempt_${Date.now()}`,
      user_id: user.id,
      category: categoryToSave,
      role: (user.selected_role || selectedRole || 'Cabin Crew') as AviationRole,
      score,
      total_questions: questions.length,
      time_taken_seconds: duration,
      completed_at: new Date().toISOString(),
    };

    saveExamAttempt(newAttempt);
    onAttemptSaved(newAttempt);
    setExamState('results');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // --- RENDER SETUP ---
  if (examState === 'setup') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 pb-24 md:pb-12 animate-fadeIn">
        <div className="relative text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4 overflow-hidden">
          <img
            src="/src/assets/images/pilots_briefing_1786528412510.jpg"
            alt="Airline Assessment Briefing"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[1px]" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-blue-500/30 text-blue-300 text-xs font-black px-3.5 py-1 rounded-full border border-blue-400/40 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>OFFICIAL AIRLINE EXAM SIMULATOR</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {schoolName}
              </h1>
              <p className="text-amber-400 font-extrabold text-xs sm:text-sm">
                Target Field: {programName}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {lang === 'en'
                ? '20 Multiple Choice Questions • 15 Minutes Time Limit • Department-calibrated scoring & explanations.'
                : '20 ጥያቄዎች • 15 ደቂቃ • የፈተና ውጤት እና ዝርዝር ማብራሪያ።'}
            </p>

            <div className="pt-2 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>15 Minutes Countdown Timer</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{user.is_paid ? 'Unlimited Practice Attempts' : '1 Free Practice Attempt'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            {lang === 'en' ? 'Select Question Focus Area:' : 'የፈተና ዘርፍ ይምረጡ:'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'All', name: `${schoolName} Comprehensive` },
              { id: 'English', name: t.englishProficiency },
              { id: 'Numerical Reasoning', name: t.numericalReasoning },
              { id: 'Verbal Reasoning', name: t.verbalReasoning },
              { id: 'General Knowledge', name: t.generalKnowledge },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`p-4 rounded-xl border text-left font-extrabold text-xs transition-all flex items-center justify-between min-h-[48px] ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="truncate pr-2">{cat.name}</span>
                {selectedCategory === cat.id && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
              </button>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            {cannotTakeExam ? (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 space-y-2">
                <p className="font-bold">
                  {lang === 'en' ? 'Free Practice Attempt Used.' : 'ነጻ ሙከራዎን ጨርሰዋል።'}
                </p>
                <button
                  onClick={onOpenPaywall}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-3 px-4 rounded-xl gold-glow shadow"
                >
                  {t.unlockFullAccess}
                </button>
              </div>
            ) : (
              <button
                onClick={handleStartExam}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-sm py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 min-h-[48px]"
              >
                <span>Start {schoolName.split(' ')[0]} Exam</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={onBackToHome}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-all"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER ACTIVE EXAM ---
  if (examState === 'active' && questions.length > 0) {
    const q = questions[currentIdx];
    const isAnswered = userAnswers[currentIdx] !== undefined;

    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-24 md:pb-12 animate-fadeIn">
        
        {/* Exam Header Status Bar */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-lg border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
              {q.training_school || schoolName} • {q.category}
            </span>
            <span className="text-xs font-extrabold text-white">
              {t.question} {currentIdx + 1} {t.of} {questions.length}
            </span>
          </div>

          <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs font-bold text-amber-300">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
            {lang === 'am' && q.amharicQuestion ? q.amharicQuestion : q.question}
          </h2>

          <div className="space-y-3">
            {(lang === 'am' && q.amharicOptions ? q.amharicOptions : q.options).map((opt, optIdx) => {
              const isSelected = userAnswers[currentIdx] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-extrabold transition-all flex items-center gap-3 min-h-[48px] ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 font-bold text-[11px] ${
                    isSelected ? 'border-white bg-white text-blue-600' : 'border-slate-300 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 disabled:opacity-40 min-h-[44px]"
            >
              {t.prevQuestion}
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow min-h-[44px]"
              >
                {t.nextQuestion}
              </button>
            ) : (
              <button
                onClick={finishExam}
                className="px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow min-h-[44px]"
              >
                {t.submitExam}
              </button>
            )}
          </div>
        </div>

      </div>
    );
  }

  // --- RENDER RESULTS ---
  const total = questions.length;
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctIndex) correctCount += 1;
  });
  const percentage = Math.round((correctCount / total) * 100);
  const isPassed = percentage >= 70;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 pb-24 md:pb-12 animate-fadeIn">
      
      {/* Score Summary Box */}
      <div className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl text-center space-y-4 ${
        isPassed ? 'bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-900 border border-emerald-500/40' : 'bg-slate-900 border border-slate-800'
      }`}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 text-slate-200">
          <span>{schoolName} Scorecard</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          {percentage}%
        </h1>

        <p className={`text-base font-extrabold uppercase tracking-widest ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
          {isPassed ? t.passed : t.failed} ({correctCount} / {total} Correct)
        </p>

        <p className="text-xs text-slate-300">
          {t.timeSpent}: {formatTime(timeTaken)}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleStartExam}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-3 px-6 rounded-xl shadow active:scale-95"
          >
            {t.retakeExam}
          </button>
          <button
            onClick={onBackToHome}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3 px-6 rounded-xl border border-slate-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>

      {/* Question Explanations List */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
          {t.explanation} & Solutions
        </h2>

        {questions.map((q, idx) => {
          const userChoice = userAnswers[idx];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-black text-slate-900">
                  Q{idx + 1}. {lang === 'am' && q.amharicQuestion ? q.amharicQuestion : q.question}
                </span>
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </div>

              <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1">
                <div className="text-slate-700">
                  <span className="font-bold">Your answer: </span>
                  {userChoice !== undefined ? (lang === 'am' && q.amharicOptions ? q.amharicOptions[userChoice] : q.options[userChoice]) : 'Unanswered'}
                </div>
                <div className="text-emerald-700 font-bold">
                  <span>Correct answer: </span>
                  {lang === 'am' && q.amharicOptions ? q.amharicOptions[q.correctIndex] : q.options[q.correctIndex]}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                <span className="font-bold text-slate-900">Explanation: </span>
                {lang === 'am' && q.amharicExplanation ? q.amharicExplanation : q.explanation}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
};
