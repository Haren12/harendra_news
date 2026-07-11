import React from 'react';
import { Article, Category } from '../types';
import { Clock, Eye, Heart, Bookmark, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, translations } from '../utils/translations';

interface ArticleFeedProps {
  articles: Article[];
  selectedCategory: Category;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  onToggleLike: (articleId: string) => void;
  bookmarkedIds: string[];
  likedIds: string[];
  currentLanguage: Language;
}

export const ArticleFeed: React.FC<ArticleFeedProps> = ({
  articles,
  selectedCategory,
  onSelectArticle,
  onToggleBookmark,
  onToggleLike,
  bookmarkedIds,
  likedIds,
  currentLanguage,
}) => {
  const t = translations[currentLanguage];
  const langFiltered = articles.filter(a => {
    if (currentLanguage === 'ne') {
      return a.languageOption === 'ne' || a.languageOption === 'both' || a.category === 'Nepal News' || a.category === 'Local News' || a.category === 'Province News' || a.titleNe;
    } else if (currentLanguage === 'en') {
      return a.languageOption === 'en' || a.languageOption === 'both' || a.category === 'Technology' || a.category === 'World News' || a.category === 'Business' || a.category === 'Science & AI';
    }
    return true;
  });

  const categoryFiltered = (langFiltered.length > 0 ? langFiltered : articles).filter(a => selectedCategory === 'All' || a.category === selectedCategory);
  const filtered = categoryFiltered.length > 0 ? categoryFiltered : (selectedCategory === 'All' ? articles : articles.filter(a => a.category === selectedCategory));

  const translatedCategoryName = t.categories[selectedCategory as keyof typeof t.categories] || selectedCategory;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-6 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans flex items-center gap-2">
            {selectedCategory === 'All' ? t.recentDispatches : `${translatedCategoryName}`}
            <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-full border border-cyan-500/30 font-mono">
              {filtered.length} reports
            </span>
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <span>Real-time Neural Sync Active</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-slate-900/40 border border-cyan-500/20 rounded-3xl p-12 text-center">
          <p className="text-slate-400 font-mono text-sm">No intelligence reports found in this frequency.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, index) => {
            const isBookmarked = bookmarkedIds.includes(article.id);
            const isLiked = likedIds.includes(article.id);
            const itemCategoryTranslated = t.categories[article.category as keyof typeof t.categories] || article.category;
            const displayTitle = currentLanguage === 'ne' ? (article.titleNe || article.title) : article.title;
            const displaySubtitle = currentLanguage === 'ne' ? (article.subtitleNe || article.subtitle) : article.subtitle;

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/50 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-xl shadow-cyan-950/30 transition-all hover:shadow-cyan-500/10 hover:-translate-y-1"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/40 px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider">
                        {itemCategoryTranslated}
                      </span>
                      {article.trending && (
                        <span className="bg-cyan-500 text-slate-950 font-bold px-2 py-0.5 rounded-full text-[10px] font-mono">
                          TRENDING
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); onToggleBookmark(article.id); }}
                        className={`p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
                          isBookmarked 
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400' 
                            : 'bg-slate-950/75 text-slate-300 border-cyan-500/30 hover:text-cyan-300'
                        }`}
                        title="Bookmark"
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-cyan-400/80 font-mono mb-3">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                      <span>•</span>
                      <span>{article.publishedAt}</span>
                    </div>

                    <h3 
                      onClick={() => onSelectArticle(article)}
                      className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer font-sans leading-snug mb-2 line-clamp-2"
                    >
                      {displayTitle}
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 font-sans mb-4">
                      {displaySubtitle}
                    </p>

                    {/* AI Summary Badge */}
                    {article.aiSummary && (
                      <div className="bg-cyan-950/40 border border-cyan-500/20 rounded-xl p-3 text-[11px] text-cyan-200/90 mb-4 flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{article.aiSummary}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Meta & Actions */}
                <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-cyan-500/10 mt-auto pt-4">
                  <div className="flex items-center gap-2">
                    <img src={article.author.avatar} alt={article.author.name} className="w-6 h-6 rounded-full border border-cyan-500/30 object-cover" />
                    <span className="text-xs text-slate-300 font-mono truncate max-w-[120px]">{article.author.name}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onToggleLike(article.id)}
                      className={`flex items-center gap-1 text-xs font-mono transition-colors cursor-pointer ${
                        isLiked ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-rose-400'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5" fill={isLiked ? 'currentColor' : 'none'} />
                      <span>{article.likes + (isLiked ? 1 : 0)}</span>
                    </button>

                    <button
                      onClick={() => onSelectArticle(article)}
                      className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-mono cursor-pointer group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
};
