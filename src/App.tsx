import React, { useState, useEffect } from 'react';
import { UserProfile, Language, TrainingSchool, ExamAttempt } from './types';
import { getStoredUser, saveStoredUser, saveExamAttempt, getStoredExamAttempts } from './services/supabase';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HomeScreen } from './components/HomeScreen';
import { ExamScreen } from './components/ExamScreen';
import { InterviewPrepScreen } from './components/InterviewPrepScreen';
import { GroupDiscussionScreen } from './components/GroupDiscussionScreen';
import { PaywallModal } from './components/PaywallModal';
import { VerifiedReadyCertificate } from './components/VerifiedReadyCertificate';
import { SideDrawer } from './components/SideDrawer';

type ViewMode = 'welcome' | 'home' | 'exam' | 'interview' | 'group_discussion';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<ViewMode>('welcome');
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Initialize or load user profile from storage
  useEffect(() => {
    const existing = getStoredUser();
    if (existing) {
      setUser(existing);
      setCurrentView('home');
    }
  }, []);

  const handleSelectSchool = (school: TrainingSchool) => {
    let updated: UserProfile;
    if (user) {
      updated = { ...user, school, role: school };
    } else {
      updated = {
        id: 'usr_' + Date.now(),
        name: 'Aviation Candidate',
        phone: '0912345678',
        role: school,
        school: school,
        isPremier: false,
        targetAirline: 'Ethiopian Airlines & Star Alliance',
        candidateNumber: 'ET-CAD-' + Math.floor(1000 + Math.random() * 9000),
        completedExams: 0,
        averageScore: 85,
        streakDays: 1,
        lastActive: new Date().toISOString()
      };
    }
    setUser(updated);
    saveStoredUser(updated);
    setCurrentView('home');
  };

  const handleFinishExam = (attempt: ExamAttempt) => {
    saveExamAttempt(attempt);
    if (user) {
      const attempts = getStoredExamAttempts();
      const avg = Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length);
      const updated: UserProfile = {
        ...user,
        completedExams: user.completedExams + 1,
        averageScore: avg,
        lastActive: new Date().toISOString()
      };
      setUser(updated);
      saveStoredUser(updated);
    }
  };

  const handleUpgradeSuccess = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    saveStoredUser(updatedUser);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#071224] text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Header */}
      <Header
        user={user}
        lang={lang}
        onLanguageChange={setLang}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenPaywall={() => setIsPaywallOpen(true)}
        onNavigateHome={() => setCurrentView(user ? 'home' : 'welcome')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'welcome' && (
          <WelcomeScreen
            lang={lang}
            onSelectSchool={handleSelectSchool}
            onOpenPaywall={() => setIsPaywallOpen(true)}
          />
        )}

        {currentView === 'home' && user && (
          <HomeScreen
            user={user}
            lang={lang}
            onStartExam={() => setCurrentView('exam')}
            onOpenPractice={() => setCurrentView('exam')}
            onOpenInterview={() => setCurrentView('interview')}
            onOpenGroupDiscussion={() => setCurrentView('group_discussion')}
            onOpenPaywall={() => setIsPaywallOpen(true)}
            onSelectSchool={handleSelectSchool}
            onViewCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {currentView === 'exam' && user && (
          <ExamScreen
            user={user}
            lang={lang}
            onFinishExam={handleFinishExam}
            onExit={() => setCurrentView('home')}
          />
        )}

        {currentView === 'interview' && user && (
          <InterviewPrepScreen
            user={user}
            lang={lang}
            onExit={() => setCurrentView('home')}
            onOpenPaywall={() => setIsPaywallOpen(true)}
          />
        )}

        {currentView === 'group_discussion' && user && (
          <GroupDiscussionScreen
            user={user}
            lang={lang}
            onExit={() => setCurrentView('home')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Side Navigation Drawer */}
      <SideDrawer
        isOpen={isDrawerOpen}
        user={user}
        lang={lang}
        onClose={() => setIsDrawerOpen(false)}
        onNavigateHome={() => setCurrentView(user ? 'home' : 'welcome')}
        onStartExam={() => setCurrentView('exam')}
        onOpenInterview={() => setCurrentView('interview')}
        onOpenGroupDiscussion={() => setCurrentView('group_discussion')}
        onOpenPaywall={() => setIsPaywallOpen(true)}
        onViewCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Telebirr Paywall Modal */}
      <PaywallModal
        isOpen={isPaywallOpen}
        user={user}
        lang={lang}
        onClose={() => setIsPaywallOpen(false)}
        onSuccess={handleUpgradeSuccess}
      />

      {/* Official Readiness Certificate Modal */}
      {isCertificateOpen && user && (
        <VerifiedReadyCertificate
          user={user}
          lang={lang}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}
    </div>
  );
};
export default App;
