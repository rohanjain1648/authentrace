import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, FileText, Settings, ShieldAlert, LogOut, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import './Dashboard.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: 'professor' | 'student' | 'admin';
}

export function DashboardLayout({ children, role = 'professor' }: DashboardLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavLinks = () => {
    switch(role) {
      case 'student':
        return [
          { name: 'My Submissions', path: '/dashboard/student', icon: <FileText size={18} /> },
          { name: 'AI Disclosures', path: '/dashboard/student/disclosures', icon: <ShieldAlert size={18} /> },
        ];
      case 'admin':
        return [
          { name: 'Overview', path: '/admin', icon: <Home size={18} /> },
          { name: 'Integrity Cases', path: '/admin/cases', icon: <ShieldAlert size={18} /> },
          { name: 'Faculty', path: '/admin/faculty', icon: <Users size={18} /> },
        ];
      default: // professor
        return [
          { name: 'Dashboard', path: '/dashboard/professor', icon: <Home size={18} /> },
          { name: 'Submissions', path: '/dashboard/professor/submissions', icon: <FileText size={18} /> },
          { name: 'Students', path: '/dashboard/professor/students', icon: <Users size={18} /> },
          { name: 'Flagged Content', path: '/dashboard/professor/flags', icon: <ShieldAlert size={18} /> },
        ];
    }
  };

  return (
    <div className="dash-app-wrapper">
      <div className="aurora-bg" style={{ opacity: 0.6 }}></div>
      <div className="grid-overlay"></div>
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="dash-mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      <div className={`dash-sidebar glass-panel ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="dash-sidebar-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="var(--accent-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="logo-text" style={{fontSize: '1rem', marginLeft: '8px'}}>Authentraceio AI</span>
          <button className="dash-mobile-close" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="dash-nav">
          {getNavLinks().map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`dash-nav-item ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="dash-sidebar-footer">
          <button className="dash-nav-item" style={{background: 'transparent', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left'}} onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
          <Link to="/" className="dash-nav-item">
            <LogOut size={18} /> Exit Portal
          </Link>
        </div>
      </div>
      
      <div className="dash-main-area">
        <header className="dash-topbar glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="dash-mobile-toggle" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="dash-search">
              <input type="text" placeholder="Search students, submissions..." />
            </div>
          </div>
          <div className="dash-user">
            <span className="dash-role-badge">{role.toUpperCase()}</span>
            <div className="dash-avatar"></div>
          </div>
        </header>
        <main className="dash-content-area">
          {children}
        </main>
      </div>
    </div>
  );
}
