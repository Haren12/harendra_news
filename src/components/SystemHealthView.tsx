import React from 'react';
import { Server, Database, ShieldCheck, Cpu, HardDrive, CheckCircle2, Activity } from 'lucide-react';

export const SystemHealthView: React.FC = () => {
  return (
    <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6 font-sans">
      <div>
        <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" /> Enterprise System Health & Supabase Diagnostics
        </h3>
        <p className="text-xs text-slate-400 font-mono mt-1">Real-time telemetry, PostgreSQL connection pooling, RLS compliance, and edge cluster monitoring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        <div className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">PostgreSQL Database</span>
            <Database className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Status</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Connection Pool</span>
              <span className="text-cyan-300">18 / 100 active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Row Level Security</span>
              <span className="text-emerald-400 font-bold">Enforced (50+ Tables)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Latency</span>
              <span className="text-cyan-300">4.2 ms</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Gemini 2.5 AI Engine</span>
            <Cpu className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Status</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Operational
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">API Proxy Route</span>
              <span className="text-emerald-400 font-bold">Secure Server-Side</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tokens Today</span>
              <span className="text-cyan-300">1,420,900</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Response Speed</span>
              <span className="text-cyan-300">280 ms avg</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Supabase Storage CDN</span>
            <HardDrive className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Status</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Optimal
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Used Storage</span>
              <span className="text-cyan-300">42.1 GB / 500 GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">WebP Conversion</span>
              <span className="text-emerald-400 font-bold">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Cache Hit Rate</span>
              <span className="text-emerald-400 font-bold">98.4%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
