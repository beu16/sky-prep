import React, { useState, useEffect } from 'react';
import { UserProfile, Language, ExamQuestion, ExamAttempt } from '../types';
import { EXAM_QUESTIONS } from '../data/examQuestions';
import { TRANSLATION } from '../data/translations';
import { AIVoiceButton } from './AIVoicePlayer';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Award, 
  AlertTriangle,
  Sparkles,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExamScreenProps {
  user: UserProfile;
  lang: Language;
  onFinishExam: (attempt: ExamAttempt) => void;
  onExit: () => void;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  user,
  lang,
  onFinishExam,
  onExit
}) => {
  const t = TRANSLATION[lang];

  // Filter questions for the user's selected school
  const questions = EXAM_QUESTIONS.filter(q => q.school === user.school);
  const activeQuestions = questions.length > 0 ? questions : EXAM_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(activeQuestions.length * 60); // 1 min per question
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptResult, setAttemptResult] = useState<ExamAttempt | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const currentQ = activeQuestions[currentIndex];

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optIndex
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};

    activeQuestions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) score += 1;

      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total += 1;
      if (isCorrect) {
        categoryBreakdown[q.category].correct += 1;
      }
    });

    const percentage = Math.round((score / activeQuestions.length) * 100);
    const passed = percentage >= 80;

    const attempt: ExamAttempt = {
      id: 'att_' + Date.now(),
      userId: user.id,
      school: user.school,
      score,
      totalQuestions: activeQuestions.length,
      percentage,
      passed,
      timeSpentSeconds: activeQuestions.length * 60 - timeLeft,
      date: new Date().toISOString(),
      categoryBreakdown
    };

    setAttemptResult(attempt);
    setIsSubmitted(true);
    onFinishExam(attempt);

    if (passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isSubmitted && attemptResult) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
        {/* Score Header */}
        <div className={`p-8 rounded-3xl text-center space-y-4 border ${
          attemptResult.passed
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
            : 'bg-rose-950/40 border-rose-500/40 text-rose-100'
        }`}>
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-slate-900 border border-white/10 shadow-xl">
            {attemptResult.passed ? (
              <Award className="w-8 h-8 text-amber-400" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-rose-400" />
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black">
            {attemptResult.passed ? t.congratulations : 'Assessment Completed'}
          </h2>

          <div className="text-5xl sm:text-6xl font-black tracking-tight text-white">
            {attemptResult.percentage}%
          </div>

          <p className="text-sm max-w-md mx-auto text-slate-300">
            {attemptResult.passed ? t.examPassed : t.examFailed}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedAnswers({});
                setCurrentIndex(0);
                setTimeLeft(activeQuestions.length * 60);
              }}
              type="button"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.tryAgain}</span>
            </button>

            <button
              onClick={onExit}
              type="button"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs transition"
            >
              Exit to Dashboard
            </button>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white">
            {t.reviewAnswers}
          </h3>

          <div className="space-y-4">
            {activeQuestions.map((q, idx) => {
              const selected = selectedAnswers[idx];
              const isCorrect = selected === q.correctAnswer;
              const qText = q.question[lang] || q.question.en;
              const options = q.options[lang] || q.options.en;
              const explanation = q.explanation[lang] || q.explanation.en;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isCorrect
                      ? 'bg-slate-900/60 border-emerald-500/30'
                      : 'bg-slate-900/60 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {q.category.replace('_', ' ')}
                      </span>
                    </div>
                    {isCorrect ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {qText}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {options.map((opt, optIdx) => {
                      const isThisSelected = selected === optIdx;
                      const isThisCorrect = optIdx === q.correctAnswer;

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-xl text-xs flex items-center justify-between ${
                            isThisCorrect
                              ? 'bg-emerald-950/60 text-emerald-200 border border-emerald-500/50 font-bold'
                              : isThisSelected
                              ? 'bg-rose-950/60 text-rose-200 border border-rose-500/50 line-through'
                              : 'bg-slate-950/40 text-slate-400'
                          }`}
                        >
                          <span>{opt}</span>
                          {isThisCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-amber-400">Rationale: </strong>
                    {explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Exam View
  const qText = currentQ.question[lang] || currentQ.question.en;
  const options = currentQ.options[lang] || currentQ.options.en;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header Bar with Timer & Progress */}
      <div className="flex items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        <div>
          <span className="text-xs text-slate-400 font-bold">
            Question {currentIndex + 1} of {activeQuestions.length}
          </span>
          <div className="w-32 sm:w-48 bg-slate-800 h-2 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Live Timer */}
        <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold border ${
          timeLeft < 60
            ? 'bg-rose-950/60 border-rose-500 text-rose-300 animate-pulse'
            : 'bg-slate-950 border-slate-700 text-amber-300'
        }`}>
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {currentQ.category.replace('_', ' ')}
          </span>
          <AIVoiceButton text={currentQ.audioText || qText} label="Listen Question" />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
          {qText}
        </h3>

        {/* Options List */}
        <div className="space-y-3">
          {options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentIndex] === optIdx;
            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                type="button"
                className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-medium transition-all duration-200 border flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-white font-bold shadow-md shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <span>{opt}</span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400 text-slate-950'
                    : 'border-slate-700 bg-slate-900'
                }`}>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Row */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            type="button"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.previousQuestion}</span>
          </button>

          {currentIndex === activeQuestions.length - 1 ? (
            <button
              onClick={handleSubmit}
              type="button"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition"
            >
              <span>{t.submitExam}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex(prev => Math.min(activeQuestions.length - 1, prev + 1))}
              type="button"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
            >
              <span>{t.nextQuestion}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
