import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Trash2, 
  Mail,
  Calendar,
  Shield,
  Loader2
} from 'lucide-react';
import api from '../services/api';
import '../styles/Products.css';

interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  role?: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await api.delete(`/users/${id}`);
        setUsers(users.filter(u => u.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="users-page animate-fade-in">
      <header className="page-header">
        <div>
          <h1>User Management</h1>
          <p>View and manage all registered administrative users.</p>
        </div>
      </header>

      <div className="table-controls">
        <div className="search-box glass-panel">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="modern-list-container">
        {isLoading ? (
          <div className="glass-panel loading-container">
            <Loader2 className="spinner" size={40} />
            <p>Loading user directory...</p>
          </div>
        ) : (
          <>
            <div className="list-header-row">
              <div className="col-photo">User</div>
              <div className="col-name">Full Name</div>
              <div className="col-type">Email Address</div>
              <div className="col-info">Joined Date</div>
              <div className="col-date">Role</div>
              <div className="col-actions">Actions</div>
            </div>
            <div className="products-list">
              {filteredUsers.map((user, index) => (
                <div key={user.id} className="product-item-card glass-panel">
                  <div className="col-photo">
                    <div className="product-img-circle">
                      {user.avatar_url ? (
                        <img src={user.avatar_url} alt={user.full_name} />
                      ) : (
                        <div className="avatar-placeholder">{user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-name">
                    <span className="product-name-text">{user.full_name || 'No Name'}</span>
                    <span className="product-id-tag">ID: {user.id.slice(0, 8)}</span>
                  </div>
                  <div className="col-type">
                    <div className="email-link" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <Mail size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <div className="col-info">
                    <div className="date-badge">
                      <Calendar size={14} />
                      <span>{new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="col-date">
                    <span className="category-pill">{user.role || 'Admin'}</span>
                  </div>
                  <div className="col-actions">
                    <button className="action-btn delete" title="Remove User" onClick={() => handleDelete(user.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default Users;
