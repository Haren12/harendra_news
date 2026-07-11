import React, { useState, useEffect } from 'react';
import { Languages, Copy, Check, Sparkles } from 'lucide-react';
import { transliterateToNepali } from '../utils/nepaliUnicode';

export const NepaliUnicodeHelper: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-unicode-helper', handleOpen);
    return () => window.removeEventListener('open-unicode-helper', handleOpen);
  }, []);

  const convertedText = transliterateToNepali(inputText);

  const handleCopy = () => {
    if (!convertedText) return;
    navigator.clipboard.writeText(convertedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-mono text-xs">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-bold transition-all cursor-pointer border border-cyan-300"
          title="नेपाली युनिकोड टाइपिंग (Nepali Unicode Typing)"
        >
          <Languages className="w-5 h-5" />
          <span>नेपाली Unicode</span>
        </button>
      ) : (
        <div className="bg-slate-950 border border-cyan-500/50 rounded-3xl shadow-2xl p-4 w-80 sm:w-96 text-white space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Nepali Unicode Converter</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-cyan-500/20 cursor-pointer"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="text-slate-300 text-[11px] block">Type Romanized (e.g. "nepal samachar"):</label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type in English..."
              className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 font-sans"
              autoFocus
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-cyan-300">
              <span>Nepali Unicode Result:</span>
              {convertedText && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/40 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              )}
            </div>
            <div className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-xl p-3 min-h-[50px] text-white font-sans text-sm select-all">
              {convertedText || <span className="text-slate-600 italic">नेपालीमा देखिनेछ...</span>}
            </div>
          </div>
          
          <div className="text-[10px] text-slate-400 text-center pt-1 border-t border-cyan-500/10">
            Type 'nepal', 'kathmandu', 'samachar', 'namaste', etc.
          </div>
        </div>
      )}
    </div>
  );
};
