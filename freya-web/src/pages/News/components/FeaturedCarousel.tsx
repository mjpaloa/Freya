import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { NewsArticle } from '../data';

interface FeaturedCarouselProps {
  articles: NewsArticle[];
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  }, [articles.length]);

  useEffect(() => {
    let interval: any;
    if (isAutoPlaying && articles.length > 1) {
      interval = setInterval(nextSlide, 10000); // Set to 10 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, articles.length]);

  if (!articles || articles.length === 0) return null;

  const currentArticle = articles[currentIndex];

  return (
    <div 
      className="featured-carousel-v2"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Image Section */}
      <div className="carousel-image-container">
        <div className="carousel-inner">
          {articles.map((article, index) => (
            <div 
              key={article.id} 
              className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            >
              <img 
                src={article.image_url || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"} 
                alt={article.title} 
              />
            </div>
          ))}
        </div>

        {/* Minimalist Dots Overlay (No Background) */}
        {articles.length > 1 && (
          <div className="carousel-dots-minimal">
            {articles.map((_, index) => (
              <button 
                key={index} 
                className={`dot-small ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="featured-details">
        <div className="post-meta">
          <span className="post-category">{currentArticle.category}</span>
          <span className="post-date">{currentArticle.published_date}</span>
        </div>
        <h2>{currentArticle.title}</h2>
        <p>{currentArticle.excerpt}</p>
        
        {currentArticle.article_url && currentArticle.article_url.trim() !== '' && currentArticle.article_url !== '#' ? (
          <a 
            href={currentArticle.article_url.trim().startsWith('http') ? currentArticle.article_url.trim() : `https://${currentArticle.article_url.trim()}`} 
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
          <Link to={`/news/${currentArticle.id}`} className="read-more-link">
            Read Full Story 
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
