import React, { useState, useEffect } from 'react';
import { PaymentSubmission } from '../types';
import { getPaymentSubmissions, updatePaymentSubmissionStatus } from '../services/supabase';
import { Shield, X, Check, AlertCircle, RefreshCw, Eye, Sparkles } from 'lucide-react';

interface AdminVerificationModalProps {
  onClose: () => void;
  onStatusUpdated?: () => void;
}

export const AdminVerificationModal: React.FC<AdminVerificationModalProps> = ({
  onClose,
  onStatusUpdated,
}) => {
  const [submissions, setSubmissions] = useState<PaymentSubmission[]>([]);
  const [rejectionReason, setRejectionReason] = useState('Amount claimed does not match Telebirr records.');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const loadSubmissions = () => {
    const all = getPaymentSubmissions();
    setSubmissions([...all].reverse());
  };

  useEffect(() => {
    loadSubmissions();
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
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl border border-navy/20 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-navy p-5 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-gold" />
            <div>
              <h2 className="font-extrabold text-base text-white">Telebirr Admin Verification Panel</h2>
              <p className="text-[11px] text-sky-200">Simulate server-side Edge Function status updates (Part 5)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadSubmissions}
              className="p-2 text-sky-200 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              title="Refresh List"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white bg-white/10 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              In production, the Supabase Edge Function calls Telebirr's Merchant API automatically. Here you can inspect receipt screenshots and test approving/rejecting submissions in real-time.
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
