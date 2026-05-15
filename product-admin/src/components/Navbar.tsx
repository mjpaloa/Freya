import { Menu, Search, Bell, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  
  return (
    <header className="navbar glass-panel">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="navbar-search">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      
      <div className="navbar-right">
        <button className="nav-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <div className="nav-divider"></div>
        <div className="nav-profile">
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
