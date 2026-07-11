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
import { supabase, isSupabaseConfigured } from './lib/supabase';

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
    const fetchArticles = async () => {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase.from('articles').select('*').order('published_at', { ascending: false });
          if (!error && data && data.length > 0) {
            const mapped = data.map((d: any) => ({
              id: d.id,
              title: d.title,
              slug: d.slug,
              subtitle: d.subtitle,
              content: d.content,
              category: d.category,
              tags: d.tags || [],
              author: { name: 'Harendra Lamsal', title: 'Editor-in-Chief', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
              publishedAt: d.published_at,
              readTime: d.read_time || '5 min read',
              views: d.views || 0,
              likes: d.likes || 0,
              bookmarks: d.bookmarks || 0,
              featured: d.featured || false,
              breaking: d.breaking || false,
              image: d.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
              aiSummary: d.ai_summary,
              sentiment: d.sentiment || 'Objective'
            }));
            setArticles(mapped);
            return;
          }
        } catch (e) {
          console.error('Supabase fetch failed, falling back', e);
        }
      }

      fetch('/api/articles')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setArticles(data);
          }
        })
        .catch(err => console.log('Using local articles store', err));
    };

    fetchArticles();
    const interval = setInterval(fetchArticles, 10000); // Poll every 10s for multi-browser sync
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('harendra_news_articles_v1', JSON.stringify(articles));
      fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articles })
      }).catch(err => console.error('Failed to sync articles to backend', err));

      if (isSupabaseConfigured) {
        articles.forEach(async (art) => {
          try {
            const { error } = await supabase.from('articles').upsert({
              id: art.id,
              title: art.title,
              slug: art.slug || art.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              subtitle: art.subtitle,
              content: art.content,
              category: art.category,
              tags: art.tags,
              read_time: art.readTime,
              views: art.views,
              likes: art.likes,
              bookmarks: art.bookmarks,
              featured: art.featured,
              breaking: art.breaking,
              image: art.image,
              ai_summary: art.aiSummary,
              sentiment: art.sentiment,
              published_at: art.publishedAt || new Date().toISOString()
            }, { onConflict: 'id' });
            if (error) {
              console.error('Supabase article upsert error:', error.message);
            }
          } catch (supErr) {
            console.error('Supabase article upsert exception:', supErr);
          }
        });
      }
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
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(() => {
    const role = localStorage.getItem('admin_role');
    const expiry = localStorage.getItem('admin_expiry');
    if (role && expiry && Date.now() < Number(expiry)) {
      return role;
    }
    localStorage.removeItem('admin_role');
    localStorage.removeItem('admin_name');
    localStorage.removeItem('admin_expiry');
    return null;
  });
  const [currentUserName, setCurrentUserName] = useState<string | null>(() => {
    return localStorage.getItem('admin_name');
  });
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
    localStorage.setItem('admin_expiry', String(Date.now() + 300000));

    const timer = setInterval(() => {
      setSessionSeconds(prev => {
        const expiry = Number(localStorage.getItem('admin_expiry') || 0);
        if (Date.now() >= expiry || prev <= 1) {
          clearInterval(timer);
          setCurrentUserRole(null);
          setCurrentUserName(null);
          localStorage.removeItem('admin_role');
          localStorage.removeItem('admin_name');
          localStorage.removeItem('admin_expiry');
          setSystemLogs(l => [{
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            level: 'warning',
            message: `Admin session expired (5-minute inactivity limit). Auto-logged out.`,
            source: 'SecurityManager'
          }, ...l]);
          return 0;
        }
        const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
        return remaining;
      });
    }, 1000);

    const handleActivity = () => {
      const newExpiry = Date.now() + 300000;
      localStorage.setItem('admin_expiry', String(newExpiry));
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

  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

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

  const handleUpdateArticle = (updatedArticle: Article) => {
    setArticles(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      level: 'success',
      message: `Updated dispatch: "${updatedArticle.title}"`,
      source: 'EditorialEditor'
    };
    setSystemLogs(prev => [newLog, ...prev]);
    setSuccessMessage(`Successfully updated dispatch: "${updatedArticle.title}"!`);
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
    localStorage.setItem('admin_role', role);
    localStorage.setItem('admin_name', name);
    localStorage.setItem('admin_expiry', String(Date.now() + 300000));
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
    localStorage.removeItem('admin_role');
    localStorage.removeItem('admin_name');
    localStorage.removeItem('admin_expiry');
  };

  const currentLangArticles = articles;
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
            onEditArticle={(art) => {
              setEditingArticle(art);
              setIsAIWriterOpen(true);
            }}
            onOpenAIWriter={() => {
              setEditingArticle(null);
              setIsAIWriterOpen(true);
            }}
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
          onClose={() => {
            setIsAIWriterOpen(false);
            setEditingArticle(null);
          }}
          onPublishArticle={handlePublishArticle}
          onUpdateArticle={handleUpdateArticle}
          authors={authors}
          articleToEdit={editingArticle}
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

      <GoogleTranslateWidget />
      <LiveAIChatWidget />
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
