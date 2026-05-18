import MissionVision from '../../components/sections/MissionVision/MissionVision';

export default function AboutPage() {
  return (
    <main>
      <section style={{ 
        padding: '3rem 2rem 4rem', 
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--surface-container-lowest) 0%, var(--surface) 100%)'
      }}>
        <h1 style={{ 
          fontFamily: 'var(--font-headline)', 
          fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
          fontWeight: 700, 
          letterSpacing: '-0.04em',
          color: 'var(--secondary)',
          marginTop: 0, /* Prevents browser default top margin */
          marginBottom: '1.5rem'
        }}>
          Pioneering <span style={{ color: 'var(--primary)' }}>Health</span> Solutions
        </h1>
        <p style={{ 
          color: 'var(--on-surface-variant)', 
          fontSize: '1.25rem',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          Distributing world-class diagnostic technology across the Philippine archipelago with uncompromising reliability.
        </p>
      </section>

      <MissionVision />
    </main>
  );
}

