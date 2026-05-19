import { Link } from 'react-router-dom';
import styles from './SectorsGrid.module.css';

const sectors = [
  {
    title: 'MRI Systems',
    filterCategory: 'MRI',
    description: 'Advanced 1.5T and open MRI systems with ZeroHelium and SynergyDrive technology for superior diagnostic imaging.',
    image: '/assets/products/ECHELON-Smart-with-Synergy-Drive.png'
  },
  {
    title: 'Ultrasound Systems',
    filterCategory: 'Ultrasound',
    description: 'High-performance diagnostic ultrasound platforms from the Arietta and LISENDO series for comprehensive clinical imaging.',
    image: '/assets/products/Arietta-850cover.jpg'
  },
  {
    title: 'X-Ray & Radiography',
    filterCategory: 'X-Ray',
    description: 'Digital radiography, mobile X-ray, mammography, and dry imager solutions for complete imaging departments.',
    image: '/assets/products/Fujifilm-FDR-Cross-C-Arm.png'
  },
  {
    title: 'CT Scan',
    filterCategory: 'CT Scan',
    description: 'Multi-slice CT scanners from 32 to 128 slices with advanced dose reduction and high-speed rotation technology.',
    image: '/assets/products/thumb_scenariaview_ov_01.jpg'
  },
  {
    title: 'Endoscopy',
    filterCategory: 'Endoscopy',
    description: 'Next-generation ELUXEO endoscopy systems with Multi-Light, BLI, and LCI technology for enhanced visualization.',
    image: '/assets/products/ELUXEO-Processor-Image_2.png'
  },
  {
    title: 'Healthcare IT',
    filterCategory: 'Healthcare IT',
    description: 'Synapse PACS, VNA, and 3D visualization solutions for enterprise-wide medical image management and processing.',
    image: '/assets/products/thumb_pacs_01.jpeg'
  },
  {
    title: 'Bone Densitometry',
    filterCategory: 'Bone Densitometry',
    description: 'Advanced DXA technology for accurate bone mineral density measurement and osteoporosis screening.',
    image: '/assets/products/img_FDX-Visionary-A_thumb.jpeg'
  },
  {
    title: 'Digital Mammography',
    filterCategory: 'X-Ray',
    description: 'High-resolution breast imaging solutions including tomosynthesis for superior lesion detection and patient comfort.',
    image: '/assets/products/AMULET-Felicia1.jpeg'
  },
];


export default function SectorsGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Our <span>Product</span> Categories</h2>
        </div>
        
        <div className={styles.grid}>
          {sectors.map((sector, index) => (
            <div key={index} className={styles.sectorCard}>
              <img src={sector.image} alt={sector.title} className={styles.image} />
              <div className={styles.overlay}>
                <div className={styles.textContent}>
                  <h3>{sector.title}</h3>
                  <p>{sector.description}</p>
                  <Link
                    to={`/products?category=${encodeURIComponent(sector.filterCategory)}`}
                    className={styles.viewProductsBtn}
                  >
                    Find Out More <span className="material-symbols-outlined">east</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.footer}>
          <p>
            FREYA is also at your disposal for a wide range of accessories and technical parts for clinical equipment.
          </p>
          <button className={styles.btnSecondary}>
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
