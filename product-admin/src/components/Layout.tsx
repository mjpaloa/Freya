import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Loader from './Loader';
import '../styles/Layout.css';

const Layout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content-wrapper">
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
