import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Square, Sparkles } from 'lucide-react';
import { aiVoiceService } from '../services/aiVoice';

interface AIVoiceButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export const AIVoiceButton: React.FC<AIVoiceButtonProps> = ({
  text,
  label = 'Listen with AI Voice',
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      aiVoiceService.stop();
    };
  }, []);

  const handleToggle = () => {
    if (isPlaying) {
      aiVoiceService.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      aiVoiceService.speak(text, {
        rate: 0.95,
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false)
      });
    }
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold text-xs transition-all shadow-sm ${
        isPlaying
          ? 'bg-amber-500 text-slate-950 animate-pulse'
          : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700'
      } ${className}`}
    >
      {isPlaying ? (
        <>
          <Square className="w-3.5 h-3.5 fill-current" />
          <span>Stop Audio</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
