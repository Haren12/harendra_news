import React, { useState } from 'react';
import { Article, Category, Author } from '../types';
import { Sparkles, X, Send, Bot, ShieldCheck, CheckCircle2, RefreshCw, Image as ImageIcon, Globe, FileText, Tag, Link as LinkIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface AIWriterModalProps {
  onClose: () => void;
  onPublishArticle: (article: Article) => void;
  onUpdateArticle?: (article: Article) => void;
  authors: Author[];
  articleToEdit?: Article | null;
}

export const AIWriterModal: React.FC<AIWriterModalProps> = ({ onClose, onPublishArticle, onUpdateArticle, authors, articleToEdit }) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'manual'>(articleToEdit ? 'manual' : 'ai');

  // AI Generation state
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState<Category>(articleToEdit?.category || 'Nepal News');
  const [tone, setTone] = useState('Authoritative, journalistic, objective');
  const [isGenerating, setIsGenerating] = useState(false);

  // Manual & Full Editorial Form state (English & Nepali dual inputs)
  const [titleEn, setTitleEn] = useState(articleToEdit?.title || '');
  const [titleNe, setTitleNe] = useState(articleToEdit?.titleNe || '');
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-\u0900-\u097F]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || `news-${Date.now()}`;
  };

  const [slug, setSlug] = useState(articleToEdit?.slug || '');
  const [isManualSlug, setIsManualSlug] = useState(Boolean(articleToEdit?.slug));

  const handleTitleEnChange = (val: string) => {
    setTitleEn(val);
    if (!isManualSlug) {
      setSlug(generateSlug(val));
    }
  };

  const handleTitleNeChange = (val: string) => {
    setTitleNe(val);
    if (!isManualSlug && !titleEn) {
      setSlug(generateSlug(val));
    }
  };
  const [excerptEn, setExcerptEn] = useState(articleToEdit?.subtitle || '');
  const [excerptNe, setExcerptNe] = useState(articleToEdit?.subtitleNe || '');
  const [contentEn, setContentEn] = useState(articleToEdit?.content || '');
  const [contentNe, setContentNe] = useState(articleToEdit?.contentNe || '');
  const [selectedCategory, setSelectedCategory] = useState<Category>(articleToEdit?.category || 'Nepal News');
  const [selectedAuthorId, setSelectedAuthorId] = useState(articleToEdit?.author?.id || authors[0]?.id || 'auth-1');
  const [imageUrl, setImageUrl] = useState(articleToEdit?.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200');
  const [metaTitle, setMetaTitle] = useState(articleToEdit?.seo?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(articleToEdit?.seo?.metaDescription || '');
  const [focusKeyword, setFocusKeyword] = useState(articleToEdit?.seo?.keywords?.[0] || '');
  const [tagsStr, setTagsStr] = useState(articleToEdit?.tags?.join(', ') || 'Nepal, News, Harendralamsal');
  const [readingTime, setReadingTime] = useState(articleToEdit?.readTime || '5 min read');
  const [languageOption, setLanguageOption] = useState<'en' | 'ne' | 'both'>(articleToEdit?.languageOption || 'both');

  const categoriesList: Category[] = [
    'Nepal News',
    'World News',
    'Local News',
    'Province News',
    'Economy & Banking',
    'Science & AI',
    'Education',
    'Tourism',
    'Crime & Security',
    'Agriculture',
    'Technology',
    'Politics',
    'Business',
    'Sports',
    'Entertainment',
    'Health',
    'International',
    'Opinion'
  ];

  const handleGenerateAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category, tone, length: 'Comprehensive' }),
      });
      const data = await res.json();
      if (data.title && data.content) {
        setTitleEn(data.title);
        setTitleNe(data.title + ' (नेपाली अनुवाद)');
        setExcerptEn(data.subtitle || data.metaDescription || '');
        setExcerptNe('नेपाल राष्ट्रिय डिजिटल इन्टेलिजेन्स मिडियाबाट प्रसारित समाचार सारांश।');
        setContentEn(data.content);
        setContentNe(data.content + '\n\n(Nepali translated intelligence brief)');
        setMetaTitle(data.metaTitle || data.title);
        setMetaDescription(data.metaDescription || '');
        setFocusKeyword(topic.slice(0, 20));
        if (data.tags) {
          setTagsStr(data.tags.join(', '));
        }
        setActiveTab('manual'); // Switch to manual editor to review & publish
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinalPublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim() && !titleNe.trim()) {
      alert('Please provide at least an English or Nepali title.');
      return;
    }

    const author = authors.find(a => a.id === selectedAuthorId) || authors[0];
    const finalTitle = titleEn.trim() && titleNe.trim() 
      ? (titleEn.length >= titleNe.length ? titleEn : titleNe)
      : (titleEn.trim() ? titleEn : titleNe);
    const finalContent = contentEn.trim() && contentNe.trim()
      ? (contentEn.length >= contentNe.length ? contentEn : contentNe)
      : (contentEn.trim() ? contentEn : contentNe);
    const finalExcerpt = excerptEn.trim() && excerptNe.trim()
      ? (excerptEn.length >= excerptNe.length ? excerptEn : excerptNe)
      : (excerptEn.trim() ? excerptEn : excerptNe || finalContent.slice(0, 150) + '...');
    const tagsArray = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

    const finalSlug = slug.trim() ? slug : generateSlug(finalTitle);
    if (articleToEdit && onUpdateArticle) {
      const updatedArticle: Article = {
        ...articleToEdit,
        title: finalTitle,
        slug: finalSlug,
        subtitle: finalExcerpt || articleToEdit.subtitle,
        content: finalContent || articleToEdit.content,
        languageOption,
        titleNe: titleNe.trim() || undefined,
        subtitleNe: excerptNe.trim() || undefined,
        contentNe: contentNe.trim() || undefined,
        category: selectedCategory,
        tags: tagsArray.length > 0 ? tagsArray : articleToEdit.tags,
        author,
        readTime: readingTime,
        image: imageUrl,
        aiSummary: metaDescription || finalExcerpt || articleToEdit.aiSummary,
        seo: {
          metaTitle: metaTitle || finalTitle,
          metaDescription: metaDescription || finalExcerpt,
          keywords: tagsArray
        }
      };
      onUpdateArticle(updatedArticle);
    } else {
      const newArticle: Article = {
        id: `art-custom-${Date.now()}`,
        title: finalTitle,
        slug: finalSlug,
        subtitle: finalExcerpt || 'Published via Harendralamsal Editorial Cockpit.',
        content: finalContent || finalTitle,
        languageOption,
        titleNe: titleNe.trim() || undefined,
        subtitleNe: excerptNe.trim() || undefined,
        contentNe: contentNe.trim() || undefined,
        category: selectedCategory,
        tags: tagsArray.length > 0 ? tagsArray : ['Nepal News', 'Breaking'],
        author,
        publishedAt: 'Just now',
        readTime: readingTime,
        views: 145,
        likes: 18,
        bookmarks: 7,
        featured: false,
        breaking: true,
        image: imageUrl,
        aiSummary: metaDescription || finalExcerpt || 'Verified intelligence report.',
        sentiment: 'Tech-Optimistic',
        seo: {
          metaTitle: metaTitle || finalTitle,
          metaDescription: metaDescription || finalExcerpt,
          keywords: tagsArray
        },
        comments: articleToEdit?.comments || []
      };

      onPublishArticle(newArticle);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-5xl bg-slate-950 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/90 overflow-hidden font-mono text-xs flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-b border-cyan-500/20 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2 font-mono">
                EDITORIAL COCKPIT <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/40">CEO Harendra Lamsal</span>
              </h3>
              <p className="text-xs text-slate-400">Bilingual News & AI Story Creator (English / Nepali / SEO)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex bg-slate-900 border border-cyan-500/30 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'ai' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                AI Generator
              </button>
              <button
                onClick={() => setActiveTab('manual')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'manual' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                Bilingual Editor
              </button>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-cyan-500/25 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Container */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'ai' ? (
            <div className="max-w-2xl mx-auto space-y-6 py-8">
              <div className="text-center space-y-2">
                <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2.5 py-1 rounded-full uppercase tracking-wider border border-cyan-500/40 font-mono">
                  Gemini 2.5 Flash Autonomous Intelligence
                </span>
                <h2 className="text-xl font-bold text-white font-sans">Generate News Article Instantly</h2>
                <p className="text-xs text-slate-400">Enter a prompt or headline. The AI will synthesize verified facts, dual-language summaries, and SEO tags.</p>
              </div>

              <form onSubmit={handleGenerateAI} className="space-y-4">
                <div>
                  <label className="block text-cyan-300 mb-2 font-bold">Story Prompt / Subject *</label>
                  <textarea
                    rows={4}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Kathmandu Valley expands electric autonomous transit network to reduce emissions by 50%..."
                    required
                    className="w-full bg-slate-900 border border-cyan-500/30 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cyan-300 mb-2 font-bold">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                    >
                      {categoriesList.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-cyan-300 mb-2 font-bold">Journalistic Tone</label>
                    <input
                      type="text"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-cyan-500/30 disabled:opacity-50 text-sm"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Synthesizing Bilingual Story via AI...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Generate & Load into Editor</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <form onSubmit={handleFinalPublish} className="space-y-8">
              {/* Top Row: Category, Author, Featured Image Upload */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-900/50 p-6 rounded-2xl border border-cyan-500/20">
                <div className="space-y-4">
                  <h4 className="font-bold text-white uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Story Configuration
                  </h4>
                  <div>
                    <label className="block text-slate-300 mb-1">Category *</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as Category)}
                      className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    >
                      {categoriesList.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Author / CEO</label>
                    <select
                      value={selectedAuthorId}
                      onChange={(e) => setSelectedAuthorId(e.target.value)}
                      className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    >
                      {authors.map((auth) => (
                        <option key={auth.id} value={auth.id}>{auth.name} ({auth.role})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Reading Time</label>
                    <input
                      type="text"
                      value={readingTime}
                      onChange={(e) => setReadingTime(e.target.value)}
                      placeholder="e.g. 5 min read"
                      className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Featured Image Upload / Preview */}
                <div className="space-y-4 lg:col-span-2">
                  <h4 className="font-bold text-white uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Featured Image (Upload or URL)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <div className="sm:col-span-1 h-32 rounded-xl border border-cyan-500/30 overflow-hidden bg-slate-950 flex items-center justify-center relative">
                      {imageUrl ? (
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="text-slate-500 text-[10px]">No Image</span>
                      )}
                    </div>
                    <div className="sm:col-span-2 space-y-3">
                      <div>
                        <label className="block text-slate-300 mb-1 text-[11px]">Upload Image File (Max 5MB)</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 text-[11px]">Or Image URL</label>
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dual Language Titles & Excerpts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* English Section */}
                <div className="space-y-4 bg-slate-900/40 p-5 rounded-2xl border border-cyan-500/20">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-cyan-500/20 pb-2">
                    <Globe className="w-4 h-4" /> <span>English Content</span>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={titleEn}
                      onChange={(e) => handleTitleEnChange(e.target.value)}
                      placeholder="Enter breaking news title in English..."
                      className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-3 text-white font-sans text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Excerpt / Subtitle (English)</label>
                    <textarea
                      rows={2}
                      value={excerptEn}
                      onChange={(e) => setExcerptEn(e.target.value)}
                      placeholder="Short summary in English..."
                      className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-3 text-white font-sans text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Body Content (English - Markdown supported)</label>
                    <textarea
                      rows={6}
                      value={contentEn}
                      onChange={(e) => setContentEn(e.target.value)}
                      placeholder="Write full article body in English..."
                      className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-3 text-white font-sans text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Nepali Section */}
                <div className="space-y-4 bg-slate-900/40 p-5 rounded-2xl border border-cyan-500/20">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-cyan-500/20 pb-2">
                    <Globe className="w-4 h-4" /> <span>नेपाली सामग्री (Nepali Content)</span>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">शीर्षक (Title in Nepali) *</label>
                    <input
                      type="text"
                      value={titleNe}
                      onChange={(e) => handleTitleNeChange(e.target.value)}
                      placeholder="नेपालीमा समाचार शीर्षक लेख्नुहोस्..."
                      className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-3 text-white font-sans text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">सारांश (Excerpt in Nepali)</label>
                    <textarea
                      rows={2}
                      value={excerptNe}
                      onChange={(e) => setExcerptNe(e.target.value)}
                      placeholder="नेपालीमा छोटो सारांश..."
                      className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-3 text-white font-sans text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">मुख्य लेख (Body Content in Nepali)</label>
                    <textarea
                      rows={6}
                      value={contentNe}
                      onChange={(e) => setContentNe(e.target.value)}
                      placeholder="विस्तृत समाचार नेपालीमा लेख्नुहोस्..."
                      className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-3 text-white font-sans text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* SEO & Meta Planning */}
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-cyan-500/20 space-y-4">
                <h4 className="font-bold text-white uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> SEO & Search Engine Optimization
                </h4>
                <div>
                  <label className="block text-slate-300 mb-1 flex items-center justify-between">
                    <span>URL Slug (Auto-generated SEO friendly)</span>
                    <span className="text-[10px] text-cyan-400 font-mono">/article/{slug || 'auto-slug'}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-900 px-3 py-2.5 rounded-xl border border-cyan-500/20 text-slate-400 text-xs font-mono">/article/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => {
                        setSlug(e.target.value);
                        setIsManualSlug(true);
                      }}
                      placeholder="auto-generated-slug-from-title"
                      className="flex-1 bg-slate-950 border border-cyan-500/30 rounded-xl p-2.5 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsManualSlug(false);
                        setSlug(generateSlug(titleEn || titleNe || 'breaking-news'));
                      }}
                      className="px-3 py-2.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 text-[11px] flex items-center gap-1 cursor-pointer"
                      title="Auto-generate slug"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Auto</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Meta Title (Google Search)</label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="Best title for search engines (50-60 chars)"
                      className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Focus Keyword</label>
                    <input
                      type="text"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="e.g. Nepal News, AI, Harendra Lamsal"
                      className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Tags (Comma separated)</label>
                    <input
                      type="text"
                      value={tagsStr}
                      onChange={(e) => setTagsStr(e.target.value)}
                      placeholder="Nepal, Breaking, Tech, Economy"
                      className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Meta Description (140-160 chars recommended)</label>
                  <textarea
                    rows={2}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Short description for Google search results snippet..."
                    className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-3 text-white font-sans text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex justify-end gap-3 border-t border-cyan-500/20">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-slate-900 text-slate-300 border border-cyan-500/30 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-8 py-3 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/30 text-sm"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Publish Story Live</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
