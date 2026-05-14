import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/Login.css';
import logoImg from '../assets/logo/logo.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err: any) {
      const errorData = err.response?.data?.error;
      const errorMessage = typeof errorData === 'object' ? errorData.message : (errorData || 'Failed to login. Please check your credentials.');
      setError(errorMessage);
    } finally {

      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="glow-1"></div>
        <div className="glow-2"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="login-card glass-panel"
      >
        <div className="login-logo-container">
          <img src={logoImg} alt="Freya Logo" className="logo-img" />
        </div>

        <div className="login-header text-left">
          <h1>Login</h1>
          <p>Please Sign in to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="error-message"
            >
              {error}
            </motion.div>
          )}

          <div className="input-container">
            <span className="input-legend">E-mail</span>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon text-primary" />
              <input
                type="email"
                placeholder="Ex. admin@freya.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-container">
            <span className="input-legend">Password</span>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon text-primary" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-action"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="forgot-password">
            <Link to="#">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="spinner" />
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
