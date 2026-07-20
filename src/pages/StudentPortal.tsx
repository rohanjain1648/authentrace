import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { BookOpen, AlertTriangle, Fingerprint, UploadCloud, CheckCircle2, History, Send } from 'lucide-react';

export function StudentPortal() {
  const [assignment, setAssignment] = useState('');
  const [text, setText] = useState('');
  const [aiDisclosed, setAiDisclosed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!text && !file) {
      setMessage('Please enter a title and either paste your text or upload a file.');
      return;
    }
    
    setSubmitting(true);
    setMessage('');
    
    try {
      const formData = new FormData();
      formData.append('student', 'Demo Student'); // In real app, from auth
      formData.append('assignment', assignment || 'Untitled');
      formData.append('aiDisclosed', aiDisclosed.toString());
      if (text) formData.append('text', text);
      if (file) formData.append('file', file);

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/submissions`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage('Assignment submitted successfully! It is now pending analysis.');
        setAssignment('');
        setText('');
        setFile(null);
      } else {
        const err = await res.json();
        setMessage(`Error: ${err.detail || 'Submission failed'}`);
      }
    } catch (err) {
      setMessage('Error: Failed to connect to server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout role="student">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Student Portal</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Submit assignments, declare AI usage, and view your writing history.</p>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'grid', gridTemplateColumns: '1fr', lg: { gridTemplateColumns: '2fr 1fr' }, gap: '24px' }}>
        
        {/* Submission Form */}
        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <UploadCloud size={24} color="var(--accent-blue)" /> New Submission
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 500, marginBottom: '8px', color: 'var(--text-primary)' }}>Assignment Title</label>
              <input 
                type="text" 
                value={assignment}
                onChange={e => setAssignment(e.target.value)}
                placeholder="e.g. History 101 - Final Essay" 
                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', transition: 'border-color 0.2s', outline: 'none' }} 
                onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 500, marginBottom: '8px', color: 'var(--text-primary)' }}>Paste Assignment Text</label>
              <textarea 
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Paste your essay here..."
                rows={8}
                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', resize: 'vertical', transition: 'border-color 0.2s', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 500, marginBottom: '8px', color: 'var(--text-primary)' }}>Upload Document (.pdf, .docx, .txt)</label>
              <input 
                type="file" 
                onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
                accept=".pdf,.docx,.txt"
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px dashed var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} 
              />
            </div>

            <div style={{ background: 'linear-gradient(145deg, rgba(237, 137, 54, 0.05), rgba(0, 0, 0, 0))', border: '1px solid var(--border-color)', padding: '24px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ padding: '12px', background: 'rgba(237, 137, 54, 0.1)', borderRadius: '12px', color: 'var(--accent-orange)' }}>
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>AI Disclosure Assistant</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Does this submission include any AI-generated content or assistance (e.g. outlining, grammar checking)? Declaring it now helps build your provenance graph.</p>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', paddingLeft: '64px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '8px', border: aiDisclosed ? '2px solid var(--accent-orange)' : '2px solid var(--border-color)', background: 'var(--bg-primary)', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <input type="radio" name="ai" checked={aiDisclosed} onChange={() => setAiDisclosed(true)} style={{ width: '18px', height: '18px', accentColor: 'var(--accent-orange)' }} />
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Yes, I used AI</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '8px', border: !aiDisclosed ? '2px solid #38a169' : '2px solid var(--border-color)', background: 'var(--bg-primary)', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <input type="radio" name="ai" checked={!aiDisclosed} onChange={() => setAiDisclosed(false)} style={{ width: '18px', height: '18px', accentColor: '#38a169' }} />
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>No, original work</span>
                </label>
              </div>
            </div>

            {message && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '16px', borderRadius: '8px', background: message.includes('successfully') ? 'rgba(56, 161, 105, 0.1)' : 'rgba(229, 62, 62, 0.1)', color: message.includes('successfully') ? '#38a169' : '#e53e3e', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                {message.includes('successfully') ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                {message}
              </motion.div>
            )}

            <motion.button 
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              onClick={handleSubmit}
              disabled={submitting}
              style={{ background: 'var(--accent-blue)', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '12px', cursor: submitting ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '1.1rem', marginTop: '8px', opacity: submitting ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', alignSelf: 'flex-start' }}
            >
              {submitting ? 'Analyzing & Submitting...' : <><Send size={20} /> Submit Assignment</>}
            </motion.button>
          </div>
        </motion.div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Fingerprint size={20} color="var(--accent-purple)" /> Writing DNA
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>Your writing DNA profile is healthy and consistent across 12 assignments this semester.</p>
            
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>Consistency Score</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38a169' }}>92%</span>
            </div>
            <div style={{ height: '12px', background: 'var(--bg-tertiary)', borderRadius: '6px', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1, delay: 0.2 }} style={{ height: '100%', background: 'linear-gradient(90deg, #38a169, #48bb78)' }} />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <History size={20} color="var(--text-secondary)" /> Recent History
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(56, 161, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38a169' }}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Midterm Essay</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>Oct 12 • Analyzed & Verified</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(56, 161, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38a169' }}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Discussion Post 4</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>Oct 05 • Analyzed & Verified</div>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>

      </motion.div>
    </DashboardLayout>
  );
}
