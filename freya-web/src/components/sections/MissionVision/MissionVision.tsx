import styles from './MissionVision.module.css';

export default function MissionVision() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <span className={styles.label}>Our Identity</span>
          <h2 className={styles.heading}>Built on a foundation of clinical excellence and logistical precision.</h2>
          <p className={styles.description}>
            Freya Trading Inc. is a premier medical technology distributor dedicated to bridging the gap between global innovation and Philippine healthcare facilities.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
            <h3 className={styles.cardTitle}>Our Mission</h3>
            <p className={styles.cardText}>
              To empower Philippine healthcare providers with world-class diagnostic technology and uncompromising technical support, ensuring precision care is accessible to every patient.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <span className="material-symbols-outlined">visibility</span>
            </div>
            <h3 className={styles.cardTitle}>Our Vision</h3>
            <p className={styles.cardText}>
              To be the most trusted catalyst for medical advancement in the Philippines, setting the benchmark for technology integration, reliability, and clinical excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
