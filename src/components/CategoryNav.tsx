import React from 'react';
import { Category } from '../types';
import { 
  Globe, 
  Cpu, 
  Landmark, 
  TrendingUp, 
  Trophy, 
  Film, 
  HeartPulse, 
  ShieldAlert, 
  MessageSquareQuote, 
  Video, 
  Image as ImageIcon 
} from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface CategoryNavProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  currentLanguage: Language;
}

const categories: { name: Category; icon: React.ReactNode }[] = [
  { name: 'All', icon: <Globe className="w-4 h-4" /> },
  { name: 'Technology', icon: <Cpu className="w-4 h-4" /> },
  { name: 'Politics', icon: <Landmark className="w-4 h-4" /> },
  { name: 'Business', icon: <TrendingUp className="w-4 h-4" /> },
  { name: 'Sports', icon: <Trophy className="w-4 h-4" /> },
  { name: 'Entertainment', icon: <Film className="w-4 h-4" /> },
  { name: 'Health', icon: <HeartPulse className="w-4 h-4" /> },
  { name: 'International', icon: <ShieldAlert className="w-4 h-4" /> },
  { name: 'Opinion', icon: <MessageSquareQuote className="w-4 h-4" /> },
  { name: 'Videos', icon: <Video className="w-4 h-4" /> },
  { name: 'Photo Gallery', icon: <ImageIcon className="w-4 h-4" /> },
];

export const CategoryNav: React.FC<CategoryNavProps> = ({ selectedCategory, onSelectCategory, currentLanguage }) => {
  const t = translations[currentLanguage];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.name;
          const translatedName = t.categories[cat.name as keyof typeof t.categories] || cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/25 scale-105'
                  : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border-cyan-500/20 hover:border-cyan-500/40'
              }`}
            >
              <span className={isActive ? 'text-slate-950' : 'text-cyan-400'}>{cat.icon}</span>
              <span>{translatedName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
