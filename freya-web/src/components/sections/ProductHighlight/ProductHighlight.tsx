import { Link } from 'react-router-dom';
import styles from './ProductHighlight.module.css';

export default function ProductHighlight() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h3>Clinical Diagnostic Systems</h3>
          <h2>FUJIFILM</h2>
          <p>
            Empowering Philippine hospitals with the latest generation of FUJIFILM diagnostic imaging. Experience world-class precision, speed, and seamless clinical workflows.
          </p>
          <Link to="/products" className={styles.btnPrimary}>
            Discover More →
          </Link>
        </div>
      </div>
    </section>
  );
}
