import React from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { motion } from 'framer-motion';
import { Shield, Database, Lock, ShieldAlert } from 'lucide-react';

export function PrivacyPage() {
  return (
    <PublicLayout>
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--bg-tertiary)', borderRadius: '20px', border: '1px solid var(--color-glass-border)', color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
            <Shield size={16} /> Privacy First
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 700, marginBottom: '16px', background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Last Updated: July 8, 2026</p>
        </motion.div>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(56, 161, 105, 0.1)', color: '#38a169', borderRadius: '12px' }}><Database size={24} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>1. Information We Collect</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>Authentraceio AI collects only the minimal data points necessary to establish stylometric baseline models and perform citation audits:</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '24px', color: 'var(--text-secondary)' }}>
              <li><strong style={{ color: 'var(--text-primary)' }}>Account Information:</strong> Student and faculty names, email addresses, and roles, imported from your university Single Sign-On (SSO) or LMS roster.</li>
              <li><strong style={{ color: 'var(--text-primary)' }}>Academic Submissions:</strong> Text, essays, files, and citation data submitted by students for analysis.</li>
              <li><strong style={{ color: 'var(--text-primary)' }}>System Usage Logs:</strong> IP addresses, browser agents, access times, and session IDs to ensure platform stability and security.</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(124, 92, 252, 0.1)', color: 'var(--accent-purple)', borderRadius: '12px' }}><Lock size={24} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>2. Data Usage and Processing</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>Student submissions are used <strong>only</strong> to calculate individual writing DNA baselines and cross-reference citation validity against academic databases.</p>
            <div style={{ background: 'rgba(237, 137, 54, 0.05)', border: '1px solid rgba(237, 137, 54, 0.2)', borderLeft: '4px solid var(--accent-orange)', padding: '20px', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>No LLM Training Guarantee:</strong>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>Authentraceio AI strictly guarantees that student submissions will never be sold, leased, or used to train, test, or fine-tune commercial or open-source Large Language Models.</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(229, 62, 62, 0.1)', color: '#e53e3e', borderRadius: '12px' }}><ShieldAlert size={24} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>3. Third-Party Integrations & Deletion</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              Authentraceio AI passes textual payloads to external processing APIs (such as Groq and OpenAI) for semantic evaluation. These endpoints are covered under enterprise service contracts that guarantee zero-retention (data is processed ephemerally and deleted instantly post-analysis).
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              All student data is managed under retention schedules set by the university's administrator. Students have the right to request deletion of their stylometric profiles, subject to institutional verification. Upon deletion, data is removed from active stores and securely shredded from database backups within 30 days.
            </p>
            <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '8px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Questions regarding FERPA/FOIP? Contact <strong style={{ color: 'var(--text-primary)' }}>privacy@authentraceio-ai.edu</strong>
            </div>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
