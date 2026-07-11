import React, { useState } from 'react';
import { Cpu, ShieldCheck, Send, CheckCircle2, Mail, Phone, ExternalLink } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import harendraAvatar from '../assets/harendra_avatar.jpg';

interface FooterProps {
  onOpenSupabaseConfig: () => void;
  currentLanguage: Language;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSupabaseConfig, currentLanguage }) => {
  const t = translations[currentLanguage];
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-slate-950 border-t border-cyan-500/20 text-slate-400 font-sans mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* CEO & Founder Portrait Showcase Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl shadow-cyan-950/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img 
                src={harendraAvatar} 
                alt="Harendra Lamsal - CEO & Founder" 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-cyan-400 shadow-xl shadow-cyan-500/40 bg-slate-800 brightness-110 contrast-110"
                onError={(e) => { (e.target as HTMLImageElement).src = harendraAvatar; }}
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/40">EXECUTIVE LEADERSHIP</span>
                <span className="text-[10px] font-mono text-slate-400">Kathmandu, Nepal</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">Harendra Lamsal</h3>
              <p className="text-xs sm:text-sm text-cyan-400 font-mono mt-0.5">CEO & Founder, Chief Editor & Lead Architect</p>
              <p className="text-xs text-slate-300 font-sans mt-2 max-w-xl">
                Leading sovereign digital infrastructure, post-quantum cryptography meshes, and AI-powered public service delivery across Nepal and South Asia.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <a 
              href="mailto:harendralamsal4140@gmail.com" 
              className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Direct Dispatch</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/harendra-lamsal-728a6122b" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-cyan-500/20 px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/30">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold tracking-tight text-white font-mono text-base">
                HARENDRA<span className="text-cyan-400">LAMSAL</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footerDisclaimer}
            </p>
            <div className="space-y-2 text-xs font-mono text-cyan-300 pt-2 border-t border-cyan-500/10">
              <a href="mailto:harendralamsal4140@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>harendralamsal4140@gmail.com</span>
              </a>
              <a href="https://wa.me/9779823587535" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: +977 9823587535</span>
              </a>
            </div>
          </div>

          {/* Col 2: Social Connect Links */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-cyan-400">Connect & Social</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.facebook.com/harendra.lamsala" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  <span>Facebook Profile</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/harendra-lamsal-728a6122b" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn Professional</span>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                  <span>X (Twitter) Feed</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/9779823587535" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Architecture & Security */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-cyan-400">Enterprise Stack</h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenSupabaseConfig} className="hover:text-cyan-300 text-left cursor-pointer">Supabase PostgreSQL</button></li>
              <li><a href="#" className="hover:text-cyan-300">Row Level Security (RLS)</a></li>
              <li><a href="#" className="hover:text-cyan-300">Android & iOS App APIs</a></li>
              <li><a href="#" className="hover:text-cyan-300">XML Sitemap & RSS Feed</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-cyan-400 font-mono text-xs">{t.newsletterTitle}</h4>
            <p className="text-xs text-slate-400">{t.newsletterSubtitle}</p>
            
            {subscribed ? (
              <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-3 rounded-xl text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.subscribe} Completed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your secure email..."
                    className="flex-1 bg-slate-900 border border-cyan-500/30 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs font-mono cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© 2026 Harendralamsal. All Rights Reserved. National Digital Intelligence Mesh.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <a href="#" className="hover:text-cyan-300">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-300">Terms of Service</a>
            <a href="#" className="hover:text-cyan-300">Security Disclosures</a>
            <a href="#" className="hover:text-cyan-300">RSS / API</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
