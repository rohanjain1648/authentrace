import React from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { motion } from 'framer-motion';
import { Code, Terminal, Key, Webhook, Box, ArrowRight } from 'lucide-react';

export function APIReferencePage() {
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
            <Code size={16} /> Developers
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '24px', background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>
            API Reference
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Integrating Authentraceio AI's stylometric analysis and citation verification programmatically into your existing EdTech stack.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bento-grid" style={{ marginBottom: '80px' }}>
          
          {/* Auth */}
          <motion.div variants={itemVariants} className="glass-card" style={{ gridColumn: 'span 1', md: { gridColumn: 'span 2' }, padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '16px', background: 'rgba(124, 92, 252, 0.1)', color: 'var(--accent-purple)', borderRadius: '16px' }}><Key size={32} /></div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Overview & Authentication</h2>
            </div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
              The REST API allows enterprise partners and institutional IT departments to programmatically trigger analyses, retrieve student baseline statistics, sync triage queues, and manage integrations. All requests must be made over HTTPS and are authenticated using a Bearer token.
            </p>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '12px', right: '16px', color: 'var(--text-muted)' }}><Terminal size={20} /></div>
              <pre style={{ background: '#0a0a0a', padding: '24px', borderRadius: '12px', overflowX: 'auto', border: '1px solid #333', fontSize: '0.9rem', color: '#e2e8f0', fontFamily: 'monospace', lineHeight: 1.6 }}>
                <span style={{ color: '#9cdcfe' }}>GET</span> /v1/students/std_8923472/dna <span style={{ color: '#ce9178' }}>HTTP/1.1</span>{'\n'}
                <span style={{ color: '#569cd6' }}>Host:</span> api.authentraceio-ai.edu{'\n'}
                <span style={{ color: '#569cd6' }}>Authorization:</span> Bearer authentraceio_live_3f92a1d82e8f{'\n'}
                <span style={{ color: '#569cd6' }}>Accept:</span> application/json
              </pre>
            </div>
          </motion.div>

          {/* Webhooks */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', background: 'rgba(237, 137, 54, 0.1)', color: 'var(--accent-orange)', borderRadius: '16px', width: 'fit-content', marginBottom: '24px' }}><Webhook size={32} /></div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>Webhooks</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              Instead of polling, register HTTP webhooks to receive real-time POST notifications. Secured with HMAC-SHA256 signatures.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--accent-orange)' }}>
                intervention.triggered
              </div>
              <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--accent-blue)' }}>
                baseline.ready
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Endpoints */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: 'clamp(24px, 5vw, 64px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
            <div style={{ padding: '16px', background: 'rgba(56, 161, 105, 0.1)', color: '#38a169', borderRadius: '16px' }}><Box size={32} /></div>
            <h2 style={{ fontSize: '2rem', fontWeight: 600 }}>Core Endpoints</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {/* Analyze */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <span style={{ background: '#38a169', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700 }}>POST</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600 }}>/v1/analyze</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '24px' }}>Submit a student's document for synchronous analysis against their historical corpus and academic citation databases.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', md: { gridTemplateColumns: '1fr 1fr' }, gap: '24px' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '12px' }}>Request Payload</h4>
                  <pre style={{ background: '#0a0a0a', padding: '24px', borderRadius: '12px', overflowX: 'auto', border: '1px solid #333', fontSize: '0.85rem', color: '#d4d4d4', fontFamily: 'monospace' }}>
{`{
  "student_id": "std_8923472",
  "assignment_id": "asn_4892",
  "document_text": "The thermodynamic properties...",
  "citations": [
    { 
      "text": "Einstein, A. (1905)...", 
      "doi": "10.1002/andp.19053221004" 
    }
  ]
}`}
                  </pre>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '12px' }}>Response</h4>
                  <pre style={{ background: '#0a0a0a', padding: '24px', borderRadius: '12px', overflowX: 'auto', border: '1px solid #333', fontSize: '0.85rem', color: '#d4d4d4', fontFamily: 'monospace' }}>
{`{
  "analysis_id": "anl_789123",
  "confidence_score": 0.89,
  "stylometric_deviation": 2.45,
  "citation_audit": {
    "unverified_count": 0,
    "citations": [
      { "status": "VERIFIED", "source": "CrossRef" }
    ]
  },
  "flags": ["STYLOMETRIC_SHIFT"]
}`}
                  </pre>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

            {/* Baseline */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <span style={{ background: 'var(--accent-blue)', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700 }}>GET</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600 }}>/v1/students/&#123;student_id&#125;/dna</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
                Retrieve the time-series vector data representing the student's writing fingerprint. Returns dimensions representing vocabulary complexity, punctuation distributions, and structural parameters.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </PublicLayout>
  );
}
