/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile, ExamAttempt, AviationRole, Language } from './types';
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
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { ScreenProtectionGuard } from './components/ScreenProtectionGuard';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [screen, setScreen] = useState<'welcome' | 'auth' | 'main' | 'payment'>('welcome');
  const [activeTab, setActiveTab] = useState<'home' | 'practice' | 'interview' | 'progress' | 'profile'>('home');
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [selectedRole, setSelectedRole] = useState<AviationRole>('All');
  const [lang, setLang] = useState<Language>('en');

  // GD Guide View Toggle inside Practice
  const [showGDGuide, setShowGDGuide] = useState(false);

  // Modals
  const [showPaywall, setShowPaywall] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showDbConfig, setShowDbConfig] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showExamScreen, setShowExamScreen] = useState(false);

  // Initialize stored user & attempts on boot
  useEffect(() => {
    const existing = getStoredUserProfile();
    if (existing) {
      setUser(existing);
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
      const userAttempts = getStoredExamAttempts(current.id);
      setAttempts([...userAttempts]);
    }
  };

  const handleAuthenticated = (profile: UserProfile) => {
    setUser(profile);
    setScreen('main');
    const userAttempts = getStoredExamAttempts(profile.id);
    setAttempts(userAttempts);
  };

  const handleQuickDemo = () => {
    let demo = getStoredUserProfile();
    if (!demo) {
      demo = {
        id: 'demo_user_101',
        phone_number: '+251 91 123 4567',
        full_name: 'Yared Bekele',
        is_paid: false,
        paid_at: null,
        free_exam_used: false,
        created_at: new Date().toISOString(),
      };
      saveUserProfile(demo);
    }
    setUser(demo);
    setScreen('main');
    const userAttempts = getStoredExamAttempts(demo.id);
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
      <div className="min-h-screen bg-[#F7F9FC] text-slate-900 flex flex-col font-sans selection:bg-blue-200">
        
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
        onOpenDbConfig={() => setShowDbConfig(true)}
        onOpenAdmin={() => setShowAdmin(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {screen === 'welcome' && (
          <WelcomeScreen
            lang={lang}
            setLang={setLang}
            onStart={() => setScreen('auth')}
            onQuickDemo={handleQuickDemo}
          />
        )}

        {screen === 'auth' && (
          <AuthScreen
            lang={lang}
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

      {/* Modals & Overlays */}
      {showPaywall && (
        <PaywallModal
          lang={lang}
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

      {showDbConfig && (
        <SupabaseConfigModal onClose={() => setShowDbConfig(false)} />
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
