import React, { useEffect } from 'react';
import { PublicNavbar } from './PublicNavbar';
import { PublicFooter } from './PublicFooter';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="landing-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="aurora-bg"></div>
      <div className="grid-overlay"></div>
      
      {/* Animated Orbs */}
      <motion.div 
        className="hero-glow hero-glow-1"
        animate={{ y: [0, -50, 0], scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ top: '20%', left: '10%' }}
      />
      <motion.div 
        className="hero-glow hero-glow-2"
        animate={{ y: [0, 50, 0], scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ top: '60%', right: '10%' }}
      />

      <PublicNavbar />
      
      <main style={{ minHeight: '60vh', position: 'relative', zIndex: 1, paddingBottom: '80px', paddingTop: '40px' }}>
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}
