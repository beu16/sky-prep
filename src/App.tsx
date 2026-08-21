/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Home, BookOpen, MessageSquare, TrendingUp, User as UserIcon } from 'lucide-react';
import { UserProfile, ExamAttempt, AviationRole, Language, TrainingSchool } from './types';
import { getStoredUserProfile, saveUserProfile, getStoredExamAttempts } from './services/supabase';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeScreen } from './components/HomeScreen';
import { PracticeScreen } from './components/PracticeScreen';
import { ExamScreen } from './components/ExamScreen';
import { GroupDiscussionScreen } from './components/GroupDiscussionScreen';
import { InterviewPrepScreen } from './components/InterviewPrepScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { PaywallModal } from './components/PaywallModal';
import { PaymentFlowScreen } from './components/PaymentFlowScreen';
import { AdminVerificationModal } from './components/AdminVerificationModal';
import { VerifiedReadyCertificate } from './components/VerifiedReadyCertificate';
import { ScreenProtectionGuard } from './components/ScreenProtectionGuard';
import { Footer } from './components/Footer';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [screen, setScreen] = useState<'welcome' | 'auth' | 'main' | 'payment'>('welcome');
  const [activeTab, setActiveTab] = useState<'home' | 'practice' | 'interview' | 'progress' | 'profile'>('home');
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [selectedRole, setSelectedRole] = useState<AviationRole>('All');
  const [lang, setLang] = useState<Language>('en');

  // Track preset from WelcomeScreen
  const [authPreset, setAuthPreset] = useState<{
    school?: TrainingSchool;
    program?: string;
    role?: AviationRole;
  }>({});

  // GD Guide View Toggle inside Practice
  const [showGDGuide, setShowGDGuide] = useState(false);

  // Modals
  const [showPaywall, setShowPaywall] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showExamScreen, setShowExamScreen] = useState(false);

  // Initialize stored user & attempts on boot
  useEffect(() => {
    const existing = getStoredUserProfile();
    if (existing) {
      setUser(existing);
      if (existing.selected_role) {
        setSelectedRole(existing.selected_role);
      }
      setScreen('main');
      const userAttempts = getStoredExamAttempts(existing.id);
      setAttempts(userAttempts);
    }
  }, []);

  // Scroll to top of the page smoothly when changing tabs, screens, or sub-views
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [activeTab, screen, showExamScreen, showGDGuide]);

  const refreshUser = () => {
    const current = getStoredUserProfile();
    if (current) {
      setUser({ ...current });
      if (current.selected_role) {
        setSelectedRole(current.selected_role);
      }
      const userAttempts = getStoredExamAttempts(current.id);
      setAttempts([...userAttempts]);
    }
  };

  const handleAuthenticated = (profile: UserProfile) => {
    setUser(profile);
    if (profile.selected_role) {
      setSelectedRole(profile.selected_role);
    }
    setScreen('main');
    const userAttempts = getStoredExamAttempts(profile.id);
    setAttempts(userAttempts);
  };

  const handleLogout = () => {
    localStorage.removeItem('skyprep_current_user_profile');
    setUser(null);
    setScreen('welcome');
    setActiveTab('home');
    setShowExamScreen(false);
    setShowGDGuide(false);
  };

  const handleAttemptSaved = (newAttempt: ExamAttempt) => {
    setAttempts(prev => [...prev, newAttempt]);
    refreshUser();
  };

  const handlePaymentSuccess = () => {
    refreshUser();
    setScreen('main');
    setShowPaywall(false);
  };

  return (
    <ScreenProtectionGuard user={user}>
      <div className="min-h-screen max-w-full overflow-x-hidden bg-[#F7F9FC] text-slate-900 flex flex-col font-sans selection:bg-blue-200">
        
        {/* Header Bar */}
        <Header
          user={user}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setShowExamScreen(false);
            setShowGDGuide(false);
          }}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          lang={lang}
          setLang={setLang}
          onOpenGD={() => {
            setActiveTab('practice');
            setShowGDGuide(true);
          }}
          onOpenPaywall={() => setShowPaywall(true)}
          onOpenAdmin={() => setShowAdmin(true)}
          onLogout={handleLogout}
        />

      {/* Main Content Area */}
      <main className={`flex-1 w-full max-w-full overflow-x-hidden ${user && screen === 'main' ? 'pb-20 lg:pb-0' : ''}`}>
        {screen === 'welcome' && (
          <WelcomeScreen
            lang={lang}
            setLang={setLang}
            onStart={(school, program, role) => {
              if (typeof school === 'string') {
                setAuthPreset({
                  school,
                  program: typeof program === 'string' ? program : undefined,
                  role: typeof role === 'string' ? role : undefined,
                });
              } else {
                setAuthPreset({});
              }
              setScreen('auth');
            }}
          />
        )}

        {screen === 'auth' && (
          <AuthScreen
            lang={lang}
            initialSchool={authPreset.school}
            initialProgram={authPreset.program}
            initialRole={authPreset.role}
            onAuthenticated={handleAuthenticated}
            onBack={() => setScreen('welcome')}
          />
        )}

        {screen === 'payment' && user && (
          <PaymentFlowScreen
            user={user}
            lang={lang}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={() => setScreen('main')}
            onOpenAdmin={() => setShowAdmin(true)}
            onUserUpdated={(updated) => setUser(updated)}
          />
        )}

        {screen === 'main' && user && (
          <>
            {showExamScreen ? (
              <ExamScreen
                user={user}
                selectedRole={selectedRole}
                lang={lang}
                onAttemptSaved={handleAttemptSaved}
                onOpenPaywall={() => setShowPaywall(true)}
                onBackToHome={() => setShowExamScreen(false)}
              />
            ) : showGDGuide ? (
              <div className="max-w-4xl mx-auto px-4 py-4">
                <button
                  onClick={() => setShowGDGuide(false)}
                  className="mb-4 text-xs font-black text-[#2E86FF] hover:underline flex items-center gap-1"
                >
                  ← Back to Practice
                </button>
                <GroupDiscussionScreen
                  selectedRole={selectedRole}
                  lang={lang}
                />
              </div>
            ) : (
              <>
                {activeTab === 'home' && (
                  <HomeScreen
                    user={user}
                    attempts={attempts}
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                    lang={lang}
                    onStartExam={() => {
                      setActiveTab('practice');
                      setShowExamScreen(true);
                    }}
                    onOpenGD={() => {
                      setActiveTab('practice');
                      setShowGDGuide(true);
                    }}
                    onOpenInterview={() => setActiveTab('interview')}
                    onOpenProgress={() => setActiveTab('progress')}
                    onOpenPaywall={() => setShowPaywall(true)}
                  />
                )}

                {activeTab === 'practice' && (
                  <PracticeScreen
                    user={user}
                    attempts={attempts}
                    lang={lang}
                    onStartExam={() => setShowExamScreen(true)}
                    onOpenGD={() => setShowGDGuide(true)}
                    onOpenPaywall={() => setShowPaywall(true)}
                  />
                )}

                {activeTab === 'interview' && (
                  <InterviewPrepScreen
                    user={user}
                    selectedRole={selectedRole}
                    lang={lang}
                    onOpenPaywall={() => setShowPaywall(true)}
                  />
                )}

                {activeTab === 'progress' && (
                  <ProgressScreen
                    user={user}
                    attempts={attempts}
                    lang={lang}
                    onOpenCertificate={() => setShowCertificate(true)}
                    onOpenPaywall={() => setShowPaywall(true)}
                  />
                )}

                {activeTab === 'profile' && (
                  <ProfileScreen
                    user={user}
                    lang={lang}
                    onOpenPaywall={() => setShowPaywall(true)}
                    onOpenCertificate={() => setShowCertificate(true)}
                    onLogout={handleLogout}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Modern Website Footer */}
      <Footer
        lang={lang}
        onNavigate={(tab) => {
          if (user) {
            setActiveTab(tab);
            setShowExamScreen(false);
            setShowGDGuide(false);
          } else {
            setScreen('auth');
          }
        }}
        onOpenGD={() => {
          if (user) {
            setActiveTab('practice');
            setShowGDGuide(true);
          } else {
            setScreen('auth');
          }
        }}
        onOpenPaywall={() => setShowPaywall(true)}
      />

      {/* Mobile Bottom Navigation Bar (Visible on mobile/tablet screens when logged in) */}
      {user && screen === 'main' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0B2545]/95 backdrop-blur-md border-t border-slate-800/90 py-1.5 px-2 flex justify-around items-center shadow-2xl">
          {[
            { id: 'home', label: lang === 'en' ? 'Home' : 'ዋና', icon: Home },
            { id: 'practice', label: lang === 'en' ? 'Practice' : 'ልምምድ', icon: BookOpen },
            { id: 'interview', label: lang === 'en' ? 'Interview' : 'ቃለ-መጠይቅ', icon: MessageSquare },
            { id: 'progress', label: lang === 'en' ? 'Progress' : 'ውጤት', icon: TrendingUp },
            { id: 'profile', label: lang === 'en' ? 'Profile' : 'መገለጫ', icon: UserIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setShowExamScreen(false);
                  setShowGDGuide(false);
                }}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#F2B134] font-black'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                <span className="text-[10px] mt-0.5 whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Modals & Overlays */}
      {showPaywall && (
        <PaywallModal
          user={user}
          lang={lang}
          onUserUpdated={(updated) => setUser(updated)}
          onProceedToPayment={() => {
            setShowPaywall(false);
            setScreen('payment');
          }}
          onClose={() => setShowPaywall(false)}
        />
      )}

      {showAdmin && (
        <AdminVerificationModal
          onClose={() => setShowAdmin(false)}
          onStatusUpdated={refreshUser}
        />
      )}

      {showCertificate && user && (
        <VerifiedReadyCertificate
          user={user}
          attempts={attempts}
          onClose={() => setShowCertificate(false)}
        />
      )}

      </div>
    </ScreenProtectionGuard>
  );
}
