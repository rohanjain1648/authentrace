import React from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, Activity } from 'lucide-react';

export function TermsPage() {
  return (
    <PublicLayout>
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--bg-tertiary)', borderRadius: '20px', border: '1px solid var(--color-glass-border)', color: 'var(--accent-purple)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
            <FileText size={16} /> Legal Agreement
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 700, marginBottom: '16px', background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Effective Date: July 8, 2026</p>
        </motion.div>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(0, 212, 255, 0.1)', color: 'var(--color-cyan)', borderRadius: '12px' }}><Shield size={24} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>1. Acceptance & Acceptable Use</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              By using the Authentraceio AI platform, its API endpoints, or its LMS LTI integrations, you agree to comply with these Terms of Service. If you represent an educational institution, you warrant that you are authorized to agree to these terms on behalf of the university.
            </p>
            <div style={{ background: 'var(--bg-tertiary)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px' }}>Prohibited Actions</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '24px', color: 'var(--text-secondary)' }}>
                <li>Bypass or attempt to bypass the authentication mechanisms, SSO layers, or LTI tokens.</li>
                <li>Submit malicious files, scripts, or automated crawling traffic designed to disrupt or degrade service performance.</li>
                <li>Attempt to extract or reverse engineer the stylometric weights, vectors, or training methodologies used in our Evidence Engine.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(237, 137, 54, 0.1)', color: 'var(--accent-orange)', borderRadius: '12px' }}><AlertTriangle size={24} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>2. Interpretation of Flags</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              Authentraceio AI operates as an assistant to educator judgment. A "Confidence Score" or "Stylometric Shift" flag is a probabilistic indicator, not a definitive verdict of misconduct. 
            </p>
            <div style={{ background: 'rgba(200, 255, 0, 0.05)', borderLeft: '4px solid var(--accent)', padding: '20px', borderRadius: '0 8px 8px 0' }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Educational Autonomy</strong>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>The university, its instructors, and academic integrity officers retain full autonomy and final authority in all grading, revision requests, or disciplinary actions. Authentraceio AI holds no liability for institutional decisions resulting from data flags.</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(56, 161, 105, 0.1)', color: '#38a169', borderRadius: '12px' }}><Activity size={24} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>3. System Uptime & SLA</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              We aim to maintain 99.9% availability of all LTI launch endpoints. Scheduled updates and maintenance will be announced to system administrators via the Admin Portal at least 72 hours in advance.
            </p>
            <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '8px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              For inquiries regarding enterprise license limits, reach out to <strong style={{ color: 'var(--text-primary)' }}>licensing@authentraceio-ai.edu</strong>.
            </div>
          </motion.div>

        </div>
      </div>
    </PublicLayout>
  );
}
