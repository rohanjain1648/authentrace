import React from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { motion } from 'framer-motion';
import { Presentation, Building2, TrendingDown, TrendingUp, Clock, Quote, Sparkles } from 'lucide-react';

export function CaseStudiesPage() {
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--bg-tertiary)', borderRadius: '20px', border: '1px solid var(--color-glass-border)', color: 'var(--accent-purple)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
            <Presentation size={16} /> Results
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '24px', background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>
            Institutional Case Studies
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Analyzing the quantitative and qualitative impacts of Authentraceio AI across North American campuses.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bento-grid" style={{ marginBottom: '80px' }}>
          
          {/* UCalgary */}
          <motion.div variants={itemVariants} className="glass-card" style={{ gridColumn: 'span 1', md: { gridColumn: 'span 2' }, padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ padding: '16px', background: 'rgba(229, 62, 62, 0.1)', color: '#e53e3e', borderRadius: '16px' }}><Building2 size={32} /></div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>University of Calgary</h2>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>Combating the GenAI Misconduct Surge</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>
              In late 2023, UCalgary faced a 400% surge in academic integrity investigations. Initial reliance on static AI detectors resulted in high volumes of contested cases, specifically from international students and ESL writers, who were unfairly flagged by standard classifiers due to their simpler syntactic profiles.
            </p>
            
            <div style={{ background: 'var(--bg-primary)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '32px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>12-Month Pilot Results</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e53e3e' }}>
                    <TrendingDown size={24} /> <span style={{ fontSize: '2rem', fontWeight: 700 }}>40%</span>
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Drop in False Reports</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Eliminated systemic bias against ESL writers by establishing Writing DNA baselines.</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38a169' }}>
                    <TrendingUp size={24} /> <span style={{ fontSize: '2rem', fontWeight: 700 }}>75%</span>
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Increase in Disclosures</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Students felt safe documenting and disclosing their AI use.</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)' }}>
                    <Clock size={24} /> <span style={{ fontSize: '2rem', fontWeight: 700 }}>4.2h</span>
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Saved per Week</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Automated citation verification saved professors manual grading time.</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(145deg, var(--bg-tertiary), rgba(124, 92, 252, 0.05))', padding: '32px', borderRadius: '16px', borderLeft: '4px solid var(--accent-purple)', position: 'relative' }}>
              <Quote size={48} color="var(--accent-purple)" style={{ position: 'absolute', top: '24px', right: '32px', opacity: 0.1 }} />
              <p style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '24px' }}>
                "Authentraceio AI has allowed us to restore trust in the student-educator relationship. By moving away from binary 'AI vs. Human' accusations and towards explainable writing baselines, we've transformed potential integrity violations into constructive teaching opportunities."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>SE</div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Dr. Sarah Eaton</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Academic Integrity Expert</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mount Royal */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', background: 'rgba(237, 137, 54, 0.1)', color: 'var(--accent-orange)', borderRadius: '16px', width: 'fit-content', marginBottom: '24px' }}><Building2 size={32} /></div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '16px' }}>Mount Royal University</h2>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '24px' }}>Redesigning Assessments for Co-Creation</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              MRU's AI guidelines mandate that instructors explicitly state AI usage policies in their syllabi. They partnered with Authentraceio AI to pilot the <strong>Co-Creation Workflow</strong>.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
              In upper-level English and Communications courses, students were permitted to use AI to generate outlines, brainstorm research queries, and proofread drafts. Authentraceio AI was used to trace the student's editing history and highlight the specific modifications made to the machine-generated text.
            </p>
            <div style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Sparkles size={24} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
              <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Analyzing the "interaction delta" between raw AI output and the student's final revision provided a much more accurate representation of student learning than traditional essay grading.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </PublicLayout>
  );
}
