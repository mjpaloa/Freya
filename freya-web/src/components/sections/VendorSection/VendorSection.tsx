import styles from './VendorSection.module.css';

export default function VendorSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.backgroundText}>Partnership</div>
        
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>Become a<br />Partner</h2>
            <button className={styles.link}>Register Now →</button>
          </div>
          
          <div className={styles.grid}>
            <div className={`${styles.card} ${styles.cardDark}`}>
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop" alt="Machine" className={styles.cardImage} style={{ filter: 'grayscale(1) brightness(0.5)' }} />
              <div className={styles.cardBody}>
                <h3>Pre-Owned Equipment</h3>
                <p>Buy or sell certified pre-owned clinical equipment with the FREYA quality guarantee.</p>
                <a href="#" className={styles.link}>View More</a>
              </div>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardBody}>
                <h3>Technical Academy</h3>
                <p>Train your clinical staff on the latest diagnostic and imaging technologies.</p>
                <a href="#" className={styles.link}>Learn More</a>
              </div>
            </div>
            
            <div className={`${styles.card} ${styles.cardRed}`}>
              <h2>FREYA PLUS</h2>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
