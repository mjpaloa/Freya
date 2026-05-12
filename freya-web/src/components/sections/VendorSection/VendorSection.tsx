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
