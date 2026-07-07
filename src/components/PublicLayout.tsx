import React, { useEffect } from 'react';
import { PublicNavbar } from './PublicNavbar';
import { PublicFooter } from './PublicFooter';
import { useLocation } from 'react-router-dom';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="landing-wrapper">
      <div className="aurora-bg"></div>
      <div className="grid-overlay"></div>
      
      <PublicNavbar />
      
      <main style={{ minHeight: '60vh', position: 'relative', zIndex: 1, paddingBottom: '80px' }}>
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}
