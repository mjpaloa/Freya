import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.contentWrapper}>
        <div className={styles.textContent}>
          <div className={styles.badge}>Leading Philippines Distributor</div>
          
          <h1 className={styles.title}>
            Global <span>trading</span> & import <span>excellence</span>
          </h1>
          
          <p className={styles.subtitle}>
            Precision-engineered distribution and importation of world-class clinical technology. 
            Empowering Philippine healthcare through technical excellence and direct global sourcing.
          </p>
          
          <div className={styles.actions}>
            <button className={styles.btnPrimary}>
              Browse equipment
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className={styles.btnSecondary}>
              Request quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
