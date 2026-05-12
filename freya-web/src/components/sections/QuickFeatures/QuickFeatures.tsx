import styles from './QuickFeatures.module.css';

const features = [
  {
    icon: 'local_shipping',
    title: 'Importation & Logistics',
    description: 'Direct pipeline from global manufacturers to Philippine medical facilities. We handle all customs and regulatory compliance.'
  },
  {
    icon: 'engineering',
    title: 'Technical Installation',
    description: 'Certified engineers ensuring seamless integration of complex equipment. We provide installation and staff training.'
  },
  {
    icon: 'settings_suggest',
    title: 'Preventative Maintenance',
    description: 'Comprehensive maintenance protocols that ensure peak performance, ensuring maximum equipment uptime through scheduled technical audits.'
  }
];

export default function QuickFeatures() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Our Core Capabilities</h2>
        </div>
        
        <div className={styles.grid}>

          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.iconWrapper}>
                <span className="material-symbols-outlined">{feature.icon}</span>
              </div>
              <div className={styles.textContent}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
