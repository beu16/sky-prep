import React from 'react';
import { UserProfile, ExamAttempt, Language } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Award, BarChart3, Calendar, Clock, ChevronRight, CheckCircle2, Sparkles, Trophy } from 'lucide-react';
import { TRANSLATION } from '../data/translations';
import { IMAGES } from '../assets/images';

interface ProgressScreenProps {
  user: UserProfile;
  attempts: ExamAttempt[];
  lang?: Language;
  onOpenCertificate: () => void;
  onOpenPaywall: () => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  user,
  attempts,
  lang = 'en',
  onOpenCertificate,
  onOpenPaywall,
}) => {
  const t = TRANSLATION[lang];
  const categories = ['English', 'Numerical Reasoning', 'Verbal Reasoning', 'General Knowledge'] as const;

  const totalExams = attempts.length;
  const avgScore = totalExams > 0
    ? Math.round(attempts.reduce((acc, a) => acc + (a.score / a.total_questions) * 100, 0) / totalExams)
    : 0;

  const bestScore = totalExams > 0
    ? Math.max(...attempts.map(a => Math.round((a.score / a.total_questions) * 100)))
    : 0;

  const totalStudyMinutes = attempts.reduce((acc, a) => acc + Math.floor((a.time_taken_seconds || 300) / 60), 0) || 15;

  // Category performance averages
  const categoryStats = categories.map(cat => {
    const catAttempts = attempts.filter(a => a.category === cat);
    const count = catAttempts.length;
    const avg = count > 0 
      ? Math.round(catAttempts.reduce((acc, a) => acc + (a.score / a.total_questions) * 100, 0) / count)
      : 0;
    return { category: cat, count, avg };
  });

  // Chart data
  const chartData = [...attempts]
    .sort((a, b) => new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime())
    .map((a, idx) => ({
      examNum: `Test #${idx + 1}`,
      scorePercent: Math.round((a.score / a.total_questions) * 100),
      category: a.category,
      date: new Date(a.completed_at).toLocaleDateString(),
    }));

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 pb-16 w-full max-w-full overflow-x-hidden">
      
      {/* Title Header with Airport Terminal Banner */}
      <div className="relative rounded-3xl p-6 text-white shadow-xl overflow-hidden border border-slate-800">
        <img
          src={IMAGES.airlineTerminal}
          alt="International Airport Departure Terminal"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-black px-3 py-1 rounded-full border border-blue-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 fill-blue-300" />
            <span>ASSESSMENT METRICS & ANALYTICS</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Candidate Progress Tracker</span>
          </h1>
          <p className="text-xs text-slate-200 font-medium mt-1 max-w-md leading-relaxed">
            Monitor your exam performance, study time, and unlock your official Aviation Verified-Ready Certificate.
          </p>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Exams Taken</span>
          <p className="text-2xl font-black text-[#0B2545]">{totalExams}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Avg Score</span>
          <p className="text-2xl font-black text-[#2E86FF]">{avgScore}%</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Best Score</span>
          <p className="text-2xl font-black text-[#1FAA59]">{bestScore}%</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400 block">Study Time</span>
          <p className="text-2xl font-black text-amber-600">{totalStudyMinutes}m</p>
        </div>
      </div>

      {/* Verified Ready Certificate Milestone Trigger */}
      <div className="bg-[#0B2545] text-white rounded-3xl p-5 shadow-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F2B134] text-[#0B2545] flex items-center justify-center font-black shadow">
              <Trophy className="w-6 h-6 fill-[#0B2545]" />
            </div>
            <div>
              <span className="text-[10px] font-black text-[#F2B134] uppercase tracking-wider block">
                MILESTONE CERTIFICATE
              </span>
              <h3 className="text-base font-black text-white">Verified Ready Certificate</h3>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Complete practice tests to unlock your official Sky Prep Verified Ready certificate with verification badge.
        </p>

        <button
          onClick={onOpenCertificate}
          className="w-full bg-[#F2B134] hover:bg-amber-400 text-[#0B2545] font-black text-xs py-3 px-4 rounded-2xl shadow gold-glow transition-all active:scale-95 flex items-center justify-center gap-2 min-h-[44px]"
        >
          <Award className="w-4 h-4" />
          <span>View / Claim Verified Certificate</span>
        </button>
      </div>

      {/* Category Performance Breakdown */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
          Category Performance
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categoryStats.map((stat) => (
            <div key={stat.category} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#0B2545]">
                  {stat.category}
                </span>
                <span className="text-xs font-black text-[#2E86FF]">{stat.avg}%</span>
              </div>

              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${stat.avg >= 70 ? 'bg-[#1FAA59]' : 'bg-[#F2B134]'}`}
                  style={{ width: `${Math.min(stat.avg, 100)}%` }}
                />
              </div>

              <span className="text-[10px] text-slate-400 font-medium block">
                {stat.count} attempt{stat.count === 1 ? '' : 's'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Score Trend Line Chart (100%, 75%, 50%, 25% y-axis ticks) */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-[#2E86FF]" />
          <span>Score Trend</span>
        </h3>

        {chartData.length === 0 ? (
          <div className="text-center py-8 text-slate-400 space-y-1">
            <p className="text-xs font-bold text-slate-600">No score history yet</p>
            <p className="text-[11px]">Complete a practice exam to plot your score curve.</p>
          </div>
        ) : (
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="examNum" tick={{ fontSize: 10, fill: '#0B2545' }} />
                <YAxis domain={[0, 100]} ticks={[25, 50, 75, 100]} tick={{ fontSize: 10, fill: '#0B2545' }} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Score']}
                  labelFormatter={(label: any) => `Attempt: ${label}`}
                  contentStyle={{ borderRadius: '12px', borderColor: '#cbd5e1', fontSize: '11px' }}
                />
                <Line
                  type="monotone"
                  dataKey="scorePercent"
                  stroke="#2E86FF"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#0B2545', stroke: '#2E86FF', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

    </div>
  );
};
