import styles from './ServicesCta.module.css';

export default function ServicesCta() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.ctaBox}>
          <div className={styles.textArea}>
            <h2 className={styles.title}>
              Ready to elevate your<br />clinical operations?
            </h2>
            <p className={styles.subtitle}>
              Partner with Freya Trading for infrastructure that defines the future of care.
            </p>
          </div>
          <button className={styles.ctaBtn}>Request Service Quote</button>
        </div>
      </div>
    </section>
  );
}
