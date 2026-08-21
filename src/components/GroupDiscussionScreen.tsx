import React, { useState } from 'react';
import { GROUP_DISCUSSION_TOPICS } from '../data/groupDiscussionTopics';
import { Users, Search, Copy, ChevronDown, ChevronUp, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { AviationRole, Language } from '../types';
import { TRANSLATION } from '../data/translations';
import { AIVoiceButton, AIVoiceSpeedControl } from './AIVoicePlayer';

interface GroupDiscussionScreenProps {
  selectedRole?: AviationRole;
  lang?: Language;
}

export const GroupDiscussionScreen: React.FC<GroupDiscussionScreenProps> = ({
  selectedRole = 'All',
  lang = 'en',
}) => {
  const t = TRANSLATION[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(GROUP_DISCUSSION_TOPICS[0].id);
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);

  const filteredTopics = GROUP_DISCUSSION_TOPICS.filter((topic) => {
    const matchesRole = selectedRole === 'All' || !topic.role || topic.role === selectedRole;
    const matchesSearch =
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.scenario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (topic.amharicTitle && topic.amharicTitle.includes(searchTerm)) ||
      (topic.amharicScenario && topic.amharicScenario.includes(searchTerm));
    return matchesRole && matchesSearch;
  });

  const handleCopyPhrase = (phrase: string) => {
    navigator.clipboard.writeText(phrase.replace(/^"/, '').replace(/"$/, ''));
    setCopiedPhrase(phrase);
    setTimeout(() => setCopiedPhrase(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      
      {/* Top Banner with High-Quality Aviation Assessment Photo */}
      <div className="relative text-white rounded-3xl p-6 shadow-xl border border-slate-800 overflow-hidden">
        <img
          src="/src/assets/images/group_discussion_1786443106727.jpg"
          alt="Aviation Group Discussion"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[1px]" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/30 text-emerald-300 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-500/40 mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-emerald-300" />
              <span>100% FREE RESOURCE</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">{t.groupDiscussion}</h1>
            <p className="text-xs text-slate-200 mt-1 max-w-xl font-medium leading-relaxed">
              {lang === 'en'
                ? 'Learn how airline evaluators grade leadership, listening, de-escalation, and teamwork. Scenarios with Dos, Don\'ts, and copyable starter phrases.'
                : 'የአቪዬሽን ቡድን ውይይት ተገቢውን የተግባቦት ክህሎት እና አመራር የሚያስተምር መመሪያ።'}
            </p>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700 text-center shrink-0 shadow-lg">
            <Users className="w-7 h-7 text-amber-400 mx-auto" />
            <span className="text-xs font-black text-white block mt-1">{filteredTopics.length} Topics</span>
          </div>
        </div>
      </div>

      {/* Search and Voice Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-sm text-slate-900 bg-white shadow-sm min-h-[44px]"
          />
        </div>

        <div className="shrink-0 self-end sm:self-auto">
          <AIVoiceSpeedControl />
        </div>
      </div>

      {/* Topics Accordion List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedId === topic.id;

          return (
            <div
              key={topic.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                isExpanded ? 'border-blue-600 shadow-lg' : 'border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : topic.id)}
                className="p-5 cursor-pointer flex items-center justify-between gap-4 select-none hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                    isExpanded ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {topic.id.replace('gd-', '')}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                        {topic.role || 'General Aviation'}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                      {lang === 'am' && topic.amharicTitle ? topic.amharicTitle : topic.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <AIVoiceButton
                    id={`gd-${topic.id}`}
                    textToRead={`${topic.title}. Scenario: ${topic.scenario}`}
                    variant="compact"
                    label="Listen to Topic"
                  />
                  <button className="text-slate-400 p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-6 bg-slate-50/50">
                  
                  {/* Scenario */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                        Scenario Breakdown
                      </span>
                      <AIVoiceButton
                        id={`gd-full-${topic.id}`}
                        textToRead={`Topic: ${topic.title}. Scenario: ${topic.scenario}. Key starter phrase: ${topic.starterPhrases[0] || ''}`}
                        label="Listen to Discussion Guide"
                      />
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed font-medium">
                      {topic.scenario}
                    </p>
                    {topic.amharicScenario && (
                      <p className="text-xs text-blue-800 pt-1 border-t border-slate-100 font-medium">
                        {topic.amharicScenario}
                      </p>
                    )}
                  </div>

                  {/* Evaluator Grading Criteria */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Evaluator Assessment Focus
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {topic.evaluatorCriteria.map((crit, idx) => (
                        <div key={idx} className="bg-blue-50/80 border border-blue-200/60 p-2.5 rounded-xl text-xs text-blue-900 font-semibold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                          <span>{crit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dos & Don'ts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Dos */}
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 space-y-2">
                      <h5 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>{t.dos}</span>
                      </h5>
                      <ul className="space-y-2">
                        {topic.dos.map((d, idx) => (
                          <li key={idx} className="text-xs text-emerald-950 flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Don'ts */}
                    <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-4 space-y-2">
                      <h5 className="text-xs font-extrabold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>{t.donts}</span>
                      </h5>
                      <ul className="space-y-2">
                        {topic.donts.map((d, idx) => (
                          <li key={idx} className="text-xs text-rose-950 flex items-start gap-2">
                            <span className="text-rose-600 font-bold">•</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Starter Phrases with Copy button */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      {t.starterPhrases}
                    </h4>
                    <div className="space-y-2">
                      {topic.starterPhrases.map((phrase, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs text-slate-800 shadow-sm"
                        >
                          <span className="font-mono italic text-slate-700">{phrase}</span>
                          <button
                            onClick={() => handleCopyPhrase(phrase)}
                            className="shrink-0 text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copiedPhrase === phrase ? t.copied : 'Copy'}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
