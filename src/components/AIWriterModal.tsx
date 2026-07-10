import React, { useState } from 'react';
import { Article, Category, Author } from '../types';
import { Sparkles, X, Send, Bot, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface AIWriterModalProps {
  onClose: () => void;
  onPublishArticle: (article: Article) => void;
  authors: Author[];
}

export const AIWriterModal: React.FC<AIWriterModalProps> = ({ onClose, onPublishArticle, authors }) => {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState<Category>('Technology');
  const [tone, setTone] = useState('Authoritative, futuristic, journalistic');
  const [length, setLength] = useState('Comprehensive (approx 600-900 words)');
  const [selectedAuthorId, setSelectedAuthorId] = useState(authors[0]?.id || 'auth-1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<any | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category, tone, length }),
      });
      const data = await res.json();
      if (data.title && data.content) {
        setGeneratedPreview(data);
      } else {
        alert(data.error || 'Failed to generate article.');
      }
    } catch (err) {
      console.error('AI Writer error:', err);
      alert('Network error connecting to Gemini AI Studio backend.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirmPublish = () => {
    if (!generatedPreview) return;
    const author = authors.find(a => a.id === selectedAuthorId) || authors[0];
    const newArticle: Article = {
      id: `art-ai-${Date.now()}`,
      title: generatedPreview.title,
      subtitle: generatedPreview.subtitle || 'Generated via Autonomous AI Journalist Studio.',
      content: generatedPreview.content,
      category: generatedPreview.category || category,
      tags: generatedPreview.tags || ['AI Generated', 'CyberNews', topic],
      author,
      publishedAt: 'Just now',
      readTime: '4 min read',
      views: 120,
      likes: 12,
      bookmarks: 5,
      featured: false,
      breaking: true,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      aiSummary: generatedPreview.metaDescription || 'AI generated intelligence briefing.',
      sentiment: 'Tech-Optimistic',
      seo: {
        metaTitle: generatedPreview.metaTitle || generatedPreview.title,
        metaDescription: generatedPreview.metaDescription || '',
        keywords: generatedPreview.tags || []
      },
      comments: []
    };

    onPublishArticle(newArticle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-slate-950 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/80 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-b border-cyan-500/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Bot className="w-4 h-4 text-cyan-400 animate-bounce" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm font-mono flex items-center gap-1.5">
                AI STUDIO WRITER <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded">Gemini 2.5 Flash</span>
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">Autonomous News Generation Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/20">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Preview */}
        <div className="p-6 sm:p-8 space-y-6">
          {!generatedPreview ? (
            <form onSubmit={handleGenerate} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-cyan-300 mb-2">Article Topic / Prompt *</label>
                <textarea
                  rows={3}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Breakthrough in room-temperature superconductors using neural lattice doping..."
                  required
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-cyan-300 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                  >
                    {['Technology', 'Politics', 'Business', 'Sports', 'Entertainment', 'Health', 'International', 'Opinion'].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-cyan-300 mb-2">Lead Author</label>
                  <select
                    value={selectedAuthorId}
                    onChange={(e) => setSelectedAuthorId(e.target.value)}
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                  >
                    {authors.map((auth) => (
                      <option key={auth.id} value={auth.id}>{auth.name} ({auth.role})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-cyan-300 mb-2">Journalistic Tone</label>
                <input
                  type="text"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-slate-900 text-slate-300 border border-cyan-500/20 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/30 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Article...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate AI Article</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-2xl p-4">
                <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded font-mono uppercase">
                  AI Generation Successful
                </span>
                <h4 className="text-lg font-bold text-white font-sans mt-2">{generatedPreview.title}</h4>
                <p className="text-xs text-slate-300 font-sans mt-1">{generatedPreview.subtitle}</p>
              </div>

              <div className="max-h-60 overflow-y-auto bg-slate-900/60 p-4 rounded-xl border border-cyan-500/20 text-xs text-slate-300 font-sans space-y-2">
                <p className="line-clamp-6">{generatedPreview.content}</p>
              </div>

              <div className="flex justify-end gap-3 pt-2 font-mono text-xs">
                <button
                  onClick={() => setGeneratedPreview(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 border border-cyan-500/30 hover:bg-slate-800 cursor-pointer"
                >
                  Regenerate
                </button>
                <button
                  onClick={handleConfirmPublish}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish to CyberNews Feed</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
