import React from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ArrowRight, Microscope, Sparkles, Zap } from 'lucide-react';

export function BlogPage() {
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--bg-tertiary)', borderRadius: '20px', border: '1px solid var(--color-glass-border)', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
            <BookOpen size={16} /> Journal
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '24px', background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>
            The Authentraceio Journal
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Critical perspectives on AI policy, higher education, NLP research, and academic trust.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Article 1 */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', md: {flexDirection: 'row'} }}>
            <div style={{ flex: 1, background: 'linear-gradient(145deg, rgba(124, 92, 252, 0.1), rgba(0, 0, 0, 0))', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Microscope size={80} color="var(--accent-purple)" opacity={0.5} />
            </div>
            <div style={{ flex: 2, padding: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>NLP Research</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}><Calendar size={14} /> July 8, 2026</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.3 }}>
                Why We Built the Citation Hallucination Checker
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Large Language Models generate syntactically flawless text but lack semantic grounding. By checking bibtex arrays directly against scholarly indexes (CrossRef/Semantic Scholar), we offer educators mathematical certainty when identifying hallucinated AI texts, bypassing heuristic bias.
              </p>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 600, padding: 0, cursor: 'pointer', fontSize: '1rem' }}>
                Read full article <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Article 2 */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', md: {flexDirection: 'row'} }}>
            <div style={{ flex: 1, background: 'linear-gradient(145deg, rgba(237, 137, 54, 0.1), rgba(0, 0, 0, 0))', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Sparkles size={80} color="var(--accent-orange)" opacity={0.5} />
            </div>
            <div style={{ flex: 2, padding: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-orange)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Pedagogy</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}><Calendar size={14} /> September 12, 2025</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.3 }}>
                Moving Beyond the Zero: The Power of Short Oral Defenses
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Academic integrity should educate, not punish. Confronted with a suspicious AI flag, issuing a failing grade creates resentment. Scheduling a 5-minute oral defense enables constructive pedagogical intervention and distinguishes between unauthorized generation and constructive assistance.
              </p>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 600, padding: 0, cursor: 'pointer', fontSize: '1rem' }}>
                Read full article <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Article 3 */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', md: {flexDirection: 'row'} }}>
            <div style={{ flex: 1, background: 'linear-gradient(145deg, rgba(66, 153, 225, 0.1), rgba(0, 0, 0, 0))', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Zap size={80} color="var(--accent-blue)" opacity={0.5} />
            </div>
            <div style={{ flex: 2, padding: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Product Updates</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}><Calendar size={14} /> August 03, 2025</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.3 }}>
                Authentraceio AI Achieves LTI Advantage 1.3 Certification
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
                We are officially certified by IMS Global. This certification guarantees secure, Single Sign-On integrations and seamless Gradebook syncs with major platforms including Canvas, Blackboard Learn Ultra, D2L Brightspace, and Moodle.
              </p>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: 600, padding: 0, cursor: 'pointer', fontSize: '1rem' }}>
                Read full article <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </PublicLayout>
  );
}
