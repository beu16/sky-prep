import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, InterviewQuestion, AudioRecording, AviationRole, Language } from '../types';
import { INTERVIEW_QUESTIONS } from '../data/interviewQuestions';
import { getAudioRecordings, saveAudioRecording, deleteAudioRecording } from '../services/supabase';
import { Mic, Lock, Play, Square, Trash2, Sparkles, Volume2, Shield, ChevronRight, CheckCircle2, GraduationCap, Briefcase } from 'lucide-react';
import { TRANSLATION } from '../data/translations';
import { AIVoiceButton, AIVoiceSpeedControl } from './AIVoicePlayer';
import { IMAGES } from '../assets/images';

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
  const [recordings, setRecordings] = useState<Record<string, AudioRecording>>({});
  
  // MediaRecorder state
  const [recordingForId, setRecordingForId] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const schoolName = user.training_school || user.department || 'CABIN CREW TRAINING SCHOOL';
  const programName = user.training_program || user.field || 'INITIAL CABIN CREW (FLIGHT ATTENDANT)';

  // Filter questions by user's training school
  const schoolQuestions = INTERVIEW_QUESTIONS.filter(q => {
    if (q.training_school && q.training_school !== schoolName) {
      return false;
    }
    return true;
  });

  const finalQuestions = schoolQuestions.length > 0 ? schoolQuestions : INTERVIEW_QUESTIONS;

  const [expandedId, setExpandedId] = useState<string | null>(finalQuestions[0]?.id || null);

  // Load recordings on mount
  useEffect(() => {
    const allRecs = getAudioRecordings();
    const map: Record<string, AudioRecording> = {};
    allRecs.forEach(r => { map[r.questionId] = r; });
    setRecordings(map);
  }, []);

  const categories = ['All', 'HR & Behavioral', 'Technical & Aviation', 'Leadership & Scenarios', 'Customer Service'];

  const filteredQuestions = finalQuestions.filter((q) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'HR & Behavioral') return q.category === 'Behavioral & Scenario';
    if (activeCategory === 'Technical & Aviation') return q.category === 'Aviation Knowledge';
    if (activeCategory === 'Leadership & Scenarios') return q.category === 'Leadership & Pressure';
    if (activeCategory === 'Customer Service') return q.category === 'Customer Service';
    return true;
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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 pb-16 animate-fadeIn w-full max-w-full overflow-x-hidden">
      
      {/* Title Header with Real High-Quality Aviation Banner */}
      <div className="relative rounded-3xl p-6 text-white shadow-xl overflow-hidden border border-slate-800">
        <img
          src={IMAGES.cabinCrewGeneral}
          alt="Aviation Assessment Panel"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[1px]" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-black px-3 py-1 rounded-full border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
              <span>AIRLINE INTERVIEW BOARD</span>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {schoolName} Interviews
            </h1>
            
            <p className="text-xs text-amber-300 font-bold">
              Field of Study: {programName}
            </p>
            
            <p className="text-xs text-slate-200 font-medium max-w-md leading-relaxed">
              Master STAR framework answers (Situation, Task, Action, Result) with voice recording practice calibrated for {schoolName} screening.
            </p>
          </div>

          {!isPaid && (
            <button
              onClick={onOpenPaywall}
              className="bg-[#F2B134] hover:bg-amber-400 text-[#0B2545] font-black text-xs px-4 py-2.5 rounded-xl gold-glow flex items-center gap-1.5 transition-all active:scale-95 shadow-lg shrink-0 self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 fill-[#0B2545]" />
              <span>Unlock All (99 ETB)</span>
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
          {schoolName.split(' ')[0]} Question Bank ({filteredQuestions.length})
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
          <span>My Audio Recordings</span>
          {!isPaid && <Lock className="w-3 h-3 text-amber-600" />}
        </button>
      </div>

      {/* Category Filter Pills and Voice Controls */}
      {internalTab === 'questions' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-1">
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

          <div className="shrink-0 self-end sm:self-auto">
            <AIVoiceSpeedControl />
          </div>
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
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {q.training_school || schoolName}
                      </span>
                      <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                        {q.category}
                      </span>
                      {!isPaid && q.isFreePreview && (
                        <span className="text-[10px] font-black text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                          FREE PREVIEW
                        </span>
                      )}
                    </div>

                    <h3 className={`font-black text-base leading-snug ${isLocked ? 'text-slate-400 blur-[0.5px]' : 'text-[#0B2545]'}`}>
                      {lang === 'am' && q.amharicQuestion ? q.amharicQuestion : q.question}
                    </h3>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {!isLocked && (
                      <AIVoiceButton
                        id={`q-${q.id}`}
                        textToRead={q.question}
                        variant="compact"
                        label="Listen to Question"
                      />
                    )}
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
                    
                    {/* STAR Grid Header with AI Voice Narration */}
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h4 className="text-xs font-black text-[#0B2545] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-[#F2B134]" />
                          <span>STAR Model Answer</span>
                        </h4>

                        <AIVoiceButton
                          id={`star-${q.id}`}
                          textToRead={`Interview Question: ${q.question}. Situation: ${q.starFramework.situation}. Task: ${q.starFramework.task}. Action: ${q.starFramework.action}. Result: ${q.starFramework.result}.`}
                          label="Listen to Full STAR Audio"
                          className="self-start sm:self-auto"
                        />
                      </div>

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
                        Key Evaluator Buzzwords
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
                          <span>Voice Recording Practice</span>
                        </span>

                        {rec && (
                          <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                            Recorded ({rec.durationSeconds}s)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {isRecordingThis ? (
                          <button
                            onClick={stopRecording}
                            className="bg-rose-600 hover:bg-rose-700 text-white font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 animate-pulse shadow min-h-[44px]"
                          >
                            <Square className="w-4 h-4 fill-white" />
                            <span>Stop ({recordingSeconds}s)</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => startRecording(q.id)}
                            className="bg-[#2E86FF] hover:bg-blue-600 text-white font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow min-h-[44px] active:scale-95"
                          >
                            <Mic className="w-4 h-4" />
                            <span>{rec ? 'Re-record Audio' : 'Record Answer'}</span>
                          </button>
                        )}

                        {rec && (
                          <div className="flex items-center gap-2">
                            <audio controls src={rec.audioUrl} className="h-9 max-w-[200px]" />
                            <button
                              onClick={() => handleDeleteRecording(q.id)}
                              className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100"
                              title="Delete Recording"
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

      {/* Recordings Tab Content */}
      {internalTab === 'recordings' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-sm font-black text-[#0B2545]">
              My Saved Audio Practice Sessions
            </h3>
            <p className="text-xs text-slate-500">
              Listen back to your speech pacing, clarity, and tone to build airline panel confidence.
            </p>
          </div>

          {Object.keys(recordings).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(recordings).map(([qId, rec]: [string, AudioRecording]) => {
                const matchedQ = INTERVIEW_QUESTIONS.find(item => item.id === qId);

                return (
                  <div key={qId} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-[#2E86FF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        {matchedQ?.category || 'Question'}
                      </span>
                      <h4 className="text-xs font-black text-[#0B2545]">
                        {matchedQ?.question || 'Interview Question'}
                      </h4>
                      <span className="text-[10px] text-slate-400 block">
                        Duration: {rec.durationSeconds}s • {new Date(rec.recordedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <audio controls src={rec.audioUrl} className="h-9" />
                      <button
                        onClick={() => handleDeleteRecording(qId)}
                        className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100"
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
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Mic className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-700">No voice recordings saved yet</p>
              <p className="text-[11px] text-slate-400">Expand any interview question and click "Record Answer" to practice your verbal delivery.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
