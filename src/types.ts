export type ExamCategory = 
  | 'English' 
  | 'Numerical Reasoning' 
  | 'Verbal Reasoning' 
  | 'General Knowledge' 
  | 'Technical Aptitude' 
  | 'Aviation Safety & Regulations' 
  | 'Customer & Flight Operations'
  | 'Situational Judgment (SJT)'
  | 'English Vocabulary & Synonyms'
  | 'Grammar & Sentence Correction'
  | 'Reading Comprehension';

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
      'CABIN CREW TRAINEE (AIRLINE-SPONSORED)'
    ]
  },
  {
    id: 'PILOT TRAINING SCHOOL',
    name: 'Pilot Training School',
    amharicName: 'የአብራሪዎች ስልጠና ትምህርት ቤት',
    role: 'Pilot / Cadet',
    programs: [
      'TRAINEE PILOT (AIRLINE-SPONSORED)'
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
    name: 'Commercial and Ground Service Training School',
    amharicName: 'የንግድ እና የመሬት ላይ አገልግሎት ስልጠና ትምህርት ቤት',
    role: 'Ground Operations',
    disabled: false,
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

export interface AviationVacancyItem {
  id: string;
  name: string;
  amharicName?: string;
  schoolId: TrainingSchool;
  schoolName: string;
  role: AviationRole;
  badge: string;
  iconType: 'plane' | 'users' | 'wrench' | 'headphones';
}

export const ALL_AVIATION_VACANCIES: AviationVacancyItem[] = [
  {
    id: 'CABIN CREW TRAINEE (AIRLINE-SPONSORED)',
    name: 'Cabin Crew Trainee (Airline-Sponsored)',
    amharicName: 'የበረራ አስተናጋጅ ተለማማጅ (በአየር መንገድ ወጪ)',
    schoolId: 'CABIN CREW TRAINING SCHOOL',
    schoolName: 'Cabin Crew Training School',
    role: 'Cabin Crew',
    badge: 'In-Flight Crew',
    iconType: 'users',
  },
  {
    id: 'TRAINEE PILOT (AIRLINE-SPONSORED)',
    name: 'Trainee Pilot (Airline-Sponsored)',
    amharicName: 'ተለማማጅ ፓይለት / አብራሪ (በአየር መንገድ ወጪ)',
    schoolId: 'PILOT TRAINING SCHOOL',
    schoolName: 'Pilot Training School',
    role: 'Pilot / Cadet',
    badge: 'Flight Deck',
    iconType: 'plane',
  },
  {
    id: 'A/C MECHANIC',
    name: 'A/C Mechanic',
    amharicName: 'የአውሮፕላን መካኒክ',
    schoolId: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    schoolName: 'Aircraft Maintenance Technician Training School',
    role: 'Aircraft Maintenance (AMT)',
    badge: 'AMT School',
    iconType: 'wrench',
  },
  {
    id: 'A/C MAINTENANCE TECHNICIAN',
    name: 'A/C Maintenance Technician',
    amharicName: 'የአውሮፕላን ጥገና ቴክኒሻን',
    schoolId: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    schoolName: 'Aircraft Maintenance Technician Training School',
    role: 'Aircraft Maintenance (AMT)',
    badge: 'AMT School',
    iconType: 'wrench',
  },
  {
    id: 'A/C POWERPLANT TECHNICIAN',
    name: 'A/C Powerplant Technician',
    amharicName: 'የአውሮፕላን ሞተር ቴክኒሻን',
    schoolId: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    schoolName: 'Aircraft Maintenance Technician Training School',
    role: 'Aircraft Maintenance (AMT)',
    badge: 'AMT School',
    iconType: 'wrench',
  },
  {
    id: 'A/C STRUCTURE TECHNICIAN',
    name: 'A/C Structure Technician',
    amharicName: 'የአውሮፕላን ስትራክቸር ቴክኒሻን',
    schoolId: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    schoolName: 'Aircraft Maintenance Technician Training School',
    role: 'Aircraft Maintenance (AMT)',
    badge: 'AMT School',
    iconType: 'wrench',
  },
  {
    id: 'A/C AVIONICS TECHNICIAN',
    name: 'A/C Avionics Technician',
    amharicName: 'የአውሮፕላን አቪዮኒክስ ቴክኒሻን',
    schoolId: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    schoolName: 'Aircraft Maintenance Technician Training School',
    role: 'Aircraft Maintenance (AMT)',
    badge: 'AMT School',
    iconType: 'wrench',
  },
  {
    id: 'A/C CABIN MAINTENANCE',
    name: 'A/C Cabin Maintenance',
    amharicName: 'የካቢን ጥገና ቴክኒሻን',
    schoolId: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    schoolName: 'Aircraft Maintenance Technician Training School',
    role: 'Aircraft Maintenance (AMT)',
    badge: 'AMT School',
    iconType: 'wrench',
  },
  {
    id: 'A/C AIRFRAME TECHNICIAN',
    name: 'A/C Airframe Technician',
    amharicName: 'የኤርፍሬም ቴክኒሻን',
    schoolId: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    schoolName: 'Aircraft Maintenance Technician Training School',
    role: 'Aircraft Maintenance (AMT)',
    badge: 'AMT School',
    iconType: 'wrench',
  },
  {
    id: 'PASSENGER HANDLING & CUSTOMER SERVICE',
    name: 'Passenger Handling & Customer Service',
    amharicName: 'የመንገደኞች አቀባበል እና የደንበኞች አገልግሎት',
    schoolId: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    schoolName: 'Commercial and Ground Service Training School',
    role: 'Ground Operations',
    badge: 'Ground Services',
    iconType: 'headphones',
  },
  {
    id: 'RAMP OPERATIONS & BAGGAGE HANDLING',
    name: 'Ramp Operations & Baggage Handling',
    amharicName: 'የራምፕ ስራዎች እና የሻንጣ አያያዝ',
    schoolId: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    schoolName: 'Commercial and Ground Service Training School',
    role: 'Ground Operations',
    badge: 'Ground Services',
    iconType: 'headphones',
  },
  {
    id: 'FLIGHT DISPATCH & FLIGHT OPERATIONS',
    name: 'Flight Dispatch & Flight Operations',
    amharicName: 'የበረራ መረጃ እና የበረራ ስራዎች',
    schoolId: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    schoolName: 'Commercial and Ground Service Training School',
    role: 'Ground Operations',
    badge: 'Ground Services',
    iconType: 'headphones',
  },
  {
    id: 'CARGO OPERATIONS & LOGISTICS',
    name: 'Cargo Operations & Logistics',
    amharicName: 'የካርጎ ስራዎች እና ሎጅስቲክስ',
    schoolId: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    schoolName: 'Commercial and Ground Service Training School',
    role: 'Ground Operations',
    badge: 'Ground Services',
    iconType: 'headphones',
  },
  {
    id: 'TICKETING, RESERVATIONS & SALES',
    name: 'Ticketing, Reservations & Sales',
    amharicName: 'ቲኬት፣ ቦታ ማስያዝ እና ሽያጭ',
    schoolId: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    schoolName: 'Commercial and Ground Service Training School',
    role: 'Ground Operations',
    badge: 'Ground Services',
    iconType: 'headphones',
  },
  {
    id: 'AIRPORT SECURITY & GROUND SUPPORT',
    name: 'Airport Security & Ground Support',
    amharicName: 'የአውሮፕላን ማረፊያ ደህንነት እና የመሬት ድጋፍ',
    schoolId: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    schoolName: 'Commercial and Ground Service Training School',
    role: 'Ground Operations',
    badge: 'Ground Services',
    iconType: 'headphones',
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
