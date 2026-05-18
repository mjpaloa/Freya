-- Migration to add 'content' to news_articles

-- 1. Add content column to news_articles
ALTER TABLE public.news_articles 
ADD COLUMN content TEXT;
