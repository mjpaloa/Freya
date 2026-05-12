import styles from './QualitySection.module.css';

export default function QualitySection() {
  return (
    <section className={styles.section}>
      <div className={`container-fluid ${styles.container}`}>
        <div className={styles.hubHeader}>
          <h2 className={styles.hubTitle}>Philippines' Leading Technical Hub</h2>
          <p className={styles.hubSubtitle}>
            Trusted by the nation's premier medical institutions and healthcare providers.
          </p>
        </div>

        {/* Logo Scroll Area */}
        <div className={styles.logoGrid}>
          <div className={styles.logoItem}>
            <span className={`material-symbols-outlined ${styles.logoIcon}`}>medical_services</span>
            <span className={styles.logoName}>St. Luke's</span>
          </div>
          <div className={styles.logoItem}>
            <span className={`material-symbols-outlined ${styles.logoIcon}`}>health_metrics</span>
            <span className={styles.logoName}>MakatiMed</span>
          </div>
          <div className={styles.logoItem}>
            <span className={`material-symbols-outlined ${styles.logoIcon}`}>monitor_heart</span>
            <span className={styles.logoName}>The Medical City</span>
          </div>
          <div className={styles.logoItem}>
            <span className={`material-symbols-outlined ${styles.logoIcon}`}>local_hospital</span>
            <span className={styles.logoName}>Asian Hospital</span>
          </div>
        </div>

        {/* Quality Card */}
        <div className={styles.qualityCard}>
          <div className={styles.qualityContent}>
            <div className={styles.isoBadge}>
              <span className="material-symbols-outlined">verified</span>
              <span className={styles.isoText}>ISO 13485 Certified</span>
            </div>
            <h3 className={styles.qualityTitle}>Uncompromising Standards in Medical Device Quality</h3>
            <p className={styles.qualityDesc}>
              Our distribution center and technical facility maintain the highest global certifications 
              for medical device handling and maintenance, ensuring patient safety is never compromised.
            </p>
          </div>
          
          <div className={styles.metricsGrid}>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>15+</span>
              <p className={styles.metricLabel}>Global Partners</p>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>24h</span>
              <p className={styles.metricLabel}>Response Time</p>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>100%</span>
              <p className={styles.metricLabel}>PH Compliance</p>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>ISO</span>
              <p className={styles.metricLabel}>Medical Quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
