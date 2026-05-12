import styles from './ServicesHero.module.css';

export default function ServicesHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.contentWrapper}>
        <div className={styles.textContent}>
          <span className={styles.badge}>Global Logistics &amp; Support</span>
          <h1 className={styles.title}>
            End-to-end <span>clinical</span> excellence
          </h1>
          <p className={styles.subtitle}>
            From technical procurement to lifecycle maintenance, we provide
            high-performance healthcare environments with uncompromising precision.
          </p>
          <button className={styles.ctaBtn}>Consult Our Specialists</button>
        </div>
      </div>
    </section>
  );
}
