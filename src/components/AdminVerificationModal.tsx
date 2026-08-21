import React, { useState, useEffect } from 'react';
import { PaymentSubmission } from '../types';
import { getPaymentSubmissions, updatePaymentSubmissionStatus, getStoredConfig } from '../services/supabase';
import { Shield, X, Check, AlertCircle, RefreshCw, Eye, Sparkles, Users, Database, CheckCircle2 } from 'lucide-react';

interface AdminVerificationModalProps {
  onClose: () => void;
  onStatusUpdated?: () => void;
}

export const AdminVerificationModal: React.FC<AdminVerificationModalProps> = ({
  onClose,
  onStatusUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'payments' | 'candidates'>('candidates');
  const [submissions, setSubmissions] = useState<PaymentSubmission[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('Amount claimed does not match Telebirr records.');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const loadSubmissions = () => {
    const all = getPaymentSubmissions();
    setSubmissions([...all].reverse());
  };

  const loadSupabaseCandidates = async () => {
    setLoadingCandidates(true);
    const cfg = getStoredConfig();
    try {
      const res = await fetch(`/api/admin/candidates?url=${encodeURIComponent(cfg.url)}&key=${encodeURIComponent(cfg.anonKey)}`);
      if (res.ok) {
        const data = await res.json();
        // Merge profiles and upgrade_interests
        const profiles = data.profiles || [];
        const upgrades = data.upgradeInterests || [];
        
        // Map unique candidates
        const list: any[] = [];
        const seenPhones = new Set();

        profiles.forEach((p: any) => {
          list.push({
            id: p.id,
            fullName: p.full_name || 'Candidate',
            phoneNumber: p.phone_number,
            department: p.department || 'CABIN CREW TRAINING SCHOOL',
            stage: p.stage || 'Written Assessment',
            email: p.email,
            isPaid: p.is_paid,
            source: 'profiles table',
            createdAt: p.created_at,
          });
          if (p.phone_number) seenPhones.add(p.phone_number);
        });

        upgrades.forEach((u: any) => {
          if (!seenPhones.has(u.phone_number)) {
            list.push({
              id: u.id,
              fullName: u.full_name || 'Candidate',
              phoneNumber: u.phone_number,
              department: u.training_school || 'CABIN CREW TRAINING SCHOOL',
              stage: 'Registered',
              email: u.email || '—',
              isPaid: false,
              source: 'upgrade_interests table',
              createdAt: u.registered_at,
            });
            if (u.phone_number) seenPhones.add(u.phone_number);
          }
        });

        setCandidates(list);
      }
    } catch (e) {
      console.error('Failed to load candidates', e);
    } finally {
      setLoadingCandidates(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
    loadSupabaseCandidates();
  }, []);

  const handleApprove = (subId: string) => {
    updatePaymentSubmissionStatus(subId, 'verified');
    loadSubmissions();
    if (onStatusUpdated) onStatusUpdated();
  };

  const handleReject = (subId: string) => {
    updatePaymentSubmissionStatus(subId, 'rejected', rejectionReason);
    loadSubmissions();
    if (onStatusUpdated) onStatusUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy/80 blur-overlay flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-navy/20 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-navy p-5 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-white">Supabase Admin & Verification Hub</h2>
              <p className="text-[11px] text-sky-200">Live candidate records & payment verifications</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                loadSubmissions();
                loadSupabaseCandidates();
              }}
              className="p-2 text-sky-200 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loadingCandidates ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white bg-white/10 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-100 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('candidates')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'candidates'
                ? 'border-gold text-navy bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4 text-gold" />
            <span>Supabase Registered Candidates ({candidates.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'payments'
                ? 'border-gold text-navy bg-white shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-4 h-4 text-sky" />
            <span>Telebirr Submissions ({submissions.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {activeTab === 'candidates' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Live Supabase Database Connection Active:</strong>
                  <p className="mt-0.5 text-emerald-800 text-[11px]">
                    Candidates registered via the portal are stored in your connected Supabase project (<code className="bg-emerald-100 px-1 py-0.5 rounded text-emerald-950 font-mono">profiles</code> & <code className="bg-emerald-100 px-1 py-0.5 rounded text-emerald-950 font-mono">upgrade_interests</code> tables).
                  </p>
                </div>
              </div>

              {candidates.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <Users className="w-12 h-12 mx-auto text-slate-300" />
                  <p className="font-bold text-sm text-navy">No Candidates Found in Supabase</p>
                  <p className="text-xs">Register a new candidate from the sign-up screen to see them appear here.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  {candidates.map((cand) => (
                    <div key={cand.id} className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-navy">{cand.fullName}</h4>
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                            cand.isPaid ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {cand.isPaid ? 'Premier Unlocked' : 'Standard'}
                          </span>
                          <span className="text-[10px] font-medium bg-sky-50 text-sky-800 px-2 py-0.5 rounded border border-sky-200">
                            {cand.source}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-mono">
                          📞 {cand.phoneNumber} {cand.email ? `• ✉️ ${cand.email}` : ''}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {cand.department} • Stage: <strong className="text-slate-700">{cand.stage}</strong>
                        </p>
                      </div>

                      <div className="text-right text-[11px] text-slate-400 font-mono shrink-0">
                        {cand.createdAt ? new Date(cand.createdAt).toLocaleString() : 'Recent'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  In production, the backend server verifies Telebirr Merchant transactions automatically. Here you can inspect receipt records and approve or reject submissions.
                </span>
              </div>

              {submissions.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <Shield className="w-12 h-12 mx-auto text-slate-300" />
                  <p className="font-bold text-sm text-navy">No Payment Submissions Yet</p>
                  <p className="text-xs">Submit a Telebirr receipt from the payment screen to view it here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className={`bg-slate-50 rounded-2xl p-4 border transition-all ${
                        sub.status === 'pending'
                          ? 'border-amber-300 bg-amber-50/20 shadow-sm'
                          : sub.status === 'verified'
                          ? 'border-emerald-300 bg-emerald-50/20'
                          : 'border-rose-300 bg-rose-50/20'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-black text-sm text-navy">
                              TxID: {sub.telebirr_transaction_id}
                            </span>
                            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                              sub.status === 'pending'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : sub.status === 'verified'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                            }`}>
                              {sub.status}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 font-medium">
                            Amount Claimed: <strong className="text-navy">99 ETB</strong> • Submitted: {new Date(sub.submitted_at).toLocaleTimeString()}
                          </p>
                        </div>

                        {/* Screenshot Preview Thumbnail Button */}
                        {sub.receipt_image_url && (
                          <button
                            onClick={() => setSelectedImage(sub.receipt_image_url)}
                            className="bg-white hover:bg-sky-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-sky flex items-center gap-1.5 shrink-0"
                          >
                            <Eye className="w-3.5 h-3.5" /> View Receipt Screenshot
                          </button>
                        )}
                      </div>

                      {/* Actions for Pending Submissions */}
                      {sub.status === 'pending' && (
                        <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-2">
                          <button
                            onClick={() => handleApprove(sub.id)}
                            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow flex items-center justify-center gap-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve & Unlock Premier</span>
                          </button>

                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <input
                              type="text"
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              placeholder="Rejection reason..."
                              className="px-3 py-2 text-xs rounded-xl border border-slate-300 text-navy w-full"
                            />
                            <button
                              onClick={() => handleReject(sub.id)}
                              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3 py-2 rounded-xl whitespace-nowrap"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      )}

                      {sub.status === 'rejected' && (
                        <p className="text-xs text-rose-700 font-semibold mt-2">
                          Reason: {sub.rejection_reason}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal for viewing image screenshot full size */}
        {selectedImage && (
          <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl p-4 space-y-3 relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-3 top-3 p-1.5 bg-black/10 hover:bg-black/20 rounded-full"
              >
                <X className="w-4 h-4 text-navy" />
              </button>
              <h4 className="text-xs font-bold text-navy uppercase">Telebirr Confirmation Screenshot</h4>
              <img src={selectedImage} alt="Full Receipt" className="w-full max-h-[70vh] object-contain rounded-xl border border-slate-200" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

