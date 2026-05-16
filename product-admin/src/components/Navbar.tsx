import React, { useState, useEffect } from 'react';
import { Menu, Bell, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Navbar.css';

interface NavbarProps {
  onMenuClick: () => void;
}

interface InquiryNotification {
  id: string;
  status: 'pending' | 'done';
  created_at?: string;
}

const LAST_SEEN_KEY = 'inquiry_notifications_last_seen_at';

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const getLastSeenAt = () => localStorage.getItem(LAST_SEEN_KEY) || '1970-01-01T00:00:00.000Z';

    const fetchNotifications = async () => {
      try {
        const response = await api.get('/inquiries');
        const lastSeenAt = getLastSeenAt();
        const pendingCount = (response.data as InquiryNotification[]).filter((iq) => {
          if (iq.status !== 'pending') return false;
          if (!iq.created_at) return true;
          return new Date(iq.created_at).getTime() > new Date(lastSeenAt).getTime();
        }).length;
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

  const handleNotificationClick = () => {
    localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
    setNotificationCount(0);
    navigate('/inquiries');
  };
  
  return (
    <header className="navbar glass-panel">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
      </div>
      
      <div className="navbar-right">
        <button className="nav-btn" onClick={handleNotificationClick} aria-label="Open inquiries notifications">
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
