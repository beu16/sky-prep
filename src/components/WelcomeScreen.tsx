import React from 'react';
import { Shield, Plane, Users, Mic, Award, ArrowRight, CheckCircle2, Globe, Sparkles, BookOpen, Clock, BarChart3, CheckCircle, GraduationCap, Briefcase, Wrench, Headphones } from 'lucide-react';
import { Language, TrainingSchool, AviationRole } from '../types';
import { TRANSLATION } from '../data/translations';
import { IMAGES } from '../assets/images';
import { AviationImage } from './AviationImage';

interface WelcomeScreenProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onStart: (school?: TrainingSchool, program?: string, role?: AviationRole) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ lang, setLang, onStart }) => {
  const t = TRANSLATION[lang];

  const tracks = [
    {
      title: lang === 'en' ? 'Cabin Crew Training School' : 'የካቢን ክሩ ስልጠና ትምህርት ቤት',
      schoolId: 'CABIN CREW TRAINING SCHOOL' as TrainingSchool,
      programName: 'CABIN CREW TRAINEE (AIRLINE-SPONSORED)',
      aviationRole: 'Cabin Crew' as AviationRole,
      role: 'Cabin Crew (Flight Attendant)',
      desc: lang === 'en' ? 'Customer service excellence, in-flight safety protocols, emergency equipment, and grooming standards.' : 'የደንበኞች አገልግሎት፣ የበረራ ደህንነት መመሪያዎች እና የአደጋ ጊዜ ሂደቶች።',
      icon: Users,
      badge: 'Active On Duty',
      color: 'from-blue-600 to-indigo-700',
      image: IMAGES.cabinCrewSvc,
      highlight: 'Welcome Aboard In-Flight Service',
    },
    {
      title: lang === 'en' ? 'Commercial Pilot Academy' : 'የፓይለት ስልጠና አካዳሚ',
      schoolId: 'PILOT TRAINING SCHOOL' as TrainingSchool,
      programName: 'TRAINEE PILOT (AIRLINE-SPONSORED)',
      aviationRole: 'Pilot / Cadet' as AviationRole,
      role: 'Cadet Pilot & First Officer',
      desc: lang === 'en' ? 'Aerodynamics, navigation, instrument interpretation, numerical aptitude, and situational judgment.' : 'ኤሮዳይናሚክስ፣ አሰሳ፣ የቁጥሮች ስሌት እና የአቪዬሽን ሎጂክ።',
      icon: Plane,
      badge: 'In Command',
      color: 'from-sky-600 to-blue-800',
      image: IMAGES.pilotCockpit,
      highlight: 'Cruising at 38,000 Ft Flight Deck',
    },
    {
      title: lang === 'en' ? 'Aircraft Maintenance Technician (AMT)' : 'የአውሮፕላን ጥገና ቴክኒሻን ስልጠና',
      schoolId: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL' as TrainingSchool,
      programName: 'A/C MECHANIC',
      aviationRole: 'Aircraft Maintenance (AMT)' as AviationRole,
      role: 'A/C Mechanic & Avionics Specialist',
      desc: lang === 'en' ? 'Airframe structures, powerplant turbines, avionics navigation systems, and technical maintenance procedures.' : 'የአውሮፕላን አካላት፣ ሞተር፣ አቪዮኒክስ እና የቴክኒክ ጥገና ሂደቶች።',
      icon: Wrench,
      badge: 'Technical & Engineering',
      color: 'from-amber-600 to-orange-700',
      image: IMAGES.academyGrad,
      highlight: 'Aviation Engineering & Inspection',
    },
    {
      title: lang === 'en' ? 'Commercial & Ground Services' : 'የኮሜርሻል እና የመሬት ላይ አገልግሎት',
      schoolId: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL' as TrainingSchool,
      programName: 'PASSENGER HANDLING & CUSTOMER SERVICE',
      aviationRole: 'Ground Operations' as AviationRole,
      role: 'Passenger Handling & Concourse Ops',
      desc: lang === 'en' ? 'Passenger handling, check-in operations, cargo logistics, flight dispatch, and ramp safety.' : 'የመንገደኞች አቀባበል፣ የበረራ መረጃ እና የካርጎ ሎጅስቲክስ።',
      icon: Headphones,
      badge: 'Flight Operations',
      color: 'from-blue-700 to-slate-800',
      image: IMAGES.terminalWalk,
      highlight: 'International Airport Crew Operations',
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: t.writtenExams,
      desc: lang === 'en' ? 'Simulate 15-minute written assessments with verified past questions, explanations, and time management.' : 'ትክክለኛ የፈተና ጥያቄዎች በሰዓት የተገደቡ ከማብራሪያ ጋር።',
    },
    {
      icon: Users,
      title: t.groupDiscussion,
      desc: lang === 'en' ? '15 real airline group discussion scenarios, evaluator scoring rubrics, positive body language, and winning starter phrases.' : 'የቡድን ውይይት (GD) መመሪያ፣ የውይይት አጀንዳዎች እና ማሳመኛ ነጥቦች።',
    },
    {
      icon: Mic,
      title: t.interviewPrep,
      desc: lang === 'en' ? 'Master behavioral interviews using the STAR method with AI text-to-speech audio and self-recording capabilities.' : 'የSTAR ሞዴል ምላሾች ከድምፅ ንባብ እና ራስን መቅረጫ መሳሪያ ጋር።',
    },
    {
      icon: Award,
      title: t.lifetimeAccess,
      desc: lang === 'en' ? 'Unlock unlimited retakes, full question banks, and Verified Ready Certificate with an affordable 99 ETB Telebirr pass.' : 'በ99 ብር የቴሌብር ክፍያ የሙሉ ፈተናዎች እና ሰርተፊኬት ባለቤት ይሁኑ።',
    },
  ];

  return (
    <div className="bg-[#F7F9FC] text-slate-900 min-h-screen">
      
      {/* Top Banner Bar */}
      <div className="bg-[#07192F] text-slate-300 py-2 px-4 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">
              {lang === 'en' ? 'Commercial Airlines & Aviation Academy Assessment Portal' : 'የአለምአቀፍ አየር መንገድ እና አቪዬሽን አካዳሚ መፈተኛ ፖርታል'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
              className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'አማርኛ (Amharic)' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B2545] text-white py-16 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0">
          <AviationImage
            src={IMAGES.globalHero}
            alt="Commercial Aviation Fleet"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B2545]/90 via-[#0B2545]/95 to-[#0B2545]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#F2B134]/15 border border-[#F2B134]/30 text-amber-300 px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
                <Sparkles className="w-4 h-4 fill-amber-300" />
                <span>Global Aviation Assessment Suite</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                {lang === 'en' ? (
                  <>
                    Pass Your Airline Exam. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
                      Get Hired Ready.
                    </span>
                  </>
                ) : (
                  <>
                    የአየር መንገድ ፈተናዎችን አልፈው <br />
                    <span className="text-amber-300">የህልምዎን ስራ ይጀምሩ</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.welcomeSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onStart()}
                  className="w-full sm:w-auto bg-[#2E86FF] hover:bg-blue-600 text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <span>{t.getStarted}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onStart()}
                  className="w-full sm:w-auto bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-base px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span>{lang === 'en' ? 'Take Free Mock Exam' : 'ነጻ የሙከራ ፈተና'}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'en' ? '100% Free Trial Included' : '1 ሙሉ ነጻ ፈተና ተካቷል'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'en' ? 'Telebirr 99 ETB Instant Activation' : 'በቴሌብር ፈጣን ክፍያ'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'en' ? 'Full STAR & GD Guides' : 'የSTAR እና GD መመሪያዎች'}</span>
                </div>
              </div>
            </div>

            {/* Right Card / Interactive Visual */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

                <div className="relative space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-sm font-black text-white">Sky Prep Academy Simulator</h2>
                        <p className="text-[11px] text-slate-400">All 4 Major Aviation Departments</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-full">
                      LIVE PORTAL
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                          1
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Written Assessment Test</p>
                          <p className="text-[11px] text-slate-400">15-min timed English, Math & Aviation</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-blue-400">100% Pass Rate Target</span>
                    </div>

                    <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                          2
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Group Discussion (GD) Round</p>
                          <p className="text-[11px] text-slate-400">15 In-flight crisis & team scenarios</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-purple-400">Scoring Rubric</span>
                    </div>

                    <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                          3
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">STAR Panel Interview</p>
                          <p className="text-[11px] text-slate-400">Audio playback + Voice recorder</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-amber-400">Voice Enabled</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onStart()}
                    className="w-full bg-[#F2B134] hover:bg-amber-400 text-[#0B2545] font-black text-sm py-3.5 px-4 rounded-xl shadow transition-all flex items-center justify-center gap-2"
                  >
                    <span>Launch Assessment Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Aviation Training School Tracks Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-black text-[#2E86FF] uppercase tracking-widest mb-2">
              SPECIALIZED ASSESSMENT TRACKS
            </h2>
            <h3 className="text-2xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
              Tailored for Every Aviation Training Program
            </h3>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Whether you are applying for Cabin Crew, Cadet Pilot, Aircraft Maintenance, or Ground Operations, Sky Prep gives you role-specific question banks and interview simulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((tr, idx) => {
              const Icon = tr.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onStart(tr.schoolId, tr.programName, tr.aviationRole)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-[#0B2545]">
                      <AviationImage
                        src={tr.image}
                        alt={tr.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-[#0B2545]/90 backdrop-blur-sm border border-white/20 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow">
                        <Icon className="w-3 h-3 text-amber-400" />
                        <span>{tr.badge}</span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold text-amber-300 block tracking-wider uppercase">{tr.highlight}</span>
                        <h4 className="text-sm font-black leading-tight drop-shadow-sm">{tr.title}</h4>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <p className="text-xs font-bold text-blue-700">
                        {tr.role}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {tr.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-600 group-hover:text-blue-700">
                      <span>Start Candidate Prep</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 Pillars Features Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">
              PLATFORM HIGHLIGHTS
            </h2>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0B2545]">
              Everything You Need to Succeed on Exam Day
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#2E86FF] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-black text-[#0B2545]">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Telebirr CTA Banner */}
      <section className="py-16 bg-[#0B2545] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 border border-blue-800/80 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#F2B134]/20 text-[#F2B134] text-xs font-black px-3.5 py-1.5 rounded-full border border-[#F2B134]/30">
                <Sparkles className="w-4 h-4 fill-[#F2B134]" />
                <span>UNLIMITED LIFETIME PASS</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white">
                One-Time 99 ETB via Telebirr. No Monthly Fees.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Join thousands of aviation candidates preparing for commercial airline recruitment exams. Instant access to full mock tests, audio answers, and downloadable certificates.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onStart()}
                className="bg-[#F2B134] hover:bg-amber-400 text-[#0B2545] font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
