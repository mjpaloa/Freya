import { Link } from 'react-router-dom';
import type { NewsArticle } from '../data';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  // Map images to high-quality placeholders since I can't generate
  const images: Record<string, string> = {
    '2': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
    '3': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=600',
    '4': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
    '5': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
  };

  return (
    <article className="news-card">
      <div className="image-wrapper">
        <img src={article.image_url || images[article.id] || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600'} alt={article.title} />
      </div>
      <div className="post-meta">
        <span className="post-category">{article.category}</span>
        <span className="post-date">{article.published_date}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt.substring(0, 100)}...</p>
      <Link to={`/news/${article.id}`} className="read-more-link">
        Read Full Story
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Link>
    </article>
  );
};

export default NewsCard;
