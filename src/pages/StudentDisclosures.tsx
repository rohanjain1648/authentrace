import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { ShieldAlert, FileText, CheckCircle, Send, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function StudentDisclosures() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <DashboardLayout role="student">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>AI Disclosures & Feedback</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>View your transparent AI usage declarations and professor feedback.</p>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        
        {/* Action Required */}
        <motion.div variants={itemVariants}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '24px', color: 'var(--text-primary)' }}>Action Required</h3>
          
          <div style={{ border: '1px solid #e53e3e', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(229, 62, 62, 0.1)' }}>
            <div style={{ background: 'linear-gradient(90deg, rgba(229, 62, 62, 0.1), rgba(229, 62, 62, 0.05))', padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid rgba(229, 62, 62, 0.2)' }}>
              <div style={{ padding: '8px', background: 'rgba(229, 62, 62, 0.1)', borderRadius: '50%' }}>
                <ShieldAlert color="#e53e3e" size={24} />
              </div>
              <h4 style={{ color: '#e53e3e', fontWeight: 600, margin: 0, fontSize: '1.2rem' }}>Revision Requested: History 101 - Final Essay</h4>
            </div>
            
            <div style={{ padding: '32px', background: 'var(--bg-primary)' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--accent-purple)', marginBottom: '24px' }}>
                <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  <strong style={{ fontStyle: 'normal', display: 'block', marginBottom: '8px' }}>Professor's Note:</strong> 
                  "The system flagged a significant stylometric shift in your third paragraph, and you did not disclose AI usage. Please explain your writing process or submit a revised version."
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '14px 24px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                  <Send size={18} /> Submit Revision
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '14px 24px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                  File an Appeal <ArrowRight size={18} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Historical */}
        <motion.div variants={itemVariants} style={{ marginTop: '16px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '24px', color: 'var(--text-primary)' }}>Historical Disclosures</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <motion.div whileHover={{ scale: 1.01 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '12px', background: 'rgba(56, 161, 105, 0.1)', borderRadius: '12px', color: '#38a169' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h5 style={{ fontWeight: 600, fontSize: '1.1rem', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>Midterm Essay</h5>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>Disclosed: Grammar checking via Grammarly</p>
                </div>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38a169', fontSize: '1rem', fontWeight: 600, padding: '8px 16px', background: 'rgba(56, 161, 105, 0.1)', borderRadius: '20px' }}>
                <CheckCircle size={18} /> Approved
              </span>
            </motion.div>
          </div>
        </motion.div>

      </motion.div>
    </DashboardLayout>
  );
}
