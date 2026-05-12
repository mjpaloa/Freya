export default function InfoSidebar() {
  return (
    <div className="info-sidebar">
      {/* Headquarters Card */}
      <div className="info-card">
        <h2>Global Headquarters</h2>

        <div className="contact-item">
          <div className="item-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
          </div>
          <div className="item-content">
            <span>Direct Line</span>
            <a href="tel:283629227">283629227</a>
          </div>
        </div>

        <div className="contact-item">
          <div className="item-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div className="item-content">
            <span>Email</span>
            <a href="mailto:freyatradinginc@gmail.com">freyatradinginc@gmail.com</a>
          </div>
        </div>

        <div className="contact-item">
          <div className="item-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="item-content">
            <span>Address</span>
            <p>303 Alen Building Sen Gil Puyat Ave, Pasay City, Philippines</p>
          </div>
        </div>
      </div>

      {/* Map Card */}
      <div className="info-card map-card">
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop"
          alt="Pasay City skyline"
        />
        <a
          href="https://maps.google.com/?q=303+Alen+Building+Sen+Gil+Puyat+Ave+Pasay+City+Philippines"
          target="_blank"
          rel="noopener noreferrer"
          className="map-btn"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
}
