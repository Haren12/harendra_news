import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Search, 
  Bookmark, 
  LayoutDashboard, 
  ShieldCheck, 
  Radio, 
  Sparkles,
  Menu,
  X,
  Globe,
  Clock,
  UserCheck,
  Calendar
} from 'lucide-react';
import { getLiveDateAndTime, FormattedDateInfo } from '../utils/dateUtils';
import { Language, translations } from '../utils/translations';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenAIWriter: () => void;
  onOpenDashboard: () => void;
  onOpenSupabaseConfig: () => void;
  onOpenAdminLogin: () => void;
  onOpenNepaliPatro: () => void;
  bookmarksCount: number;
  currentView: 'home' | 'dashboard';
  onNavigateHome: () => void;
  breakingNewsTitle: string;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  currentUserRole: string | null;
  currentUserName: string | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenBookmarks,
  onOpenAIWriter,
  onOpenDashboard,
  onOpenSupabaseConfig,
  onOpenAdminLogin,
  onOpenNepaliPatro,
  bookmarksCount,
  currentView,
  onNavigateHome,
  breakingNewsTitle,
  currentLanguage,
  onLanguageChange,
  currentUserRole,
  currentUserName,
  onLogout
}) => {
  const t = translations[currentLanguage];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dateTime, setDateTime] = useState<FormattedDateInfo>(getLiveDateAndTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(getLiveDateAndTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-cyan-500/20 shadow-lg shadow-cyan-950/40 font-mono">
      {/* Top Utility Bar with Live Clock, Date, Nepali Patro & Language Selector */}
      <div className="bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 border-b border-cyan-500/20 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 overflow-hidden text-cyan-300">
          <div className="flex items-center gap-1.5 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-bold text-white">{dateTime.timeString}</span>
          </div>
          <span className="hidden sm:inline text-slate-400">|</span>
          <button 
            onClick={onOpenNepaliPatro}
            className="hidden sm:flex items-center gap-1.5 text-slate-200 font-bold hover:text-cyan-300 transition-colors cursor-pointer bg-slate-900/60 px-2.5 py-0.5 rounded-lg border border-cyan-500/30 shadow-sm"
            title="नेपाली पात्रो खोल्नुहोस् (Open Nepali Patro)"
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {currentLanguage === 'ne' && `${dateTime.nepaliDate} (${dateTime.nepaliDayName})`}
              {currentLanguage === 'en' && `${dateTime.englishDate} (${dateTime.dayName})`}
              {currentLanguage === 'hi' && `${dateTime.hindiDate} (${dateTime.hindiDayName})`}
            </span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded ml-1 font-mono">पात्रो</span>
          </button>
        </div>

        {/* Language Switcher & Security Status */}
        <div className="flex items-center gap-3">
          {/* Language Switcher Buttons */}
          <div className="flex items-center bg-slate-900 border border-cyan-500/30 rounded-lg p-0.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400 ml-1.5 mr-1" />
            <button
              onClick={() => onLanguageChange('ne')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                currentLanguage === 'ne' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              नेपाली
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                currentLanguage === 'en' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                currentLanguage === 'hi' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>

          <button 
            onClick={onOpenSupabaseConfig}
            className="hidden xl:flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-200 underline cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> RLS Mesh Active
          </button>
        </div>
      </div>

      {/* Breaking News Ticker Bar */}
      <div className="bg-slate-900/90 border-b border-cyan-500/10 px-4 py-1.5 text-xs text-cyan-300 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="uppercase tracking-widest text-[10px] font-bold bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1">
            <Radio className="w-3 h-3 animate-pulse" /> {t.liveWire}
          </span>
          <span className="truncate text-slate-200">{breakingNewsTitle}</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-400/50 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="font-bold tracking-tight text-lg text-white flex items-center gap-1.5">
                HARENDRA<span className="text-cyan-400">LAMSAL</span>
                <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1 py-0.5 rounded font-sans border border-cyan-500/30">v4.0</span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase hidden sm:block">{t.brandSubtitle}</p>
            </div>
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800/80 text-slate-300 px-4 py-2 rounded-xl text-xs border border-cyan-500/20 hover:border-cyan-500/50 transition-all cursor-pointer shadow-inner"
          >
            <Search className="w-4 h-4 text-cyan-400" />
            <span>{t.searchPlaceholder}</span>
            <kbd className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded text-cyan-400">⌘K</kbd>
          </button>

          <button
            onClick={onOpenAIWriter}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 text-cyan-300 px-4 py-2 rounded-xl text-xs border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/10"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{t.aiWriter}</span>
          </button>

          <button
            onClick={onOpenBookmarks}
            className="relative p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-cyan-500/20 transition-all cursor-pointer"
            title={t.savedBookmarks}
          >
            <Bookmark className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenDashboard}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs border transition-all cursor-pointer ${
              currentView === 'dashboard'
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-cyan-500/20 hover:border-cyan-500/40'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span>{t.dashboard}</span>
          </button>

          {/* Admin Login / User State */}
          {currentUserRole ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-xs">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-[10px] text-emerald-400 font-bold">{currentUserRole}</p>
                <p className="text-[10px] text-slate-300 truncate max-w-[90px]">{currentUserName}</p>
              </div>
              <button 
                onClick={onLogout}
                className="text-slate-400 hover:text-red-400 ml-2 text-[10px] underline cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-4 py-2 rounded-xl text-xs border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/10"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{t.adminLogin}</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenNepaliPatro}
            className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
            title="नेपाली पात्रो"
          >
            <Calendar className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl bg-slate-900 text-cyan-400 border border-cyan-500/30"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-cyan-500/30"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-cyan-500/20 px-4 py-4 space-y-3">
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenNepaliPatro(); }}
            className="w-full flex items-center gap-3 bg-cyan-500/20 text-cyan-300 px-4 py-3 rounded-xl border border-cyan-500/40"
          >
            <Calendar className="w-5 h-5 text-cyan-400" />
            <span>नेपाली पात्रो (Nepali Patro 2083)</span>
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenAIWriter(); }}
            className="w-full flex items-center gap-3 bg-cyan-500/20 text-cyan-300 px-4 py-3 rounded-xl border border-cyan-500/40"
          >
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>{t.aiWriter}</span>
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenDashboard(); }}
            className="w-full flex items-center gap-3 bg-slate-900 text-slate-200 px-4 py-3 rounded-xl border border-cyan-500/20"
          >
            <LayoutDashboard className="w-5 h-5 text-cyan-400" />
            <span>{t.dashboard}</span>
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenBookmarks(); }}
            className="w-full flex items-center gap-3 bg-slate-900 text-slate-200 px-4 py-3 rounded-xl border border-cyan-500/20"
          >
            <Bookmark className="w-5 h-5 text-cyan-400" />
            <span>{t.savedBookmarks} ({bookmarksCount})</span>
          </button>
          {currentUserRole ? (
            <button
              onClick={() => { setMobileMenuOpen(false); onLogout(); }}
              className="w-full flex items-center gap-3 bg-red-500/20 text-red-300 px-4 py-3 rounded-xl border border-red-500/40"
            >
              <UserCheck className="w-5 h-5 text-red-400" />
              <span>Logout ({currentUserRole})</span>
            </button>
          ) : (
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdminLogin(); }}
              className="w-full flex items-center gap-3 bg-cyan-500/20 text-cyan-300 px-4 py-3 rounded-xl border border-cyan-500/40"
            >
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>{t.adminLogin}</span>
            </button>
          )}
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenSupabaseConfig(); }}
            className="w-full flex items-center gap-3 bg-slate-900 text-slate-200 px-4 py-3 rounded-xl border border-cyan-500/20"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Supabase / RLS Config</span>
          </button>
        </div>
      )}
    </header>
  );
};
