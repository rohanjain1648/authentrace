import React from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, LayoutList, FileText, CheckCircle, ShieldAlert, Sparkles, MessageCircle } from 'lucide-react';

export function PedagogicalGuidesPage() {
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--bg-tertiary)', borderRadius: '20px', border: '1px solid var(--color-glass-border)', color: 'var(--accent-orange)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
            <GraduationCap size={16} /> Educators
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '24px', background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>
            Pedagogical Guides & Policy
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Guiding faculty through the post-plagiarism era using transparent co-creation models and constructive intervention.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bento-grid" style={{ marginBottom: '80px' }}>
          
          {/* Post-plagiarism */}
          <motion.div variants={itemVariants} className="glass-card" style={{ gridColumn: 'span 1', md: { gridColumn: 'span 2' }, padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ padding: '16px', background: 'rgba(56, 161, 105, 0.1)', color: '#38a169', borderRadius: '16px' }}><Sparkles size={32} /></div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Embracing the Post-Plagiarism Era</h2>
            </div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
              The rapid emergence of advanced Generative AI tools has fundamentally altered the landscape of assessment in higher education. Outright bans on AI tools are both technologically unenforceable and pedagogically counterproductive. 
            </p>
            <div style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #38a169' }}>
              <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '16px' }}>
                "We have entered a 'post-plagiarism' era where traditional ideas of individual authorship are being replaced by machine co-creation."
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>— Dr. Sarah Eaton, University of Calgary</p>
            </div>
          </motion.div>

          {/* Download Templates */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ padding: '16px', background: 'rgba(66, 153, 225, 0.1)', color: 'var(--accent-blue)', borderRadius: '16px', width: 'fit-content', marginBottom: '24px' }}><FileText size={32} /></div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>Syllabus Templates</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              Explicitly state AI policies and set clear expectations on day one. Define "fair use" vs. "academic dishonesty."
            </p>
            <button style={{ background: 'var(--accent-blue)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', width: '100%' }}>
              Download PDF Pack
            </button>
          </motion.div>

        </motion.div>

        {/* Frameworks */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: 'clamp(24px, 5vw, 64px)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
            <div style={{ padding: '16px', background: 'rgba(124, 92, 252, 0.1)', color: 'var(--accent-purple)', borderRadius: '16px' }}><LayoutList size={32} /></div>
            <h2 style={{ fontSize: '2rem', fontWeight: 600 }}>The Transparent Co-Creation Model</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'var(--bg-primary)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: '#e53e3e' }}></div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>Tier 1: Closed-Loop</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>No AI permitted. Used for baseline development, in-class timed essays, and early-stage critical thinking assessments. Flags are evaluated strictly.</p>
            </div>
            
            <div style={{ background: 'var(--bg-primary)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--accent-orange)' }}></div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>Tier 2: Assisted</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>AI for outlining and brainstorming, but final prose must be human-authored. Students must disclose tools, prompts, and percentage of influence.</p>
            </div>
            
            <div style={{ background: 'var(--bg-primary)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: '#38a169' }}></div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>Tier 3: Full Integration</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>AI-generated text is permitted if properly cited and accompanied by a detailed critique of the AI's output, assessing its accuracy and biases.</p>
            </div>
          </div>
        </motion.div>

        {/* Interventions */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: 'clamp(24px, 5vw, 64px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ padding: '16px', background: 'rgba(237, 137, 54, 0.1)', color: 'var(--accent-orange)', borderRadius: '16px' }}><MessageCircle size={32} /></div>
            <h2 style={{ fontSize: '2rem', fontWeight: 600 }}>Conducting Pedagogical Interventions</h2>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '800px' }}>
            When Authentraceio AI flags a submission, the system prompts the instructor to initiate an intervention. We provide templates for three main actions:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '50%', color: 'var(--accent-blue)' }}><MessageCircle size={24} /></div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>The 5-Minute Oral Defense</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Rather than filing a misconduct report, schedule a brief check-in. Ask the student to explain the core argument of a flagged paragraph or why they chose a specific citation. If they can articulate their ideas, the flag is cleared.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '50%', color: 'var(--accent-orange)' }}><ShieldAlert size={24} /></div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Revision Request</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>If the student struggled to explain their work but admitted to using AI helper tools without full awareness of formatting rules, assign a revision. Let the student rewrite the flagged passages to ensure academic honesty.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '50%', color: '#38a169' }}><BookOpen size={24} /></div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>AI Literacy Remediation</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Provide targeted training modules on the limits of LLMs, how citation hallucination occurs, and how to properly cite AI tools in APA, MLA, or Chicago formats.</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </PublicLayout>
  );
}
