import React from 'react';
import { newsArticles } from './data';
import FeaturedPost from './components/FeaturedPost';
import NewsCard from './components/NewsCard';
import Sidebar from './components/Sidebar';
import './NewsPage.css';

const NewsPage: React.FC = () => {
  const featuredArticle = newsArticles.find(a => a.featured) || newsArticles[0];
  const otherArticles = newsArticles.filter(a => !a.featured);

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
            <FeaturedPost article={featuredArticle} />
            
            <div className="news-grid">
              {otherArticles.map(article => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </main>

          {/* Sidebar Column */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
