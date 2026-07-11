import React, { useState } from 'react';
import { Article, SystemLog, Author } from '../types';
import { 
  BarChart3, 
  Users, 
  Database, 
  Server, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  Plus, 
  Trash2, 
  Activity,
  Settings,
  HardDrive,
  Megaphone,
  Mail,
  Edit3
} from 'lucide-react';
import { MediaLibraryView } from './MediaLibraryView';
import { AdManagerView } from './AdManagerView';
import { NewsletterView } from './NewsletterView';
import { SystemHealthView } from './SystemHealthView';

interface DashboardViewProps {
  articles: Article[];
  systemLogs: SystemLog[];
  authors: Author[];
  onDeleteArticle: (id: string) => void;
  onEditArticle: (article: Article) => void;
  onOpenAIWriter: () => void;
  onOpenSupabaseConfig: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  articles,
  systemLogs,
  authors,
  onDeleteArticle,
  onEditArticle,
  onOpenAIWriter,
  onOpenSupabaseConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'media' | 'ads' | 'newsletter' | 'health' | 'logs' | 'users' | 'settings'>('overview');
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  const totalViews = articles.reduce((acc, a) => acc + a.views, 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-900/60 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> ENTERPRISE CONTROL CENTER
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Harendra News Editorial & System Hub</h1>
          <p className="text-slate-400 text-xs sm:text-sm font-mono mt-1">Super Admin Clearance • Supabase PostgreSQL RLS Active</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAIWriter}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-3 rounded-2xl text-xs font-mono flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>New AI Dispatch</span>
          </button>
          <button
            onClick={onOpenSupabaseConfig}
            className="bg-slate-900 hover:bg-slate-800 text-cyan-300 px-5 py-3 rounded-2xl text-xs font-mono border border-cyan-500/30 flex items-center gap-2 cursor-pointer"
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Supabase / RLS</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 font-mono text-xs">
        {[
          { id: 'overview', label: 'System Overview', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'content', label: `Posts (${articles.length})`, icon: <FileText className="w-4 h-4" /> },
          { id: 'media', label: 'Media Library', icon: <HardDrive className="w-4 h-4" /> },
          { id: 'ads', label: 'Advertisements', icon: <Megaphone className="w-4 h-4" /> },
          { id: 'newsletter', label: 'Newsletter', icon: <Mail className="w-4 h-4" /> },
          { id: 'health', label: 'System Health', icon: <Activity className="w-4 h-4" /> },
          { id: 'logs', label: 'Audit Logs', icon: <Server className="w-4 h-4" /> },
          { id: 'users', label: 'Team', icon: <Users className="w-4 h-4" /> },
          { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl whitespace-nowrap transition-all cursor-pointer border ${
              activeTab === tab.id
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border-cyan-500/20'
            }`}
          >
            <span className={activeTab === tab.id ? 'text-slate-950' : 'text-cyan-400'}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400 font-mono">Total Page Views</span>
                <TrendingUp className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold text-white font-mono">{totalViews.toLocaleString()}</h3>
              <p className="text-[11px] text-emerald-400 font-mono mt-2">+14.2% from last hour</p>
            </div>

            <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400 font-mono">Active Readers</span>
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold text-white font-mono">4,820</h3>
              <p className="text-[11px] text-cyan-400 font-mono mt-2">Real-time WebSocket Sync</p>
            </div>

            <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400 font-mono">Server Load (Edge)</span>
                <Server className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold text-white font-mono">18.4%</h3>
              <p className="text-[11px] text-emerald-400 font-mono mt-2">Optimal cluster performance</p>
            </div>

            <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400 font-mono">Supabase Storage</span>
                <HardDrive className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold text-white font-mono">42.1 GB</h3>
              <p className="text-[11px] text-cyan-400 font-mono mt-2">PostgreSQL RLS Active</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-xl">
              <h3 className="text-base font-bold text-white font-mono mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" /> Recent System Logs
              </h3>
              <div className="space-y-3 font-mono text-xs">
                {systemLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="bg-slate-950/80 p-3 rounded-xl border border-cyan-500/10 flex items-center justify-between">
                    <div>
                      <span className="text-cyan-400 font-bold">[{log.source}]</span>{' '}
                      <span className="text-slate-300">{log.message}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 shrink-0">{log.timestamp.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-mono mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security & Compliance Mesh
                </h3>
                <ul className="space-y-3 text-xs font-mono text-slate-300">
                  <li className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-cyan-500/10">
                    <span>Row Level Security (RLS) Policies</span>
                    <span className="text-emerald-400 font-bold">Enforced (50+ Tables)</span>
                  </li>
                  <li className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-cyan-500/10">
                    <span>Gemini API Key Security</span>
                    <span className="text-emerald-400 font-bold">Server-Side Proxy Only</span>
                  </li>
                  <li className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-cyan-500/10">
                    <span>DDoS / Rate Limiting Edge Proxy</span>
                    <span className="text-emerald-400 font-bold">Active (100 req/min)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Content Management */}
      {activeTab === 'content' && (
        <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-mono">Published Intelligence Dispatches</h3>
            <button
              onClick={onOpenAIWriter}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Article</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-cyan-500/20 text-cyan-400">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Author</th>
                  <th className="pb-3">Views</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/10 text-slate-300">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-950/40">
                    <td className="py-4 pr-4 font-sans font-medium text-white max-w-xs truncate">{art.title}</td>
                    <td className="py-4 text-cyan-300">{art.category}</td>
                    <td className="py-4">{art.author.name}</td>
                    <td className="py-4">{art.views.toLocaleString()}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEditArticle(art)}
                          className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30 cursor-pointer"
                          title="Edit Dispatch"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setArticleToDelete(art)}
                          className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30 cursor-pointer"
                          title="Delete Dispatch"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Media Library */}
      {activeTab === 'media' && <MediaLibraryView />}

      {/* Tab 4: Advertisements */}
      {activeTab === 'ads' && <AdManagerView />}

      {/* Tab 5: Newsletter */}
      {activeTab === 'newsletter' && <NewsletterView />}

      {/* Tab 6: System Health */}
      {activeTab === 'health' && <SystemHealthView />}

      {/* Tab 7: System Logs */}
      {activeTab === 'logs' && (
        <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-4">
          <h3 className="text-lg font-bold text-white font-mono mb-4">Complete System & Audit Event Log</h3>
          <div className="space-y-3 font-mono text-xs">
            {systemLogs.map((log) => (
              <div key={log.id} className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/10 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      log.level === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                      log.level === 'warn' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                      'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    }`}>
                      {log.level}
                    </span>
                    <span className="text-cyan-300 font-bold">[{log.source}]</span>
                  </div>
                  <p className="text-slate-200">{log.message}</p>
                </div>
                <span className="text-[11px] text-slate-500">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 8: Editorial Team */}
      {activeTab === 'users' && (
        <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <h3 className="text-lg font-bold text-white font-mono">Editorial Board & Correspondents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {authors.map((auth) => (
              <div key={auth.id} className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-5 flex items-center gap-4">
                <img src={auth.avatar} alt={auth.name} className="w-16 h-16 rounded-2xl object-cover border border-cyan-500/40" />
                <div className="space-y-1 font-mono">
                  <h4 className="font-bold text-white text-sm font-sans">{auth.name}</h4>
                  <p className="text-xs text-cyan-400">{auth.role}</p>
                  <p className="text-xs text-slate-400 font-sans line-clamp-1">{auth.bio}</p>
                  <p className="text-[11px] text-slate-500">{auth.articlesCount} dispatches published</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 9: Settings */}
      {activeTab === 'settings' && (
        <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6 font-mono text-xs">
          <h3 className="text-lg font-bold text-white font-sans">Platform & Supabase Configuration</h3>
          <div className="space-y-4 max-w-xl">
            <div>
              <label className="block text-cyan-300 mb-2">Supabase Project URL</label>
              <input 
                type="text" 
                defaultValue="https://xyz-cybernews.supabase.co" 
                readOnly 
                className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-3 text-slate-300"
              />
            </div>
            <div>
              <label className="block text-cyan-300 mb-2">Supabase Anon Key</label>
              <input 
                type="password" 
                defaultValue="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
                className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-3 text-slate-300"
              />
            </div>
            <button
              onClick={onOpenSupabaseConfig}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl cursor-pointer"
            >
              View Full PostgreSQL Schema & RLS Setup
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-sans">Confirm Dispatch Deletion</h3>
                <p className="text-xs text-slate-400 font-mono">This action is permanent and cannot be undone.</p>
              </div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-rose-500/25">
              <p className="text-xs text-slate-300 font-sans font-medium line-clamp-2">{articleToDelete.title}</p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setArticleToDelete(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-mono text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteArticle(articleToDelete.id);
                  setArticleToDelete(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold font-mono text-xs cursor-pointer shadow-lg shadow-rose-600/30"
              >
                Yes, Delete Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

