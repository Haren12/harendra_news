import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { Sparkles, Clock, Eye, ArrowRight, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../utils/translations';

interface HeroSliderProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  currentLanguage: Language;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ articles, onSelectArticle, currentLanguage }) => {
  const t = translations[currentLanguage];
  const langFiltered = articles.filter(a => {
    const isFeaturedMatch = a.featured || a.breaking;
    if (!isFeaturedMatch) return false;
    if (currentLanguage === 'ne') {
      return a.languageOption === 'ne' || a.languageOption === 'both' || a.category === 'Nepal News' || a.category === 'Local News' || a.category === 'Province News' || a.titleNe;
    } else if (currentLanguage === 'en') {
      return a.languageOption === 'en' || a.languageOption === 'both' || a.category === 'Technology' || a.category === 'World News' || a.category === 'Business';
    }
    return true;
  });

  const featured = langFiltered.length > 0 ? langFiltered : articles.filter(a => a.featured || a.breaking);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featured.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const current = featured[currentIndex];
  const displayTitle = currentLanguage === 'ne' ? (current.titleNe || current.title) : current.title;
  const displaySubtitle = currentLanguage === 'ne' ? (current.subtitleNe || current.subtitle) : current.subtitle;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  const translatedCategory = t.categories[current.category as keyof typeof t.categories] || current.category;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-2xl shadow-cyan-950/60 group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.id}
              src={current.image}
              alt={current.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.45, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover filter brightness-75 contrast-125"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.15),transparent_50%)]"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-14 min-h-[460px] sm:min-h-[520px] h-full flex flex-col justify-between overflow-visible">
          {/* Top Meta */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-cyan-500/10">
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> {translatedCategory}
              </span>
              {current.breaking && (
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider animate-pulse">
                  {t.breakingWire}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-cyan-400/80 font-mono bg-slate-900/80 px-3 py-1.5 rounded-full border border-cyan-500/20">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {current.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {current.views.toLocaleString()} {t.reads}</span>
            </div>
          </div>

          {/* Main Headline & Subtitle */}
          <div className="max-w-3xl my-6 overflow-visible">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="overflow-visible"
              >
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-snug mb-4 font-sans drop-shadow-md break-words">
                  {displayTitle}
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 font-sans break-words">
                  {displaySubtitle}
                </p>

                {/* AI Summary Badge */}
                {current.aiSummary && (
                  <div className="inline-flex items-center gap-2 bg-cyan-950/70 border border-cyan-500/30 rounded-xl px-4 py-2 text-xs text-cyan-200 mb-6 backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="line-clamp-2"><strong className="text-cyan-400">{t.aiBrief}</strong> {current.aiSummary}</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectArticle(current)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
              >
                <span>{t.readFullReport}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <img src={current.author.avatar} alt={current.author.name} className="w-7 h-7 rounded-full border border-cyan-500/40 object-cover" />
                <span>{t.by} <strong className="text-slate-200">{current.author.name}</strong></span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-cyan-500/20">
            <div className="flex items-center gap-1.5">
              {featured.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-cyan-400 shadow-glow' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-400 border border-cyan-500/20 transition-all cursor-pointer"
                aria-label="Previous article"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-400 border border-cyan-500/20 transition-all cursor-pointer"
                aria-label="Next article"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
