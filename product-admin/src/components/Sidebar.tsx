import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  UserCircle,
  LogOut,
  ChevronRight,
  Newspaper,
  MessageSquare,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';
import logoImg from '../assets/logo/logo.png';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isMobile, onClose }) => {
  const { logout } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/news', icon: Newspaper, label: 'News Feed' },
    { path: '/inquiries', icon: MessageSquare, label: 'Inquiries' },
    { path: '/users', icon: Users, label: 'User Management' },
    { path: '/profile', icon: UserCircle, label: 'My Profile' },
  ];

  return (
    <aside
      className={`sidebar glass-panel ${!isOpen ? 'collapsed' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <img src={logoImg} alt="Logo" className="sidebar-logo-img" />
        </div>
        {onClose && (
          <button className="mobile-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        )}
      </div>


      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => {
              if (isMobile) {
                onClose?.();
              }
            }}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
            <ChevronRight className="chevron" size={16} />
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className="nav-link logout"
          onClick={() => {
            if (isMobile) {
              onClose?.();
            }
            logout();
          }}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
