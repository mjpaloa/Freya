import React, { useEffect, useState } from 'react';
import { newsArticles as staticNewsArticles } from './data';
import type { NewsArticle } from './data';
import { fetchNewsArticles } from '../../services/newsService';
import FeaturedPost from './components/FeaturedPost';
import NewsCard from './components/NewsCard';
import Sidebar from './components/Sidebar';
import './NewsPage.css';

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(staticNewsArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNewsArticles();
        if (data && data.length > 0) {
          setArticles(data as NewsArticle[]);
        }
      } catch (error) {
        console.error('Failed to load news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const otherArticles = articles.filter(a => a.id !== featuredArticle?.id);

  return (
    <div className="news-page">
      <header className="news-hero">
        <div className="container">
          <span className="category-tag">CLINICAL INTELLIGENCE</span>
          <h1>Clinical Insights & Updates</h1>
          <p>
            Bridging the gap between cutting-edge medical technology and healthcare 
            delivery through expert analysis and regional updates.
          </p>
        </div>
      </header>

      <div className="container">
        <div className="news-content-layout">
          {/* Main Column */}
          <main className="news-main-content">
            {loading ? (
              <div className="loading-state">Loading latest insights...</div>
            ) : (
              <>
                {featuredArticle && <FeaturedPost article={featuredArticle} />}
                
                <div className="news-grid">
                  {otherArticles.map(article => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              </>
            )}
          </main>

          {/* Sidebar Column */}
          <Sidebar articles={articles} />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
