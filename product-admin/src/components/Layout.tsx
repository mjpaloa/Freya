import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Loader from './Loader';
import '../styles/Layout.css';

import { ChevronUp } from 'lucide-react';

const Layout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const getIsMobile = () => window.innerWidth <= 1024;
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!getIsMobile());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const mainContentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = getIsMobile();
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll to show/hide button
  useEffect(() => {
    const mainContent = mainContentRef.current;
    if (!mainContent) return;

    const handleScroll = () => {
      if (mainContent.scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    mainContent.addEventListener('scroll', handleScroll);
    return () => mainContent.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on navigation
  useEffect(() => {
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, isMobile]);

  useEffect(() => {
    document.body.style.overflow = isMobile && isSidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isSidebarOpen]);

  const scrollToTop = () => {
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        onClose={() => setIsSidebarOpen(false)}
      />
      {isMobile && isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      <div className="content-wrapper">
        <Navbar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="main-content" ref={mainContentRef}>
          <Outlet />
          
          {/* Back to Top Button */}
          {!isMobile && (
            <button 
              className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
              onClick={scrollToTop}
              aria-label="Back to Top"
            >
              <ChevronUp size={24} />
            </button>
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
