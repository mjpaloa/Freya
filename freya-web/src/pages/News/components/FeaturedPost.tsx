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
      <Link to={`/news/${article.id}`} className="read-more-link">
        Read Full Story 
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Link>
    </article>
  );
};

export default FeaturedPost;
