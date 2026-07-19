import React from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Fingerprint, Network, AlignLeft, BrainCircuit, Search, Database, ShieldCheck, ShieldAlert, BookOpen, AlertTriangle } from 'lucide-react';

export function EvidenceEnginePage() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <PublicLayout>
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 80px auto' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--bg-tertiary)', borderRadius: '20px', border: '1px solid var(--color-glass-border)', color: 'var(--accent-purple)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
            <Network size={16} /> Technical Architecture
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '24px', background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Evidence Engine & Algorithmic Analysis
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Exposing the mathematical models, stylometric baselines, and citation auditing systems driving academic trust.
          </p>
        </motion.div>

        {/* The Statistical Fallacy */}
        <motion.div 
          style={{ y: yParallax, marginBottom: '80px' }}
          className="glass-card"
        >
          <div style={{ padding: 'clamp(32px, 5vw, 64px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', md: {flexDirection: 'row'}, gap: '48px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ padding: '12px', background: 'rgba(229, 62, 62, 0.1)', color: '#e53e3e', borderRadius: '12px' }}>
                    <AlertTriangle size={24} />
                  </div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 600 }}>The Statistical Fallacy of Traditional AI Classifiers</h2>
                </div>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
                  Traditional AI detection relies on static probabilistic classifiers evaluating <strong>perplexity</strong> and <strong>burstiness</strong>. These fail catastrophically when confronted with modern LLMs or human-edited text.
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  Peer-reviewed research shows traditional detectors produce high rates of false positives and display systemic bias. They consistently flag the writing of non-native English speakers (ESL students) as AI-generated because their simpler syntactic patterns naturally display low perplexity.
                </p>
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                {/* Abstract Visual */}
                <div style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '300px' }}>
                  <div className="hero-glow" style={{ background: 'var(--color-rose)', opacity: 0.1, width: '300px', height: '300px', top: 0, left: '50%', transform: 'translateX(-50%)' }}></div>
                  <svg width="100%" height="100%" viewBox="0 0 400 300" style={{ position: 'relative', zIndex: 1 }}>
                    {/* Simulated data failure visualization */}
                    <path d="M50,250 L100,220 L150,240 L200,150 L250,180 L300,80 L350,120" fill="none" stroke="var(--color-border)" strokeWidth="4" strokeDasharray="8 8" />
                    <path d="M50,200 L100,180 L150,100 L200,50 L250,120 L300,40 L350,30" fill="none" stroke="#e53e3e" strokeWidth="4" />
                    <circle cx="300" cy="40" r="8" fill="#e53e3e" />
                    <text x="315" y="35" fill="#e53e3e" fontSize="14" fontWeight="bold">False Positive</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Writing DNA: Time-Series Stylometry - Bento Grid */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>Writing DNA: Time-Series Stylometry</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
              We build a longitudinal, multi-dimensional baseline tracking over 80 stylometric markers to eliminate demographic bias.
            </p>
          </div>

          <div className="bento-grid">
            <motion.div whileHover={{ y: -5 }} className="glass-card" style={{ padding: '32px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(124, 92, 252, 0.1)', color: 'var(--accent-purple)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <BookOpen size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px' }}>Lexical Stylometry</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Type-Token Ratio (TTR), word-length distributions, hapax legomena, and vocabulary richness indicators.</p>
            </motion.div>
            
            <motion.div whileHover={{ y: -5 }} className="glass-card" style={{ padding: '32px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(0, 212, 255, 0.1)', color: 'var(--color-cyan)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Fingerprint size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px' }}>Syntactic Fingerprinting</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Part-of-Speech (POS) tag sequence frequencies, dependency tree depth, coordination ratio.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="glass-card" style={{ padding: '32px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(200, 255, 0, 0.1)', color: 'var(--accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <AlignLeft size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px' }}>Formatting Signatures</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Paragraph indentation habits, punctuation spacing patterns, white-space usage, document transitions.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="glass-card" style={{ padding: '32px', gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', flexDirection: 'column', md: {flexDirection: 'row'}, gap: '32px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(255, 61, 127, 0.1)', color: 'var(--color-rose)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    <BrainCircuit size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px' }}>Cognitive Linguistics & Distance</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                    Passive voice frequency, prepositional phrase density, transition word usage, and nominalization rates. 
                  </p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    When a student submits, we calculate the <strong>Mahalanobis distance</strong> from their historical centroid. If it falls outside the 95% confidence interval, it flags as a "Stylometric Shift" — prompting pedagogical discussion, not punitive accusation.
                  </p>
                </div>
                <div style={{ flex: 1, padding: '32px', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '200px', height: '200px', borderRadius: '50%', border: '2px dashed var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(124, 92, 252, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-purple)' }}></div>
                      </div>
                      <div style={{ position: 'absolute', top: '10%', right: '10%', width: '16px', height: '16px', borderRadius: '50%', background: '#e53e3e', boxShadow: '0 0 10px #e53e3e' }}></div>
                      <svg style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                        <line x1="100" y1="100" x2="160" y2="40" stroke="var(--text-secondary)" strokeWidth="2" strokeDasharray="4 4" />
                      </svg>
                      <div style={{ position: 'absolute', top: '-10%', right: '-20%', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600, background: 'var(--bg-secondary)', padding: '4px 8px', borderRadius: '6px' }}>Distance {'>'} 95%</div>
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Citation Hallucination Audit */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="glass-card"
          style={{ padding: 'clamp(32px, 5vw, 64px)', marginBottom: '80px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>Real-time Citation Hallucination Audit</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
              Generative models fabricate realistic-sounding facts. Our engine automatically verifies every citation against global scholarly databases.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--bg-tertiary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Search size={20} color="var(--text-primary)" />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>1. Parse</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Extracts bibliography and inline citations using ML models.</p>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--bg-tertiary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Database size={20} color="var(--accent-blue)" />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>2. Query</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Programmatically queries CrossRef and Semantic Scholar APIs.</p>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--bg-tertiary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={20} color="#38a169" />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>3. Verify</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Matches DOI, authors, and year against indexed active records.</p>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '16px', border: '1px solid #e53e3e', position: 'relative', boxShadow: '0 4px 20px rgba(229, 62, 62, 0.15)' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(229, 62, 62, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldAlert size={20} color="#e53e3e" />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px', color: '#e53e3e' }}>4. Flag</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Flags unverifiable citations, giving concrete evidence of fabrication.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Watermarking */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="glass-card" style={{ padding: '40px', maxWidth: '800px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '16px' }}>Watermarking and Emerging Standards</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              As foundational model providers implement cryptographic text watermarking (embedding subtle token selection biases), our framework integrates watermarking decoders. This allows institutions to scan for enterprise-level watermarks from major LLM vendors, providing a layered defense alongside stylometric baseline tracking.
            </p>
          </div>
        </div>

      </div>
    </PublicLayout>
  );
}
