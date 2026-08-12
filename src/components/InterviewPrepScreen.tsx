import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, InterviewQuestion, AudioRecording, AviationRole, Language } from '../types';
import { INTERVIEW_QUESTIONS } from '../data/interviewQuestions';
import { getAudioRecordings, saveAudioRecording, deleteAudioRecording } from '../services/supabase';
import { Mic, Lock, Play, Square, Trash2, Sparkles, Volume2, Shield, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TRANSLATION } from '../data/translations';

interface InterviewPrepScreenProps {
  user: UserProfile;
  selectedRole?: AviationRole;
  lang?: Language;
  onOpenPaywall: () => void;
}

export const InterviewPrepScreen: React.FC<InterviewPrepScreenProps> = ({
  user,
  selectedRole = 'All',
  lang = 'en',
  onOpenPaywall,
}) => {
  const t = TRANSLATION[lang];
  const isPaid = user.is_paid;
  const [internalTab, setInternalTab] = useState<'questions' | 'recordings'>('questions');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(INTERVIEW_QUESTIONS[0].id);
  const [recordings, setRecordings] = useState<Record<string, AudioRecording>>({});
  
  // MediaRecorder state
  const [recordingForId, setRecordingForId] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load recordings on mount
  useEffect(() => {
    const allRecs = getAudioRecordings();
    const map: Record<string, AudioRecording> = {};
    allRecs.forEach(r => { map[r.questionId] = r; });
    setRecordings(map);
  }, []);

  const categories = ['All', 'HR', 'Technical', 'Situational', 'Customer Service'];

  const filteredQuestions = INTERVIEW_QUESTIONS.filter((q) => {
    let matchesCategory = true;
    if (activeCategory === 'HR') matchesCategory = q.category === 'Behavioral & Scenario';
    else if (activeCategory === 'Technical') matchesCategory = q.category === 'Aviation Knowledge';
    else if (activeCategory === 'Situational') matchesCategory = q.category === 'Leadership & Pressure';
    else if (activeCategory === 'Customer Service') matchesCategory = q.category === 'Customer Service';

    const matchesRole = selectedRole === 'All' || !q.role || q.role === selectedRole;
    return matchesCategory && matchesRole;
  });

  // --- AUDIO RECORDING HANDLERS ---
  const startRecording = async (questionId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Url = reader.result as string;
          const newRec: AudioRecording = {
            questionId,
            audioUrl: base64Url,
            recordedAt: new Date().toISOString(),
            durationSeconds: recordingSeconds,
          };
          saveAudioRecording(newRec);
          setRecordings(prev => ({ ...prev, [questionId]: newRec }));
        };

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecordingForId(questionId);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);

    } catch (err) {
      alert(lang === 'en' ? 'Microphone permission required to record your audio practice.' : 'የድምፅ መቅረጫ ፍቃድ ያስፈልጋል።');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingForId) {
      mediaRecorderRef.current.stop();
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingForId(null);
    }
  };

  const handleDeleteRecording = (questionId: string) => {
    deleteAudioRecording(questionId);
    setRecordings(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-28">
      
      {/* Title Header with Real High-Quality Cabin Crew Aviation Banner */}
      <div className="relative rounded-3xl p-6 text-white shadow-xl overflow-hidden border border-slate-800">
        <img
          src="/src/assets/images/cabin_crew_1786443078115.jpg"
          alt="Aviation Cabin Crew"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-black px-3 py-1 rounded-full border border-amber-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
              <span>AIRLINE ASSESSMENT BOARD</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Aviation Interview Prep</span>
            </h1>
            <p className="text-xs text-slate-200 font-medium mt-1 max-w-md leading-relaxed">
              Master STAR model answer frameworks and practice voice recordings with real aviation panel questions.
            </p>
          </div>

          {!isPaid && (
            <button
              onClick={onOpenPaywall}
              className="bg-[#F2B134] hover:bg-amber-400 text-[#0B2545] font-black text-xs px-3.5 py-2.5 rounded-xl gold-glow flex items-center gap-1.5 transition-all active:scale-95 shadow-lg shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 fill-[#0B2545]" />
              <span>Unlock All</span>
            </button>
          )}
        </div>
      </div>

      {/* Internal Tabs: Questions | Record & Review */}
      <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1">
        <button
          onClick={() => setInternalTab('questions')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
            internalTab === 'questions'
              ? 'bg-[#0B2545] text-white shadow'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Questions
        </button>

        <button
          onClick={() => {
            if (!isPaid) {
              onOpenPaywall();
            } else {
              setInternalTab('recordings');
            }
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            internalTab === 'recordings'
              ? 'bg-[#0B2545] text-white shadow'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Mic className="w-3.5 h-3.5 text-[#F2B134]" />
          <span>Record & Review</span>
          {!isPaid && <Lock className="w-3 h-3 text-amber-600" />}
        </button>
      </div>

      {/* Category Pills */}
      {internalTab === 'questions' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all border min-h-[44px] ${
                activeCategory === cat
                  ? 'bg-[#2E86FF] text-white border-[#2E86FF] shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Questions Tab Content */}
      {internalTab === 'questions' && (
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const isLocked = !isPaid && !q.isFreePreview;
            const isExpanded = expandedId === q.id;
            const rec = recordings[q.id];
            const isRecordingThis = recordingForId === q.id;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden relative ${
                  isLocked
                    ? 'border-slate-200 bg-slate-50/60'
                    : isExpanded
                    ? 'border-[#2E86FF] shadow-lg'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => {
                    if (isLocked) {
                      onOpenPaywall();
                    } else {
                      setExpandedId(isExpanded ? null : q.id);
                    }
                  }}
                  className="p-5 cursor-pointer flex items-center justify-between gap-4 select-none hover:bg-slate-50/80 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                        {q.category}
                      </span>
                      {!isPaid && q.isFreePreview && (
                        <span className="text-[10px] font-black text-[#1FAA59] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          FREE PREVIEW
                        </span>
                      )}
                    </div>

                    <h3 className={`font-black text-base leading-snug ${isLocked ? 'text-slate-400 blur-[0.5px]' : 'text-[#0B2545]'}`}>
                      {lang === 'am' && q.amharicQuestion ? q.amharicQuestion : q.question}
                    </h3>
                  </div>

                  <div className="shrink-0">
                    {isLocked ? (
                      <div className="w-9 h-9 rounded-xl bg-[#F2B134]/20 text-[#0B2545] border border-[#F2B134]/50 flex items-center justify-center shadow-sm">
                        <Lock className="w-4 h-4 text-amber-700" />
                      </div>
                    ) : (
                      <button className="text-[#2E86FF] font-extrabold text-xs">
                        {isExpanded ? 'Hide' : 'STAR Answer'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Soft Locked Banner Overlay */}
                {isLocked && (
                  <div className="p-3 bg-amber-50/80 border-t border-amber-200/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-700" />
                      <span>Unlock with Sky Prep Premium</span>
                    </span>
                    <button
                      onClick={onOpenPaywall}
                      className="bg-[#F2B134] text-[#0B2545] font-black text-[11px] px-3 py-1 rounded-lg shadow active:scale-95"
                    >
                      Unlock (99 ETB)
                    </button>
                  </div>
                )}

                {/* Expanded STAR Framework Content */}
                {isExpanded && !isLocked && (
                  <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-5 bg-slate-50/40">
                    
                    {/* STAR Grid */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-[#0B2545] uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#F2B134]" />
                        <span>STAR Model Answer</span>
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#2E86FF] block">S - Situation</span>
                          <p className="text-xs text-slate-800 leading-relaxed font-medium">{q.starFramework.situation}</p>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 block">T - Task</span>
                          <p className="text-xs text-slate-800 leading-relaxed font-medium">{q.starFramework.task}</p>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block">A - Action</span>
                          <p className="text-xs text-slate-800 leading-relaxed font-medium">{q.starFramework.action}</p>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#1FAA59] block">R - Result</span>
                          <p className="text-xs text-slate-800 leading-relaxed font-medium">{q.starFramework.result}</p>
                        </div>
                      </div>
                    </div>

                    {/* Key Phrases */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                        Key Power Phrases
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {q.keyPhrases.map((phrase, idx) => (
                          <span key={idx} className="bg-blue-50 text-[#2E86FF] border border-blue-200 text-xs font-extrabold px-2.5 py-1 rounded-lg">
                            "{phrase}"
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Voice Recording Widget */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#0B2545] flex items-center gap-1.5">
                          <Mic className="w-4 h-4 text-[#E4483E]" />
                          <span>Voice Recording Practice (On-Device Private)</span>
                        </span>

                        {rec && (
                          <span className="text-[10px] font-extrabold text-[#1FAA59] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Recorded ({rec.durationSeconds}s)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {isRecordingThis ? (
                          <button
                            onClick={stopRecording}
                            className="bg-[#E4483E] hover:bg-rose-700 text-white font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 animate-pulse min-h-[44px]"
                          >
                            <Square className="w-4 h-4 fill-white" />
                            <span>Stop Recording ({recordingSeconds}s)</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => startRecording(q.id)}
                            className="bg-[#0B2545] hover:bg-[#2E86FF] text-white font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 active:scale-95 transition-all min-h-[44px]"
                          >
                            <Mic className="w-4 h-4 text-[#F2B134]" />
                            <span>{rec ? 'Re-record Answer' : 'Record Voice Answer'}</span>
                          </button>
                        )}

                        {rec && !isRecordingThis && (
                          <div className="flex items-center gap-2">
                            <audio src={rec.audioUrl} controls className="h-9 max-w-[180px]" />
                            <button
                              onClick={() => handleDeleteRecording(q.id)}
                              className="p-2 text-[#E4483E] hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete voice recording"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Record & Review Tab Content */}
      {internalTab === 'recordings' && (
        <div className="space-y-4">
          <h2 className="text-sm font-black text-[#0B2545] uppercase tracking-wider">
            Your Recorded Interview Answers ({Object.keys(recordings).length})
          </h2>

          {Object.keys(recordings).length > 0 ? (
            <div className="space-y-3">
              {(Object.values(recordings) as AudioRecording[]).map((rec: AudioRecording) => {
                const question = INTERVIEW_QUESTIONS.find(q => q.id === rec.questionId);
                return (
                  <div key={rec.questionId} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                    <h4 className="text-xs font-black text-[#0B2545]">
                      {question ? question.question : 'Interview Question'}
                    </h4>

                    <div className="flex items-center justify-between gap-3">
                      <audio src={rec.audioUrl} controls className="h-9 flex-1" />
                      <button
                        onClick={() => handleDeleteRecording(rec.questionId)}
                        className="p-2.5 text-[#E4483E] hover:bg-rose-50 rounded-xl transition-colors"
                        title="Delete recording"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
              <Mic className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-700">No recordings saved yet</p>
              <p className="text-[11px] text-slate-400">Expand any interview question and record your voice answer to review your delivery.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
