import { Link } from 'react-router-dom';
import styles from './ProductMatrix.module.css';

export default function ProductMatrix() {
  return (
    <section className={styles.section}>
      <div className={`container-fluid ${styles.container}`}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <span className={styles.label}>Curated Catalog</span>
            <h2 className={styles.title}>Advanced Product Matrix</h2>
          </div>
          <p className={styles.headerDesc}>
            A specialized portfolio of FDA-cleared diagnostic and life-support systems sourced from world-leading manufacturers.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Imaging Systems */}
          <div className={`${styles.card} ${styles.col8} ${styles.imagingCard}`}>
            <div className={styles.cardImageWrapper}>
              <img 
                alt="Imaging system" 
                className={styles.cardImg} 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYPkaiD4F6H3NYUF8RqHkkwJ_uXJ6h2rJIPR1RIipPFetu2MhD-7abvKEZQLC5lx4KJCHTgjf1_hbITC8jAYtnR-xyNcbciJzYNkfhtEHBI0DUIiHM0UXgfaJDAMjdAZM7tqpvn2-HPHUrsXcUQpZyWdMHYmPYf6LvJ3-vnDlLKtJ_euCZQO0xbtw1oztYFerV9OomVCYl5Ww4FHCuZk5VUT5Vdf_ckUWLCmblqZerNyVwOUwzH0xiTTyoz0rJkRtlxLr13ghbbp8" 
              />
            </div>
            <div className={styles.cardContent}>
              <span className={`material-symbols-outlined ${styles.cardIcon}`}>biotech</span>
              <h3 className={styles.cardTitle}>Imaging Systems</h3>
              <p className={styles.cardDesc}>
                Next-generation MRI, CT, and Digital Radiography solutions designed for clinical precision.
              </p>
              <Link to="/products/imaging" className={styles.cardLink}>
                View Details 
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            </div>
          </div>

          {/* Life Support */}
          <div className={`${styles.card} ${styles.col4} ${styles.lifeSupportCard}`}>
            <div className={styles.cardContent}>
              <span className={`material-symbols-outlined ${styles.cardIconWhite}`}>ecg</span>
              <h3 className={styles.cardTitleWhite}>Life Support</h3>
              <p className={styles.cardDescWhite}>
                Critical care ventilators and patient monitoring systems for ICU environments.
              </p>
            </div>
            <Link to="/products/life-support" className={styles.cardLinkWhite}>
              View Details 
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>

          {/* Laboratory */}
          <div className={`${styles.card} ${styles.col4} ${styles.labCard}`}>
            <div className={styles.cardContent}>
              <span className={`material-symbols-outlined ${styles.cardIconSecondary}`}>science</span>
              <h3 className={styles.cardTitle}>Laboratory</h3>
              <p className={styles.cardDesc}>
                Automated biochemistry and hematology analyzers for high-throughput diagnostic centers.
              </p>
            </div>
            <Link to="/products/laboratory" className={styles.cardLink}>
              View Details 
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>

          {/* Surgical Robotics */}
          <div className={`${styles.card} ${styles.col8} ${styles.surgicalCard}`}>
            <div className={styles.cardImageWrapperOpacity}>
              <img 
                alt="Surgical robot" 
                className={styles.cardImg} 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFROqoaUdn8jEat85pQQT5PA2xT-fHWuWvCTUwnkg6TESzdbTUS9kzDz7_vaCShOoCXm8o6Cxt8N5HZTP7WqqCcIZMrGJZfrrivPMf-Crj9T9ELJL84e2lR7czZkKZLAIvzc_TV7k6WRBoVZHei0hWuJnVV_JAloNVRMyIIFduSuWApdgRYmfaZGpCy6bJQP4X-8ETB_eL0ktZJjfZ7Y0O9nJsqQ_txGEiEJrAdMvJRxexqJ56UQK0CWkt6dHIugKKiHKWKGI5oDk" 
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Surgical Robotics</h3>
              <p className={styles.cardDesc}>
                Advanced robotic-assisted platforms that enhance surgical precision and improve patient recovery times.
              </p>
              <Link to="/products/surgical" className={styles.cardLink}>
                View Details 
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
