import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile, ExamAttempt } from '../types';
import { Shield, X, Share2, Download } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { AviationImage } from './AviationImage';

interface VerifiedReadyCertificateProps {
  user: UserProfile;
  attempts: ExamAttempt[];
  onClose: () => void;
}

export const VerifiedReadyCertificate: React.FC<VerifiedReadyCertificateProps> = ({
  user,
  attempts,
  onClose,
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F172A', '#2563EB', '#F59E0B', '#10B981']
      });
    } catch (e) {
      console.log('Confetti trigger note:', e);
    }
  }, []);

  const totalExams = attempts.length;
  const avgScore = totalExams > 0 
    ? Math.round(attempts.reduce((acc, a) => acc + (a.score / a.total_questions) * 100, 0) / totalExams)
    : 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border-4 border-amber-400 p-8 relative overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Border Frame */}
        <div className="border-2 border-slate-200 p-6 sm:p-8 rounded-2xl text-center space-y-6 relative z-10 bg-white">
          
          {/* Top Jet Airliner Header Banner */}
          <div className="relative rounded-2xl p-6 text-white shadow-lg overflow-hidden border border-slate-800">
            <AviationImage
              src={IMAGES.academyGrad}
              alt="Aviation Academy Graduation Ceremony"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]" />

            <div className="relative z-10 space-y-3">
              <div className="inline-flex p-3 rounded-2xl bg-slate-900/90 text-white shadow-xl border border-amber-400">
                <Shield className="w-9 h-9 text-amber-400" />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-300 bg-slate-900/90 px-4 py-1.5 rounded-full border border-amber-400/40 inline-block">
                  ✈ SKY PREP AVIATION MILESTONE
                </span>
                <h1 className="text-3xl font-black text-white mt-3 tracking-tight">VERIFIED READY</h1>
                <p className="text-xs text-slate-200 mt-1 uppercase font-extrabold tracking-wider">
                  Airline Assessment Certificate
                </p>
              </div>
            </div>
          </div>

          {/* Candidate Name Box */}
          <div className="py-3 border-y-2 border-slate-200 max-w-md mx-auto">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Presented to Candidate</p>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{user.full_name || 'Airline Candidate'}</h2>
            <p className="text-xs font-mono text-slate-500">{user.phone_number}</p>
          </div>

          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Has successfully demonstrated comprehensive knowledge across mandatory airline assessment domains: <strong>English Grammar, Numerical Logic, Verbal Reasoning, and Aviation General Knowledge</strong>.
          </p>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center text-xs">
            <div>
              <span className="text-slate-400 font-bold block">Average Score</span>
              <span className="text-lg font-black text-emerald-600">{avgScore}%</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block">Exams Completed</span>
              <span className="text-lg font-black text-slate-900">{totalExams}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block">Issued On</span>
              <span className="text-xs font-mono font-bold text-slate-900 mt-1 block">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Clear Disclaimer Label */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 font-medium">
            ⚠️ <strong>Disclaimer:</strong> This is an in-app achievement milestone validating your preparation progress on Sky Prep — not an official airline employment contract.
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => alert('Certificate link copied to clipboard!')}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Share Achievement</span>
            </button>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Print / Download Certificate</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
