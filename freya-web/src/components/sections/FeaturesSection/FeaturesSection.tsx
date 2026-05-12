import styles from './FeaturesSection.module.css';

export default function FeaturesSection() {
  return (
    <section className={styles.section}>
      <div className={`container-fluid ${styles.container}`}>
        <div className={styles.grid}>
          <div className={styles.featureItem}>
            <div className={styles.iconBox}>
              <span className={`material-symbols-outlined ${styles.icon}`}>local_shipping</span>
            </div>
            <h3 className={styles.featureTitle}>Importation & Logistics</h3>
            <p className={styles.featureDesc}>
              Direct pipeline from global manufacturers to Philippine medical facilities. 
              We handle all customs, regulatory compliance, and cold-chain logistics.
            </p>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.iconBox}>
              <span className={`material-symbols-outlined ${styles.icon}`}>engineering</span>
            </div>
            <h3 className={styles.featureTitle}>Technical Installation</h3>
            <p className={styles.featureDesc}>
              Certified engineers ensuring seamless integration of complex equipment. 
              We provide site preparation, installation, and staff training.
            </p>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.iconBox}>
              <span className={`material-symbols-outlined ${styles.icon}`}>settings_suggest</span>
            </div>
            <h3 className={styles.featureTitle}>Preventative Maintenance</h3>
            <p className={styles.featureDesc}>
              Rigorous maintenance protocols that ensure peak performance, 
              ensuring maximum equipment uptime for your facility through scheduled audits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
