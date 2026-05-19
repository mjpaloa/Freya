import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchNewsArticles, type NewsArticle } from '../../../services/newsService';
import styles from './FeaturedNews.module.css';

export default function FeaturedNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedNews = async () => {
      try {
        const allArticles = await fetchNewsArticles();
        // Filter featured articles
        let featured = allArticles.filter(art => art.featured);

        // If there are less than 3 featured, fill the rest with non-featured articles
        if (featured.length < 3) {
          const remaining = allArticles.filter(art => !art.featured);
          featured = [...featured, ...remaining].slice(0, 3);
        } else {
          // If we have more than 3, limit to 3
          featured = featured.slice(0, 3);
        }

        setArticles(featured);
      } catch (error) {
        console.error('Error fetching featured news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedNews();
  }, []);

  // Fallback high-quality image mappings if article image_url is missing
  const getArticleImage = (article: NewsArticle) => {
    if (article.image_url) return article.image_url;

    const fallbackImages: Record<string, string> = {
      '2': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
      '3': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=600',
      '4': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
      '5': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
    };

    return fallbackImages[article.id] || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600';
  };

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading latest updates...</div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null; // Don't render the section if no articles exist
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Discover What’s New and Happening at <span className={styles.brandName}>Freya</span>
        </h2>

        <div className={styles.grid}>
          {articles.map((article) => {
            const isPartnership =
              article.category?.toLowerCase().includes('partner') ||
              article.title?.toLowerCase().includes('partner');

            return (
              <div key={article.id} className={styles.card}>
                <div className={styles.imageContainer}>
                  <img
                    src={getArticleImage(article)}
                    alt={article.title}
                    className={styles.image}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.title}>{article.title}</h3>
                  <div className={styles.cardLinks}>
                    <Link to={`/news/${article.id}`} className={styles.readMore}>
                      READ MORE »
                    </Link>
                    {isPartnership && (
                      <Link to="/contact" className={styles.inquireLink}>
                        INQUIRE FOR PARTNERSHIP »
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
