import React from 'react';
import { Language, UserProfile } from '../types';
import { Shield, Sparkles, Menu, Crown, Plane } from 'lucide-react';

interface HeaderProps {
  user: UserProfile | null;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenDrawer: () => void;
  onOpenPaywall: () => void;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  lang,
  onLanguageChange,
  onOpenDrawer,
  onOpenPaywall,
  onNavigateHome
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#07192F]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-md">
      {/* Left Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={onNavigateHome}>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Plane className="w-5 h-5 text-slate-950 -rotate-45" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg tracking-tight text-white">SKY PREP</span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Academy
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Aviation Assessment & Interview Suite</p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Language Picker */}
        <select
          value={lang}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          aria-label="Select Language"
          className="bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-400 transition"
        >
          <option value="en">English (EN)</option>
          <option value="am">አማርኛ (AM)</option>
          <option value="or">Afaan Oromoo (OR)</option>
          <option value="ti">ትግርኛ (TI)</option>
        </select>

        {/* Premier Status */}
        {user?.isPremier ? (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-sm">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>PREMIER PASS</span>
          </div>
        ) : (
          <button
            onClick={onOpenPaywall}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upgrade (99 ETB)</span>
            <span className="sm:hidden">99 ETB</span>
          </button>
        )}

        {/* Side Drawer Toggle */}
        <button
          onClick={onOpenDrawer}
          type="button"
          aria-label="Open Navigation Menu"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
