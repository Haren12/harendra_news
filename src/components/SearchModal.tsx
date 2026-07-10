import React, { useState } from 'react';
import { Article } from '../types';
import { Search, X, ArrowRight, Clock, Tag } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchModalProps {
  articles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ articles, onClose, onSelectArticle }) => {
  const [query, setQuery] = useState('');

  const filtered = query.trim() === '' ? [] : articles.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    a.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-2xl flex items-start justify-center pt-20 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-3xl bg-slate-950 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/80 overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-cyan-500/20 flex items-center gap-3">
          <Search className="w-6 h-6 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dispatches by title, keyword, tag, or category..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-base sm:text-lg focus:outline-none font-mono"
          />
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/20">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {query.trim() === '' ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              Type any keyword (e.g. "Quantum", "Biotech", "DAO", "Fusion") to query the intelligence database.
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-mono text-xs">
              No intelligence reports matching "{query}"
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-cyan-400 font-mono mb-2">Found {filtered.length} reports:</p>
              {filtered.map((art) => (
                <div
                  key={art.id}
                  onClick={() => { onSelectArticle(art); onClose(); }}
                  className="bg-slate-900/60 hover:bg-slate-900 border border-cyan-500/20 hover:border-cyan-500/50 rounded-2xl p-4 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono uppercase">
                        {art.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {art.readTime}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm font-sans group-hover:text-cyan-300 transition-colors">
                      {art.title}
                    </h4>
                  </div>
                  <ArrowRight className="w-5 h-5 text-cyan-400 shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
