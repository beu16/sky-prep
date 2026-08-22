import React from 'react';
import { Language, TrainingSchool, AviationRole } from '../types';
import { TRANSLATION } from '../data/translations';
import { IMAGES } from '../assets/images';
import { AviationImage } from './AviationImage';
import { 
  Users, 
  Plane, 
  Wrench, 
  Briefcase, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Clock, 
  Brain,
  Shield,
  Smartphone
} from 'lucide-react';

interface WelcomeScreenProps {
  lang: Language;
  onSelectSchool: (school: TrainingSchool) => void;
  onOpenPaywall: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  lang,
  onSelectSchool,
  onOpenPaywall
}) => {
  const t = TRANSLATION[lang];

  const tracks: Array<{
    id: TrainingSchool;
    role: AviationRole;
    badge: string;
    subBadge: string;
    title: string;
    shortTitle: string;
    desc: string;
    image: string;
    icon: any;
    color: string;
    accentBorder: string;
  }> = [
    {
      id: 'cabin_crew',
      role: 'cabin_crew',
      badge: 'ACTIVE ON DUTY',
      subBadge: 'WELCOME ABOARD IN-FLIGHT SERVICE',
      title: t.cabinCrew,
      shortTitle: 'Cabin Crew (Flight Attendant)',
      desc: t.cabinCrewDesc,
      image: IMAGES.cabinCrewSvc,
      icon: Users,
      color: 'from-blue-600 to-indigo-800',
      accentBorder: 'hover:border-blue-500'
    },
    {
      id: 'pilot',
      role: 'pilot',
      badge: 'IN COMMAND',
      subBadge: 'CRUISING AT 38,000 FT FLIGHT DECK',
      title: t.pilotAcademy,
      shortTitle: 'Cadet Pilot & First Officer',
      desc: t.pilotAcademyDesc,
      image: IMAGES.pilotCockpit,
      icon: Plane,
      color: 'from-sky-600 to-blue-900',
      accentBorder: 'hover:border-sky-500'
    },
    {
      id: 'amt',
      role: 'amt',
      badge: 'TECHNICAL & ENGINEERING',
      subBadge: 'AVIATION ENGINEERING & INSPECTION',
      title: t.amtTitle,
      shortTitle: 'A/C Mechanic & Avionics Specialist',
      desc: t.amtDesc,
      image: IMAGES.amtMaintenance,
      icon: Wrench,
      color: 'from-amber-600 to-orange-900',
      accentBorder: 'hover:border-amber-500'
    },
    {
      id: 'commercial',
      role: 'commercial',
      badge: 'FLIGHT OPERATIONS',
      subBadge: 'INTERNATIONAL AIRPORT CREW OPERATIONS',
      title: t.commercialTitle,
      shortTitle: 'Passenger Handling & Concourse Ops',
      desc: t.commercialDesc,
      image: IMAGES.groundOps,
      icon: Briefcase,
      color: 'from-emerald-600 to-teal-900',
      accentBorder: 'hover:border-emerald-500'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B2545] via-[#07192F] to-[#051020] text-white py-16 sm:py-24 border-b border-slate-800/80">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <AviationImage
            src={IMAGES.globalHero}
            alt="Commercial Aviation Fleet"
            className="w-full h-full object-cover object-center mix-blend-overlay"
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>2026 Airline Assessment Standards</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto">
            {t.tagline}
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            {t.subtitle}
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onSelectSchool('cabin_crew')}
              type="button"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 transition active:scale-95"
            >
              <span>{t.startPrep}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenPaywall}
              type="button"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Telebirr Pass (99 ETB)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Career Tracks Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.exploreSchools}
          </h2>
          <p className="text-slate-400 text-sm">
            Select your specialized department to access customized timed exams and interview guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((tr) => {
            const Icon = tr.icon;
            return (
              <div
                key={tr.id}
                onClick={() => onSelectSchool(tr.id)}
                className={`group bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-800/90 shadow-lg ${tr.accentBorder} transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5`}
              >
                <div>
                  {/* Card Image Header with Badge */}
                  <div className="relative h-44 w-full overflow-hidden bg-[#07192F]">
                    <AviationImage
                      src={tr.image}
                      alt={tr.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07192F] via-[#07192F]/60 to-transparent pointer-events-none" />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow">
                      <Icon className="w-3 h-3 text-amber-400" />
                      <span>{tr.badge}</span>
                    </div>

                    {/* Sub title text on header */}
                    <div className="absolute bottom-3 left-4 right-4 text-left">
                      <p className="text-[10px] font-black uppercase tracking-wider text-amber-400 drop-shadow-sm">
                        {tr.subBadge}
                      </p>
                      <h3 className="text-base font-extrabold text-white leading-tight">
                        {tr.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <h4 className="text-sm font-bold text-blue-400">
                      {tr.shortTitle}
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                      {tr.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA link */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-black text-amber-400 group-hover:text-amber-300 transition">
                    <span>{t.startPrep}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Telebirr Fast Access Bar */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#0B2545] to-[#133E6D] rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>Instant Automated Access</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Unlock Premier Lifetime Assessment Suite
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              One-time 99 ETB payment via Telebirr to <strong>Biniyam Haile (0920017478)</strong>.
            </p>
          </div>

          <button
            onClick={onOpenPaywall}
            type="button"
            className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider whitespace-nowrap shadow-lg shadow-amber-500/20 transition active:scale-95"
          >
            Verify Telebirr (99 ETB)
          </button>
        </div>
      </section>
    </div>
  );
};
