import styles from './FacilitySolutions.module.css';

const facilities = [
  {
    title: 'Hospitals',
    desc: 'Comprehensive multi-specialty solutions covering imaging, ICU, and operating room infrastructure for large medical centers.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACNCC5Yj8D8CFS7qpjSkES0WFULPdFHfQ-mjJ0iTiNTZf4Dtb_TBDskLTA4ycsfY7Vxo0svtH5WFJGuVr6JgH4aACfwrO3-nWdlJCSwHWjNXiaz5Aiw3s24FsPO5yZEDOfPN6_8g_6-cp3ZmnQC6SnWE9yn_9wB8v_Q8gpW8dRbk56kd9kABfh2vW8LEmeuuEqfxRTNwnwtsAaC0NPdBIWY4yyl4DTniQvMhe5OcjI9O3NAWv16LYz1lmwYJRTVCe2RFwk-UlXPXc',
  },
  {
    title: 'Diagnostic Centers',
    desc: 'Tailored packages for outpatient facilities focused on imaging, laboratory systems, and clinical patient workflow optimization.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYPkaiD4F6H3NYUF8RqHkkwJ_uXJ6h2rJIPR1RIipPFetu2MhD-7abvKEZQLC5lx4KJCHTgjf1_hbITC8jAYtnR-xyNcbciJzYNkfhtEHBI0DUIiHM0UXgfaJDAMjdAZM7tqpvn2-HPHUrsXcUQpZyWdMHYmPYf6LvJ3-vnDlLKtJ_euCZQO0xbtw1oztYFerV9OomVCYl5Ww4FHCuZk5VUT5Vdf_ckUWLCmblqZerNyVwOUwzH0xiTTyoz0rJkRtlxLr13ghbbp8',
  },
  {
    title: 'Specialty Clinics',
    desc: 'Focused solutions for cardiology, oncology, and specialized surgery clinics requiring precision equipment and bespoke installation.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFROqoaUdn8jEat85pQQT5PA2xT-fHWuWvCTUwnkg6TESzdbTUS9kzDz7_vaCShOoCXm8o6Cxt8N5HZTP7WqqCcIZMrGJZfrrivPMf-Crj9T9ELJL84e2lR7czZkKZLAIvzc_TV7k6WRBoVZHei0hWuJnVV_JAloNVRMyIIFduSuWApdgRYmfaZGpCy6bJQP4X-8ETB_eL0ktZJjfZ7Y0O9nJsqQ_txGEiEJrAdMvJRxexqJ56UQK0CWkt6dHIugKKiHKWKGI5oDk',
  },
];

export default function FacilitySolutions() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Tailored Infrastructure</p>
        <h2 className={styles.heading}>Curated Facility Solutions</h2>

        <div className={styles.grid}>
          {facilities.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.imgWrapper}>
                <img src={f.img} alt={f.title} className={styles.facilityImg} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTopRow}>
                  <h3 className={styles.cardTitle}>{f.title}</h3>
                </div>
                <p className={styles.cardDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
