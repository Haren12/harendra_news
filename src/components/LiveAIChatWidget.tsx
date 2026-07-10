import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Radio, Users, Minimize2, Maximize2, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'viewer';
  senderName: string;
  text: string;
  timestamp: string;
}

export const LiveAIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewerCount, setViewerCount] = useState(148);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      senderName: 'Harendra News AI Anchor',
      text: 'नमस्कार! Welcome to Harendra News Live Chat. Ask me anything about breaking tech dispatches, Nepal updates, or AI developments in English or नेपाली!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: '2',
      sender: 'viewer',
      senderName: 'Rohan Shrestha (Kathmandu)',
      text: 'नेपालमा AI को भविष्य कस्तो छ?',
      timestamp: new Date(Date.now() - 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: '3',
      sender: 'ai',
      senderName: 'Harendra News AI Anchor',
      text: 'नेपालमा कृत्रिम बुद्धिमत्ता (AI) को क्षेत्रमा युवाहरूको आकर्षण तीव्र रूपमा बढिरहेको छ। IT, banking र tourism मा AI को प्रयोगले ठूलो अवसर सिर्जना गरेको छ!',
      timestamp: new Date(Date.now() - 30000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  // Periodically fluctuate viewer count for live feel
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => Math.floor(135 + Math.random() * 45));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'You (Viewer)',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({ sender: m.sender, text: m.text })),
          userMessage: userText
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get AI response');

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        senderName: 'Harendra News AI Anchor',
        text: data.reply || 'Thank you for your question. Our editorial desk is monitoring this closely.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      const errMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        senderName: 'Harendra News AI Anchor',
        text: 'माफ गर्नुहोला, अहिले सर्भरमा थोरै समस्या देखियो। कृपया फेरि प्रयास गर्नुहोस्। (AI service is temporarily busy, please try again.)',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "नेपालको ताजा खबर के छ?",
    "What is AI governance in 2026?",
    "Explain Quantum Computing in Nepali",
    "Harendra Lamsal media vision"
  ];

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="relative group bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 border border-cyan-400/40 cursor-pointer"
          title="Open AI Live Chat Room"
        >
          <div className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </div>
          <Radio className="w-6 h-6 animate-pulse text-cyan-200" />
          <span className="font-bold tracking-wide text-sm hidden sm:inline font-sans">Live AI Chat</span>
        </motion.button>
      </div>

      {/* Chat Window Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed right-4 sm:right-6 bottom-24 z-50 w-[92vw] sm:w-[420px] bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
              isMinimized ? 'h-16' : 'h-[560px]'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-cyan-500/20 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-1.5 font-sans">
                    <span>Live AI Anchor Room</span>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-mono">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span> LIVE
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Users className="w-3 h-3 text-cyan-400" /> {viewerCount} Viewers Online
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/80 font-sans">
                  <div className="bg-cyan-950/30 border border-cyan-500/20 rounded-xl p-3 text-center text-cyan-300 text-xs">
                    💬 Welcome to HarendraLamsal Media AI Chat. Ask questions in English or नेपाली. Real-time news dispatches & discussion!
                  </div>

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        <span className="text-[10px] text-slate-400 font-mono">{msg.senderName}</span>
                        <span className="text-[9px] text-slate-600 font-mono">{msg.timestamp}</span>
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-tr-none shadow-md'
                            : msg.sender === 'viewer'
                            ? 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
                            : 'bg-slate-900 border border-cyan-500/30 text-cyan-100 rounded-tl-none shadow-md'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-900/60 p-3 rounded-2xl w-fit border border-cyan-500/20">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                      <span className="font-mono text-cyan-300">AI Anchor is typing response...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts */}
                <div className="px-3 py-2 bg-slate-900 border-t border-cyan-500/10 flex gap-1.5 overflow-x-auto no-scrollbar">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInputMessage(prompt)}
                      className="shrink-0 bg-slate-800 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/30 text-[11px] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Input Footer */}
                <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-cyan-500/20 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your question in English or नेपाली..."
                    className="flex-1 bg-slate-900 border border-cyan-500/30 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 font-sans"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || loading}
                    className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 p-2.5 rounded-xl font-bold transition-all cursor-pointer shadow-md flex items-center justify-center"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
