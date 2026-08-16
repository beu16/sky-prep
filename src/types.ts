export type ExamCategory = 
  | 'English' 
  | 'Numerical Reasoning' 
  | 'Verbal Reasoning' 
  | 'General Knowledge' 
  | 'Technical Aptitude' 
  | 'Aviation Safety & Regulations' 
  | 'Customer & Flight Operations';

export type AviationRole = 'Cabin Crew' | 'Pilot / Cadet' | 'Aircraft Maintenance (AMT)' | 'Ground Operations' | 'All';

export type TrainingSchool = 
  | 'CABIN CREW TRAINING SCHOOL'
  | 'PILOT TRAINING SCHOOL'
  | 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL'
  | 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL';

export interface TrainingSchoolOption {
  id: TrainingSchool;
  name: string;
  amharicName: string;
  role: AviationRole;
  programs: string[];
  disabled?: boolean;
}

export const TRAINING_SCHOOLS_DATA: TrainingSchoolOption[] = [
  {
    id: 'CABIN CREW TRAINING SCHOOL',
    name: 'Cabin Crew Training School',
    amharicName: 'የበረራ አስተናጋጅ ስልጠና ትምህርት ቤት',
    role: 'Cabin Crew',
    programs: [
      'CABIN CREW TRAINEE (ET-SPONSORED)'
    ]
  },
  {
    id: 'PILOT TRAINING SCHOOL',
    name: 'Pilot Training School',
    amharicName: 'የአብራሪዎች ስልጠና ትምህርት ቤት',
    role: 'Pilot / Cadet',
    programs: [
      'TRAINEE PILOT (ET-SPONSORED)'
    ]
  },
  {
    id: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    name: 'Aircraft Maintenance Technician Training School',
    amharicName: 'የአውሮፕላን ጥገና ቴክኒሻን ስልጠና ትምህርት ቤት',
    role: 'Aircraft Maintenance (AMT)',
    programs: [
      'A/C MECHANIC',
      'A/C MAINTENANCE TECHNICIAN',
      'A/C POWERPLANT TECHNICIAN',
      'A/C STRUCTURE TECHNICIAN',
      'A/C AVIONICS TECHNICIAN',
      'A/C CABIN MAINTENANCE',
      'A/C AIRFRAME TECHNICIAN'
    ]
  },
  {
    id: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    name: 'Commercial and Ground Service Training School (Selection Disabled)',
    amharicName: 'የንግድ እና የመሬት ላይ አገልግሎት ስልጠና ትምህርት ቤት (የተዘጋ)',
    role: 'Ground Operations',
    disabled: true,
    programs: [
      'PASSENGER HANDLING & CUSTOMER SERVICE',
      'RAMP OPERATIONS & BAGGAGE HANDLING',
      'FLIGHT DISPATCH & FLIGHT OPERATIONS',
      'CARGO OPERATIONS & LOGISTICS',
      'TICKETING, RESERVATIONS & SALES',
      'AIRPORT SECURITY & GROUND SUPPORT'
    ]
  }
];

export type Language = 'en' | 'am';

export interface UserProfile {
  id: string;
  phone_number: string;
  password?: string;
  full_name?: string;
  training_school?: TrainingSchool | string;
  training_program?: string;
  department?: string;
  field?: string;
  stage?: string;
  email?: string;
  is_paid: boolean;
  paid_at?: string | null;
  interested_to_upgrade?: boolean;
  upgrade_interest_at?: string;
  free_exam_used: boolean;
  selected_role?: AviationRole;
  created_at: string;
}

export interface ExamQuestion {
  id: string;
  category: ExamCategory;
  role?: AviationRole;
  training_school?: TrainingSchool | string;
  training_program?: string;
  question: string;
  amharicQuestion?: string;
  options: string[];
  amharicOptions?: string[];
  correctIndex: number;
  explanation: string;
  amharicExplanation?: string;
}

export interface ExamAttempt {
  id: string;
  user_id: string;
  category: ExamCategory;
  role?: AviationRole;
  score: number;
  total_questions: number;
  time_taken_seconds: number;
  completed_at: string;
}

export interface GroupDiscussionTopic {
  id: string;
  role?: AviationRole;
  training_school?: TrainingSchool | string;
  title: string;
  amharicTitle?: string;
  scenario: string;
  amharicScenario?: string;
  evaluatorCriteria: string[];
  dos: string[];
  donts: string[];
  starterPhrases: string[];
}

export interface StarFramework {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface InterviewQuestion {
  id: string;
  role?: AviationRole;
  training_school?: TrainingSchool | string;
  question: string;
  amharicQuestion?: string;
  category: 'Aviation Knowledge' | 'Behavioral & Scenario' | 'Customer Service' | 'Leadership & Pressure';
  isFreePreview: boolean;
  starFramework: StarFramework;
  keyPhrases: string[];
}

export interface PaymentSubmission {
  id: string;
  user_id: string;
  telebirr_transaction_id: string;
  receipt_image_url: string;
  amount_claimed: number;
  status: 'pending' | 'verified' | 'rejected' | 'duplicate';
  submitted_at: string;
  verified_at?: string | null;
  rejection_reason?: string | null;
}

export interface AudioRecording {
  questionId: string;
  audioUrl: string;
  recordedAt: string;
  durationSeconds: number;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  merchantNumber: string;
}
