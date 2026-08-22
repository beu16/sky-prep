import React from 'react';
import { Shield, Plane, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050E1B] border-t border-slate-800/80 py-10 px-4 text-center text-xs text-slate-400">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2 text-slate-300 font-bold">
          <Plane className="w-4 h-4 text-amber-400" />
          <span>Sky Prep Aviation Assessment Suite</span>
        </div>
        <p className="text-slate-400 text-xs max-w-xl mx-auto leading-relaxed">
          Standardized prep for Cabin Crew, Pilot Cadets, Aircraft Maintenance Technicians (AMT), and Commercial Concourse Ground Operations.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-900">
          <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-400" /> Telebirr Instant Verification (0920017478)</span>
          <span>•</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-blue-400" /> Standardized ICAO / IATA Framework</span>
          <span>•</span>
          <span>Candidate Pass Guarantee</span>
        </div>
        <p className="text-[10px] text-slate-400 pt-2">© 2026 Sky Prep Academy. All rights reserved.</p>
      </div>
    </footer>
  );
};
