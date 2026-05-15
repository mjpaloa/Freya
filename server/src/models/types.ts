export interface User {
  id: string;
  name: string;
  full_name?: string;
  email: string;
  password?: string;
  avatar?: string;
  avatar_url?: string;
  created_at: string;
  role?: string;
}

export interface CreateUserDTO {
  name: string;
  full_name?: string;
  email: string;
  password?: string;
  avatar?: string;
  avatar_url?: string;
}

export interface UpdateUserDTO {
  name?: string;
  full_name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  avatar_url?: string;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  info?: string;
  image_url?: string;
  brochure_url?: string;
  created_at: string;
}

export interface CreateProductDTO {
  name: string;
  type: string;
  info?: string;
  image_url?: string;
  brochure_url?: string;
}

export interface UpdateProductDTO {
  name?: string;
  type?: string;
  info?: string;
  image_url?: string;
  brochure_url?: string;
}

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

export interface CreateNewsArticleDTO {
  category: string;
  title: string;
  excerpt: string;
  published_date: string;
  image_url?: string;
  featured?: boolean;
  article_url?: string;
}

export interface UpdateNewsArticleDTO {
  category?: string;
  title?: string;
  excerpt?: string;
  published_date?: string;
  image_url?: string;
  featured?: boolean;
  article_url?: string;
}
