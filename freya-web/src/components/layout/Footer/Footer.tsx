import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.brand}>
              Freya<span>Trading</span>
            </div>
            <p className={styles.brandDesc}>
              Precision-engineered distribution and importation of world-class clinical technology.
            </p>
          </div>
          
          <div className={styles.col}>
            <h4>Navigate</h4>
            <div className={styles.links}>
              <a href="/">Home</a>
              <a href="/products">Products</a>
              <a href="/services">Services</a>
              <a href="/about">About Us</a>
              <a href="/contact">Contact</a>
            </div>
          </div>

          <div className={styles.col}>
            <h4>Product Categories</h4>
            <div className={styles.links}>
              <a href="/products">MRI & CT Scan</a>
              <a href="/products">Ultrasound Systems</a>
              <a href="/products">X-Ray & Radiography</a>
              <a href="/products">Endoscopy</a>
              <a href="/products">Healthcare IT</a>
            </div>
          </div>

          <div className={styles.col}>
            <h4>Contact Info</h4>
            <div className={styles.links}>
              <a href="tel:283629227">Tel: 283629227</a>
              <a href="mailto:freyatradinginc@gmail.com">Email: freyatradinginc@gmail.com</a>
              <p className={styles.address}>303 Alen Building Sen Gil Puyat Ave, Pasay City, Philippines</p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} FREYA Trading Inc. All Rights Reserved.</p>
          <div className={styles.socials}>
            <a href="#"><span className="material-symbols-outlined">public</span></a>
            <a href="#"><span className="material-symbols-outlined">share</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
