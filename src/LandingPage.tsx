import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Fingerprint, History } from 'lucide-react';
import './LandingPage.css';
import { Hero3D } from './components/Hero3D';
import { PublicNavbar } from './components/PublicNavbar';
import { PublicFooter } from './components/PublicFooter';

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
      <PublicNavbar />

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
      <PublicFooter />
    </div>
  );
}
