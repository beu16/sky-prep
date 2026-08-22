import React from 'react';
import { UserProfile, Language } from '../types';
import { TRANSLATION } from '../data/translations';
import { 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Plane, 
  X, 
  Download, 
  Share2 
} from 'lucide-react';
import jsPDF from 'jspdf';

interface VerifiedReadyCertificateProps {
  user: UserProfile;
  lang: Language;
  onClose: () => void;
}

export const VerifiedReadyCertificate: React.FC<VerifiedReadyCertificateProps> = ({
  user,
  lang,
  onClose
}) => {
  const t = TRANSLATION[lang];

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Certificate Design in PDF
    doc.setFillColor(11, 37, 69);
    doc.rect(0, 0, 297, 210, 'F');

    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);

    doc.setTextColor(245, 158, 11);
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text('SKY PREP AVIATION ACADEMY', 148.5, 40, { align: 'center' });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('CERTIFICATE OF ASSESSMENT READINESS', 148.5, 55, { align: 'center' });

    doc.setFontSize(12);
    doc.text('This officially certifies that', 148.5, 75, { align: 'center' });

    doc.setTextColor(245, 158, 11);
    doc.setFontSize(24);
    doc.text(user.name.toUpperCase(), 148.5, 95, { align: 'center' });

    doc.setTextColor(200, 220, 240);
    doc.setFontSize(13);
    doc.text(`Candidate ID: ${user.candidateNumber}  •  Track: ${user.school.toUpperCase()}`, 148.5, 110, { align: 'center' });

    doc.setFontSize(11);
    doc.text('has successfully completed standard airline entrance aptitude & behavioral mock exams', 148.5, 125, { align: 'center' });
    doc.text(`demonstrating verified readiness with an average score of ${user.averageScore || 85}%.`, 148.5, 135, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(150, 170, 190);
    doc.text(`Date of Issue: ${new Date().toLocaleDateString()}`, 40, 175);
    doc.text('Authorized Assessment Board - Sky Prep', 250, 175, { align: 'right' });

    doc.save(`SkyPrep_Certificate_${user.candidateNumber}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#07192F] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-center text-white">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500 text-amber-400 mx-auto flex items-center justify-center shadow-lg">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest font-black text-amber-400">
            Official Certification
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Certificate of Assessment Readiness
          </h2>
        </div>

        <div className="py-4 px-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <p className="text-xs text-slate-400">Conferred upon</p>
          <h3 className="text-xl sm:text-2xl font-black text-amber-400 tracking-wide">
            {user.name}
          </h3>
          <p className="text-xs text-slate-300 font-mono">
            Candidate ID: {user.candidateNumber} • Department: {user.school.toUpperCase()}
          </p>
          <p className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1 pt-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Passed Standardized Airline Assessment Threshold</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleDownloadPDF}
            type="button"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download Official PDF</span>
          </button>

          <button
            onClick={onClose}
            type="button"
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
