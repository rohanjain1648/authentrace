import React from 'react';
import { Link } from 'react-router-dom';

export function PublicFooter() {
  return (
    <footer className="footer-section">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo" style={{ marginBottom: '16px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4299e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#ed8936" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#9f7aea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="logo-text">Veritas AI</span>
          </div>
          <p className="footer-description">
            Transforming academic integrity from a punitive measure into a pedagogical conversation. Built for modern universities.
          </p>
          {/* Socials Removed per User Request */}
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>Platform</h4>
            <Link to="/evidence-engine">Evidence Engine</Link>
            <Link to="/dashboard/professor">Professor Dashboard</Link>
            <Link to="/dashboard/student">Student Portal</Link>
            <Link to="/admin">Admin Analytics</Link>
            <Link to="/integrations">Integrations</Link>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <Link to="/documentation">Documentation</Link>
            <Link to="/api">API Reference</Link>
            <Link to="/pedagogical-guides">Pedagogical Guides</Link>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/security">Security</Link>
            <Link to="/partners">Partners</Link>
          </div>
        </div>
        
        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Get the latest on AI policies in Higher Ed.</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter your email" />
            <button className="btn-dark" style={{ padding: '8px 16px', borderRadius: '4px' }}>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} Veritas AI. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/cookies">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
