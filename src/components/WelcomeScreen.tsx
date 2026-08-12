import React from 'react';
import { Shield, Plane, Users, Mic, Award, ArrowRight, CheckCircle, Globe, Zap } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATION } from '../data/translations';

interface WelcomeScreenProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onStart: () => void;
  onQuickDemo: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ lang, setLang, onStart, onQuickDemo }) => {
  const t = TRANSLATION[lang];

  return (
    <div className="min-h-[88vh] flex flex-col justify-center items-center px-4 py-8 bg-slate-50">
      
      {/* Language Switch Bar */}
      <div className="max-w-xl w-full flex justify-end mb-3">
        <button
          onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
          className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Globe className="w-4 h-4 text-blue-600" />
          <span>{lang === 'en' ? 'አማርኛ (Amharic)' : 'English'}</span>
        </button>
      </div>

      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Top Hero Banner in Deep Navy with High-Quality Aviation Background */}
        <div className="relative p-8 text-white text-center overflow-hidden">
          <img
            src="/src/assets/images/aviation_hero_1786443062640.jpg"
            alt="Aviation Aircraft"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]" />

          <div className="relative z-10">
            {/* Logo Badge */}
            <div className="inline-flex p-1 rounded-2xl bg-gradient-to-br from-blue-500 via-slate-900 to-amber-500 shadow-xl mb-4">
              <div className="bg-slate-900/90 px-5 py-4 rounded-xl flex items-center gap-3 border border-slate-700/60">
                <Shield className="w-9 h-9 text-amber-400" />
                <div className="text-left">
                  <h1 className="text-2xl font-black tracking-tight text-white leading-none">SKY PREP</h1>
                  <p className="text-[10px] font-bold text-blue-400 tracking-widest uppercase mt-0.5">
                    GLOBAL AVIATION ASSESSMENT SUITE
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xl font-black text-amber-300 mt-2">"{t.tagline}"</p>
            <p className="text-xs text-slate-200 mt-2 max-w-md mx-auto leading-relaxed font-medium">
              {t.welcomeSubtitle}
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900">{t.writtenExams}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {lang === 'en' ? 'Cabin Crew, Pilot, AMT & Ops written exam questions.' : 'የካቢን ክሩ፣ ፓይለት፣ አውሮፕላን ጥገና ፈተናዎች።'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900">{t.groupDiscussion}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {lang === 'en' ? '15 scenarios, evaluator criteria, Dos, Don\'ts & phrases.' : 'የGD ውይይት መመሪያ እና የተግባቦት ክህሎት።'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900">{t.interviewPrep}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {lang === 'en' ? 'STAR model framework + private voice recording.' : 'የSTAR አመለሳሰል እና የድምፅ መለማመጃ።'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900">{t.lifetimeAccess}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {lang === 'en' ? 'Telebirr 99 ETB lifetime pass with unlimited retakes.' : 'በ99 ብር የቴሌብር ክፍያ ለዘላለም ይፈተኑ።'}
                </p>
              </div>
            </div>

          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{lang === 'en' ? 'Includes 1 Full Free Practice Exam & GD Guides immediately.' : 'ነጻ የልምምድ ፈተናን ያካተተ።'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onStart}
              className="flex-1 w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-sm py-3.5 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 min-h-[48px]"
            >
              <span>{t.getStarted}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onQuickDemo}
              className="flex-1 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs py-3.5 px-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-center gap-1.5 active:scale-95 min-h-[48px]"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{t.quickDemo}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
