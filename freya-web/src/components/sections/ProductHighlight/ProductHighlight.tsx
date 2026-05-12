import styles from './ProductHighlight.module.css';

export default function ProductHighlight() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h3>Clinical Diagnostic Systems</h3>
          <h2>BIO-RAD</h2>
          <p>
            The latest generation of BIO-RAD diagnostic technology allows for faster, more accurate results. Empowering Philippine laboratories with world-class precision and automated workflows.
          </p>
          <button className={styles.btnPrimary}>
            Discover More →
          </button>
        </div>
      </div>
    </section>
  );
}
