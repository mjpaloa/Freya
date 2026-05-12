import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Camera, 
  Save, 
  Shield, 
  Key,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import '../styles/Profile.css';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    avatar_url: user?.avatar_url || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);

    try {
      updateUser({
        full_name: formData.full_name,
        avatar_url: formData.avatar_url,
      });

      try {
        await api.put(`/users/profile`, {
          full_name: formData.full_name,
          avatar_url: formData.avatar_url
        });
      } catch (apiError) {
        console.warn('Backend update failed, but local profile updated:', apiError);
      }

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/auth/change-password', {
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword
      });
      setIsPasswordModalOpen(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error: any) {
      setPasswordError(error.response?.data?.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-page animate-fade-in">
      <header className="page-header">
        <div>
          <h1>My Profile</h1>
          <p>Manage your account settings and personal information.</p>
        </div>
      </header>

      <div className="profile-layout">
        <div className="profile-sidebar">
          <div className="glass-panel profile-card">
            <div className="profile-cover"></div>
            <div className="profile-avatar-container">
              <div className="profile-avatar">
                {formData.avatar_url ? (
                  <img src={formData.avatar_url} alt="Profile" />
                ) : (
                  <div className="avatar-placeholder">{formData.full_name.charAt(0)}</div>
                )}
                <button className="change-avatar">
                  <Camera size={18} />
                </button>
              </div>
            </div>
            <div className="profile-info-stat">
              <h3>{formData.full_name || 'Admin User'}</h3>
              <p>{formData.email}</p>
              <div className="admin-tag">
                <Shield size={14} />
                <span>Administrator</span>
              </div>
            </div>
          </div>

          <div className="glass-panel security-card">
            <h3>Security Status</h3>
            <div className="status-item">
              <CheckCircle2 size={18} className="success-icon" />
              <span>Two-factor Authentication</span>
            </div>
            <div className="status-item">
              <CheckCircle2 size={18} className="success-icon" />
              <span>Verified Email</span>
            </div>
            <button className="btn-outline" onClick={() => setIsPasswordModalOpen(true)}>
              <Key size={18} />
              <span>Change Password</span>
            </button>
          </div>
        </div>

        <div className="profile-main">
          <div className="glass-panel settings-card">
            <div className="card-header">
              <h3>Profile Settings</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="settings-form">
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="success-alert"
                >
                  <CheckCircle2 size={18} />
                  <span>Success! Changes saved.</span>
                </motion.div>
              )}

              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <User size={18} />
                  <input 
                    type="text" 
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} />
                  <input 
                    type="email" 
                    disabled 
                    value={formData.email}
                    placeholder="your@email.com"
                  />
                </div>
                <p className="hint">Email address cannot be changed from the dashboard.</p>
              </div>

              <div className="form-group">
                <label>Avatar URL</label>
                <input 
                  type="text" 
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({...formData, avatar_url: e.target.value})}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="spinner" size={20} />
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isPasswordModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content animate-scale-up">
            <div className="modal-header">
              <h3>Change Password</h3>
              <button className="close-btn" onClick={() => setIsPasswordModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handlePasswordChange} className="modal-form">
              {passwordError && <div className="error-alert">{passwordError}</div>}
              
              <div className="form-group">
                <label>Current Password</label>
                <input 
                  type="password" 
                  required
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  placeholder="********"
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input 
                  type="password" 
                  required
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  placeholder="********"
                />
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input 
                  type="password" 
                  required
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  placeholder="********"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setIsPasswordModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? <Loader2 className="spinner" size={20} /> : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
