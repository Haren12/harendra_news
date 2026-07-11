import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  MessageCircle, 
  Send, 
  Mail, 
  Globe 
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  summary?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
  summary
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary || title);

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: Globe,
      color: 'bg-blue-600 hover:bg-blue-500 text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Twitter / X',
      icon: Share2,
      color: 'bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-sky-600 hover:bg-sky-500 text-white',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'Viber',
      icon: MessageCircle,
      color: 'bg-purple-600 hover:bg-purple-500 text-white',
      url: `viber://forward?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: Globe,
      color: 'bg-blue-700 hover:bg-blue-600 text-white',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-amber-600 hover:bg-amber-500 text-white',
      url: `mailto:?subject=${encodedTitle}&body=${encodedSummary}%0A%0A${encodedUrl}`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: summary,
          url,
        });
      } catch (err) {
        console.log('Share canceled or error', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Share Report</h3>
              <p className="text-xs text-slate-400 font-mono">Broadcast across global social networks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-cyan-500/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Native Share button if supported */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleNativeShare}
            className="w-full py-3 px-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Use Device Share Sheet</span>
          </button>
        )}

        {/* Social Platforms Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {shareLinks.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl font-mono text-xs transition-all shadow-md cursor-pointer ${platform.color}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-bold text-center">{platform.name}</span>
              </a>
            );
          })}
        </div>

        {/* Copy Link Section */}
        <div className="space-y-2 pt-2 border-t border-cyan-500/20">
          <label className="text-xs text-slate-400 font-mono">Direct Secure Link:</label>
          <div className="flex items-center gap-2 bg-slate-950 border border-cyan-500/30 rounded-2xl p-2">
            <input
              type="text"
              readOnly
              value={url}
              className="bg-transparent text-xs text-slate-300 font-mono px-2 py-1 w-full focus:outline-none select-all"
            />
            <button
              onClick={handleCopy}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 shrink-0 cursor-pointer shadow transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
