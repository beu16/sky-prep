import React from 'react';
import { Shield, Plane, BookOpen, Mic, Users, Award, ExternalLink, Globe, Heart } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang?: Language;
  onNavigate?: (tab: 'home' | 'practice' | 'interview' | 'progress' | 'profile') => void;
  onOpenGD?: () => void;
  onOpenPaywall?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang = 'en', onNavigate, onOpenGD, onOpenPaywall }) => {
  return (
    <footer className="bg-[#07192F] text-slate-400 border-t border-slate-800/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F2B134] to-amber-500 text-[#0B2545] flex items-center justify-center font-black shadow-md">
                <Shield className="w-5 h-5 fill-[#0B2545]" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">Sky Prep</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Premier commercial aviation assessment portal, structured around airline recruitment examinations, STAR interview frameworks, and group discussion evaluations.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Standardized Aviation Assessment Curriculum</span>
            </div>
          </div>

          {/* Col 3: Assessment Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Training Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate?.('practice')}>
                Cabin Crew Training School
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate?.('practice')}>
                Commercial Pilot Academy
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate?.('practice')}>
                Aircraft Maintenance (AMT)
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate?.('practice')}>
                Ground Operations & Cargo
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Preparation Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate?.('practice')}>
                15-Min Timed Exam Simulators
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate?.('interview')}>
                STAR Behavioral Interviews
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={onOpenGD}>
                Group Discussion (GD) Guide
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate?.('progress')}>
                Verified Ready Certificate
              </li>
            </ul>
          </div>

          {/* Col 5: Support & Telebirr */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Candidate Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://t.me/skywardsupports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <span>Telegram Support</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={onOpenPaywall}>
                Telebirr 99 ETB Activation
              </li>
              <li className="text-slate-500">
                Instant Account Verification
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sky Prep Portal. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Independent candidate preparation platform. Designed for academic and hiring assessment readiness.
          </p>
        </div>
      </div>
    </footer>
  );
};
