import styles from './CtaSection.module.css';

export default function CtaSection() {
  return (
    <section className={styles.section}>
      <div className={`container-fluid ${styles.container}`}>
        <div className={styles.ctaBox}>
          <div className={styles.bgPattern}>
            <img 
              alt="Blueprint texture" 
              className={styles.patternImg} 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0Mxrsj1_BODNNY1fdamXk9S0yqVy8_qtb5gV5Lczb1T5FTn0JG5iA3aTgW_rQ7y9Qx-vr8cuA7l32TfOTlFI2xp671k-FDWcUPguEjKlC3m5DtR9Exk6PNsCWaJAJh_gkOVoev4lvMBUFi9BR0CcEYmTt-1YKd8RZdnxGmHIDRaTsyZ-AWeG7cLEyZa2ykCEm_Cb4Oacg7Doo0Ti6zPSvM5djEWkrrdj1-ApLsZtg673EhAZf33ksYRXSzZXEe6IRGSQMq4BB_ww" 
            />
          </div>
          
          <div className={styles.content}>
            <h2 className={styles.title}>Initiate Infrastructure Upgrade</h2>
            <p className={styles.description}>
              Modernize your diagnostic capabilities with a custom-tailored equipment strategy and end-to-end technical support.
            </p>
            <div className={styles.btnWrapper}>
              <button className={styles.btnCta}>
                Schedule Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
