import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  UserCircle,
  LogOut,
  ChevronRight,
  Newspaper
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';
import logoImg from '../assets/logo/logo.png';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { logout } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/news', icon: Newspaper, label: 'News Feed' },
    { path: '/users', icon: Users, label: 'User Management' },
    { path: '/profile', icon: UserCircle, label: 'My Profile' },
  ];

  return (
    <aside className={`sidebar glass-panel ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <img src={logoImg} alt="Logo" className="sidebar-logo-img" />
        </div>
      </div>


      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
            <ChevronRight className="chevron" size={16} />
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-link logout" onClick={logout}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
