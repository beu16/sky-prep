import React, { useState } from 'react';
import { SupabaseConfig } from '../types';
import { getStoredConfig, saveConfig, PART_3_SUPABASE_SQL } from '../services/supabase';
import { Database, Shield, Copy, Check, X, Save, Code2 } from 'lucide-react';

interface SupabaseConfigModalProps {
  onClose: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({ onClose }) => {
  const initialConfig = getStoredConfig();

  const [url, setUrl] = useState(initialConfig.url);
  const [anonKey, setAnonKey] = useState(initialConfig.anonKey);
  const [merchantNumber, setMerchantNumber] = useState(initialConfig.merchantNumber);
  const [activeTab, setActiveTab] = useState<'config' | 'sql'>('config');
  const [copiedSql, setCopiedSql] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cfg: SupabaseConfig = {
      url: url.trim(),
      anonKey: anonKey.trim(),
      merchantNumber: merchantNumber.trim(),
    };
    saveConfig(cfg);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(PART_3_SUPABASE_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy/80 blur-overlay flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-navy/20 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-navy p-5 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-sky-300" />
            <div>
              <h2 className="font-extrabold text-base text-white">Supabase Backend & Config</h2>
              <p className="text-[11px] text-sky-200">Configure connection settings & inspect Part 3 Database Schema</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-300 hover:text-white bg-white/10 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-4">
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-3 text-xs font-extrabold transition-all border-b-2 ${
              activeTab === 'config'
                ? 'border-sky text-sky'
                : 'border-transparent text-slate-500 hover:text-navy'
            }`}
          >
            Connection Settings
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-3 text-xs font-extrabold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'sql'
                ? 'border-sky text-sky'
                : 'border-transparent text-slate-500 hover:text-navy'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Part 3 Supabase SQL Schema</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {activeTab === 'config' ? (
            <form onSubmit={handleSave} className="space-y-4">
              {savedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Supabase configuration saved successfully!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky outline-none text-xs text-navy font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                  Supabase Public Anon Key
                </label>
                <textarea
                  rows={2}
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-sky outline-none text-xs text-navy font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Security notice: Only the public anon key belongs in client code. Service role keys stay strictly server-side in Edge Functions.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                  Telebirr Merchant Account Number
                </label>
                <input
                  type="text"
                  value={merchantNumber}
                  onChange={(e) => setMerchantNumber(e.target.value)}
                  placeholder="0911234567"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky outline-none text-xs text-navy font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-sky hover:bg-blue-600 text-white font-extrabold text-xs py-3 rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600 font-medium">
                  Paste this SQL script into your Supabase project's SQL Editor to set up tables and Row Level Security (RLS) policies.
                </p>
                <button
                  onClick={handleCopySql}
                  className="bg-navy hover:bg-[#123661] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-gold" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL'}</span>
                </button>
              </div>

              <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-80 border border-slate-800">
                <pre>{PART_3_SUPABASE_SQL}</pre>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
