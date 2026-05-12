import { useState } from 'react';
import { products } from '../../../constants/products';
import styles from './ProductGrid.module.css';

const categories = ['All', 'Ultrasound', 'X-Ray', 'Endoscopy', 'CT Scan', 'MRI', 'Healthcare IT', 'Bone Densitometry'] as const;

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section className={styles.section}>
      <div className="container-fluid">
        <div className={styles.filterBar}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <article key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.image}
                  onError={(e) => {
                    // Fallback for missing images
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/0b1c30/ffffff?text=Image+Coming+Soon';
                  }}
                />
                <span className={styles.categoryTag}>{product.category}</span>
              </div>
              
              <div className={styles.content}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDesc}>{product.description}</p>
                
                <div className={styles.features}>
                  {product.features.map((feature, i) => (
                    <span key={i} className={styles.feature}>{feature}</span>
                  ))}
                </div>


              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
