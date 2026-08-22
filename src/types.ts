export type Language = 'en' | 'am' | 'or' | 'ti';

export type AviationRole = 'cabin_crew' | 'pilot' | 'amt' | 'commercial';

export type TrainingSchool = 'cabin_crew' | 'pilot' | 'amt' | 'commercial';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: AviationRole;
  school: TrainingSchool;
  isPremier: boolean;
  premierExpiresAt?: string;
  targetAirline: string;
  candidateNumber: string;
  completedExams: number;
  averageScore: number;
  streakDays: number;
  lastActive: string;
  avatarSeed?: string;
  created_at?: string;
}

export interface ExamQuestion {
  id: string;
  school: TrainingSchool;
  category: 'aviation_knowledge' | 'english_communication' | 'situational_judgment' | 'technical_aptitude' | 'safety_security';
  question: {
    en: string;
    am: string;
    or: string;
    ti: string;
  };
  options: {
    en: string[];
    am: string[];
    or: string[];
    ti: string[];
  };
  correctAnswer: number;
  explanation: {
    en: string;
    am: string;
    or: string;
    ti: string;
  };
  audioText?: string;
}

export interface ExamAttempt {
  id: string;
  userId: string;
  school: TrainingSchool;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  date: string;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
}

export interface InterviewQuestion {
  id: string;
  school: TrainingSchool;
  title: {
    en: string;
    am: string;
    or: string;
    ti: string;
  };
  question: {
    en: string;
    am: string;
    or: string;
    ti: string;
  };
  competency: string;
  starFramework: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  bestModelAnswer: {
    en: string;
    am: string;
    or: string;
    ti: string;
  };
  evaluatorChecklist: string[];
  audioScript?: string;
}

export interface GroupDiscussionTopic {
  id: string;
  school: TrainingSchool;
  title: {
    en: string;
    am: string;
    or: string;
    ti: string;
  };
  scenario: {
    en: string;
    am: string;
    or: string;
    ti: string;
  };
  recommendedRoles: string[];
  keyStrategies: string[];
  winningStatements: {
    en: string[];
    am: string[];
    or: string[];
    ti: string[];
  };
  pitfallsToAvoid: string[];
}

export interface TelebirrTransaction {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  transactionId: string;
  amount: number;
  receiverPhone: string;
  receiverName: string;
  screenshotUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  verifiedAt?: string;
  notes?: string;
}
