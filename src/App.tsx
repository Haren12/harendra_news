import React, { useState, useEffect } from 'react';
import { Article, Category, SystemLog, Author } from './types';
import { CheckCircle2, X } from 'lucide-react';
import { mockArticles, mockAuthors, mockSystemLogs } from './data/mockArticles';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { CategoryNav } from './components/CategoryNav';
import { ArticleFeed } from './components/ArticleFeed';
import { ArticleModal } from './components/ArticleModal';
import { AIWriterModal } from './components/AIWriterModal';
import { DashboardView } from './components/DashboardView';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Footer } from './components/Footer';
import { NepaliPatroModal } from './components/NepaliPatroModal';
import { LiveAIChatWidget } from './components/LiveAIChatWidget';
import { GoogleTranslateWidget } from './components/GoogleTranslateWidget';
import { NepaliUnicodeHelper } from './components/NepaliUnicodeHelper';
import { Language } from './utils/translations';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('harendra_news_articles_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load saved articles', e);
    }
    return mockArticles;
  });

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
        }
      })
      .catch(err => console.log('Using local articles store', err));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('harendra_news_articles_v1', JSON.stringify(articles));
      fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articles })
      }).catch(err => console.error('Failed to sync articles to backend', err));
    } catch (e) {
      console.error('Failed to save articles', e);
    }
  }, [articles]);

  const [authors] = useState<Author[]>(mockAuthors);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>(mockSystemLogs);

  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Language & Auth state
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ne'); // Default to Nepali as requested by user
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [sessionSeconds, setSessionSeconds] = useState<number>(300); // 5 minutes = 300 seconds
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleOpenAIWriter = () => {
    if (!currentUserRole) {
      setIsAdminLoginOpen(true);
      return;
    }
    setIsAIWriterOpen(true);
  };

  const handleOpenDashboard = () => {
    if (!currentUserRole) {
      setIsAdminLoginOpen(true);
      return;
    }
    setCurrentView('dashboard');
  };

  useEffect(() => {
    if (!currentUserRole) return;

    setSessionSeconds(300);

    const timer = setInterval(() => {
      setSessionSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCurrentUserRole(null);
          setCurrentUserName(null);
          setSystemLogs(l => [{
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            level: 'warning',
            message: `Admin session expired (5-minute security limit). Auto-logged out.`,
            source: 'SecurityManager'
          }, ...l]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const handleActivity = () => {
      setSessionSeconds(300);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [currentUserRole]);

  // Modals & Drawers state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isAIWriterOpen, setIsAIWriterOpen] = useState(false);
  const [isSupabaseConfigOpen, setIsSupabaseConfigOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isNepaliPatroOpen, setIsNepaliPatroOpen] = useState(false);

  // User interactions state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['art-1']);
  const [likedIds, setLikedIds] = useState<string[]>(['art-1', 'art-3']);

  const handleToggleBookmark = (articleId: string) => {
    setBookmarkedIds(prev => 
      prev.includes(articleId) ? prev.filter(id => id !== articleId) : [...prev, articleId]
    );
  };

  const handleToggleLike = (articleId: string) => {
    setLikedIds(prev => 
      prev.includes(articleId) ? prev.filter(id => id !== articleId) : [...prev, articleId]
    );
  };

  const handleAddComment = (articleId: string, content: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      articleId,
      authorName: currentUserName || 'Commander Alex',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
      content,
      createdAt: 'Just now',
      likes: 1
    };

    setArticles(prev => prev.map(art => {
      if (art.id === articleId) {
        const updatedComments = [newComment, ...(art.comments || [])];
        const updated = { ...art, comments: updatedComments };
        if (selectedArticle && selectedArticle.id === articleId) {
          setSelectedArticle(updated);
        }
        return updated;
      }
      return art;
    }));
  };

  const handlePublishArticle = (newArticle: Article) => {
    setArticles(prev => [newArticle, ...prev]);
    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      level: 'success',
      message: `AI Journalist published dispatch: "${newArticle.title}"`,
      source: 'GeminiWriter'
    };
    setSystemLogs(prev => [newLog, ...prev]);
    setSuccessMessage(`Successfully published dispatch: "${newArticle.title}"!`);
    setTimeout(() => setSuccessMessage(null), 4500);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    if (selectedArticle?.id === id) {
      setSelectedArticle(null);
    }
  };

  const handleLoginSuccess = (role: string, name: string) => {
    setCurrentUserRole(role);
    setCurrentUserName(name);
    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      level: 'success',
      message: `User authenticated via Supabase Auth: ${name} (${role})`,
      source: 'SupabaseAuth'
    };
    setSystemLogs(prev => [newLog, ...prev]);
  };

  const handleLogout = () => {
    setCurrentUserRole(null);
    setCurrentUserName(null);
  };

  const currentLangArticles = articles.filter(a => currentLanguage === 'ne' ? Boolean(a.titleNe) : !Boolean(a.titleNe));
  const breakingNewsArticle = currentLangArticles.find(a => a.breaking) || currentLangArticles[0] || articles[0];
  const breakingNewsTitle = currentLanguage === 'ne' 
    ? (breakingNewsArticle?.titleNe || breakingNewsArticle?.title || 'नरेन्द्र लम्साल न्युज') 
    : (breakingNewsArticle?.title || 'Nexus Harendra News Online');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden font-mono">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Subtle Nepali Cultural & National Watermark */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-500/[0.03] select-none pointer-events-none text-[10vw] font-black uppercase tracking-widest z-0 text-center whitespace-nowrap">
        नेपाल • HARENDRA NEWS
      </div>

      {/* Navbar with Live Clock, Nepali Date, Language Selector & Admin Login */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenAIWriter={handleOpenAIWriter}
        onOpenDashboard={handleOpenDashboard}
        onOpenSupabaseConfig={() => setIsSupabaseConfigOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenNepaliPatro={() => setIsNepaliPatroOpen(true)}
        bookmarksCount={bookmarkedIds.length}
        currentView={currentView}
        onNavigateHome={() => setCurrentView('home')}
        breakingNewsTitle={breakingNewsArticle?.title || 'Nexus Harendra News Online'}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        currentUserRole={currentUserRole}
        currentUserName={currentUserName}
        onLogout={handleLogout}
        sessionSeconds={sessionSeconds}
      />

      {/* Main View Router */}
      <main className="flex-1 relative z-10">
        {currentView === 'home' ? (
          <>


            <HeroSlider 
              articles={articles} 
              onSelectArticle={(art) => setSelectedArticle(art)} 
              currentLanguage={currentLanguage}
            />
            <CategoryNav 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
              currentLanguage={currentLanguage}
            />
            <ArticleFeed 
              articles={articles}
              selectedCategory={selectedCategory}
              onSelectArticle={(art) => setSelectedArticle(art)}
              onToggleBookmark={handleToggleBookmark}
              onToggleLike={handleToggleLike}
              bookmarkedIds={bookmarkedIds}
              likedIds={likedIds}
              currentLanguage={currentLanguage}
            />
          </>
        ) : (
          <DashboardView
            articles={articles}
            systemLogs={systemLogs}
            authors={authors}
            onDeleteArticle={handleDeleteArticle}
            onOpenAIWriter={() => setIsAIWriterOpen(true)}
            onOpenSupabaseConfig={() => setIsSupabaseConfigOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenSupabaseConfig={() => setIsSupabaseConfigOpen(true)} currentLanguage={currentLanguage} />

      {/* Modals & Drawers */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onToggleBookmark={handleToggleBookmark}
          onToggleLike={handleToggleLike}
          isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
          isLiked={likedIds.includes(selectedArticle.id)}
          onAddComment={handleAddComment}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          articles={articles}
          onClose={() => setIsSearchOpen(false)}
          onSelectArticle={(art) => setSelectedArticle(art)}
        />
      )}

      {isBookmarksOpen && (
        <BookmarksDrawer
          articles={articles}
          bookmarkedIds={bookmarkedIds}
          onClose={() => setIsBookmarksOpen(false)}
          onSelectArticle={(art) => setSelectedArticle(art)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {isAIWriterOpen && (
        <AIWriterModal
          onClose={() => setIsAIWriterOpen(false)}
          onPublishArticle={handlePublishArticle}
          authors={authors}
        />
      )}

      {isSupabaseConfigOpen && (
        <SupabaseConfigModal
          onClose={() => setIsSupabaseConfigOpen(false)}
        />
      )}

      {isAdminLoginOpen && (
        <AdminLoginModal
          onClose={() => setIsAdminLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {isNepaliPatroOpen && (
        <NepaliPatroModal
          isOpen={isNepaliPatroOpen}
          onClose={() => setIsNepaliPatroOpen(false)}
          currentLanguage={currentLanguage}
        />
      )}

      <LiveAIChatWidget />
      <GoogleTranslateWidget />
      <NepaliUnicodeHelper />

      {/* Success Notification Toast */}
      {successMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950/90 backdrop-blur-xl border border-emerald-500/50 text-emerald-200 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-mono font-medium">{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="ml-2 text-emerald-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
