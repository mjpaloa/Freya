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
import '../styles/Users.css';

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

      <div className="glass-panel table-container">
        {isLoading ? (
          <div className="table-loading">
            <Loader2 className="spinner" size={40} />
            <p>Loading user directory...</p>
          </div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Joined Date</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt={user.full_name} />
                        ) : (
                          <div className="avatar-placeholder">{user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}</div>
                        )}
                      </div>
                      <span className="user-name">{user.full_name || 'No Name'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="email-cell">
                      <Mail size={16} className="cell-icon" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <Calendar size={16} className="cell-icon" />
                      <span>{new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>
                    <div className="role-badge">
                      <Shield size={14} />
                      <span>{user.role || 'Admin'}</span>
                    </div>
                  </td>
                  <td>
                    <button className="btn-action delete" onClick={() => handleDelete(user.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
