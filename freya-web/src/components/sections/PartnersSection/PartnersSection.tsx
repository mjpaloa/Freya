import { useState, useEffect, useRef } from 'react';
import styles from './PartnersSection.module.css';
import apecoLogo from '../../../assets/partners_logo/apeco_partner.jpg';

export default function PartnersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const partners = Array(10).fill({ name: 'APECO', logo: apecoLogo });
  const totalPartners = partners.length;
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);


  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPartners);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPartners) % totalPartners);
  };

  // Auto-play logic (every 4 seconds)
  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  // Reset timer on manual interaction
  const handleManualNext = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    nextSlide();
    autoPlayRef.current = setInterval(nextSlide, 4000);
  };

  const handleManualPrev = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    prevSlide();
    autoPlayRef.current = setInterval(nextSlide, 4000);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>Our Partners</h2>
          </div>
          
          <div className={styles.sliderContainer}>
            <button 
              className={`${styles.navButton} ${styles.prevButton}`} 
              onClick={handleManualPrev}
              aria-label="Previous partner"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <div className={styles.slider}>
              <div 
                className={styles.track}
                style={{ transform: `translateX(calc(-${currentIndex * (250 + 24)}px))` }}
              >
                {partners.map((partner, index) => (
                  <div key={index} className={styles.logoWrapper}>
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`} 
                      className={styles.logo} 
                    />
                  </div>
                ))}
              </div>
            </div>

            <button 
              className={`${styles.navButton} ${styles.nextButton}`} 
              onClick={handleManualNext}
              aria-label="Next partner"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
