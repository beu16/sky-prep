import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Pause, Play, Sparkles, Sliders } from 'lucide-react';
import { aiVoice, VoicePlaybackState } from '../services/aiVoice';

interface AIVoiceButtonProps {
  id: string;
  textToRead: string;
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'compact';
}

export const AIVoiceButton: React.FC<AIVoiceButtonProps> = ({
  id,
  textToRead,
  label = 'Listen with AI Voice',
  className = '',
  variant = 'primary',
}) => {
  const [playbackState, setPlaybackState] = useState<VoicePlaybackState>({
    isPlaying: false,
    isPaused: false,
    currentText: '',
    activeId: null,
    rate: 0.95,
  });

  useEffect(() => {
    const unsubscribe = aiVoice.subscribe(setPlaybackState);
    return () => unsubscribe();
  }, []);

  const isCurrentActive = playbackState.activeId === id;
  const isCurrentlyPlaying = isCurrentActive && playbackState.isPlaying && !playbackState.isPaused;
  const isCurrentlyPaused = isCurrentActive && playbackState.isPaused;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentlyPlaying) {
      aiVoice.pause();
    } else if (isCurrentlyPaused) {
      aiVoice.resume();
    } else {
      aiVoice.speak(id, textToRead);
    }
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    aiVoice.stop();
  };

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleClick}
          className={`p-2 rounded-xl transition-all flex items-center justify-center min-h-[36px] min-w-[36px] ${
            isCurrentlyPlaying
              ? 'bg-blue-600 text-white ring-2 ring-blue-400/50 shadow-md animate-pulse'
              : isCurrentlyPaused
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-blue-50 text-[#2E86FF] hover:bg-blue-100 border border-blue-200 shadow-sm'
          } ${className}`}
          title={isCurrentlyPlaying ? 'Pause Audio' : 'Play Smooth AI Voice'}
          aria-label={label}
        >
          {isCurrentlyPlaying ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : isCurrentlyPaused ? (
            <Play className="w-4 h-4 fill-white" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        {isCurrentActive && (
          <button
            onClick={handleStop}
            className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100"
            title="Stop narration"
          >
            <VolumeX className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`} onClick={(e) => e.stopPropagation()}>
      <button
        onClick={handleClick}
        className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm min-h-[40px] active:scale-95 ${
          isCurrentlyPlaying
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white ring-2 ring-blue-400 shadow-md'
            : isCurrentlyPaused
            ? 'bg-amber-500 text-white shadow-md'
            : variant === 'secondary'
            ? 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            : 'bg-blue-50 hover:bg-blue-100 text-[#2E86FF] border border-blue-200'
        }`}
      >
        {isCurrentlyPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-white rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-0.5 h-3 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-0.5 h-3 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
            <span>AI Voice Speaking...</span>
            <Pause className="w-3.5 h-3.5 ml-1 fill-white" />
          </>
        ) : isCurrentlyPaused ? (
          <>
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Resume AI Voice</span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <Volume2 className="w-3.5 h-3.5 text-[#2E86FF]" />
            <span>{label}</span>
          </>
        )}
      </button>

      {isCurrentActive && (
        <button
          onClick={handleStop}
          className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-50 border border-slate-200 transition-colors"
          title="Stop Speech"
        >
          <VolumeX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export const AIVoiceSpeedControl: React.FC = () => {
  const [rate, setRate] = useState(0.95);
  const [showOptions, setShowOptions] = useState(false);

  const rates = [
    { label: '0.85x (Slow)', val: 0.85 },
    { label: '0.95x (Natural)', val: 0.95 },
    { label: '1.05x (Brisk)', val: 1.05 },
  ];

  const handleSelectRate = (val: number) => {
    setRate(val);
    aiVoice.setRate(val);
    setShowOptions(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5 transition-colors"
      >
        <Sliders className="w-3 h-3 text-slate-500" />
        <span>Voice Speed: {rate}x</span>
      </button>

      {showOptions && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-50 min-w-[130px] space-y-0.5">
          {rates.map(r => (
            <button
              key={r.val}
              onClick={() => handleSelectRate(r.val)}
              className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                rate === r.val ? 'bg-blue-50 text-[#2E86FF] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
