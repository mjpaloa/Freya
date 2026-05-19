import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { products as staticProducts } from '../../../constants/products';
import type { Product } from '../../../constants/products';
import { fetchProducts } from '../../../services/productService';
import styles from './ProductGrid.module.css';

const categories = ['All', 'Ultrasound', 'X-Ray', 'Endoscopy', 'CT Scan', 'MRI', 'Healthcare IT', 'Bone Densitometry'] as const;
const categoryAliases: Record<string, (typeof categories)[number]> = {
  'mri systems': 'MRI',
  'ultrasound systems': 'Ultrasound',
  'x-ray & radiography': 'X-Ray',
  'digital mammography': 'X-Ray',
  'bone densitometry': 'Bone Densitometry',
  'healthcare it': 'Healthcare IT',
  'ct scan': 'CT Scan',
  'endoscopy': 'Endoscopy',
  'mri': 'MRI',
  'ultrasound': 'Ultrasound',
  'x-ray': 'X-Ray',
};

const normalizeCategory = (value: string | null): (typeof categories)[number] => {
  if (!value) return 'All';

  const normalized = value.trim().toLowerCase();
  return categoryAliases[normalized] ?? (categories.includes(value as (typeof categories)[number]) ? (value as (typeof categories)[number]) : 'All');
};

export default function ProductGrid() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(normalizeCategory(searchParams.get('category')));
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const apiProducts = await fetchProducts();
        if (apiProducts && apiProducts.length > 0) {
          setDisplayProducts(apiProducts as any);
        } else {
          setDisplayProducts([]);
        }
      } catch (error) {
        console.error('Failed to load products from API, falling back to static data', error);
        setDisplayProducts(staticProducts);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setActiveCategory(normalizeCategory(searchParams.get('category')));
  }, [searchParams]);

  const filteredProducts = activeCategory === 'All' 
    ? displayProducts 
    : displayProducts.filter(p => p.category?.trim().toLowerCase() === activeCategory.trim().toLowerCase());

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    if (category === 'All') {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };

  return (
    <section className={styles.section}>
      <div className="container-fluid">
        <div className={styles.filterBar}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--on-surface-variant)' }}>
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--on-surface-variant)' }}>
            <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>No products found.</p>
            <p>Try adding some products in the Admin Panel to see them here.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <article key={product.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={styles.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/0b1c30/ffffff?text=Image+Coming+Soon';
                    }}
                  />
                  <span className={styles.categoryTag}>{product.category}</span>
                </div>
                
                <div className={styles.content}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                  
                  <button 
                    className={styles.readMoreBtn}
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    Read More »
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
