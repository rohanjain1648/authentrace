import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Fingerprint, History } from 'lucide-react';
import './LandingPage.css';
import { Hero3D } from './components/Hero3D';
import { useTheme } from './components/ThemeProvider';

export function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="landing-wrapper">
      <div className="aurora-bg"></div>
      <div className="grid-overlay"></div>
      
      {/* 3D Hero Background */}
      <div className="hero-3d-container">
        <Hero3D />
      </div>

      {/* Navigation */}
      <nav className="container">
        <motion.div 
          className="nav-pill glass-panel"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4299e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#ed8936" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#9f7aea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="logo-text">Veritas AI</span>
          </div>
          <div className="nav-links">
            <a href="#features">FEATURES</a>
            <a href="#evidence">EVIDENCE ENGINE</a>
            <a href="#institutions">INSTITUTIONS</a>
          </div>
          <div className="nav-actions">
            <button className="btn-icon" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="btn-signin">Sign in</button>
            <Link to="/dashboard/professor">
              <button className="btn-dashboard">View Dashboard</button>
            </Link>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="container hero"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div className="hero-ornament" variants={fadeUp}>
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
            <path d="M30 10C25 10 20 0 10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C20 20 25 10 30 10ZM30 10C35 10 40 0 50 0C55.5 0 60 4.5 60 10C60 15.5 55.5 20 50 20C40 20 35 10 30 10Z" fill="#a0aec0" opacity="0.5"/>
          </svg>
        </motion.div>
        <motion.p className="hero-eyebrow" variants={fadeUp}>Academic Trust Platform</motion.p>
        <motion.h1 className="hero-title" variants={fadeUp}>
          Veritas AI for Higher Education
        </motion.h1>
        <motion.p className="hero-subtitle" variants={fadeUp}>
          Built on pedagogical collaboration. Powered by explainable evidence.<br/>
          Delivering transparent academic integrity.
        </motion.p>
        <motion.div className="hero-actions" variants={fadeUp}>
          <button className="btn-dark">Sign up</button>
          <button className="btn-white">Contact Us</button>
        </motion.div>
        
        {/* Trusted By (Logos) */}
        <motion.div className="trusted-by" variants={fadeUp}>
          <p>UNIVERSITIES BUILD WITH VERITAS</p>
          <div className="trusted-logos">
            <div className="logo-placeholder">UCalgary</div>
            <div className="logo-placeholder">Alberta</div>
            <div className="logo-placeholder">MRU</div>
            <div className="logo-placeholder">Lethbridge</div>
          </div>
        </motion.div>
      </motion.section>

      {/* Dashboard Section */}
      <motion.section 
        className="container dashboard-section" 
        id="evidence"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="dashboard-header-text" variants={fadeUp}>
          <h2>AI Evidence Dashboard</h2>
          <p>Explore how explainable evidence aids in pedagogical correction over punitive action.</p>
        </motion.div>

        <motion.div className="dashboard-shell" variants={fadeUp}>
          {/* Dashboard Tabs */}
          <div className="dash-tabs">
            <div className="dash-tab active">
              <Fingerprint size={16} className="tab-icon-svg" /> Writing DNA
            </div>
            <div className="dash-tab">
              <Search size={16} className="tab-icon-svg" /> AI Categorization
            </div>
            <div className="dash-tab">
              <BookOpen size={16} className="tab-icon-svg" /> Citation Verify
            </div>
            <div className="dash-tab">
              <History size={16} className="tab-icon-svg" /> Evolution History
            </div>
          </div>

          <div className="dash-content">
            {/* Left Panel */}
            <div className="dash-left">
              <h3>
                Veritas AI uses advanced stylometrics to automatically establish a student's unique baseline. A simple submission is analyzed against their writing DNA, tagged for stylistic shifts, assigned a Confidence Score, and routed to the professor with full explainability.
              </h3>
              
              <div className="dash-controls">
                <div className="score-block">
                  <span className="score-label">Confidence Score: 94%</span>
                  <span className="route-label">Flag: Stylometric Shift</span>
                </div>
                <div className="action-block">
                  <select className="auto-assign">
                    <option>Generate Oral Defense</option>
                    <option>Request Revision</option>
                  </select>
                  <button className="btn-send">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="dash-right">
              <div className="recent-header">
                <h4>Recent Analysis Flags</h4>
                <a href="#" className="view-all">View all</a>
              </div>
              
              <div className="flag-list">
                <motion.div className="flag-card" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                  <div className="flag-icon bg-blue"><Search size={20}/></div>
                  <div className="flag-details">
                    <div className="flag-title-row">
                      <h5>Stylometric Shift</h5>
                      <span className="badge badge-medium">MEDIUM</span>
                    </div>
                    <p>Chapter 3 • Thesis Submission</p>
                  </div>
                </motion.div>

                <motion.div className="flag-card" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                  <div className="flag-icon bg-red"><BookOpen size={20}/></div>
                  <div className="flag-details">
                    <div className="flag-title-row">
                      <h5>Citation Hallucination</h5>
                      <span className="badge badge-high">HIGH</span>
                    </div>
                    <p>Reference 12 • Final Essay</p>
                  </div>
                </motion.div>

                <motion.div className="flag-card" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                  <div className="flag-icon bg-green"><Fingerprint size={20}/></div>
                  <div className="flag-details">
                    <div className="flag-title-row">
                      <h5>Co-Creation Approved</h5>
                      <span className="badge badge-low">LOW</span>
                    </div>
                    <p>Draft 1 • Cited properly</p>
                  </div>
                </motion.div>
              </div>

              <div className="dash-footer-link">
                <span>Want to integrate this via API?</span>
                <a href="#">Get API Keys</a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Production Ready Footer */}
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
            <div className="footer-socials">
              <a href="#" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Platform</h4>
              <a href="#">Evidence Engine</a>
              <a href="#">Professor Dashboard</a>
              <a href="#">Student Portal</a>
              <a href="#">Admin Analytics</a>
              <a href="#">Integrations</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">API Reference</a>
              <a href="#">Pedagogical Guides</a>
              <a href="#">Case Studies</a>
              <a href="#">Blog</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Security</a>
              <a href="#">Contact</a>
              <a href="#">Partners</a>
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
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
