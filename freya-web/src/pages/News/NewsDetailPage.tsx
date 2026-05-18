import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsArticleById } from '../../services/newsService';
import type { NewsArticle } from '../../services/newsService';
import Sidebar from './components/Sidebar';
import './NewsPage.css';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;
      try {
        const data = await fetchNewsArticleById(id);
        if (data) {
          setArticle(data);
        } else {
          console.warn('Article not found in API, please ensure backend is running.');
        }
      } catch (error) {
        console.error('Failed to load article:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="news-page">
        <div className="container">
          <div className="loading-state">Loading article details...</div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="news-page">
        <div className="container">
          <div className="error-state">
            <h2>Article Not Found</h2>
            <p>The article you are looking for does not exist or has been removed.</p>
            <Link to="/news" className="back-link">Back to News</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page">
      <header className="news-detail-header">
        <div className="container">
          <Link to="/news" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to News
          </Link>
          <div className="post-meta">
            <span className="post-category">{article.category}</span>
            <span className="post-date">{article.published_date}</span>
          </div>
          <h1>{article.title}</h1>
        </div>
      </header>

      <div className="container">
        <div className="news-content-layout">
          <div className="news-main-content">
            <div className="article-featured-image">
              <img src={article.image_url || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"} alt={article.title} />
            </div>
            
            <div className="article-body">
              <p className="article-excerpt">{article.excerpt}</p>
              
              {article.article_url && article.article_url.trim() !== '' && article.article_url !== '#' && (
                <div className="article-text" style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ background: 'rgba(var(--primary-rgb), 0.1)', padding: '2rem', borderRadius: '12px' }}>
                    <p style={{ marginBottom: '1.5rem' }}>The full version of this article is available at the source.</p>
                    <a href={article.article_url.trim().startsWith('http') ? article.article_url.trim() : `https://${article.article_url.trim()}`} target="_blank" rel="noopener noreferrer" className="read-more-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      Read Full Article at Source
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="article-footer">
              <div className="share-section">
                <span>Share this article:</span>
                <div className="share-links">
                  <button className="share-btn">FB</button>
                  <button className="share-btn">TW</button>
                  <button className="share-btn">LI</button>
                </div>
              </div>
            </div>
          </div>

          <Sidebar articles={article ? [article] : []} />
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
