import React, { useState } from 'react';
import { UserProfile, AviationRole, Language } from '../types';
import { TRANSLATION } from '../data/translations';
import { SideDrawer } from './SideDrawer';
import { Shield, Sparkles, Globe, Menu, Bell, Home, BookOpen, Mic, BarChart3, User, Crown } from 'lucide-react';

interface HeaderProps {
  user: UserProfile | null;
  activeTab: 'home' | 'practice' | 'interview' | 'progress' | 'profile';
  setActiveTab: (tab: 'home' | 'practice' | 'interview' | 'progress' | 'profile') => void;
  selectedRole: AviationRole;
  setSelectedRole: (role: AviationRole) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenGD: () => void;
  onOpenPaywall: () => void;
  onOpenDbConfig: () => void;
  onOpenAdmin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activeTab,
  setActiveTab,
  selectedRole,
  setSelectedRole,
  lang,
  setLang,
  onOpenGD,
  onOpenPaywall,
  onOpenDbConfig,
  onOpenAdmin,
  onLogout,
}) => {
  const t = TRANSLATION[lang];
  const isPaid = user?.is_paid;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const bottomNavItems = [
    { id: 'home' as const, label: lang === 'en' ? 'Home' : 'ዋና ገጽ', icon: Home },
    { id: 'practice' as const, label: lang === 'en' ? 'Practice' : 'ልምምድ', icon: BookOpen },
    { id: 'interview' as const, label: lang === 'en' ? 'Interview' : 'ቃለ-መጠይቅ', icon: Mic },
    { id: 'progress' as const, label: lang === 'en' ? 'Progress' : 'ውጤት', icon: BarChart3 },
    { id: 'profile' as const, label: lang === 'en' ? 'Profile' : 'መገለጫ', icon: User },
  ];

  return (
    <>
      <header className="bg-[#0B2545] text-white sticky top-0 z-40 border-b border-slate-800 shadow-lg">
        
        {/* Top Header Bar */}
        <div className="max-w-7xl mx-auto px-2.5 sm:px-4 h-16 flex items-center justify-between gap-1.5 sm:gap-3 overflow-hidden">
          
          {/* Left: Hamburger Drawer Button + Logo & Title */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {user && (
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="p-1.5 sm:p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-all min-h-[40px] flex items-center justify-center"
                title="Open Navigation Menu"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F2B134] text-[#0B2545] flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform shrink-0">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 fill-[#0B2545]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-black tracking-tight text-white leading-none whitespace-nowrap">Sky Prep</span>
                  {isPaid ? (
                    <span className="text-[8px] sm:text-[9px] font-black bg-[#F2B134]/20 text-[#F2B134] border border-[#F2B134]/40 px-1 sm:px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                      PREMIUM
                    </span>
                  ) : (
                    <span className="text-[8px] sm:text-[9px] font-black bg-[#2E86FF]/30 text-blue-300 border border-blue-400/30 px-1 sm:px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                      PRO
                    </span>
                  )}
                </div>
                <p className="hidden sm:block text-[10px] text-slate-300 font-medium leading-none mt-0.5">
                  Get hired-ready.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Center Navigation Tabs */}
          {user && (
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-2xl border border-slate-700/60">
              {bottomNavItems.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-[#2E86FF] text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Controls: Bell Icon, Language Toggle & Premium Badge */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Bell / Notification Button */}
            {user && (
              <button
                onClick={() => {
                  setShowNotificationToast(true);
                  setTimeout(() => setShowNotificationToast(false), 3000);
                }}
                className="p-1.5 sm:p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl transition-all relative min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center shrink-0"
                title="Notifications"
              >
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
                <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2E86FF] animate-pulse" />
              </button>
            )}

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all active:scale-95 shrink-0"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#F2B134]" />
              <span className="font-mono text-[10px] sm:text-[11px]">{lang === 'en' ? 'EN' : 'አማ'}</span>
            </button>

            {/* Premium Unlock CTA or Member Badge */}
            {user && (
              <>
                {isPaid ? (
                  <div className="inline-flex items-center gap-1 bg-[#F2B134]/20 text-[#F2B134] text-[10px] sm:text-xs font-black px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl border border-[#F2B134]/40 shrink-0">
                    <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#F2B134]" />
                    <span>PREMIUM</span>
                  </div>
                ) : (
                  <button
                    onClick={onOpenPaywall}
                    className="bg-[#F2B134] hover:bg-amber-400 text-[#0B2545] font-black text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-xl gold-glow flex items-center gap-1 transition-all active:scale-95 whitespace-nowrap min-h-[36px] shrink-0"
                  >
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#0B2545]" />
                    <span className="hidden sm:inline">Unlock Full Access (99 ETB)</span>
                    <span className="sm:hidden">99 ETB</span>
                  </button>
                )}
              </>
            )}

          </div>

        </div>

        {/* Mobile 5-Item Bottom Navigation Bar */}
        {user && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B2545]/95 backdrop-blur-md border-t border-slate-800 z-50 px-1 py-1.5 flex items-center justify-around text-slate-400 shadow-2xl">
            {bottomNavItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all min-h-[48px] flex-1 ${
                    isActive ? 'text-[#2E86FF] font-black' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#2E86FF]' : ''}`} />
                  <span className={`text-[10px] ${isActive ? 'text-white font-extrabold' : 'font-medium'}`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-[#2E86FF] mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        )}

      </header>

      {/* Notification Toast */}
      {showNotificationToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#0B2545] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-bounce">
          <Bell className="w-4 h-4 text-[#F2B134]" />
          <span>New practice questions added for Cabin Crew & Ground Ops!</span>
        </div>
      )}

      {/* Side Menu Drawer */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGD={onOpenGD}
        onOpenPaywall={onOpenPaywall}
        onOpenHelp={() => {
          if (typeof window !== 'undefined') {
            window.open('https://t.me/skywardsupports', '_blank', 'noopener,noreferrer');
          }
        }}
        onOpenAbout={() => alert('Sky Prep — Get hired-ready. Professional aviation career preparation suite.')}
        onLogout={onLogout}
        lang={lang}
      />
    </>
  );
};
