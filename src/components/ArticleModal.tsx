import React, { useState, useEffect } from 'react';
import { Article, Comment } from '../types';
import { getAuthorAvatar, harendraAvatar } from '../utils/avatar';
import { 
  X, 
  Clock, 
  Eye, 
  Heart, 
  Bookmark, 
  Share2, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Languages, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ArrowLeft,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ShareModal } from './ShareModal';
import { Language } from '../utils/translations';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onToggleBookmark: (articleId: string) => void;
  onToggleLike: (articleId: string) => void;
  isBookmarked: boolean;
  isLiked: boolean;
  onAddComment: (articleId: string, comment: string) => void;
  currentLanguage?: Language;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onToggleBookmark,
  onToggleLike,
  isBookmarked,
  isLiked,
  onAddComment,
  currentLanguage = 'ne',
}) => {
  if (!article) return null;

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [targetLang, setTargetLang] = useState('Spanish');
  const [translatedData, setTranslatedData] = useState<{ title: string; content: string } | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [readerLang, setReaderLang] = useState<'en' | 'ne' | 'both'>(() => {
    if (currentLanguage === 'ne') return 'ne';
    if (currentLanguage === 'en') return 'en';
    return article.languageOption || 'en';
  });

  // Synchronize readerLang when article or app language changes
  useEffect(() => {
    if (currentLanguage === 'ne') {
      setReaderLang('ne');
    } else if (currentLanguage === 'en') {
      setReaderLang('en');
    } else {
      setReaderLang(article.languageOption || 'en');
    }
  }, [article.id, currentLanguage]);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Text to Speech using Web Speech API
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead = `${article.title}. ${article.subtitle}. ${article.content.replace(/###/g, '')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // AI Translation Handler
  const handleTranslate = async (lang: string) => {
    setTargetLang(lang);
    setIsTranslating(true);
    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: article.title,
          content: article.content,
          targetLanguage: lang,
        }),
      });
      const data = await res.json();
      if (data.translatedTitle && data.translatedContent) {
        setTranslatedData({
          title: data.translatedTitle,
          content: data.translatedContent,
        });
      }
    } catch (err) {
      console.warn('Translation error:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(article.id, commentInput.trim());
    setCommentInput('');
  };

  const displayTitle = translatedData 
    ? translatedData.title 
    : readerLang === 'ne' 
      ? (article.titleNe || article.title) 
      : article.title;
  const displaySubtitle = readerLang === 'ne' 
    ? (article.subtitleNe || article.subtitle) 
    : article.subtitle;
  const displayContent = translatedData 
    ? translatedData.content 
    : readerLang === 'ne' 
      ? (article.contentNe || article.content) 
      : article.content;

  // Dynamically update document title and meta tags for SEO when reading the article
  useEffect(() => {
    const originalTitle = document.title;
    
    // 1. Update document title
    document.title = `${displayTitle} | Nexus AI Nepal News`;

    // Helper function to update or create meta tags
    const updateOrCreateMeta = (nameOrProperty: string, contentValue: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // 2. Update description
    const descriptionContent = displaySubtitle || article.seo?.metaDescription || '';
    updateOrCreateMeta('description', descriptionContent);

    // 3. Update Open Graph tags for social media preview
    updateOrCreateMeta('og:title', displayTitle, true);
    updateOrCreateMeta('og:description', descriptionContent, true);
    updateOrCreateMeta('og:type', 'article', true);
    updateOrCreateMeta('og:url', `${window.location.origin}${window.location.pathname}?article=${article.id}`, true);
    if (article.image) {
      updateOrCreateMeta('og:image', article.image, true);
    }

    // 4. Update Twitter Card tags
    updateOrCreateMeta('twitter:title', displayTitle);
    updateOrCreateMeta('twitter:description', descriptionContent);
    if (article.image) {
      updateOrCreateMeta('twitter:image', article.image);
    }

    return () => {
      // Restore original site title when closing
      document.title = originalTitle;
    };
  }, [article.id, displayTitle, displaySubtitle, article.image, article.seo?.metaDescription]);

  const authorObj = article.author || {
    name: 'Harendra Lamsal',
    role: 'Chief Editor & Publisher',
    avatar: harendraAvatar
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/98 backdrop-blur-sm flex justify-center p-2 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="w-full max-w-4xl bg-slate-950 border border-cyan-500/30 sm:rounded-3xl shadow-2xl shadow-cyan-950/80 my-auto flex flex-col"
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 bg-slate-950 border-b border-cyan-500/20 px-4 sm:px-8 py-4 flex items-center justify-between rounded-t-3xl">
          <button
            onClick={() => {
              if (isPlayingAudio) window.speechSynthesis.cancel();
              onClose();
            }}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-xs cursor-pointer bg-slate-900 px-3 py-2 rounded-xl border border-cyan-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Feed</span>
          </button>

          <div className="flex items-center gap-2">
            {/* AI Voice Reader button */}
            <button
              onClick={handleToggleSpeech}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' 
                  : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20'
              }`}
              title="AI Voice Reader (Text to Speech)"
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span className="hidden sm:inline">{isPlayingAudio ? 'Stop Voice' : 'AI Voice Reader'}</span>
            </button>

            {/* Translation dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-slate-900 text-slate-300 border border-cyan-500/20 hover:border-cyan-500/40 cursor-pointer">
                <Languages className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">{targetLang}</span>
              </button>
              <div className="absolute right-0 mt-1 w-40 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl py-2 hidden group-hover:block z-30 font-mono text-xs">
                {['Spanish', 'French', 'German', 'Japanese', 'Mandarin', 'Russian'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleTranslate(lang)}
                    className="w-full text-left px-4 py-2 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 cursor-pointer"
                  >
                    {lang} {targetLang === lang && '✓'}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isBookmarked ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 text-slate-300 border-cyan-500/20'
              }`}
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-cyan-300 border border-cyan-500/20 transition-all cursor-pointer"
              title="Share Report"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (isPlayingAudio) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-rose-400 border border-cyan-500/20 transition-all cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Header & Hero Image */}
        <div className="p-6 sm:p-10 lg:p-12 space-y-8">
          <div>
            {/* Language Switcher for Readers */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-2.5 rounded-2xl border border-cyan-500/30 mb-6 font-mono text-xs w-fit">
              <span className="text-cyan-400 px-2 flex items-center gap-1.5 font-bold">
                <Languages className="w-4 h-4" /> भाषा / Language:
              </span>
              <button
                onClick={() => setReaderLang('en')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  readerLang === 'en' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white bg-slate-950'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setReaderLang('ne')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  readerLang === 'ne' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white bg-slate-950'
                }`}
              >
                नेपाली (Nepali)
              </button>
              <button
                onClick={() => setReaderLang('both')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  readerLang === 'both' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white bg-slate-950'
                }`}
              >
                Both / दुवै भाषा
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-xs text-cyan-400 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readTime || '3 min read'}
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {(article.views || 145).toLocaleString()} views
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-sans mb-4">
              {displayTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed mb-6">
              {displaySubtitle}
            </p>

            {/* Author Byline & Publishing Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-5 border-y border-cyan-500/20 bg-slate-900/40 rounded-2xl">
              <div className="flex items-center gap-3.5">
                <img 
                  src={getAuthorAvatar(authorObj)} 
                  alt={authorObj.name} 
                  className="w-12 h-12 rounded-full border-2 border-cyan-500/40 object-cover shadow-lg" 
                  onError={(e) => { (e.target as HTMLImageElement).src = harendraAvatar; }}
                />
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base font-sans">{authorObj.name}</h4>
                  <p className="text-xs text-cyan-400 font-mono">{authorObj.role}</p>
                </div>
              </div>
              <div className="flex flex-col sm:items-end text-xs text-slate-300 font-mono space-y-1">
                <span className="flex items-center gap-1.5 text-cyan-200">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> Published: <strong className="text-white">{article.publishedAt || 'Just now'}</strong>
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Secure Broadcast
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 max-h-[450px]">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
          </div>

          {/* AI Summary Card */}
          {article.aiSummary && (
            <div className="bg-gradient-to-r from-cyan-950/60 to-slate-900/60 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Executive AI Intelligence Brief</span>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed font-sans">
                {article.aiSummary}
              </p>
            </div>
          )}

          {/* Translation Loading State */}
          {isTranslating && (
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-4 text-center font-mono text-xs text-cyan-300 animate-pulse">
              Translating article into {targetLang} using Gemini neural engine...
            </div>
          )}

          {/* Article Markdown / Content */}
          {readerLang === 'both' && (article.titleNe || article.contentNe) ? (
            <div className="space-y-12">
              {/* English Version */}
              <div className="space-y-6 bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-cyan-500/30">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider pb-2 border-b border-cyan-500/20">
                  <span>English Edition</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">{article.title}</h2>
                <div className="prose prose-invert max-w-none font-sans text-slate-200 space-y-4 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {article.content}
                </div>
              </div>

              {/* Nepali Version */}
              <div className="space-y-6 bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-cyan-500/30">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider pb-2 border-b border-cyan-500/20">
                  <span>नेपाली संस्करण (Nepali Edition)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">{article.titleNe || article.title}</h2>
                <div className="prose prose-invert max-w-none font-sans text-slate-200 space-y-4 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {article.contentNe || article.content}
                </div>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none font-sans text-slate-200 space-y-6 leading-relaxed text-base sm:text-lg whitespace-pre-line">
              {(displayContent || article.subtitle || 'Content publishing in progress...').split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-xl sm:text-2xl font-bold text-cyan-300 font-sans mt-8 mb-4 border-l-4 border-cyan-400 pl-4">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('> ')) {
                  return (
                    <blockquote key={idx} className="border-l-4 border-cyan-500 bg-cyan-950/30 p-4 rounded-r-2xl italic text-cyan-100 my-6">
                      {paragraph.replace('> ', '')}
                    </blockquote>
                  );
                }
                return (
                  <p key={idx} className="mb-4 text-slate-300">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-cyan-500/20">
            <span className="text-xs text-cyan-400 font-mono flex items-center gap-1 mr-2">
              <Tag className="w-3.5 h-3.5" /> Intelligence Tags:
            </span>
            {article.tags.map((tag) => (
              <span key={tag} className="bg-slate-900 text-slate-300 border border-cyan-500/20 px-3 py-1 rounded-xl text-xs font-mono">
                #{tag}
              </span>
            ))}
          </div>

          {/* Like & Share Action Footer */}
          <div className="py-6 border-y border-cyan-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => onToggleLike(article.id)}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs border transition-all cursor-pointer w-full sm:w-auto ${
                  isLiked 
                    ? 'bg-rose-500 text-slate-950 font-bold border-rose-400 shadow-lg shadow-rose-500/30' 
                    : 'bg-slate-900 text-slate-300 border-cyan-500/30 hover:border-cyan-500'
                }`}
              >
                <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
                <span>{article.likes + (isLiked ? 1 : 0)} Dispatches Liked</span>
              </button>

              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs border transition-all cursor-pointer w-full sm:w-auto ${
                  isBookmarked 
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' 
                    : 'bg-slate-900 text-slate-300 border-cyan-500/30 hover:border-cyan-500'
                }`}
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                <span>{isBookmarked ? 'Saved to Vault' : 'Bookmark Report'}</span>
              </button>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs bg-slate-900 text-slate-300 border border-cyan-500/30 hover:border-cyan-500 hover:text-cyan-300 transition-all cursor-pointer w-full sm:w-auto"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Platforms</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white font-sans">
                Neural Discussion Feed ({article.comments?.length || 0})
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex gap-3">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Broadcast your encrypted critique or commentary..."
                className="flex-1 bg-slate-900 border border-cyan-500/30 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs font-mono flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Broadcast</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {(!article.comments || article.comments.length === 0) ? (
                <p className="text-slate-500 font-mono text-xs py-4">No broadcast responses recorded yet. Be the first to analyze.</p>
              ) : (
                article.comments.map((comment) => (
                  <div key={comment.id} className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={comment.authorAvatar} alt={comment.authorName} className="w-7 h-7 rounded-full border border-cyan-500/40 object-cover" />
                        <span className="font-bold text-white text-xs font-mono">{comment.authorName}</span>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-mono">{comment.createdAt}</span>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm font-sans pl-9">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={`${window.location.origin}${window.location.pathname}?article=${article.id}`}
        title={displayTitle}
        summary={displaySubtitle}
      />
    </div>
  );
};
