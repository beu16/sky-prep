import React, { useState, useEffect, useMemo } from 'react';
import { 
  UserProfile, 
  Language, 
  TrainingSchool, 
  TRAINING_SCHOOLS_DATA, 
  AviationRole, 
  ALL_AVIATION_VACANCIES, 
  AviationVacancyItem 
} from '../types';
import { 
  saveUserProfile, 
  getStoredUserProfile, 
  testSupabaseConnection, 
  registerCandidateInSupabase,
  loginCandidateInSupabase,
  PART_3_SUPABASE_SQL, 
  getStoredConfig, 
  saveConfig 
} from '../services/supabase';
import { IMAGES } from '../assets/images';
import { AviationImage } from './AviationImage';
import { 
  Phone, 
  Shield, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  User, 
  GraduationCap, 
  BookOpen, 
  Layers, 
  Mail, 
  CheckCircle2, 
  Plane, 
  Sparkles, 
  Database, 
  Copy, 
  RefreshCw, 
  X, 
  AlertTriangle, 
  Search,
  Wrench,
  Headphones,
  Users,
  Check
} from 'lucide-react';
import { TRANSLATION } from '../data/translations';

interface AuthScreenProps {
  lang?: Language;
  initialSchool?: TrainingSchool;
  initialProgram?: string;
  initialRole?: AviationRole;
  initialPhone?: string;
  onAuthenticated: (profile: UserProfile) => void;
  onBack: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ 
  lang = 'en', 
  initialSchool,
  initialProgram,
  initialRole,
  initialPhone,
  onAuthenticated, 
  onBack 
}) => {
  const t = TRANSLATION[lang];
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  
  // Stored / existing candidate suggestion
  const storedUser = useMemo(() => getStoredUserProfile(), []);

  // Form State initialized smartly from props or storage
  const [fullName, setFullName] = useState(storedUser?.full_name || '');
  const [phoneNumber, setPhoneNumber] = useState(initialPhone || storedUser?.phone_number || '');
  const [password, setPassword] = useState('');
  
  // Smart Vacancy & School selection
  const [trainingSchool, setTrainingSchool] = useState<TrainingSchool>(() => {
    if (initialSchool && typeof initialSchool === 'string') return initialSchool;
    if (storedUser?.training_school && typeof storedUser.training_school === 'string') {
      return storedUser.training_school as TrainingSchool;
    }
    return 'CABIN CREW TRAINING SCHOOL';
  });
  const [trainingProgram, setTrainingProgram] = useState<string>(() => {
    if (initialProgram && typeof initialProgram === 'string') return initialProgram;
    if (storedUser?.training_program && typeof storedUser.training_program === 'string') {
      return storedUser.training_program;
    }
    return 'CABIN CREW TRAINEE (AIRLINE-SPONSORED)';
  });
  const [stage, setStage] = useState<string>(storedUser?.stage || 'Written Assessment');
  const [email, setEmail] = useState(storedUser?.email || '');
  
  // Vacancy Quick Search filter
  const [vacancySearch, setVacancySearch] = useState('');
  const [showVacancyDropdown, setShowVacancyDropdown] = useState(false);

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [cloudStatus, setCloudStatus] = useState<{ connected: boolean; checked: boolean }>({ connected: true, checked: false });

  // Auto-detected candidate from typing phone number
  const [detectedCandidate, setDetectedCandidate] = useState<UserProfile | null>(null);

  // Diagnostic / Supabase Setup Modal State
  const [showDbModal, setShowDbModal] = useState(false);
  const [dbConfig, setDbConfig] = useState(getStoredConfig());
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testingDb, setTestingDb] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Check Supabase connectivity on mount
  useEffect(() => {
    testSupabaseConnection().then((res) => {
      setCloudStatus({ connected: res.connected, checked: true });
    }).catch(() => {
      setCloudStatus({ connected: false, checked: true });
    });
  }, []);

  // When initial props change, automatically adapt
  useEffect(() => {
    if (initialSchool && typeof initialSchool === 'string') setTrainingSchool(initialSchool);
    if (initialProgram && typeof initialProgram === 'string') setTrainingProgram(initialProgram);
  }, [initialSchool, initialProgram]);

  // Smart Vacancy Selection: Auto-fills School, Program, and Role smoothly
  const handleSelectVacancy = (vacancy: AviationVacancyItem) => {
    setTrainingSchool(vacancy.schoolId);
    setTrainingProgram(vacancy.id);
    setShowVacancyDropdown(false);
    setVacancySearch('');
    setError(null);
  };

  // Available programs for current selected school
  const currentSchoolData = TRAINING_SCHOOLS_DATA.find(s => s.id === trainingSchool) || TRAINING_SCHOOLS_DATA[0];

  const handleSchoolChange = (schoolId: TrainingSchool) => {
    setTrainingSchool(schoolId);
    const school = TRAINING_SCHOOLS_DATA.find(s => s.id === schoolId);
    if (school && school.programs.length > 0) {
      setTrainingProgram(school.programs[0]);
    }
  };

  const handleProgramChange = (programId: string) => {
    setTrainingProgram(programId);
    // Find if it belongs to another school and auto-switch
    const matchingVacancy = ALL_AVIATION_VACANCIES.find(v => v.id === programId);
    if (matchingVacancy && matchingVacancy.schoolId !== trainingSchool) {
      setTrainingSchool(matchingVacancy.schoolId);
    }
  };

  const mapSchoolToRole = (school: TrainingSchool): AviationRole => {
    const matching = ALL_AVIATION_VACANCIES.find(v => v.id === trainingProgram);
    if (matching) return matching.role;
    switch (school) {
      case 'CABIN CREW TRAINING SCHOOL':
        return 'Cabin Crew';
      case 'PILOT TRAINING SCHOOL':
        return 'Pilot / Cadet';
      case 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL':
        return 'Aircraft Maintenance (AMT)';
      case 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL':
        return 'Ground Operations';
      default:
        return 'Cabin Crew';
    }
  };

  // Smart Live Phone check
  const handlePhoneChange = (val: string) => {
    setPhoneNumber(val);
    const clean = val.replace(/\D/g, '');
    if (storedUser && clean.length >= 9 && storedUser.phone_number.includes(clean)) {
      setDetectedCandidate(storedUser);
    } else {
      setDetectedCandidate(null);
    }
  };

  // 1-Click Auto-Fill Candidate Profile
  const handleAutoFillStoredProfile = () => {
    if (detectedCandidate) {
      setFullName(detectedCandidate.full_name || '');
      setPhoneNumber(detectedCandidate.phone_number);
      if (detectedCandidate.training_school) {
        setTrainingSchool(detectedCandidate.training_school as TrainingSchool);
      }
      if (detectedCandidate.training_program) {
        setTrainingProgram(detectedCandidate.training_program);
      }
      if (detectedCandidate.email) {
        setEmail(detectedCandidate.email);
      }
      setDetectedCandidate(null);
    }
  };

  const handleRunDbTest = async () => {
    setTestingDb(true);
    setTestResult(null);
    try {
      const res = await testSupabaseConnection();
      if (res.connected) {
        setTestResult(`✅ Connected to Supabase Cloud! ${res.details}`);
        setCloudStatus({ connected: true, checked: true });
      } else {
        setTestResult(`❌ Connection Failed: ${res.details}`);
        setCloudStatus({ connected: false, checked: true });
      }
    } catch (e: any) {
      setTestResult(`❌ Error: ${e?.message || e}`);
      setCloudStatus({ connected: false, checked: true });
    } finally {
      setTestingDb(false);
    }
  };

  const handleSaveDbConfig = () => {
    saveConfig(dbConfig);
    setTestResult('Configuration saved! Re-testing connection...');
    handleRunDbTest();
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(PART_3_SUPABASE_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Smart Registration
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const cleanPhone = phoneNumber.trim().replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setError('Please enter a valid phone number (e.g., 0911234567 or +251911234567).');
      return;
    }

    if (!fullName.trim()) {
      setError('Please enter your Full Name.');
      return;
    }

    if (!password.trim() || password.length < 4) {
      setError('Please create a password (at least 4 characters).');
      return;
    }

    setLoading(true);

    try {
      const role = mapSchoolToRole(trainingSchool);
      const res = await registerCandidateInSupabase({
        fullName: fullName.trim(),
        phoneNumber: cleanPhone,
        password: password.trim(),
        email: email.trim() || undefined,
        trainingSchool,
        trainingProgram,
        stage,
        selectedRole: role,
      });

      if (res.success) {
        setSuccessMsg(`Welcome, ${fullName.trim()}! Registered automatically for ${trainingProgram}.`);
        setCloudStatus({ connected: true, checked: true });
        setTimeout(() => {
          setLoading(false);
          onAuthenticated(res.profile);
        }, 400);
      } else {
        setError(res.error || 'Failed to complete registration.');
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Registration handler error:', err);
      // Fallback local save
      const role = mapSchoolToRole(trainingSchool);
      const fallbackProfile: UserProfile = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `usr_${Date.now()}`,
        phone_number: cleanPhone.startsWith('+') ? cleanPhone : `+251 ${cleanPhone.replace(/^0/, '')}`,
        password: password.trim(),
        full_name: fullName.trim(),
        training_school: trainingSchool,
        training_program: trainingProgram,
        department: trainingSchool,
        field: trainingProgram,
        stage,
        email: email.trim() || undefined,
        selected_role: role,
        is_paid: false,
        free_exam_used: false,
        created_at: new Date().toISOString(),
      };
      saveUserProfile(fallbackProfile);
      setLoading(false);
      onAuthenticated(fallbackProfile);
    }
  };

  // Smart Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanInput = phoneNumber.trim().replace(/\s+/g, '');
    if (!cleanInput) {
      setError('Please enter your phone number or email.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const res = await loginCandidateInSupabase({
        phoneNumberOrEmail: cleanInput,
        password: password.trim(),
        defaultSchool: trainingSchool,
        defaultProgram: trainingProgram,
      });

      if (res.success) {
        setTimeout(() => {
          setLoading(false);
          onAuthenticated(res.profile);
        }, 300);
      } else {
        setError('Candidate profile not found or invalid credentials.');
        setLoading(false);
      }
    } catch (err) {
      console.warn('Login lookup exception:', err);
      const existing = getStoredUserProfile();
      if (existing) {
        setLoading(false);
        onAuthenticated(existing);
      } else {
        const role = mapSchoolToRole(trainingSchool);
        const fallbackProfile: UserProfile = {
          id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `usr_${Date.now()}`,
          phone_number: cleanInput.startsWith('+') ? cleanInput : `+251 ${cleanInput.replace(/^0/, '')}`,
          password: password.trim(),
          full_name: fullName.trim() || 'Candidate',
          training_school: trainingSchool,
          training_program: trainingProgram,
          department: trainingSchool,
          field: trainingProgram,
          stage,
          selected_role: role,
          is_paid: false,
          free_exam_used: false,
          created_at: new Date().toISOString(),
        };
        saveUserProfile(fallbackProfile);
        setLoading(false);
        onAuthenticated(fallbackProfile);
      }
    }
  };

  // Filtered vacancies for quick search
  const filteredVacancies = ALL_AVIATION_VACANCIES.filter(v => 
    v.name.toLowerCase().includes(vacancySearch.toLowerCase()) ||
    v.schoolName.toLowerCase().includes(vacancySearch.toLowerCase()) ||
    (v.amharicName && v.amharicName.includes(vacancySearch))
  );

  const selectedVacancyObj = ALL_AVIATION_VACANCIES.find(v => v.id === trainingProgram);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8 bg-slate-50 w-full max-w-full overflow-x-hidden">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
        
        {/* Header with Aviation School Banner */}
        <div className="relative p-6 text-white text-center overflow-hidden bg-gradient-to-b from-[#0F2D59] via-[#0B2545] to-[#07192F]">
          <AviationImage
            src={IMAGES.pilotCockpit}
            alt="Aviation School Banner"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[1px]" />

          <div className="relative z-10 space-y-2">
            <button
              onClick={onBack}
              className="absolute left-0 top-0 p-2 text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 rounded-xl transition-all"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-xl flex items-center justify-center">
              <div className="w-full h-full bg-[#0B2545] rounded-[14px] flex items-center justify-center">
                <Shield className="w-7 h-7 text-[#F2B134] fill-[#F2B134]/30" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#F2B134]/20 border border-[#F2B134]/40 px-3 py-0.5 rounded-full text-[#F2B134] text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3 fill-[#F2B134]" />
              <span>COMMERCIAL AVIATION ACADEMY PREP</span>
            </div>

            <h2 className="text-xl font-black text-white tracking-tight">
              {authMode === 'signup' ? 'Candidate Registration' : 'Candidate Portal Login'}
            </h2>
            <p className="text-xs text-slate-300 font-medium max-w-sm mx-auto">
              {authMode === 'signup'
                ? 'Information is automatically synchronized with your specialized curriculum and exam simulator.'
                : 'Enter your phone number and password to instantly restore your progress and tests.'}
            </p>
          </div>
        </div>

        {/* Tab Toggle: Register vs Login */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => { setAuthMode('signup'); setError(null); }}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'signup'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>New Registration</span>
          </button>

          <button
            type="button"
            onClick={() => { setAuthMode('login'); setError(null); }}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'login'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Candidate Log In</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Smart Candidate Auto-Detection Banner */}
          {detectedCandidate && (
            <div className="mb-4 p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-2 animate-fadeIn">
              <div className="text-xs">
                <p className="font-extrabold text-blue-900">
                  ✨ Detected existing profile: <span className="underline">{detectedCandidate.full_name}</span>
                </p>
                <p className="text-[11px] text-blue-700 font-medium">
                  {detectedCandidate.training_program}
                </p>
              </div>
              <button
                type="button"
                onClick={handleAutoFillStoredProfile}
                className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black px-3 py-1.5 rounded-xl shadow shrink-0"
              >
                Auto-Fill
              </button>
            </div>
          )}

          {authMode === 'signup' ? (
            /* --- SMART REGISTRATION FORM --- */
            <form onSubmit={handleSignup} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Full Name (Applicant Name) *</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold lowercase">auto-bound to test slip</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Solomon Alemu Bekele"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-sm text-slate-900 font-bold min-h-[44px]"
                />
              </div>

              {/* Smart Vacancy Quick Selector */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Select Vacancy / Specialty *</span>
                  </label>
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-black px-2 py-0.5 rounded-full">
                    {selectedVacancyObj?.badge || 'Smart Auto-Fill'}
                  </span>
                </div>

                {/* Currently selected vacancy summary pill */}
                <div className="bg-white border-2 border-blue-600 rounded-xl p-3 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                      {selectedVacancyObj?.iconType === 'plane' && <Plane className="w-4 h-4" />}
                      {selectedVacancyObj?.iconType === 'users' && <Users className="w-4 h-4" />}
                      {selectedVacancyObj?.iconType === 'wrench' && <Wrench className="w-4 h-4" />}
                      {selectedVacancyObj?.iconType === 'headphones' && <Headphones className="w-4 h-4" />}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-extrabold text-slate-900 truncate">
                        {typeof selectedVacancyObj?.name === 'string' ? selectedVacancyObj.name : (typeof trainingProgram === 'string' ? trainingProgram : '')}
                      </p>
                      <p className="text-[10px] text-blue-700 font-bold truncate">
                        {typeof trainingSchool === 'string' ? trainingSchool : ''}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowVacancyDropdown(!showVacancyDropdown)}
                    className="text-[11px] font-black text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg shrink-0 transition-all"
                  >
                    {showVacancyDropdown ? 'Close' : 'Change Vacancy ▾'}
                  </button>
                </div>

                {/* Dropdown / Vacancy Search List */}
                {showVacancyDropdown && (
                  <div className="mt-2 bg-white border border-slate-300 rounded-xl p-2.5 space-y-2 shadow-lg max-h-60 overflow-y-auto animate-fadeIn">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search all 15 vacancies (e.g. Pilot, AMT, Crew, Cargo)..."
                        value={vacancySearch}
                        onChange={(e) => setVacancySearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      {filteredVacancies.map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => handleSelectVacancy(v)}
                          className={`w-full text-left p-2 rounded-lg flex items-center justify-between text-xs transition-all ${
                            trainingProgram === v.id
                              ? 'bg-blue-600 text-white font-bold'
                              : 'hover:bg-slate-100 text-slate-800'
                          }`}
                        >
                          <div className="truncate pr-2">
                            <span className="block font-bold truncate">{v.name}</span>
                            <span className={`block text-[10px] truncate ${trainingProgram === v.id ? 'text-blue-100' : 'text-slate-400'}`}>
                              {v.schoolName}
                            </span>
                          </div>
                          {trainingProgram === v.id && <Check className="w-4 h-4 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Training School (Department) & Program Selection (Bi-directional auto sync) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* School */}
                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#0B2545]" />
                    <span>School (Dept) *</span>
                  </label>
                  <select
                    value={trainingSchool}
                    onChange={(e) => handleSchoolChange(e.target.value as TrainingSchool)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-blue-600 outline-none text-xs text-slate-900 font-bold min-h-[44px]"
                  >
                    {TRAINING_SCHOOLS_DATA.map((school) => (
                      <option key={school.id} value={school.id} className="font-bold text-slate-900 py-1">
                        {school.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Course */}
                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                    <span>Course / Program *</span>
                  </label>
                  <select
                    value={trainingProgram}
                    onChange={(e) => handleProgramChange(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-blue-600 outline-none text-xs text-slate-900 font-bold min-h-[44px]"
                  >
                    {currentSchoolData.programs.map((prog) => (
                      <option key={prog} value={prog} className="font-medium text-slate-900 py-1">
                        {prog}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Application Stage & Optional Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-600" />
                    <span>Target Stage *</span>
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-blue-600 outline-none text-xs text-slate-900 font-bold min-h-[44px]"
                  >
                    <option value="Written Assessment">Written Assessment</option>
                    <option value="Group Discussion (GD)">Group Discussion (GD)</option>
                    <option value="Panel Interview">Panel Interview</option>
                    <option value="Medical & Final Offer">Medical & Final Offer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Email (Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 outline-none text-xs text-slate-900 font-medium min-h-[44px]"
                  />
                </div>
              </div>

              {/* Phone Number & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="0911234567"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 outline-none text-sm text-slate-900 font-mono font-bold min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Password *</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 outline-none text-sm text-slate-900 font-bold min-h-[44px]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0B2545] hover:bg-[#07192F] text-white font-black text-sm py-4 px-6 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 mt-4 min-h-[48px]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Plane className="w-4 h-4 text-amber-400" />
                    <span>Register & Start Assessment Prep</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          ) : (
            /* --- SMART LOGIN FORM --- */
            <form onSubmit={handleLogin} className="space-y-4">
              
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="0911234567 or +251 9..."
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 outline-none text-sm text-slate-900 font-mono font-bold min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 outline-none text-sm text-slate-900 font-bold min-h-[44px]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0B2545] hover:bg-[#07192F] text-white font-black text-sm py-4 px-6 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 min-h-[48px]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Log In to Candidate Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>Synchronized with Candidate Portal Database</span>
            <button
              type="button"
              onClick={() => {
                setShowDbModal(true);
                handleRunDbTest();
              }}
              className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 hover:underline"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Database Settings</span>
            </button>
          </div>
        </div>

      </div>

      {/* Supabase Connection & Diagnostics Modal */}
      {showDbModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-black text-slate-900">Supabase Database Diagnostics</h3>
              </div>
              <button
                onClick={() => setShowDbModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Connection Status Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Connection Health</span>
                <button
                  onClick={handleRunDbTest}
                  disabled={testingDb}
                  className="px-2.5 py-1 bg-blue-600 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 hover:bg-blue-700 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${testingDb ? 'animate-spin' : ''}`} />
                  <span>Test Connection</span>
                </button>
              </div>

              {testResult ? (
                <p className="font-mono text-[11px] bg-white p-2.5 rounded-xl border border-slate-200 text-slate-800 break-all">
                  {testResult}
                </p>
              ) : (
                <p className="text-slate-500">Click "Test Connection" to verify your Supabase database.</p>
              )}
            </div>

            {/* Database Configuration Fields */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Supabase Project URL</label>
                <input
                  type="text"
                  value={dbConfig.url}
                  onChange={(e) => setDbConfig({ ...dbConfig, url: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs text-slate-800"
                  placeholder="https://your-project.supabase.co"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Supabase Anon Key</label>
                <input
                  type="password"
                  value={dbConfig.anonKey}
                  onChange={(e) => setDbConfig({ ...dbConfig, anonKey: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs text-slate-800"
                  placeholder="eyJhbGciOi..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveDbConfig}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl font-black text-xs"
                >
                  Save Configuration
                </button>
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="px-4 py-2.5 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-xl font-black text-xs flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
                </button>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Supabase Setup Tip</span>
              </p>
              <p>
                If your Supabase database was just created, copy the SQL schema script and run it in your <strong>Supabase SQL Editor</strong> to create all tables (profiles, payments, attempts) and RLS security policies.
              </p>
            </div>

            <button
              onClick={() => setShowDbModal(false)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
