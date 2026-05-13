export interface NewsArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  published_date: string;
  image_url?: string;
  featured: boolean;
  article_url?: string;
  created_at?: string;
}

export const newsArticles: NewsArticle[] = [];

export const trendingNews: any[] = [];

export const categories = [
  { name: 'Industry News', count: 0 },
  { name: 'Technical Bulletins', count: 0 },
  { name: 'Company Announcements', count: 0 },
  { name: 'Regulatory Updates', count: 0 }
];
