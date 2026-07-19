import React from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Globe, Server, UserCheck, Key, RefreshCcw } from 'lucide-react';

export function SecurityPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <PublicLayout>
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--bg-tertiary)', borderRadius: '20px', border: '1px solid var(--color-glass-border)', color: '#38a169', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
            <ShieldCheck size={16} /> Enterprise Grade
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '24px', background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>
            Security, Privacy & Data Governance
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Ensuring enterprise-grade security, student privacy preservation, and strict compliance with global educational laws.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bento-grid" style={{ marginBottom: '80px' }}>
          
          {/* Privacy vs Detectors */}
          <motion.div variants={itemVariants} className="glass-card" style={{ gridColumn: 'span 1', md: { gridColumn: 'span 2' }, padding: '40px', background: 'linear-gradient(145deg, var(--bg-primary), rgba(229, 62, 62, 0.02))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '16px', background: 'rgba(229, 62, 62, 0.1)', color: '#e53e3e', borderRadius: '16px' }}><Lock size={32} /></div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>The Privacy Risk of Third-Party Detectors</h2>
            </div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>
              Many consumer-facing AI detectors require students or faculty to paste full text submissions into unverified web forms. Relying on unregulated third-party detection tools can lead to severe breaches of student privacy. These tools often retain student intellectual property in external databases, using it to train their proprietary models without consent.
            </p>
            <div style={{ padding: '20px', background: 'var(--bg-tertiary)', borderRadius: '12px', borderLeft: '4px solid #38a169' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Privacy by Design:</strong> Authentraceio AI provides institutions with absolute control over their data, ensuring that student work never becomes training fodder for third-party commercial applications.
            </div>
          </motion.div>

          {/* Compliance */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ padding: '16px', background: 'rgba(56, 161, 105, 0.1)', color: '#38a169', borderRadius: '16px', width: 'fit-content', marginBottom: '24px' }}><UserCheck size={32} /></div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>FERPA & FOIP Compliant</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>We operate as a "School Official" under FERPA, ensuring PII is only used for authorized institutional purposes. In Canada, we adhere strictly to FOIP and PIPA.</p>
          </motion.div>

          {/* Data Sovereignty */}
          <motion.div variants={itemVariants} className="glass-card" style={{ gridColumn: 'span 1', md: { gridColumn: 'span 2' }, padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '16px', background: 'rgba(66, 153, 225, 0.1)', color: 'var(--accent-blue)', borderRadius: '16px' }}><Globe size={32} /></div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Data Sovereignty & Localized Hosting</h2>
            </div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
              Transferring student data across international borders is highly restricted. Authentraceio AI supports complete <strong>Data Sovereignty</strong>. University IT administrators can choose their specific hosting region:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--accent-blue)' }}>Canada-Central</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Ensuring all data remains on Canadian soil.</p>
              </div>
              <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--accent-purple)' }}>EU-West (Frankfurt)</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Fully compliant with GDPR and Schrems II.</p>
              </div>
              <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--accent-orange)' }}>US-East (N. Virginia)</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Meeting SOC 2 Type II and FedRAMP Moderate controls.</p>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Technical Controls Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: 'clamp(24px, 5vw, 64px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ padding: '16px', background: 'rgba(237, 137, 54, 0.1)', color: 'var(--accent-orange)', borderRadius: '16px' }}><Server size={32} /></div>
            <h2 style={{ fontSize: '2rem', fontWeight: 600 }}>Technical Security Controls</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <RefreshCcw size={32} color="var(--accent-blue)" />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Encryption in Transit</h4>
                <p style={{ color: 'var(--text-secondary)' }}>TLS 1.3 with Perfect Forward Secrecy (PFS), enforcing HSTS.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <Lock size={32} color="#38a169" />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Encryption at Rest</h4>
                <p style={{ color: 'var(--text-secondary)' }}>AES-256 at the storage layer with customer-managed keys (CMK) via AWS KMS.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <Key size={32} color="var(--accent-purple)" />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Access Control</h4>
                <p style={{ color: 'var(--text-secondary)' }}>Role-Based Access Control (RBAC) integrated with Shibboleth or Azure AD SSO.</p>
              </div>
            </div>
          </div>

          <div style={{ padding: '32px', background: 'var(--bg-tertiary)', borderRadius: '16px', border: '1px solid rgba(229, 62, 62, 0.2)' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '16px', color: '#e53e3e' }}>Cryptographic Data Shredding</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Once a student graduates or requests account deletion (subject to institutional policy), their historical stylometric baseline vectors and original submission text are processed via cryptographic shredding. The encryption keys associated with their data partition are deleted, rendering the underlying records completely unrecoverable, fulfilling GDPR's "Right to Erasure" requirements.
            </p>
          </div>
        </motion.div>

      </div>
    </PublicLayout>
  );
}
