import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  X,
  Loader2,
  Mail,
  Calendar,
  Eye,
  User,
  Shield,
} from 'lucide-react';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import api from '../services/api';
import '../styles/Products.css';
import '../styles/ProductForm.css';
import '../styles/Users.css';

interface UserRecord {
  id: string;
  email: string;
  name?: string;
  full_name?: string;
  avatar?: string;
  avatar_url?: string;
  created_at: string;
  role?: string;
}

const normalizeUser = (user: UserRecord): UserRecord => {
  const name = user.full_name || user.name || '';
  const avatar = user.avatar_url || user.avatar || '';

  return {
    ...user,
    name,
    full_name: name,
    avatar,
    avatar_url: avatar,
    role: user.role || 'Admin',
  };
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [viewingUser, setViewingUser] = useState<UserRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    avatar_url: '',
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/users');
      const normalizedUsers = (response.data || []).map((user: UserRecord) => normalizeUser(user));
      setUsers(normalizedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredUsers = users.filter((user) => {
    const fullName = user.full_name || user.name || '';
    const query = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(query) ||
      fullName.toLowerCase().includes(query)
    );
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormError('');
    setFormData({
      full_name: '',
      email: '',
      password: '',
      avatar_url: '',
    });
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormError('');
    setFormData({
      full_name: '',
      email: '',
      password: '',
      avatar_url: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserRecord) => {
    setEditingUser(user);
    setFormError('');
    setFormData({
      full_name: user.full_name || user.name || '',
      email: user.email,
      password: '',
      avatar_url: user.avatar_url || user.avatar || '',
    });
    setIsModalOpen(true);
  };

  const handleViewUser = async (id: string) => {
    try {
      const response = await api.get(`/users/${id}`);
      setViewingUser(normalizeUser(response.data));
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await api.delete(`/users/${id}`);
        setUsers((prev) => prev.filter((user) => user.id !== id));
        if (viewingUser?.id === id) {
          setViewingUser(null);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const name = formData.full_name.trim();
    const email = formData.email.trim();
    const avatarUrl = formData.avatar_url.trim();
    const password = formData.password.trim();

    if (!name || !email) {
      setFormError('Full name and email are required.');
      return;
    }

    if (!editingUser && !password) {
      setFormError('Password is required when creating a new user.');
      return;
    }

    const payload: Record<string, string> = {
      full_name: name,
      email,
      avatar_url: avatarUrl,
    };

    if (password) {
      payload.password = password;
    }

    setIsSaving(true);
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, payload);
      } else {
        await api.post('/users', payload);
      }
      closeModal();
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      setFormError('Unable to save user. Please check the fields and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="users-page animate-fade-in">
        <header className="page-header">
          <div>
            <h1>User Management</h1>
            <p>View and manage all registered administrative users.</p>
          </div>
          <button className="btn-primary" onClick={openCreateModal}>
            <Plus size={20} />
            <span>Add User</span>
          </button>
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
              <Loader />
            </div>
          ) : (
            <>
              <div className="list-header-row user-list-header">
                <div className="col-photo">User</div>
                <div className="col-name">Full Name</div>
                <div className="col-type">Email Address</div>
                <div className="col-info">Joined Date</div>
                <div className="col-date">Role</div>
                <div className="col-actions">Actions</div>
              </div>
              <div className="products-list">
                {paginatedUsers.map((user, index) => {
                  const fullName = user.full_name || user.name || user.email;

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={user.id}
                      className="product-item-card glass-panel"
                    >
                      <div className="col-photo">
                        <div className="product-img-circle user-avatar-circle">
                          {user.avatar_url || user.avatar ? (
                            <img src={user.avatar_url || user.avatar} alt={fullName} />
                          ) : (
                            <div className="avatar-placeholder">
                              {fullName.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-name">
                        <span className="product-name-text">{fullName}</span>
                        <span className="product-id-tag">ID: {user.id.slice(0, 8)}</span>
                      </div>
                      <div className="col-type">
                        <div className="email-link">
                          <Mail size={14} />
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
                        <div className="action-row">
                          <button
                            className="action-btn view"
                            title="View User"
                            onClick={() => handleViewUser(user.id)}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="action-btn edit"
                            title="Edit User"
                            onClick={() => openEditModal(user)}
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            className="action-btn delete"
                            title="Delete User"
                            onClick={() => handleDelete(user.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-panel user-form-modal"
            >
              <div className="pf-modal-header">
                <div className="pf-modal-header-text">
                  <span className="pf-modal-badge">User Management</span>
                  <h3>{editingUser ? 'Edit User' : 'Create New User'}</h3>
                </div>
                <button className="pf-close-btn" onClick={closeModal}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="user-form">
                {formError && <div className="error-alert">{formError}</div>}

                <div className="user-form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="admin@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>{editingUser ? 'New Password' : 'Password'}</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={editingUser ? 'Leave blank to keep current password' : 'Create a password'}
                      required={!editingUser}
                    />
                    {editingUser && (
                      <p className="user-form-note">
                        Leave this blank if you do not want to change the password.
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Avatar URL</label>
                    <input
                      type="text"
                      value={formData.avatar_url}
                      onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>

                <div className="user-form-actions">
                  <button type="button" className="btn-outline" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" disabled={isSaving}>
                    {isSaving ? <Loader2 size={18} className="spinner" /> : editingUser ? 'Update User' : 'Create User'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewingUser && (
          <div className="modal-overlay" onClick={() => setViewingUser(null)}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="detail-modal glass-panel user-detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="user-detail-hero">
                <button className="detail-close" onClick={() => setViewingUser(null)}>
                  <X size={24} />
                </button>
                <div className="user-detail-avatar">
                  {viewingUser.avatar_url || viewingUser.avatar ? (
                    <img src={viewingUser.avatar_url || viewingUser.avatar} alt={viewingUser.full_name || viewingUser.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {(viewingUser.full_name || viewingUser.name || viewingUser.email).charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="user-detail-copy">
                  <span className="badge">
                    <Shield size={14} />
                    Administrator
                  </span>
                  <h2>{viewingUser.full_name || viewingUser.name}</h2>
                  <p>{viewingUser.email}</p>
                </div>
              </div>

              <div className="detail-content">
                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="item-icon">
                      <User size={18} />
                    </div>
                    <div className="item-info">
                      <label>Full Name</label>
                      <span>{viewingUser.full_name || viewingUser.name || 'Unnamed user'}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="item-icon">
                      <Mail size={18} />
                    </div>
                    <div className="item-info">
                      <label>Email Address</label>
                      <span>{viewingUser.email}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="item-icon">
                      <Calendar size={18} />
                    </div>
                    <div className="item-info">
                      <label>Joined Date</label>
                      <span>{new Date(viewingUser.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="item-icon">
                      <Shield size={18} />
                    </div>
                    <div className="item-info">
                      <label>Role</label>
                      <span>{viewingUser.role || 'Admin'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Users;
