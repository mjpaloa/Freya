import { Link } from 'react-router-dom';
import type { NewsArticle } from '../data';

interface FeaturedPostProps {
  article: NewsArticle;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ article }) => {
  return (
    <article className="featured-post">
      <div className="featured-image-wrapper">
        <img src={article.image_url || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"} alt={article.title} />
      </div>
      <div className="post-meta">
        <span className="post-category">{article.category}</span>
        <span className="post-date">{article.published_date}</span>
      </div>
      <h2>{article.title}</h2>
      <p>{article.excerpt}</p>
      {article.article_url && article.article_url.trim() !== '' && article.article_url !== '#' ? (
        <a 
          href={article.article_url.trim().startsWith('http') ? article.article_url.trim() : `https://${article.article_url.trim()}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="read-more-link"
        >
          Read Full Story
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      ) : (
        <Link to={`/news/${article.id}`} className="read-more-link">
          Read Full Story 
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      )}
    </article>
  );
};

export default FeaturedPost;
