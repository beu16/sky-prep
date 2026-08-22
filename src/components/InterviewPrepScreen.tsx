import React, { useState } from 'react';
import { UserProfile, Language, InterviewQuestion } from '../types';
import { INTERVIEW_QUESTIONS } from '../data/interviewQuestions';
import { TRANSLATION } from '../data/translations';
import { AIVoiceButton } from './AIVoicePlayer';
import { 
  Mic, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  BookOpen, 
  Star, 
  ShieldCheck, 
  ArrowLeft,
  Volume2
} from 'lucide-react';

interface InterviewPrepScreenProps {
  user: UserProfile;
  lang: Language;
  onExit: () => void;
  onOpenPaywall: () => void;
}

export const InterviewPrepScreen: React.FC<InterviewPrepScreenProps> = ({
  user,
  lang,
  onExit,
  onOpenPaywall
}) => {
  const t = TRANSLATION[lang];
  const questions = INTERVIEW_QUESTIONS.filter(q => q.school === user.school);
  const activeQuestions = questions.length > 0 ? questions : INTERVIEW_QUESTIONS;

  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion>(activeQuestions[0]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 pb-20">
      {/* Top Banner */}
      <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-[#0B2545] to-[#133E6D] p-6 rounded-3xl border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase">
              STAR Method Simulator
            </span>
            <span className="text-xs text-slate-400 font-bold">
              Situation • Task • Action • Result
            </span>
          </div>
          <h1 className="text-2xl font-black text-white">
            {t.starInterview}
          </h1>
        </div>

        <button
          onClick={onExit}
          type="button"
          className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition"
        >
          Exit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Question List */}
        <div className="space-y-3">
          <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            Target Behavioral Scenarios
          </h2>

          <div className="space-y-2">
            {activeQuestions.map((q) => {
              const isSelected = selectedQuestion.id === q.id;
              const title = q.title[lang] || q.title.en;

              return (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuestion(q)}
                  type="button"
                  className={`w-full p-4 rounded-2xl text-left transition border space-y-1.5 ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">
                    {q.competency}
                  </span>
                  <p className="text-xs font-bold leading-snug line-clamp-2">
                    {title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Question Deep-Dive */}
        <div className="lg:col-span-2 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
                {selectedQuestion.competency}
              </span>
              <AIVoiceButton
                text={selectedQuestion.audioScript || selectedQuestion.bestModelAnswer[lang] || selectedQuestion.bestModelAnswer.en}
                label="Listen Model Answer"
              />
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
              {selectedQuestion.question[lang] || selectedQuestion.question.en}
            </h3>
          </div>

          {/* S-T-A-R Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-black text-blue-400">
                [S] Situation
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedQuestion.starFramework.situation}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-black text-amber-400">
                [T] Task
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedQuestion.starFramework.task}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-black text-emerald-400">
                [A] Action
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedQuestion.starFramework.action}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-black text-purple-400">
                [R] Result
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedQuestion.starFramework.result}
              </p>
            </div>
          </div>

          {/* Model Answer Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/40 to-slate-950 border border-blue-500/30 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Full High-Scoring Candidate Script</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "{selectedQuestion.bestModelAnswer[lang] || selectedQuestion.bestModelAnswer.en}"
            </p>
          </div>

          {/* Evaluator Checklist */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Airline Interviewer Scoring Rubric
            </h4>
            <div className="space-y-2">
              {selectedQuestion.evaluatorChecklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
