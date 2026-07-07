import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

export function PublicNavbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="container" style={{ paddingTop: 'var(--space-4)', position: 'relative', zIndex: 10 }}>
      <motion.div 
        className="nav-pill glass-panel"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4299e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#ed8936" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#9f7aea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="logo-text">Veritas AI</span>
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/evidence-engine">EVIDENCE ENGINE</Link>
          <Link to="/integrations">INTEGRATIONS</Link>
          <Link to="/case-studies">INSTITUTIONS</Link>
        </div>
        <div className="nav-actions">
          <button className="btn-icon" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link to="/contact">
            <button className="btn-signin">Sign in</button>
          </Link>
          <Link to="/dashboard/professor">
            <button className="btn-dashboard">View Dashboard</button>
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}
