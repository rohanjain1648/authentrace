import React from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { motion } from 'framer-motion';
import { Cookie, Server, HardDrive, Settings } from 'lucide-react';

export function CookiesPage() {
  return (
    <PublicLayout>
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--bg-tertiary)', borderRadius: '20px', border: '1px solid var(--color-glass-border)', color: 'var(--accent-orange)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
            <Cookie size={16} /> Data Tracking
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 700, marginBottom: '16px', background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Cookie Policy
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Last Updated: July 8, 2026</p>
        </motion.div>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(56, 161, 105, 0.1)', color: '#38a169', borderRadius: '12px' }}><Server size={24} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>1. Strictly Necessary Session Cookies</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              Authentraceio AI uses secure, HTTP-only cookies to manage authenticated sessions. When you log in via single sign-on (SSO), these cookies maintain your authentication state and protect against Cross-Site Request Forgery (CSRF) attacks. Because these cookies are essential to platform security, they cannot be turned off.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(124, 92, 252, 0.1)', color: 'var(--accent-purple)', borderRadius: '12px' }}><HardDrive size={24} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>2. Application Local Storage</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              We use your browser's local storage (localStorage) to store user interface configurations, such as your preferred sidebar collapse state and theme selection (light or dark mode). This data is kept locally on your machine and is never sent to our servers.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(66, 153, 225, 0.1)', color: 'var(--accent-blue)', borderRadius: '12px' }}><Settings size={24} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>3. Analytics & Diagnostics</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              To ensure platform reliability during heavy grading periods (e.g., midterms and finals), we use anonymous diagnostics cookies to measure page load latency, API call response times, and identify client-side script errors.
            </p>
            <div style={{ background: 'rgba(66, 153, 225, 0.05)', borderLeft: '4px solid var(--accent-blue)', padding: '20px', borderRadius: '0 8px 8px 0', marginBottom: '24px' }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>No Third-Party Ad Trackers</strong>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>Authentraceio AI is built exclusively for education. We never use advertising, marketing, or behavioral tracking cookies to target ads to students or faculty.</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              You can block or delete cookies using your browser settings, but doing so will log you out of the authenticated student or teacher portals. Public website visitors can adjust non-essential cookies via the consent banner.
            </p>
          </motion.div>

        </div>
      </div>
    </PublicLayout>
  );
}
