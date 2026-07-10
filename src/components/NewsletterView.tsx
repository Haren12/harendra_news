import React, { useState } from 'react';
import { Mail, Send, Users, CheckCircle2, Plus } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  status: 'Verified' | 'Pending';
  subscribedAt: string;
}

export const NewsletterView: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    { id: 'sub-1', email: 'commander.alex@harendranews.com', status: 'Verified', subscribedAt: '2026-07-09' },
    { id: 'sub-2', email: 'sarah.connor@resistance.net', status: 'Verified', subscribedAt: '2026-07-08' },
    { id: 'sub-3', email: 'neo@matrix.org', status: 'Verified', subscribedAt: '2026-07-07' }
  ]);

  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject || !broadcastMessage) return;
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
    setBroadcastSubject('');
    setBroadcastMessage('');
  };

  return (
    <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" /> Newsletter & Subscriber Broadcast Studio
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">Manage verified email subscribers and dispatch automated AI daily briefs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Broadcast Sender */}
        <div className="lg:col-span-2 bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-6 space-y-4">
          <h4 className="text-sm font-bold text-cyan-300 font-mono flex items-center gap-2">
            <Send className="w-4 h-4 text-cyan-400" /> Compose AI Daily Cyber Brief
          </h4>

          {successMsg && (
            <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-4 rounded-xl text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Broadcast successfully dispatched to {subscribers.length} verified subscribers!</span>
            </div>
          )}

          <form onSubmit={handleSendBroadcast} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-slate-400 mb-2">Email Subject Line</label>
              <input
                type="text"
                placeholder="e.g., Harendra News Daily Brief: Quantum Breakthroughs..."
                value={broadcastSubject}
                onChange={(e) => setBroadcastSubject(e.target.value)}
                className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-2">Message Content (Markdown Supported)</label>
              <textarea
                rows={5}
                placeholder="Write your newsletter briefing or paste AI generated daily summary..."
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast to All Subscribers</span>
            </button>
          </form>
        </div>

        {/* Subscriber List Summary */}
        <div className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-cyan-300 font-mono flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" /> Verified Subscribers ({subscribers.length})
            </h4>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {subscribers.map(sub => (
              <div key={sub.id} className="bg-slate-900/80 p-3 rounded-xl border border-cyan-500/10 flex items-center justify-between">
                <div>
                  <p className="text-white font-sans font-medium text-xs truncate max-w-[180px]">{sub.email}</p>
                  <span className="text-[10px] text-slate-500">Joined {sub.subscribedAt}</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px]">
                  {sub.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
