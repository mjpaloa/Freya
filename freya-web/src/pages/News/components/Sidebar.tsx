import React from 'react';
import { trendingNews } from '../data';
import type { NewsArticle } from '../data';

interface SidebarProps {
  articles?: NewsArticle[];
}

const Sidebar: React.FC<SidebarProps> = ({ articles = [] }) => {
  // Derive categories dynamically from the actual articles in the database
  const dynamicCategories = React.useMemo(() => {
    const counts: Record<string, number> = {};

    articles.forEach(article => {
      const cat = article.category || 'Uncategorized';
      counts[cat] = (counts[cat] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [articles]);

  return (
    <aside className="news-sidebar">
      {/* Search Widget */}
      <div className="sidebar-widget">
        <h4>Search Insights</h4>
        <div className="search-box">
          <input type="text" placeholder="Search articles..." />
          <div className="search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>

      {/* Categories Widget */}
      {dynamicCategories.length > 0 && (
        <div className="sidebar-widget">
          <h4>Topic Categories</h4>
          <ul className="category-list">
            {dynamicCategories.map((cat, index) => (
              <li key={index} className="category-item">
                <span>{cat.name}</span>
                <span className="category-count">{cat.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Newsletter Widget - Orange Theme */}
      <div className="newsletter-widget">
        <div className="newsletter-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <h4>Stay Ahead of the Curve</h4>
        <p>Receive monthly clinical insights and technical updates directly to your inbox.</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Email Address" />
          <button type="submit" className="subscribe-btn">Subscribe</button>
        </form>
      </div>

      {/* Trending Widget */}
      {trendingNews.length > 0 && (
        <div className="sidebar-widget">
          <h4>Trending Now</h4>
          <div className="trending-list">
            {trendingNews.map((news) => (
              <div key={news.id} className="trending-item">
                <div className="trending-rank">{news.rank}</div>
                <div className="trending-content">
                  <h5>{news.title}</h5>
                  <span className="trending-category">{news.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
