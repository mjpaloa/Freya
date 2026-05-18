import ProductGrid from '../../components/sections/ProductGrid/ProductGrid';

export default function ProductsPage() {
  return (
    <main>
      <section style={{
        padding: '3rem clamp(1rem, 4vw, 2rem) 2rem',
        textAlign: 'center',
        width: '100%',
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-headline)',
          fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          color: 'var(--on-surface)',
          letterSpacing: '-0.03em',
          marginTop: 0, /* Prevents browser default top margin */
          marginBottom: '1rem',
        }}>
          Advanced <span style={{ color: 'var(--primary)' }}>clinical</span> solutions
        </h1>
        <p style={{
          fontSize: '1.15rem',
          color: 'var(--on-surface-variant)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Empowering healthcare providers with state-of-the-art diagnostic technology from the world's leading manufacturers.
        </p>
      </section>

      <ProductGrid />
    </main>
  );
}
