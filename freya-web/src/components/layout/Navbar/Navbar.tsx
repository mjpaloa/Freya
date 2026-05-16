import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logoImg from '../../../assets/logo/freyalogo.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={styles.navbar}>
      <div className={`container-fluid ${styles.navContainer}`}>
        <div className={styles.leftSide}>
          <Link to="/" className={styles.brand}>
            <img src={logoImg} alt="Freya" className={styles.logoImage} />
          </Link>

          <nav className={`${styles.navLinks} ${isMobileMenuOpen ? styles.open : ''}`}>
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
              Home
            </NavLink>
            <NavLink to="/products" onClick={closeMenu} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
              Products
            </NavLink>
            <NavLink to="/services" onClick={closeMenu} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
              Services
            </NavLink>
            <NavLink to="/news" onClick={closeMenu} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
              News
            </NavLink>
            <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
              About Us
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
              Contacts
            </NavLink>
            <Link to="/contact" onClick={closeMenu} className={`${styles.quoteBtn} ${styles.mobileQuoteBtn}`}>
              Request Quote
            </Link>
          </nav>

        </div>

        <div className={styles.rightSide}>
          <Link to="/contact" className={`${styles.quoteBtn} ${styles.desktopQuoteBtn}`}>
            Request Quote
          </Link>
          <button className={styles.mobileToggle} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
