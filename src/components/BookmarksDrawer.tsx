import React from 'react';
import { Article } from '../types';
import { Bookmark, X, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface BookmarksDrawerProps {
  articles: Article[];
  bookmarkedIds: string[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (id: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  articles,
  bookmarkedIds,
  onClose,
  onSelectArticle,
  onToggleBookmark,
}) => {
  const bookmarkedArticles = articles.filter(a => bookmarkedIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-xl flex justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-slate-950 border-l border-cyan-500/30 h-full flex flex-col shadow-2xl"
      >
        <div className="p-6 border-b border-cyan-500/25 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white font-mono text-sm">Saved Intelligence Vault ({bookmarkedArticles.length})</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/20">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-20 text-slate-500 font-mono text-xs">
              Your intelligence vault is empty. Click the bookmark icon on any dispatch to save it here.
            </div>
          ) : (
            bookmarkedArticles.map((art) => (
              <div
                key={art.id}
                className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-4 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono uppercase">
                    {art.category}
                  </span>
                  <button
                    onClick={() => onToggleBookmark(art.id)}
                    className="text-xs text-rose-400 hover:text-rose-300 font-mono"
                  >
                    Remove
                  </button>
                </div>

                <h4 
                  onClick={() => { onSelectArticle(art); onClose(); }}
                  className="font-bold text-white text-sm font-sans cursor-pointer group-hover:text-cyan-300 transition-colors line-clamp-2"
                >
                  {art.title}
                </h4>

                <div className="flex items-center justify-between pt-2 border-t border-cyan-500/10 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {art.readTime}</span>
                  <button
                    onClick={() => { onSelectArticle(art); onClose(); }}
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  >
                    <span>Read Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
