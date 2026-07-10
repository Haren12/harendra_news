import React, { useState } from 'react';
import { Megaphone, Plus, Trash2, TrendingUp, BarChart, CheckCircle2 } from 'lucide-react';

interface AdCampaign {
  id: string;
  title: string;
  position: string;
  impressions: number;
  clicks: number;
  ctr: string;
  status: 'Active' | 'Paused' | 'Scheduled';
}

export const AdManagerView: React.FC = () => {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([
    {
      id: 'ad-1',
      title: 'Quantum Neural Chipset Banner',
      position: 'Header Leaderboard (728x90)',
      impressions: 482910,
      clicks: 14200,
      ctr: '2.94%',
      status: 'Active'
    },
    {
      id: 'ad-2',
      title: 'Autonomous Robotics OS Sponsored Dispatch',
      position: 'In-Article Inline Feed',
      impressions: 215400,
      clicks: 9810,
      ctr: '4.55%',
      status: 'Active'
    },
    {
      id: 'ad-3',
      title: 'CyberSecurity Vault Enterprise Pass',
      position: 'Sidebar Sticky Widget',
      impressions: 110500,
      clicks: 3420,
      ctr: '3.10%',
      status: 'Paused'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newPosition, setNewPosition] = useState('Header Leaderboard');

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newAd: AdCampaign = {
      id: `ad-${Date.now()}`,
      title: newTitle,
      position: newPosition,
      impressions: Math.floor(Math.random() * 50000),
      clicks: Math.floor(Math.random() * 2000),
      ctr: `${(Math.random() * 3 + 1).toFixed(2)}%`,
      status: 'Active'
    };
    setCampaigns(prev => [newAd, ...prev]);
    setNewTitle('');
  };

  const handleDelete = (id: string) => {
    setCampaigns(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-cyan-400" /> Advertisement & Monetization Campaign Manager
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">Real-time impression tracking, CTR analytics, and programmatic ad slot scheduling.</p>
        </div>
      </div>

      {/* Add Campaign Form */}
      <form onSubmit={handleAddCampaign} className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Campaign Title / Sponsor Name"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 w-full bg-slate-900 border border-cyan-500/30 rounded-xl px-4 py-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
        />
        <select
          value={newPosition}
          onChange={(e) => setNewPosition(e.target.value)}
          className="w-full md:w-64 bg-slate-900 border border-cyan-500/30 rounded-xl px-4 py-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
        >
          <option>Header Leaderboard (728x90)</option>
          <option>In-Article Inline Feed</option>
          <option>Sidebar Sticky Widget</option>
          <option>Footer Banner</option>
        </select>
        <button
          type="submit"
          className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs font-mono flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Launch Campaign</span>
        </button>
      </form>

      {/* Campaigns Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-cyan-500/20 text-cyan-400">
              <th className="pb-3">Campaign Title</th>
              <th className="pb-3">Placement Position</th>
              <th className="pb-3">Impressions</th>
              <th className="pb-3">Clicks</th>
              <th className="pb-3">CTR</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/10 text-slate-300">
            {campaigns.map(ad => (
              <tr key={ad.id} className="hover:bg-slate-950/40">
                <td className="py-4 font-sans font-medium text-white">{ad.title}</td>
                <td className="py-4 text-cyan-300">{ad.position}</td>
                <td className="py-4">{ad.impressions.toLocaleString()}</td>
                <td className="py-4">{ad.clicks.toLocaleString()}</td>
                <td className="py-4 text-emerald-400 font-bold">{ad.ctr}</td>
                <td className="py-4">
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-full text-[10px]">
                    {ad.status}
                  </span>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
