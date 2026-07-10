import React from 'react';
import { Database, X, ShieldCheck, CheckCircle2, Server, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface SupabaseConfigModalProps {
  onClose: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-slate-950 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/80 overflow-hidden font-sans"
      >
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-b border-cyan-500/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-sm font-mono">Supabase PostgreSQL & RLS Architecture</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/20">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-300 font-sans max-h-[70vh] overflow-y-auto">
          <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white font-mono text-xs uppercase text-cyan-300 mb-1">Production-Ready Supabase Backend</h4>
              <p className="text-xs text-slate-300">
                CyberNews AI is architected to connect directly with Supabase PostgreSQL, leveraging Row Level Security (RLS) policies, Realtime websockets, and Supabase Storage buckets.
              </p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <h5 className="font-bold text-white">Normalized Database Tables Provisioned:</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'profiles', 'roles', 'permissions', 'articles', 'categories', 
                'tags', 'article_tags', 'authors', 'media_library', 'comments', 
                'bookmarks', 'likes', 'views', 'notifications', 'subscribers', 
                'newsletter', 'advertisements', 'audit_logs', 'login_logs', 'sessions'
              ].map((table) => (
                <div key={table} className="bg-slate-900/80 border border-cyan-500/20 px-3 py-2 rounded-xl text-cyan-300 flex items-center gap-2">
                  <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{table}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white font-mono text-xs">Environment Variables Configuration (.env)</h5>
            <p className="text-xs text-slate-400">
              To activate your live Supabase instance, set the following keys in your environment secrets or `.env` file:
            </p>
            <pre className="bg-slate-900 border border-cyan-500/20 rounded-xl p-4 text-cyan-300 font-mono text-[11px] overflow-x-auto">
{`VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"`}
            </pre>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl font-mono text-xs cursor-pointer"
            >
              Close Architecture View
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
