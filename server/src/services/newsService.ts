import { supabase } from '../config/supabase';
import type { NewsArticle, CreateNewsArticleDTO, UpdateNewsArticleDTO } from '../models/types';

export const newsService = {
  async getAll(): Promise<NewsArticle[]> {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  async getById(id: string): Promise<NewsArticle | null> {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async create(article: CreateNewsArticleDTO): Promise<NewsArticle> {
    const { data, error } = await supabase
      .from('news_articles')
      .insert([article])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async update(id: string, article: UpdateNewsArticleDTO): Promise<NewsArticle> {
    const { data, error } = await supabase
      .from('news_articles')
      .update(article)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('news_articles')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};
