import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, BookOpen, Check, X, ChevronRight, Fingerprint, ShieldAlert, FileText } from 'lucide-react';

export function ProfessorFlags() {
  const [selectedCase, setSelectedCase] = useState<string | null>('alex');

  return (
    <DashboardLayout role="professor">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Flagged Content & Triage</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Review high-risk submissions, citation hallucinations, and stylometric shifts.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: { gridTemplateColumns: '1fr 1.5fr' }, gap: '24px' }}>
        
        {/* Triage Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <AlertTriangle size={18} color="#e53e3e" /> Active Triage Queue (2)
          </h3>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedCase('alex')} style={{ padding: '20px', borderRadius: '12px', border: selectedCase === 'alex' ? '1px solid #e53e3e' : '1px solid var(--border-color)', background: selectedCase === 'alex' ? 'linear-gradient(145deg, var(--bg-primary), rgba(229, 62, 62, 0.05))' : 'var(--bg-primary)', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
            {selectedCase === 'alex' && <motion.div layoutId="active-indicator" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#e53e3e' }} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>Alex Johnson • Final Thesis</span>
              <span style={{ color: '#e53e3e', fontSize: '0.8rem', fontWeight: 700, padding: '2px 8px', background: 'rgba(229, 62, 62, 0.1)', borderRadius: '12px' }}>High Risk</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Citation Hallucination detected in Reference [12]. Stylometric shift in Chapter 3.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedCase('david')} style={{ padding: '20px', borderRadius: '12px', border: selectedCase === 'david' ? '1px solid var(--accent-orange)' : '1px solid var(--border-color)', background: selectedCase === 'david' ? 'linear-gradient(145deg, var(--bg-primary), rgba(237, 137, 54, 0.05))' : 'var(--bg-primary)', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
            {selectedCase === 'david' && <motion.div layoutId="active-indicator" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--accent-orange)' }} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>David Chen • Lab Report</span>
              <span style={{ color: 'var(--accent-orange)', fontSize: '0.8rem', fontWeight: 700, padding: '2px 8px', background: 'rgba(237, 137, 54, 0.1)', borderRadius: '12px' }}>Medium Risk</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Unusual structural layout and vocabulary complexity spike.</p>
          </motion.div>
        </div>

        {/* Detail View */}
        <AnimatePresence mode="wait">
          {selectedCase === 'alex' && (
            <motion.div key="alex" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={24} color="var(--accent-blue)" /> Detailed Analysis: Alex Johnson
              </h3>
              
              <div style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '32px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                  <BookOpen size={18} color="var(--accent-purple)" /> Citation Verification Report
                </h4>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '3px solid var(--border-color)', marginBottom: '20px' }}>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                    "Recent studies in pedagogical integration of LLMs (Smith et al., 2025) suggest that <span style={{ background: 'rgba(229, 62, 62, 0.2)', padding: '2px 4px', borderRadius: '4px', borderBottom: '2px dashed #e53e3e' }}>transparent disclosure reduces academic dishonesty by 40%.</span>"
                  </p>
                </div>
                <div style={{ background: 'rgba(229, 62, 62, 0.05)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #e53e3e', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <ShieldAlert size={20} color="#e53e3e" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <strong style={{ color: 'var(--text-primary)' }}>System Note:</strong> The citation "Smith et al., 2025" does not exist in any major academic database (Crossref, Semantic Scholar). Highly likely to be a hallucinated reference generated by an LLM.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ background: '#e53e3e', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                  <X size={18} /> Escalate to Integrity Case
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ background: 'var(--accent-orange)', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                  Schedule Oral Defense
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '14px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                  <Check size={18} /> Dismiss Flag
                </motion.button>
              </div>
            </motion.div>
          )}

          {selectedCase === 'david' && (
             <motion.div key="david" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card" style={{ padding: '32px' }}>
               <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Fingerprint size={24} color="var(--accent-orange)" /> Detailed Analysis: David Chen
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>Analysis loading...</p>
             </motion.div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}
