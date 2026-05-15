import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  Users,
  Calendar,
  PlusCircle,
  ArrowUpRight,
  ArrowDownRight,
  Newspaper,
  Plus,
  Mail
} from 'lucide-react';

import api from '../services/api';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalNews: 0,
    addedThisMonth: 0,
    growth: 12.5
  });
  const [recentNews, setRecentNews] = useState<any[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, usersRes, newsRes, inquiriesRes] = await Promise.all([
          api.get('/products'),
          api.get('/users'),
          api.get('/news'),
          api.get('/inquiries')
        ]);

        const products = productsRes.data;
        const users = usersRes.data;
        const news = newsRes.data;
        const inquiries = inquiriesRes.data;

        // Calculate products added this month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const thisMonthProducts = products.filter((p: any) => new Date(p.created_at) >= startOfMonth);

        setStats({
          totalProducts: products.length,
          totalUsers: users.length,
          totalNews: news.length,
          addedThisMonth: thisMonthProducts.length,
          growth: 14.2
        });

        setRecentNews(news.slice(0, 3));
        setRecentInquiries(inquiries.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'var(--primary)',
      trend: '+4%',
      isPositive: true
    },
    {
      label: 'News Articles',
      value: stats.totalNews,
      icon: Newspaper,
      color: 'var(--accent)',
      trend: '+2.1%',
      isPositive: true
    },
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'var(--secondary)',
      trend: '+1.5%',
      isPositive: true
    },
    {
      label: 'Added This Month',
      value: stats.addedThisMonth,
      icon: Calendar,
      color: 'var(--success)',
      trend: '+12%',
      isPositive: true
    },
  ];

  return (
    <div className="dashboard-page animate-fade-in">
      <header className="page-header">
        <div>
          <h1>Welcome Back, Freya</h1>
          <p>Here's what's happening with your store ngayon.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/news')}>
          <PlusCircle size={20} />
          <span>New Article</span>
        </button>
      </header>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card stat-card"
          >
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value">{isLoading ? '...' : stat.value}</h3>
              <div className={`stat-trend ${stat.isPositive ? 'positive' : 'negative'}`}>
                {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span>{stat.trend} from last month</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="glass-card main-chart-card">
          <div className="card-header">
            <h3>Recent News Feed</h3>
            <button className="text-btn" onClick={() => navigate('/news')}>View All</button>
          </div>
          <div className="recent-list">
            {isLoading ? (
              <p>Loading...</p>
            ) : recentNews.length > 0 ? (
              recentNews.map((news) => (
                <div key={news.id} className="recent-item">
                  <div className="item-icon-small">
                    <Newspaper size={18} />
                  </div>
                  <div className="item-details">
                    <h4>{news.title}</h4>
                    <span>{new Date(news.published_date).toLocaleDateString()} • {news.category}</span>
                  </div>
                  <button className="icon-btn" onClick={() => navigate('/news')}><Plus size={16} /></button>
                </div>
              ))
            ) : (
              <p className="empty-state">No news articles yet.</p>
            )}
          </div>
        </div>

        <div className="glass-card recent-activity">
          <div className="card-header">
            <h3>Recent Customer Inquiries</h3>
            <button className="text-btn" onClick={() => navigate('/inquiries')}>View All</button>
          </div>
          <div className="recent-list">
            {isLoading ? (
              <p>Loading...</p>
            ) : recentInquiries.length > 0 ? (
              recentInquiries.map((iq) => (
                <div key={iq.id} className="recent-item" onClick={() => navigate('/inquiries')} style={{ cursor: 'pointer' }}>
                  <div className={`item-icon-small ${iq.type}`} style={{ backgroundColor: iq.type === 'technical' ? 'var(--accent)20' : iq.type === 'partnership' ? '#f59e0b20' : 'var(--primary)20', color: iq.type === 'technical' ? 'var(--accent)' : iq.type === 'partnership' ? '#f59e0b' : 'var(--primary)' }}>
                    <Mail size={18} />
                  </div>
                  <div className="item-details">
                    <h4>{iq.type === 'sales' ? `${iq.first_name} ${iq.last_name}` : iq.full_name}</h4>
                    <span>{iq.type === 'technical' ? iq.subject : iq.type === 'partnership' ? 'Partnership Request' : iq.product_interest}</span>
                  </div>
                  <div className={`status-dot ${iq.status}`} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: iq.status === 'pending' ? '#ef4444' : '#10b981' }}></div>
                </div>
              ))
            ) : (
              <p className="empty-state">No recent inquiries.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
