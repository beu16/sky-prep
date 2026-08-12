export type Language = 'en' | 'am';

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  tagline: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  getStarted: string;
  quickDemo: string;
  unlockFullAccess: string;
  unlimitedAccess: string;
  dashboard: string;
  writtenExams: string;
  groupDiscussion: string;
  interviewPrep: string;
  progressAnalytics: string;
  selectRole: string;
  allRoles: string;
  cabinCrew: string;
  pilotCadet: string;
  amtMaintenance: string;
  groundOps: string;
  englishProficiency: string;
  numericalReasoning: string;
  verbalReasoning: string;
  generalKnowledge: string;
  startExam: string;
  resumeExam: string;
  freePractice: string;
  unlimitedRetakes: string;
  passed: string;
  failed: string;
  question: string;
  of: string;
  nextQuestion: string;
  prevQuestion: string;
  submitExam: string;
  examResults: string;
  score: string;
  timeSpent: string;
  explanation: string;
  retakeExam: string;
  starFramework: string;
  recordVoice: string;
  stopRecord: string;
  reRecord: string;
  playVoice: string;
  deleteVoice: string;
  recorded: string;
  paymentHeader: string;
  paymentSubtitle: string;
  telebirrNumber: string;
  copyNumber: string;
  copied: string;
  uploadReceipt: string;
  transactionId: string;
  submitPayment: string;
  verifyingPayment: string;
  verifiedReady: string;
  certificateClaim: string;
  adminPanel: string;
  dbSettings: string;
  logout: string;
  freePreview: string;
  premiumOnly: string;
  lifetimeAccess: string;
  oneTimePay: string;
  searchPlaceholder: string;
  dos: string;
  donts: string;
  starterPhrases: string;
}

export const TRANSLATION: Record<Language, TranslationDictionary> = {
  en: {
    appName: "Sky Prep",
    appSubtitle: "Aviation Professional Prep",
    tagline: "Master Airline Exams, GD Scenarios & Technical Interviews",
    welcomeTitle: "Prepare for Your Aviation Career",
    welcomeSubtitle: "Comprehensive preparation suite for Cabin Crew, Pilots, Maintenance Engineers (AMT), and Ground Operations.",
    getStarted: "Get Started Now",
    quickDemo: "Try Quick Demo",
    unlockFullAccess: "Unlock Premier Access — 99 ETB",
    unlimitedAccess: "Unlimited Access & Practice Retakes",
    dashboard: "Dashboard",
    writtenExams: "Written Exams",
    groupDiscussion: "Group Discussion",
    interviewPrep: "Interview Prep",
    progressAnalytics: "Progress & Scores",
    selectRole: "Filter Career Stream:",
    allRoles: "All Aviation Roles",
    cabinCrew: "Cabin Crew / Flight Attendant",
    pilotCadet: "Pilot / Flight Cadet",
    amtMaintenance: "Aircraft Maintenance (AMT)",
    groundOps: "Ground Ops & Customer Service",
    englishProficiency: "English Proficiency",
    numericalReasoning: "Numerical Reasoning",
    verbalReasoning: "Verbal Reasoning",
    generalKnowledge: "Aviation Knowledge",
    startExam: "Start Exam",
    resumeExam: "Resume Exam",
    freePractice: "Free Practice Attempt",
    unlimitedRetakes: "Unlimited Retakes",
    passed: "PASS",
    failed: "PRACTICE NEEDED",
    question: "Question",
    of: "of",
    nextQuestion: "Next Question",
    prevQuestion: "Previous",
    submitExam: "Submit & Grade Exam",
    examResults: "Exam Assessment Results",
    score: "Score",
    timeSpent: "Time Spent",
    explanation: "Detailed Explanation & Correct Answer",
    retakeExam: "Retake Practice Exam",
    starFramework: "STAR Model Answer",
    recordVoice: "Record Voice Answer",
    stopRecord: "Stop Recording",
    reRecord: "Re-record",
    playVoice: "Listen to Voice",
    deleteVoice: "Delete",
    recorded: "Audio Saved",
    paymentHeader: "Telebirr Payment Checkout",
    paymentSubtitle: "Send 99 ETB to complete lifetime unlock.",
    telebirrNumber: "Merchant Account Number",
    copyNumber: "Copy Number",
    copied: "Copied!",
    uploadReceipt: "Upload Telebirr Receipt Screenshot",
    transactionId: "Telebirr Transaction ID",
    submitPayment: "Submit Receipt for Fast Verification",
    verifyingPayment: "Verifying Telebirr Payment...",
    verifiedReady: "Verified Ready Certificate",
    certificateClaim: "Claim Milestone Certificate",
    adminPanel: "Admin Panel",
    dbSettings: "DB Settings",
    logout: "Log Out",
    freePreview: "FREE PREVIEW",
    premiumOnly: "PREMIER UNLIMITED",
    lifetimeAccess: "One-Time Payment • Lifetime Unlimited Access",
    oneTimePay: "Pay 99 ETB once, retain lifetime retakes and voice recording access.",
    searchPlaceholder: "Search questions, scenarios, or aviation terms...",
    dos: "Essential Dos",
    donts: "Critical Don'ts",
    starterPhrases: "Recommended Professional Phrases",
  },
  am: {
    appName: "ስካይ ፕሬፕ (Sky Prep)",
    appSubtitle: "የአቪዬሽን ፈተና ዝግጅት",
    tagline: "የአየር መንገድ የጽሁፍ ፈተና፣ የቡድን ውይይት እና ቃለ-መጠይቅ ዝግጅት",
    welcomeTitle: "ለአቪዬሽን ሙያዎ በብቃት ይዘጋጁ",
    welcomeSubtitle: "ለካቢን ክሩ (አስተናጋጅ)፣ ፓይለት፣ አውሮፕላን ጠጋኝ (AMT) እና የምድር አገልግሎት የተዘጋጀ ሙሉ የፈተና መለማመጃ።",
    getStarted: "አሁኑኑ ይጀምሩ",
    quickDemo: "በነጻ ይሞክሩ",
    unlockFullAccess: "ሙሉ አክሰስ ይክፈቱ — 99 ብር",
    unlimitedAccess: "ያልተገደበ የመለማመድ እና የመፈተን እድል",
    dashboard: "ዳሽቦርድ",
    writtenExams: "የጽሁፍ ፈተናዎች",
    groupDiscussion: "የቡድን ውይይት (GD)",
    interviewPrep: "የቃለ-መጠይቅ ዝግጅት",
    progressAnalytics: "ውጤት እና እድገት",
    selectRole: "የሙያ ዘርፍ ይምረጡ:",
    allRoles: "ሁሉም ሙያዎች",
    cabinCrew: "ካቢን ክሩ (የአየር አስተናጋጅ)",
    pilotCadet: "ፓይለት / ካዴት",
    amtMaintenance: "አውሮፕላን ጥገና (AMT)",
    groundOps: "የምድር አገልግሎት (Ground Ops)",
    englishProficiency: "እንግሊዝኛ ቋንቋ ችሎታ",
    numericalReasoning: "ሂሳባዊ እና ቁጥራዊ አስተሳሰብ",
    verbalReasoning: "ቃላታዊ ምክንያታዊነት",
    generalKnowledge: "የአቪዬሽን አጠቃላይ እውቀት",
    startExam: "ፈተና ጀምር",
    resumeExam: "ፈተና ቀጥል",
    freePractice: "ነጻ ሙከራ",
    unlimitedRetakes: "ያልተገደበ ድጋሚ ሙከራ",
    passed: "አልፈዋል (PASS)",
    failed: "ተጨማሪ ልምምድ ያስፈልጋል",
    question: "ጥያቄ",
    of: "ከ",
    nextQuestion: "ቀጣይ ጥያቄ",
    prevQuestion: "ወደ ኋላ",
    submitExam: "ፈተናውን አስገባ",
    examResults: "የፈተና ውጤት",
    score: "ውጤት",
    timeSpent: "የፈጀው ጊዜ",
    explanation: "ዝርዝር ማብራሪያ እና ትክክለኛ መልስ",
    retakeExam: "ፈተናውን ድጋሚ ተፈተን",
    starFramework: "STAR የቃለ-መጠይቅ አመለሳሰል",
    recordVoice: "ድምፅዎን ይቅረፁ",
    stopRecord: "ቅረፃ አቁም",
    reRecord: "ድጋሚ ቅረፅ",
    playVoice: "ድምፅ ያዳምጡ",
    deleteVoice: "ሰርዝ",
    recorded: "ድምፅ ተቀርጿል",
    paymentHeader: "በቴሌብር ክፍያ መፈጸሚያ",
    paymentSubtitle: "99 ብር በመላክ ሙሉ አገልግሎቱን ይክፈቱ።",
    telebirrNumber: "የንግድ አካውንት ቁጥር",
    copyNumber: "ቁጥሩን ኮፒ አድርግ",
    copied: "ኮፒ ተደርጓል!",
    uploadReceipt: "የቴሌብር ደረሰኝ ፎቶ ይላኩ",
    transactionId: "የቴሌብር ትራንዛክሽን አይዲ (TxID)",
    submitPayment: "ደረሰኝ አስገባ",
    verifyingPayment: "ክፍያ እየተረጋገጠ ነው...",
    verifiedReady: "የብቃት ማረጋገጫ ሰርተፊኬት",
    certificateClaim: "ሰርተፊኬቱን ይውሰዱ",
    adminPanel: "አድሚን ፓነል",
    dbSettings: "ዳታቤዝ መቼት",
    logout: "ውጣ (Log Out)",
    freePreview: "ነጻ ሙከራ",
    premiumOnly: "ፕሪሚየም ያልተገደበ",
    lifetimeAccess: "አንድ ጊዜ ተክፍሎ ለዘላለም የሚያገለግል",
    oneTimePay: "አንድ ጊዜ 99 ብር በመክፈል ድጋሚ የመፈተን እና የድምፅ ልምምድ ያግኙ።",
    searchPlaceholder: "ጥያቄዎችን ወይም ቃላትን ይፈልጉ...",
    dos: "መደረግ ያለባቸው (Dos)",
    donts: "መደረግ የሌለባቸው (Don'ts)",
    starterPhrases: "የሚመከሩ ፕሮፌሽናል አባባሎች",
  }
};
