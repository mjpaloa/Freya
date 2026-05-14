import { useState, useEffect, useRef } from 'react';
import styles from './PartnersSection.module.css';
import apecoLogo from '../../../assets/partners_logo/apeco_partner.jpg';

export default function PartnersSection() {
  const partners = Array(10).fill({ name: 'APECO', logo: apecoLogo });
  const displayPartners = [...partners, ...partners, ...partners];
  const totalOriginal = partners.length;
  
  const [currentIndex, setCurrentIndex] = useState(totalOriginal);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const [metrics, setMetrics] = useState({ containerWidth: 0, logoWidth: 250, gap: 24 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Robust Centering: Measure actual elements
  useEffect(() => {
    const updateMetrics = () => {
      if (sliderRef.current && logoRef.current) {
        const containerW = sliderRef.current.offsetWidth;
        const logoW = logoRef.current.offsetWidth;
        
        // Get actual gap from computed style
        const style = window.getComputedStyle(logoRef.current.parentElement!);
        const gapValue = parseFloat(style.gap) || 24;

        setMetrics({ containerWidth: containerW, logoWidth: logoW, gap: gapValue });
      }
    };

    const observer = new ResizeObserver(updateMetrics);
    if (sliderRef.current) observer.observe(sliderRef.current);
    
    // Initial measurement
    updateMetrics();

    return () => observer.disconnect();
  }, []);

  // Seamless Loop Logic
  useEffect(() => {
    if (currentIndex >= totalOriginal * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalOriginal);
      }, 600);
    } else if (currentIndex < totalOriginal) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalOriginal * 2 - 1);
      }, 600);
    }
  }, [currentIndex, totalOriginal]);

  useEffect(() => {
    if (!isTransitioning) {
      void sliderRef.current?.offsetWidth;
      setIsTransitioning(true);
    }
  }, [isTransitioning]);

  const nextSlide = () => setCurrentIndex((prev) => prev + 1);
  const prevSlide = () => setCurrentIndex((prev) => prev - 1);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 4000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, []);

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

  const { containerWidth, logoWidth, gap } = metrics;
  const offset = containerWidth > 0 ? (containerWidth - logoWidth) / 2 : 0;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>Our Partners</h2>
          </div>

          <div className={styles.sliderContainer}>
            <button className={styles.navButton} onClick={handleManualPrev}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <div className={styles.slider} ref={sliderRef}>
              <div 
                className={styles.track}
                style={{ 
                  transform: `translateX(${offset - currentIndex * (logoWidth + gap)}px)`,
                  transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                }}
              >
                {displayPartners.map((partner, index) => (
                  <div 
                    key={index} 
                    className={styles.logoWrapper}
                    ref={index === 0 ? logoRef : null} // Measure the first one
                  >
                    <img src={partner.logo} alt={partner.name} className={styles.logo} />
                  </div>
                ))}
              </div>
            </div>

            <button className={styles.navButton} onClick={handleManualNext}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
