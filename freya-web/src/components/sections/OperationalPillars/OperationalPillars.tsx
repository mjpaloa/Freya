import styles from './OperationalPillars.module.css';

export default function OperationalPillars() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Operational Pillars</h2>

        <div className={styles.grid}>
          {/* Strategic Importation — image background card */}
          <div className={`${styles.card} ${styles.importCard}`}>
            <div className={styles.importCardImg}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYPkaiD4F6H3NYUF8RqHkkwJ_uXJ6h2rJIPR1RIipPFetu2MhD-7abvKEZQLC5lx4KJCHTgjf1_hbITC8jAYtnR-xyNcbciJzYNkfhtEHBI0DUIiHM0UXgfaJDAMjdAZM7tqpvn2-HPHUrsXcUQpZyWdMHYmPYf6LvJ3-vnDlLKtJ_euCZQO0xbtw1oztYFerV9OomVCYl5Ww4FHCuZk5VUT5Vdf_ckUWLCmblqZerNyVwOUwzH0xiTTyoz0rJkRtlxLr13ghbbp8"
                alt="Warehouse logistics"
              />
            </div>
            <div className={styles.cardBody}>
              <span className={`material-symbols-outlined ${styles.cardIcon}`}>inventory_2</span>
              <h3 className={styles.cardTitle}>Strategic Importation</h3>
              <p className={styles.cardDesc}>
                Navigating global supply chains with clinical precision. We manage
                key regulatory, statutory compliance and documentation to prioritise
                your critical technology reaching any facility in best order.
              </p>
            </div>
          </div>

          {/* Nationwide Distribution — light with checklist */}
          <div className={`${styles.card} ${styles.distributionCard}`}>
            <span className={`material-symbols-outlined ${styles.cardIcon}`}>local_shipping</span>
            <h3 className={styles.cardTitle}>Nationwide Distribution</h3>
            <p className={styles.cardDesc}>
              Real-time tracking and reliable point delivery across all
              locations. Specialized logistics for sensitive diagnostic instruments.
            </p>
            <div className={styles.checkList}>
              <div className={styles.checkItem}>
                <span className={`material-symbols-outlined ${styles.checkIcon}`}>check_circle</span>
                24/7 Traceability
              </div>
              <div className={styles.checkItem}>
                <span className={`material-symbols-outlined ${styles.checkIcon}`}>check_circle</span>
                Nationwide Fulfillment
              </div>
            </div>
          </div>

          {/* Clinical Installation — primary blue */}
          <div className={`${styles.card} ${styles.installCard}`}>
            <div className={styles.cardBody}>
              <span className={`material-symbols-outlined ${styles.cardIconWhite}`}>precision_manufacturing</span>
              <h3 className={styles.cardTitleWhite}>Clinical Installation</h3>
              <p className={styles.cardDescWhite}>
                End-to-end on-site deployment from site preparation to post-installation system
                commissioning with industry-standard management systems.
              </p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.maintenanceCard}`}>
            <span className={`material-symbols-outlined ${styles.cardIcon}`}>settings_suggest</span>
            <h3 className={styles.cardTitle}>Preventative Maintenance</h3>
            <p className={styles.cardDesc}>
              Rigorous technical support and preventative protocols. We use
              scheduled diagnostics to ensure peak performance and reliability — 
              providing maximum uptime for life-saving machinery.
            </p>
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <span className={styles.metricValue}>99.9%</span>
                <span className={styles.metricLabel}>Uptime</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue}>2h</span>
                <span className={styles.metricLabel}>Response</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue}>ISO</span>
                <span className={styles.metricLabel}>Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
