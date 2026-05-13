import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface NewsArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  published_date: string;
  image_url?: string;
  featured: boolean;
  article_url?: string;
  created_at: string;
}

export const fetchNewsArticles = async (): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get(`${API_URL}/news`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return [];
  }
};

export const fetchNewsArticleById = async (id: string): Promise<NewsArticle | null> => {
  try {
    const response = await axios.get(`${API_URL}/news/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching news article ${id}:`, error);
    return null;
  }
};
