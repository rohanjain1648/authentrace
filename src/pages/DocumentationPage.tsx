import React from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { motion } from 'framer-motion';
import { BookOpen, Settings, Users, GraduationCap, ArrowRight, ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';

export function DocumentationPage() {
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--bg-tertiary)', borderRadius: '20px', border: '1px solid var(--color-glass-border)', color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
            <BookOpen size={16} /> Hub
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '24px', background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>
            Documentation & Training Hub
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Step-by-step technical guides, user manuals, and policy playbooks for administrators, faculty, and students.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bento-grid" style={{ marginBottom: '80px' }}>
          
          {/* Admin Playbook */}
          <motion.div variants={itemVariants} className="glass-card" style={{ gridColumn: 'span 1', md: { gridColumn: 'span 2' }, padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ padding: '16px', background: 'rgba(66, 153, 225, 0.1)', color: 'var(--accent-blue)', borderRadius: '16px' }}><Settings size={32} /></div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Administrator Implementation Playbook</h2>
            </div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
              Deploying Authentraceio AI at scale requires coordination across IT Services, Academic Integrity Offices, and Faculty Development Centers. 
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {[
                { title: 'Tenant Provisioning', desc: 'Initial database setup and regional residency confirmation (e.g., verifying Canada-Central hosting to comply with local FOIP regulations).' },
                { title: 'SSO Integration', desc: 'Configuring SAML 2.0 Identity Provider (IdP) metadata, mapping attributes for dynamic account generation, and establishing security groups.' },
                { title: 'LTI Advantage Setup', desc: 'Registering the Authentraceio AI LTI tool in Canvas, Blackboard, or Brightspace using client IDs and deployment IDs.' },
                { title: 'Global Policy Tuning', desc: 'Establishing institutional baselines for Confidence Score thresholds, citation check domains, and defining automated student notification triggers.' }
              ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', background: 'var(--bg-primary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--accent-blue)', flexShrink: 0 }}>{idx + 1}</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>{step.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Student Manual */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', background: 'rgba(56, 161, 105, 0.1)', color: '#38a169', borderRadius: '16px', width: 'fit-content', marginBottom: '24px' }}><GraduationCap size={32} /></div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>Student User Manual</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              The Transparent Submission Process interactive guide for students.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: 0, padding: 0, listStyle: 'none', flex: 1 }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={16} color="#38a169" style={{ marginTop: '4px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>View current writing DNA baseline statistics (lexical density, sentence length).</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={16} color="#38a169" style={{ marginTop: '4px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Complete the Transparent AI Disclosure form with detailed prompt workflows.</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={16} color="#38a169" style={{ marginTop: '4px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Review citations in real-time to identify hallucinations before submission.</span>
              </li>
            </ul>
            <button style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '12px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
              Download PDF <ArrowRight size={16} />
            </button>
          </motion.div>

        </motion.div>

        {/* Faculty Reference Guide */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: 'clamp(24px, 5vw, 64px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ padding: '16px', background: 'rgba(124, 92, 252, 0.1)', color: 'var(--accent-purple)', borderRadius: '16px' }}><Users size={32} /></div>
            <h2 style={{ fontSize: '2rem', fontWeight: 600 }}>Faculty Reference Guide</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', md: {flexDirection: 'row'}, gap: '48px' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '24px' }}>Interpreting the Triage Queue</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #e53e3e' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    <ShieldAlert size={16} color="#e53e3e" /> High Triage (Urgent)
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>Submissions with multiple unverifiable citations or extreme stylometric deviations. Require immediate educator review.</p>
                </div>
                <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid var(--accent-orange)' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    <HelpCircle size={16} color="var(--accent-orange)" /> Medium Triage (Indicative)
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>Significant stylometric shift detected, or minor unverified citations. Recommended for a 5-minute check-in.</p>
                </div>
                <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #38a169' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    <CheckCircle size={16} color="#38a169" /> Low Triage (Normal)
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>High stylometric baseline matching. Fully verified references. No further action needed.</p>
                </div>
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ background: 'linear-gradient(145deg, var(--bg-tertiary), rgba(124, 92, 252, 0.05))', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', height: '100%' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '16px' }}>Understanding Stylometric Visualization</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                  Authentraceio AI displays writing patterns as interactive multi-dimensional scatterplots (mapped via t-SNE or UMAP dimensional reduction). 
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Educators can visually inspect a flagged submission's data point and see its distance from the student's historical centroid. This enables transparent evidence-based conversations rather than arbitrary accusations.
                </p>
                <button style={{ marginTop: '32px', background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                  Launch Interactive Demo
                </button>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </PublicLayout>
  );
}
