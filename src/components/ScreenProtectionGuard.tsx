import React, { useEffect, useState } from 'react';
import { ShieldAlert, EyeOff, Lock, AlertTriangle } from 'lucide-react';
import { UserProfile } from '../types';

interface ScreenProtectionGuardProps {
  children: React.ReactNode;
  user?: UserProfile | null;
}

export const ScreenProtectionGuard: React.FC<ScreenProtectionGuardProps> = ({ children, user }) => {
  const [isObscured, setIsObscured] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  useEffect(() => {
    // 1. Prevent Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerWarning('Right-click & image saving are disabled for exam security.');
      return false;
    };

    // 2. Intercept Screenshot & DevTools Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      // PrintScreen key
      if (key === 'PrintScreen' || key === 'PrtSc' || e.keyCode === 44) {
        e.preventDefault();
        setIsObscured(true);
        triggerWarning('Screenshots are prohibited on Sky Prep Aviation Platform.');
        // Attempt to overwrite clipboard
        if (navigator.clipboard) {
          navigator.clipboard.writeText('PROTECTED AVIATION ASSESSMENT CONTENT').catch(() => {});
        }
        return false;
      }

      // F12 (DevTools)
      if (key === 'F12') {
        e.preventDefault();
        triggerWarning('Developer tools are disabled during assessment sessions.');
        return false;
      }

      if (isCmdOrCtrl) {
        // Ctrl/Cmd + P (Print)
        if (key.toLowerCase() === 'p') {
          e.preventDefault();
          triggerWarning('Printing assessment pages is strictly prohibited.');
          return false;
        }

        // Ctrl/Cmd + S (Save Page)
        if (key.toLowerCase() === 's') {
          e.preventDefault();
          triggerWarning('Saving assessment pages is prohibited.');
          return false;
        }

        // Ctrl/Cmd + Shift + I/C/J/S (DevTools & Mac Screenshots)
        if (e.shiftKey) {
          if (['i', 'c', 'j', 's', '3', '4', '5'].includes(key.toLowerCase())) {
            e.preventDefault();
            setIsObscured(true);
            triggerWarning('Screen capture shortcuts are restricted.');
            return false;
          }
        }
      }
    };

    // 3. Obscure screen when page is truly hidden (tab switch or backgrounded)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsObscured(true);
      } else {
        setIsObscured(false);
      }
    };

    // 4. Prevent Dragging Images
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  const triggerWarning = (msg: string) => {
    setWarningMessage(msg);
    setTimeout(() => {
      setWarningMessage(null);
    }, 4000);
  };

  const candidateInfo = user
    ? `${user.full_name || 'Candidate'} • ${user.phone_number || ''} • SKY PREP PROTECTED`
    : 'SKY PREP AVIATION ASSESSMENT • CONFIDENTIAL & PROTECTED';

  return (
    <div className="relative min-h-screen select-none overflow-x-hidden">
      
      {/* Dynamic Anti-Recording Security Watermark Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 flex flex-wrap items-center justify-around opacity-[0.06] select-none overflow-hidden"
        aria-hidden="true"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <div 
            key={i} 
            className="transform -rotate-25 text-slate-900 font-mono font-black text-xs sm:text-sm tracking-widest uppercase p-6 whitespace-nowrap"
          >
            {candidateInfo}
          </div>
        ))}
      </div>

      {/* Screen Protection Alert Toast */}
      {warningMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-rose-950 text-rose-100 border border-rose-500/80 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-extrabold max-w-md w-[90%] animate-bounce">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{warningMessage}</span>
        </div>
      )}

      {/* Window Blur / Screen Capture Blur Shield */}
      {isObscured && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center text-white space-y-4 transition-all duration-200">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center animate-pulse">
            <EyeOff className="w-8 h-8" />
          </div>

          <div className="space-y-1.5 max-w-md">
            <div className="inline-flex items-center gap-1.5 bg-rose-500/30 text-rose-300 font-extrabold text-[10px] px-3 py-1 rounded-full border border-rose-500/40 uppercase tracking-widest">
              <Lock className="w-3.5 h-3.5" />
              <span>CONTENT PROTECTION ACTIVE</span>
            </div>
            <h2 className="text-xl font-black text-white">
              Screen Capture & Recording Restricted
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Assessment materials, exam questions, and candidate profiles are protected against unauthorized capture and recording. Return focus to this window to resume.
            </p>
          </div>

          <button
            onClick={() => setIsObscured(false)}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Click to Resume Sky Prep</span>
          </button>
        </div>
      )}

      {/* Main App Content */}
      <div className={isObscured ? 'blur-2xl pointer-events-none' : ''}>
        {children}
      </div>

    </div>
  );
};
