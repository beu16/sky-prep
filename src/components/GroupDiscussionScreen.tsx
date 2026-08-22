import React, { useState } from 'react';
import { UserProfile, Language, GroupDiscussionTopic } from '../types';
import { GROUP_DISCUSSION_TOPICS } from '../data/groupDiscussionTopics';
import { TRANSLATION } from '../data/translations';
import { 
  Users, 
  Sparkles, 
  CheckCircle2, 
  AlertOctagon, 
  MessageSquare, 
  ArrowLeft,
  Crown
} from 'lucide-react';

interface GroupDiscussionScreenProps {
  user: UserProfile;
  lang: Language;
  onExit: () => void;
}

export const GroupDiscussionScreen: React.FC<GroupDiscussionScreenProps> = ({
  user,
  lang,
  onExit
}) => {
  const t = TRANSLATION[lang];
  const topic = GROUP_DISCUSSION_TOPICS[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 pb-20">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-[#0B2545] to-[#133E6D] p-6 rounded-3xl border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase">
              Airline Group Discussion Guide
            </span>
          </div>
          <h1 className="text-2xl font-black text-white">
            {t.groupDiscussion}
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

      {/* Case Study Scenario Card */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase text-amber-400">
            Real Assessment Scenario
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            {topic.title[lang] || topic.title.en}
          </h2>
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
            {topic.scenario[lang] || topic.scenario.en}
          </div>
        </div>

        {/* Recommended Candidate Roles */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-400" />
            <span>Recommended High-Scoring Leadership Roles</span>
          </h3>

          <div className="space-y-2">
            {topic.recommendedRoles.map((role, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200">
                {role}
              </div>
            ))}
          </div>
        </div>

        {/* Winning Statements */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Winning Diplomatic Statements</span>
          </h3>

          <div className="space-y-2">
            {(topic.winningStatements[lang] || topic.winningStatements.en).map((stmt, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 italic">
                {stmt}
              </div>
            ))}
          </div>
        </div>

        {/* Evaluator Red Flags */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>Critical Pitfalls & Disqualifying Habits</span>
          </h3>

          <div className="space-y-2">
            {topic.pitfallsToAvoid.map((pitfall, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-rose-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                <span>{pitfall}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
