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
import harendraAvatar from './assets/harendra_avatar.jpg';

const getValidTimestamp = (val?: string) => {
  if (!val || val.includes('ago') || val === 'Just now' || val === 'भर्खरै') {
    return new Date().toISOString();
  }
  const parsed = Date.parse(val);
  return !isNaN(parsed) ? new Date(parsed).toISOString() : new Date().toISOString();
};

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
      console.warn('Failed to load saved articles', e);
    }
    return mockArticles;
  });

  useEffect(() => {
    const fetchArticles = async () => {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase.from('articles').select('*').order('published_at', { ascending: false });
          if (!error && data) {
            if (data.length > 0) {
              const mapped = data.map((d: any) => ({
                id: d.id,
                title: d.title,
                slug: d.slug || d.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
                subtitle: d.subtitle || '',
                content: d.content,
                category: d.category,
                tags: d.tags || [],
                author: { name: 'Harendra Lamsal', title: 'Editor-in-Chief', avatar: harendraAvatar },
                publishedAt: d.published_at || new Date().toISOString(),
                readTime: d.read_time || '5 min read',
                views: d.views || 0,
                likes: d.likes || 0,
                bookmarks: d.bookmarks || 0,
                featured: d.featured || false,
                breaking: d.breaking || false,
                image: d.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
                aiSummary: d.ai_summary || '',
                sentiment: d.sentiment || 'Objective'
              }));
              setArticles(prev => {
                const prevMap = new Map(prev.map(a => [a.id, a]));
                const merged = mapped.map(remoteArt => {
                  const localArt = prevMap.get(remoteArt.id);
                  return localArt || remoteArt;
                });
                const remoteIds = new Set(mapped.map(m => m.id));
                const localOnly = prev.filter(p => !remoteIds.has(p.id));
                return [...localOnly, ...merged];
              });
              return;
            } else {
              // Table is empty, seed mock articles into Supabase
              for (const art of mockArticles) {
                await supabase.from('articles').upsert({
                  id: art.id,
                  title: art.title,
                  slug: art.slug || art.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                  subtitle: art.subtitle,
                  content: art.content,
                  category: art.category,
                  tags: art.tags || [],
                  read_time: art.readTime || '5 min read',
                  views: art.views || 0,
                  likes: art.likes || 0,
                  bookmarks: art.bookmarks || 0,
                  featured: art.featured || false,
                  breaking: art.breaking || false,
                  image: art.image,
                  ai_summary: art.aiSummary,
                  sentiment: art.sentiment || 'Objective',
                  published_at: getValidTimestamp(art.publishedAt)
                }, { onConflict: 'id' });
              }
              setArticles(prev => prev.length > 0 ? prev : mockArticles);
              return;
            }
          }
          if (error) {
            console.warn('Supabase query error (falling back to local/backend):', error.message || error);
          }
        } catch (e) {
          console.warn('Supabase fetch failed, falling back', e);
        }
      }

      fetch('/api/articles')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setArticles(prev => {
              const remoteIds = new Set(data.map((d: any) => d.id));
              const localOnly = prev.filter(p => !remoteIds.has(p.id));
              return [...localOnly, ...data];
            });
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
      }).catch(err => console.warn('Failed to sync articles to backend', err));

      if (isSupabaseConfigured) {
        articles.forEach(async (art) => {
          try {
            await supabase.from('articles').upsert({
              id: art.id,
              title: art.title,
              slug: art.slug || art.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              subtitle: art.subtitle,
              content: art.content,
              category: art.category,
              tags: art.tags || [],
              read_time: art.readTime || '5 min read',
              views: art.views || 0,
              likes: art.likes || 0,
              bookmarks: art.bookmarks || 0,
              featured: art.featured || false,
              breaking: art.breaking || false,
              image: art.image,
              ai_summary: art.aiSummary,
              sentiment: art.sentiment || 'Objective',
              published_at: getValidTimestamp(art.publishedAt)
            }, { onConflict: 'id' });
          } catch (supErr) {
            // ignore remote schema mismatches gracefully
          }
        });
      }
    } catch (e) {
      console.warn('Failed to save articles', e);
    }
  }, [articles]);

  const [authors] = useState<Author[]>(mockAuthors);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>(mockSystemLogs);

  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const prevSelectedArticleRef = React.useRef<Article | null>(null);

  // Load article from URL on initial load or articles update
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('article');
    if (articleId && articles.length > 0) {
      const found = articles.find(a => a.id === articleId || a.slug === articleId);
      if (found) {
        setSelectedArticle(found);
      }
    }
  }, [articles]);

  // Synchronize browser URL query parameters with selectedArticle state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentArticleParam = params.get('article');
    
    if (selectedArticle) {
      if (currentArticleParam !== selectedArticle.id) {
        params.set('article', selectedArticle.id);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({ articleId: selectedArticle.id }, '', newUrl);
      }
    } else {
      if (prevSelectedArticleRef.current !== null && currentArticleParam) {
        params.delete('article');
        const paramStr = params.toString();
        const newUrl = paramStr ? `${window.location.pathname}?${paramStr}` : window.location.pathname;
        window.history.pushState(null, '', newUrl);
      }
    }
    prevSelectedArticleRef.current = selectedArticle;
  }, [selectedArticle]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const articleId = params.get('article');
      if (articleId) {
        const found = articles.find(a => a.id === articleId || a.slug === articleId);
        if (found) {
          setSelectedArticle(found);
        } else {
          setSelectedArticle(null);
        }
      } else {
        setSelectedArticle(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [articles]);

  // Language & Auth state
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ne'); // Default to Nepali as requested by user
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(() => {
    return localStorage.getItem('admin_role');
  });
  const [currentUserName, setCurrentUserName] = useState<string | null>(() => {
    return localStorage.getItem('admin_name');
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Dynamically update document title and meta description on the home page
  useEffect(() => {
    if (selectedArticle) return; // Let ArticleModal handle it when open

    const title = currentLanguage === 'ne' 
      ? 'नेक्सस एआई नेपाल न्यूज - हरेन्द्र लाम्साल | स्वायत्त गुप्तचर नेटवर्क' 
      : 'Nexus AI Nepal News - Harendra Lamsal | Autonomous Intelligence Network';
      
    const description = currentLanguage === 'ne'
      ? 'हरेन्द्रलम्साल दैनिक बुलेटिन। नेपाल र विश्वभरका उत्कृष्ट ब्रेकिङ समाचार, अनुसन्धान र भूराजनीतिक सुरक्षा अपडेटहरू प्राप्त गर्नुहोस्।'
      : 'Harendra News Daily Briefing. Get elite breaking news, research dispatches, and geopolitical security updates.';

    document.title = title;

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

    updateOrCreateMeta('description', description);
    updateOrCreateMeta('og:title', title, true);
    updateOrCreateMeta('og:description', description, true);
    updateOrCreateMeta('og:type', 'website', true);
    updateOrCreateMeta('og:url', window.location.origin, true);
    
    updateOrCreateMeta('twitter:title', title);
    updateOrCreateMeta('twitter:description', description);
  }, [selectedArticle, currentLanguage]);

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
      authorName: currentUserName || 'Harendra Lamsal',
      authorAvatar: currentUserRole ? harendraAvatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
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

            {/* CEO & Founder Harendra Lamsal Executive Spotlight Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
              <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex items-center gap-5 z-10">
                  <div className="relative shrink-0">
                    <img 
                      src={harendraAvatar} 
                      alt="Harendra Lamsal - CEO & Founder" 
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-cyan-400 shadow-xl shadow-cyan-500/40 bg-slate-800 brightness-110 contrast-110"
                      onError={(e) => { (e.target as HTMLImageElement).src = harendraAvatar; }}
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/40 font-bold">EDITOR-IN-CHIEF & FOUNDER</span>
                      <span className="text-[10px] font-mono text-slate-400">Kathmandu, Nepal</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">Harendra Lamsal</h2>
                    <p className="text-xs sm:text-sm text-cyan-400 font-mono mt-0.5">CEO & Lead Architect, Nexus AI Intelligence Network</p>
                    <p className="text-xs text-slate-300 font-sans mt-2 max-w-xl">
                      Leading sovereign digital infrastructures, quantum fiber rollouts across 753 municipalities, and autonomous intelligence journalism for Nepal and South Asia.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs z-10 shrink-0">
                  <a 
                    href="mailto:harendralamsal4140@gmail.com" 
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-3 rounded-xl transition-all flex items-center gap-2 font-bold shadow-lg shadow-cyan-500/20"
                  >
                    <span>Direct Dispatch</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/harendra-lamsal-728a6122b" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-cyan-500/30 px-5 py-3 rounded-xl transition-all flex items-center gap-2 font-bold"
                  >
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </div>

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
          currentLanguage={currentLanguage}
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
          currentLanguage={currentLanguage}
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
