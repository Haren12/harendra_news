import React, { useState } from 'react';
import { HardDrive, Folder, Image as ImageIcon, Upload, Trash2, Search, CheckCircle2, Shield } from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  folder: string;
  uploadedAt: string;
}

export const MediaLibraryView: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mediaList, setMediaList] = useState<MediaItem[]>([
    {
      id: 'm-1',
      name: 'cyber-neural-core.webp',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      size: '1.2 MB',
      type: 'image/webp',
      folder: 'AI Renderings',
      uploadedAt: '2026-07-10 02:15'
    },
    {
      id: 'm-2',
      name: 'quantum-server-rack.webp',
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
      size: '2.4 MB',
      type: 'image/webp',
      folder: 'Infrastructure',
      uploadedAt: '2026-07-10 01:40'
    },
    {
      id: 'm-3',
      name: 'biometric-scanner-hud.webp',
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
      size: '1.8 MB',
      type: 'image/webp',
      folder: 'Security',
      uploadedAt: '2026-07-09 22:10'
    },
    {
      id: 'm-4',
      name: 'autonomous-robotics-lab.webp',
      url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
      size: '3.1 MB',
      type: 'image/webp',
      folder: 'Robotics',
      uploadedAt: '2026-07-09 19:05'
    }
  ]);

  const folders = ['All', 'AI Renderings', 'Infrastructure', 'Security', 'Robotics'];

  const filteredMedia = mediaList.filter(item => {
    const matchesFolder = selectedFolder === 'All' || item.folder === selectedFolder;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleUploadSimulation = () => {
    const newItem: MediaItem = {
      id: `m-${Date.now()}`,
      name: `cyber-dispatch-${Math.floor(Math.random() * 1000)}.webp`,
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
      size: '1.5 MB',
      type: 'image/webp',
      folder: selectedFolder === 'All' ? 'AI Renderings' : selectedFolder,
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setMediaList(prev => [newItem, ...prev]);
  };

  const handleDelete = (id: string) => {
    setMediaList(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-cyan-400" /> Supabase Storage & Media Library
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">Automatic WebP compression, CDN edge caching, and AI alt-tag generator active.</p>
        </div>

        <button
          onClick={handleUploadSimulation}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-3 rounded-2xl text-xs font-mono flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Asset</span>
        </button>
      </div>

      {/* Folders & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 font-mono text-xs">
          {folders.map(folder => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer border ${
                selectedFolder === folder
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold'
                  : 'bg-slate-950/60 text-slate-300 border-cyan-500/20 hover:border-cyan-500/40'
              }`}
            >
              <Folder className="w-3.5 h-3.5 text-cyan-400" />
              <span>{folder}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-cyan-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMedia.map(item => (
          <div key={item.id} className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl overflow-hidden group">
            <div className="relative h-44 overflow-hidden">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-lg border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                WebP Optimized
              </div>
            </div>

            <div className="p-4 space-y-2 font-mono text-xs">
              <h4 className="font-bold text-white truncate font-sans text-sm">{item.name}</h4>
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>{item.size}</span>
                <span className="text-cyan-400">{item.folder}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-cyan-500/10">
                <span className="text-[10px] text-slate-500">{item.uploadedAt}</span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
