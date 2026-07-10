export type Category = 
  | 'All'
  | 'Nepal News'
  | 'World News'
  | 'Local News'
  | 'Province News'
  | 'Economy & Banking'
  | 'Science & AI'
  | 'Education'
  | 'Tourism'
  | 'Crime & Security'
  | 'Agriculture'
  | 'Technology'
  | 'Politics'
  | 'Business'
  | 'Sports'
  | 'Entertainment'
  | 'Health'
  | 'International'
  | 'Opinion'
  | 'Videos'
  | 'Photo Gallery';

export type UserRole = 
  | 'Super Admin'
  | 'Administrator'
  | 'Chief Editor'
  | 'Editor'
  | 'Reporter'
  | 'Author'
  | 'Translator'
  | 'SEO Manager'
  | 'Moderator'
  | 'Subscriber'
  | 'Guest';

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  articlesCount: number;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  slug?: string;
  subtitle: string;
  content: string;
  category: Category;
  tags: string[];
  author: Author;
  publishedAt: string;
  readTime: string;
  views: number;
  likes: number;
  bookmarks: number;
  featured: boolean;
  breaking: boolean;
  trending?: boolean;
  image: string;
  aiSummary?: string;
  sentiment?: 'Positive' | 'Neutral' | 'Critical' | 'Tech-Optimistic';
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  comments?: Comment[];
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  source: string;
}

export interface SiteAnalytics {
  totalPageViews: number;
  activeReaders: number;
  serverLoadPct: number;
  storageUsedGb: number;
  supabaseStatus: 'Connected' | 'Demo Mode' | 'Syncing';
  securityThreatsBlocked: number;
}
