import styles from './FutureCta.module.css';

export default function FutureCta() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h4>Empowering</h4>
          <h2>Healthcare</h2>
          <p>
            Since its inception, FREYA has been dedicated to elevating the standard of Philippine healthcare by providing direct access to premium global medical technology. We continue to bridge the gap between innovation and patient care.
          </p>
          <a href="/about" className={styles.link}>
            Our Mission <span className="material-symbols-outlined">east</span>
          </a>
        </div>
        
        <div className={styles.imageContent}>
          <h2 className={styles.imageHeading}>Leading The Future</h2>
          <img 
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1932&auto=format&fit=crop" 
            alt="Robotic Surgery" 
            className={styles.armImage} 
          />
        </div>
      </div>
    </section>
  );
}
