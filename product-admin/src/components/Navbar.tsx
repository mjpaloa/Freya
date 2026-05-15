import React, { useState, useEffect } from 'react';
import { Menu, Bell, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Navbar.css';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/inquiries');
        const pendingCount = response.data.filter((iq: any) => iq.status === 'pending').length;
        setNotificationCount(pendingCount);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      }
    };

    fetchNotifications();
    // Refresh every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <header className="navbar glass-panel">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
      </div>
      
      <div className="navbar-right">
        <button className="nav-btn" onClick={() => navigate('/inquiries')}>
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="notification-dot">{notificationCount}</span>
          )}
        </button>
        <div className="nav-divider"></div>
        <div className="nav-profile" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
          <div className="nav-avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="avatar-img" />
            ) : (
              <UserCircle size={20} />
            )}
          </div>
          <div className="nav-profile-info">
            <span className="nav-role">Admin</span>
            <span className="nav-name">{user?.name || 'User'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
