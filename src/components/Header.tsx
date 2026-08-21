import React, { useState } from 'react';
import { UserProfile, AviationRole, Language } from '../types';
import { TRANSLATION } from '../data/translations';
import { SideDrawer } from './SideDrawer';
import { Shield, Sparkles, Globe, Menu, Bell, Home, BookOpen, Mic, BarChart3, User, Crown, Users, LogOut, ChevronDown } from 'lucide-react';

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
  onOpenAdmin,
  onLogout,
}) => {
  const t = TRANSLATION[lang];
  const isPaid = user?.is_paid;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const navItems = [
    { id: 'home' as const, label: lang === 'en' ? 'Dashboard' : 'ዳሽቦርድ', icon: Home },
    { id: 'practice' as const, label: lang === 'en' ? 'Exams & Practice' : 'ፈተናዎችና ልምምድ', icon: BookOpen },
    { id: 'interview' as const, label: lang === 'en' ? 'STAR Interview' : 'STAR ቃለ-መጠይቅ', icon: Mic },
    { id: 'progress' as const, label: lang === 'en' ? 'Analytics & Cert' : 'ውጤትና ሰርተፊኬት', icon: BarChart3 },
    { id: 'profile' as const, label: lang === 'en' ? 'Candidate Profile' : 'የእጩ መገለጫ', icon: User },
  ];

  const rolesList: AviationRole[] = ['All', 'Cabin Crew', 'Pilot / Cadet', 'Aircraft Maintenance (AMT)', 'Ground Operations'];

  return (
    <>
      <header className="bg-[#0B2545] text-white sticky top-0 z-40 border-b border-slate-800 shadow-md w-full overflow-hidden">
        
        {/* Top Portal Banner (Website Header) */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4 w-full">
          
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {user && (
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="lg:hidden p-1.5 sm:p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/80 transition-all flex items-center justify-center shrink-0"
                title="Open Navigation Menu"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group min-w-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#F2B134] to-amber-500 text-[#0B2545] flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform shrink-0">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 fill-[#0B2545]" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-xl font-black tracking-tight text-white leading-none truncate">
                    Sky Prep
                  </span>
                  {isPaid ? (
                    <span className="text-[9px] sm:text-[10px] font-black bg-[#F2B134]/20 text-[#F2B134] border border-[#F2B134]/40 px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                      PREMIUM
                    </span>
                  ) : (
                    <span className="hidden xs:inline-flex text-[9px] sm:text-[10px] font-black bg-[#2E86FF]/30 text-blue-300 border border-blue-400/30 px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                      CANDIDATE
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 font-medium leading-tight mt-0.5 hidden md:block truncate">
                  Aviation Assessment & Academy Preparation Portal
                </p>
              </div>
            </div>
          </div>

          {/* Center: Desktop Website Navigation Tabs */}
          {user && (
            <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-2xl border border-slate-700/60 shadow-inner">
              {navItems.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                      isActive
                        ? 'bg-[#2E86FF] text-white shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Controls: Role Selector, Language, Notification, Paywall CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Role Filter Dropdown (Desktop Website feature) */}
            {user && (
              <div className="relative hidden xl:block">
                <button
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <span className="text-slate-400 font-normal">Track:</span>
                  <span className="text-amber-300 font-bold max-w-[110px] truncate">{selectedRole}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showRoleDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn">
                    <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Select Aviation School
                    </div>
                    {rolesList.map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          setSelectedRole(r);
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold transition-all flex items-center justify-between ${
                          selectedRole === r ? 'bg-blue-600/30 text-blue-300 font-black' : 'text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        <span>{r}</span>
                        {selectedRole === r && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
              className="bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 sm:gap-1.5 transition-all active:scale-95 shrink-0"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#F2B134]" />
              <span className="font-mono text-xs">{lang === 'en' ? 'EN' : 'አማ'}</span>
            </button>

            {/* Notification Bell */}
            {user && (
              <button
                onClick={() => {
                  setShowNotificationToast(true);
                  setTimeout(() => setShowNotificationToast(false), 3000);
                }}
                className="p-1.5 sm:p-2 text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 rounded-xl transition-all relative flex items-center justify-center shrink-0"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-slate-300" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2E86FF] animate-pulse" />
              </button>
            )}

            {/* Premium Unlock CTA or Member Badge */}
            {user && (
              <>
                {isPaid ? (
                  <div className="hidden sm:inline-flex items-center gap-1.5 bg-[#F2B134]/20 text-[#F2B134] text-xs font-black px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#F2B134]/40 shrink-0">
                    <Crown className="w-3.5 h-3.5 fill-[#F2B134]" />
                    <span className="hidden xs:inline">PREMIUM PASS</span>
                  </div>
                ) : (
                  <button
                    onClick={onOpenPaywall}
                    className="bg-[#F2B134] hover:bg-amber-400 text-[#0B2545] font-black text-xs px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl gold-glow flex items-center gap-1 sm:gap-1.5 transition-all active:scale-95 whitespace-nowrap shadow-md shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-[#0B2545]" />
                    <span className="hidden sm:inline">Unlock Pass </span>
                    <span>(99 ETB)</span>
                  </button>
                )}
              </>
            )}

            {/* User Logout Button on Top Header */}
            {user && (
              <button
                onClick={onLogout}
                className="hidden md:flex p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800/80 rounded-xl transition-all items-center justify-center"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

          </div>

        </div>

      </header>

      {/* Notification Toast */}
      {showNotificationToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#0B2545] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-bounce">
          <Bell className="w-4 h-4 text-[#F2B134]" />
          <span>New practice questions updated for airline recruitment & academy tracks!</span>
        </div>
      )}

      {/* Side Menu Drawer for Mobile / Tablet */}
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
        onOpenAbout={() => alert('Sky Prep — Get hired-ready. Professional aviation assessment and academy training suite.')}
        onLogout={onLogout}
        lang={lang}
      />
    </>
  );
};
