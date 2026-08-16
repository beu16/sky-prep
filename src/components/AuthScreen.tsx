import React, { useState } from 'react';
import { UserProfile, Language, TrainingSchool, TRAINING_SCHOOLS_DATA, AviationRole } from '../types';
import { saveUserProfile, getStoredUserProfile, getSupabase } from '../services/supabase';
import { Phone, Shield, ArrowRight, ArrowLeft, Lock, User, GraduationCap, BookOpen, Layers, Mail, CheckCircle2, Plane, Sparkles } from 'lucide-react';
import { TRANSLATION } from '../data/translations';

interface AuthScreenProps {
  lang?: Language;
  onAuthenticated: (profile: UserProfile) => void;
  onBack: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ lang = 'en', onAuthenticated, onBack }) => {
  const t = TRANSLATION[lang];
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('0911234567');
  const [password, setPassword] = useState('');
  const [trainingSchool, setTrainingSchool] = useState<TrainingSchool>('CABIN CREW TRAINING SCHOOL');
  const [trainingProgram, setTrainingProgram] = useState<string>('CABIN CREW TRAINEE (ET-SPONSORED)');
  const [stage, setStage] = useState<string>('Written Assessment');
  const [email, setEmail] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Available programs for current selected school
  const currentSchoolData = TRAINING_SCHOOLS_DATA.find(s => s.id === trainingSchool) || TRAINING_SCHOOLS_DATA[0];

  const handleSchoolChange = (schoolId: TrainingSchool) => {
    setTrainingSchool(schoolId);
    const school = TRAINING_SCHOOLS_DATA.find(s => s.id === schoolId);
    if (school && school.programs.length > 0) {
      setTrainingProgram(school.programs[0]);
    }
  };

  const mapSchoolToRole = (school: TrainingSchool): AviationRole => {
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

    const formattedPhone = cleanPhone.startsWith('+') 
      ? cleanPhone 
      : cleanPhone.startsWith('0') 
        ? `+251 ${cleanPhone.slice(1)}` 
        : `+251 ${cleanPhone}`;

    const role = mapSchoolToRole(trainingSchool);
    const generatedId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `usr_${Date.now()}`;

    // Create candidate profile
    const newProfile: UserProfile = {
      id: generatedId,
      phone_number: formattedPhone,
      password: password.trim(),
      full_name: fullName.trim(),
      training_school: trainingSchool,
      training_program: trainingProgram,
      department: trainingSchool,
      field: trainingProgram,
      stage: stage,
      email: email.trim() || undefined,
      selected_role: role,
      is_paid: false,
      paid_at: null,
      free_exam_used: false,
      created_at: new Date().toISOString(),
    };

    // Save locally and sync with Supabase
    saveUserProfile(newProfile);

    // Optional Supabase Auth or DB record insert
    const sb = getSupabase();
    if (sb) {
      try {
        sb.from('profiles').upsert({
          id: newProfile.id,
          phone_number: newProfile.phone_number,
          full_name: newProfile.full_name,
          training_school: newProfile.training_school,
          training_program: newProfile.training_program,
          department: newProfile.department,
          field: newProfile.field,
          stage: newProfile.stage,
          email: newProfile.email || null,
          selected_role: newProfile.selected_role,
          is_paid: false,
          created_at: newProfile.created_at,
        }).then(({ error: sbErr }) => {
          if (sbErr) console.log('Supabase sync note:', sbErr.message);
        });
      } catch (err) {
        console.log('Local first profile saved');
      }
    }

    setSuccessMsg('Registration successful! Directing to your department preparation...');

    setTimeout(() => {
      setLoading(false);
      onAuthenticated(newProfile);
    }, 600);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanPhone = phoneNumber.trim().replace(/\s+/g, '');
    if (!cleanPhone) {
      setError('Please enter your phone number.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    const formattedPhone = cleanPhone.startsWith('+') 
      ? cleanPhone 
      : cleanPhone.startsWith('0') 
        ? `+251 ${cleanPhone.slice(1)}` 
        : `+251 ${cleanPhone}`;

    // Check existing stored profile or create session
    let existing = getStoredUserProfile();
    if (!existing || (existing.phone_number !== formattedPhone && existing.phone_number !== cleanPhone)) {
      // Create session for user
      const role = mapSchoolToRole(trainingSchool);
      existing = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `usr_${Date.now()}`,
        phone_number: formattedPhone,
        password: password.trim(),
        full_name: fullName.trim() || 'Candidate',
        training_school: trainingSchool,
        training_program: trainingProgram,
        department: trainingSchool,
        field: trainingProgram,
        stage: stage,
        selected_role: role,
        is_paid: false,
        paid_at: null,
        free_exam_used: false,
        created_at: new Date().toISOString(),
      };
    }

    saveUserProfile(existing);

    setTimeout(() => {
      setLoading(false);
      onAuthenticated(existing!);
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 bg-slate-50">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
        
        {/* Header with Aviation School Banner */}
        <div className="relative p-6 text-white text-center overflow-hidden bg-gradient-to-b from-[#0F2D59] via-[#0B2545] to-[#07192F]">
          <img
            src="/src/assets/images/cockpit_approach_1786528410294.jpg"
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
              <span>ETHIOPIAN AVIATION ACADEMY PREP</span>
            </div>

            <h2 className="text-xl font-black text-white tracking-tight">
              {authMode === 'signup' ? 'Candidate Registration' : 'Candidate Portal Login'}
            </h2>
            <p className="text-xs text-slate-300 font-medium max-w-sm mx-auto">
              {authMode === 'signup'
                ? 'Select your Training School & Course to receive customized exam questions and interview simulators.'
                : 'Enter your phone number and password to continue your preparation.'}
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
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {authMode === 'signup' ? (
            /* --- REGISTRATION FORM --- */
            <form onSubmit={handleSignup} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Full Name (Applicant Name) *</span>
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

              {/* Training School (Department) Dropdown */}
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#0B2545]" />
                  <span>Training School (Department) *</span>
                </label>
                <div className="relative">
                  <select
                    value={trainingSchool}
                    onChange={(e) => handleSchoolChange(e.target.value as TrainingSchool)}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-blue-600/60 bg-blue-50/40 focus:border-blue-700 focus:ring-2 focus:ring-blue-600/20 outline-none text-xs sm:text-sm text-slate-900 font-extrabold appearance-none cursor-pointer min-h-[48px]"
                  >
                    {TRAINING_SCHOOLS_DATA.map((school) => (
                      <option 
                        key={school.id} 
                        value={school.id} 
                        disabled={school.disabled}
                        className={school.disabled ? "text-slate-400 bg-slate-100 italic" : "font-bold text-slate-900 py-1"}
                      >
                        {school.name.toUpperCase()} {school.disabled ? '(CLOSED)' : ''}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-600">
                    ▼
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Official Ethiopian Aviation Academy divisions.
                </p>
              </div>

              {/* Training Programs (Course / Field of Study) Dropdown */}
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>Training Program (Course / Field) *</span>
                </label>
                <div className="relative">
                  <select
                    value={trainingProgram}
                    onChange={(e) => setTrainingProgram(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-xs sm:text-sm text-slate-900 font-bold appearance-none cursor-pointer min-h-[48px]"
                  >
                    {currentSchoolData.programs.map((prog) => (
                      <option key={prog} value={prog} className="font-medium text-slate-900 py-1">
                        {prog}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-600">
                    ▼
                  </div>
                </div>
              </div>

              {/* Application Stage */}
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

                {/* Email Address (Optional) */}
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
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
            /* --- LOGIN FORM --- */
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
                  onChange={(e) => setPhoneNumber(e.target.value)}
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

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 font-medium">
              Synchronized with Supabase Candidate Database. Instant access without SMS delays.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
