-- Run this in your Supabase SQL Editor to fix ID type mismatch (uuid vs text like 'art-1')

DROP TABLE IF EXISTS public.comments CASCADE;
DROP TABLE IF EXISTS public.bookmarks CASCADE;
DROP TABLE IF EXISTS public.likes CASCADE;
DROP TABLE IF EXISTS public.articles CASCADE;
DROP TABLE IF EXISTS public.authors CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.media_library CASCADE;
DROP TABLE IF EXISTS public.subscribers CASCADE;
DROP TABLE IF EXISTS public.advertisements CASCADE;

CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    full_name VARCHAR(255),
    avatar_url TEXT,
    bio TEXT,
    role VARCHAR(50) DEFAULT 'Reporter',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.authors (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    avatar TEXT,
    bio TEXT,
    email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT,
    subtitle TEXT,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags TEXT[],
    author_id TEXT,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    read_time VARCHAR(50) DEFAULT '5 min read',
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    bookmarks INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    breaking BOOLEans DEFAULT FALSE,
    image TEXT,
    ai_summary TEXT,
    sentiment VARCHAR(50) DEFAULT 'Objective',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMEST_STAMP DEFAULT NOW()
);

-- Fix typo breaking BOOLEANS to BOOLEAN
DROP TABLE IF EXISTS public.articles CASCADE;
CREATE TABLE IF NOT EXISTS public.articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT,
    subtitle TEXT,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags TEXT[],
    author_id TEXT,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    read_time VARCHAR(50) DEFAULT '5 min read',
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    bookmarks INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    breaking BOOLEAN DEFAULT FALSE,
    image TEXT,
    ai_summary TEXT,
    sentiment VARCHAR(50) DEFAULT 'Objective',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.comments (
    id TEXT PRIMARY KEY,
    article_id TEXT REFERENCES articles(id) ON DELETE CASCADE,
    author_name VARCHAR(255) NOT NULL,
    author_avatar TEXT,
    content TEXT NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bookmarks (
    id TEXT PRIMARY KEY,
    article_id TEXT REFERENCES articles(id) ON DELETE CASCADE,
    user_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.likes (
    id TEXT PRIMARY KEY,
    article_id TEXT REFERENCES articles(id) ON DELETE CASCADE,
    user_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.media_library (
    id TEXT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size VARCHAR(50),
    mime_type VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.subscribers (
    id TEXT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.advertisements (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    image_url TEXT,
    target_url TEXT,
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read articles" ON public.articles;
CREATE POLICY "Public read articles" ON public.articles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert articles" ON public.articles;
CREATE POLICY "Public insert articles" ON public.articles FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update articles" ON public.articles;
CREATE POLICY "Public update articles" ON public.articles FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public read categories" ON public.categories;
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read authors" ON public.authors;
CREATE POLICY "Public read authors" ON public.authors FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read comments" ON public.comments;
CREATE POLICY "Public read comments" ON public.comments FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert comments" ON public.comments;
CREATE POLICY "Public insert comments" ON public.comments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public read media" ON public.media_library;
CREATE POLICY "Public read media" ON public.media_library FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert media" ON public.media_library;
CREATE POLICY "Public insert media" ON public.media_library FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public read subscribers" ON public.subscribers;
CREATE POLICY "Public read subscribers" ON public.subscribers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert subscribers" ON public.subscribers;
CREATE POLICY "Public insert subscribers" ON public.subscribers FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public read advertisements" ON public.advertisements;
CREATE POLICY "Public read advertisements" ON public.advertisements FOR SELECT USING (true);

INSERT INTO public.categories (id, name, slug, description) VALUES
('cat-1', 'Nepal News', 'nepal-news', 'National news and political updates from Nepal'),
('cat-2', 'World News', 'world-news', 'Global headlines and international relations'),
('cat-3', 'Technology', 'technology', 'AI, tech innovations and digital transformation'),
('cat-4', 'Economy & Banking', 'economy-banking', 'Banking, finance and economic growth'),
('cat-5', 'Tourism', 'tourism', 'Himalayan tourism, culture and travel')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.authors (id, name, title, avatar, bio) VALUES
('00000000-0000-0000-0000-000000000001', 'Harendra Lamsal', 'CEO & Editor-in-Chief', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', 'Founder and Chief Editor of CyberNews AI & HarendraLamsal Digital Media Network.')
ON CONFLICT (id) DO NOTHING;
