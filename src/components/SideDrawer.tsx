import React from 'react';
import { UserProfile, Language } from '../types';
import { Shield, Home, BookOpen, Mic, BarChart3, User, Users, HelpCircle, Info, LogOut, X, Sparkles } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  activeTab: 'home' | 'practice' | 'interview' | 'progress' | 'profile';
  setActiveTab: (tab: 'home' | 'practice' | 'interview' | 'progress' | 'profile') => void;
  onOpenGD: () => void;
  onOpenPaywall: () => void;
  onOpenHelp: () => void;
  onOpenAbout: () => void;
  onLogout: () => void;
  lang: Language;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  user,
  activeTab,
  setActiveTab,
  onOpenGD,
  onOpenPaywall,
  onOpenHelp,
  onOpenAbout,
  onLogout,
  lang,
}) => {
  if (!isOpen) return null;

  const isPaid = user?.is_paid;

  const navItems = [
    { id: 'home' as const, label: lang === 'en' ? 'Home' : 'ዋና ገጽ', icon: Home },
    { id: 'practice' as const, label: lang === 'en' ? 'Practice' : 'ልምምድ', icon: BookOpen },
    { id: 'interview' as const, label: lang === 'en' ? 'Interview' : 'ቃለ-መጠይቅ', icon: Mic },
    { id: 'progress' as const, label: lang === 'en' ? 'Progress' : 'ውጤት', icon: BarChart3 },
    { id: 'profile' as const, label: lang === 'en' ? 'Profile' : 'መገለጫ', icon: User },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      {/* Side Menu Drawer Container */}
      <div className="relative w-80 max-w-[85vw] bg-[#0B2545] text-white h-full flex flex-col justify-between shadow-2xl z-10 border-r border-slate-700/60 overflow-y-auto">
        
        {/* Drawer Header with Cabin Crew Background */}
        <div>
          <div className="relative p-5 border-b border-slate-800 overflow-hidden">
            <img
              src={IMAGES.cabinCrewTeam}
              alt="Cabin Crew Team"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[1px]" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F2B134] text-[#0B2545] flex items-center justify-center font-black shadow-md shrink-0">
                  <Shield className="w-6 h-6 fill-[#0B2545]" />
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-tight text-white">Sky Prep</h2>
                  <p className="text-xs text-slate-200 font-medium">Get hired-ready.</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-slate-300 hover:text-white rounded-xl bg-slate-900/60 hover:bg-slate-800 transition-all min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Status Badge */}
          {user && (
            <div className="mx-4 mt-4 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white truncate max-w-[150px]">
                  {user.full_name || 'Candidate'}
                </p>
                <p className="text-[10px] text-slate-400 font-mono">{user.phone_number}</p>
              </div>

              {isPaid ? (
                <span className="bg-[#F2B134]/20 text-[#F2B134] border border-[#F2B134]/40 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  PREMIUM
                </span>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onOpenPaywall();
                  }}
                  className="bg-[#F2B134] hover:bg-amber-400 text-[#0B2545] text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow transition-all active:scale-95"
                >
                  <Sparkles className="w-3 h-3 fill-[#0B2545]" />
                  <span>99 ETB</span>
                </button>
              )}
            </div>
          )}

          {/* Primary Navigation Links */}
          <nav className="p-4 space-y-1.5 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-extrabold transition-all min-h-[48px] ${
                    isActive
                      ? 'bg-[#2E86FF] text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Group Discussion Link */}
            <button
              onClick={() => {
                onOpenGD();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-extrabold text-slate-300 hover:bg-slate-800/80 hover:text-white transition-all min-h-[48px]"
            >
              <Users className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'en' ? 'Group Discussion' : 'የቡድን ውይይት'}</span>
              <span className="ml-auto text-[10px] font-black bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                FREE
              </span>
            </button>
          </nav>

          <div className="my-2 border-t border-slate-800 mx-4" />

          {/* Secondary Links */}
          <div className="p-4 space-y-1.5">
            <button
              onClick={() => {
                onOpenHelp();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800/80 hover:text-white transition-all min-h-[44px]"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>{lang === 'en' ? 'Help & Support' : 'እርዳታ እና ድጋፍ'}</span>
            </button>

            <button
              onClick={() => {
                onOpenAbout();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800/80 hover:text-white transition-all min-h-[44px]"
            >
              <Info className="w-4 h-4 text-slate-400" />
              <span>{lang === 'en' ? 'About Sky Prep' : 'ስለ Sky Prep'}</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer / Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-black text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all min-h-[44px]"
          >
            <LogOut className="w-4 h-4" />
            <span>{lang === 'en' ? 'Log Out' : 'ውጣ'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
