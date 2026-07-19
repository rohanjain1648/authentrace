import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, BookOpen, Fingerprint, History, ChevronDown, CheckCircle2,
  Shield, Zap, BarChart3, Globe, Users, ArrowRight, Sparkles,
  GraduationCap, Lock, FileCheck, TrendingUp, Award, ChevronRight,
  Play, Star, MessageSquare
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { PublicNavbar } from './components/PublicNavbar';
import { PublicFooter } from './components/PublicFooter';
import { useTheme } from './components/ThemeProvider';

/* ===== REUSABLE ANIMATION HOOKS ===== */

function useParallax(offset = 50) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return { ref, y };
}

function AnimatedCounter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

/* ===== CHART DATA ===== */

const stylometricData = [
  { name: 'Wk1', baseline: 72, current: 74 },
  { name: 'Wk2', baseline: 75, current: 73 },
  { name: 'Wk3', baseline: 74, current: 76 },
  { name: 'Wk4', baseline: 73, current: 71 },
  { name: 'Wk5', baseline: 76, current: 45 },
  { name: 'Wk6', baseline: 75, current: 32 },
  { name: 'Wk7', baseline: 74, current: 78 },
  { name: 'Wk8', baseline: 77, current: 75 },
];

const adoptionData = [
  { name: '2021', universities: 12 },
  { name: '2022', universities: 48 },
  { name: '2023', universities: 156 },
  { name: '2024', universities: 340 },
  { name: '2025', universities: 520 },
];

const accuracyRadialData = [
  { name: 'Accuracy', value: 99.2, fill: '#c8ff00' },
];

const submissionBarData = [
  { month: 'Jan', count: 42000 },
  { month: 'Feb', count: 53000 },
  { month: 'Mar', count: 61000 },
  { month: 'Apr', count: 48000 },
  { month: 'May', count: 72000 },
  { month: 'Jun', count: 89000 },
];

/* ===== MAIN COMPONENT ===== */

export function LandingPage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const { isDark } = useTheme();
  const heroParallax = useParallax(80);
  const statsParallax = useParallax(40);

  const chartTextColor = isDark ? '#a0a0b8' : '#555566';
  const chartGridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';

  return (
    <div className="relative min-h-screen overflow-hidden font-body" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>

      {/* ===== PARALLAX BACKGROUND ORBS ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full animate-float-slow"
          style={{
            y: heroParallax.y,
            top: '-20%', left: '-10%',
            background: 'var(--color-glow-1)',
            filter: 'blur(120px)',
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full animate-float"
          style={{
            y: statsParallax.y,
            top: '30%', right: '-15%',
            background: 'var(--color-glow-2)',
            filter: 'blur(100px)',
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full animate-pulse-glow"
          style={{
            top: '70%', left: '20%',
            background: 'var(--color-glow-3)',
            filter: 'blur(100px)',
          }}
        />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <PublicNavbar />

      <main className="relative z-10">

        {/* ===== SECTION 1: HERO ===== */}
        <section className="relative pt-40 pb-28 md:pt-48 md:pb-36">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              className="flex flex-col items-center text-center"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {/* Badge */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
                style={{
                  background: isDark ? 'rgba(200,255,0,0.08)' : 'rgba(124,92,252,0.08)',
                  border: `1px solid ${isDark ? 'rgba(200,255,0,0.2)' : 'rgba(124,92,252,0.2)'}`
                }}
              >
                <Sparkles size={14} style={{ color: 'var(--color-accent)' }} />
                <span className="font-mono text-xs font-semibold tracking-widest" style={{ color: 'var(--color-accent)' }}>
                  AI-POWERED ACADEMIC TRUST PLATFORM
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] mb-8"
              >
                Build{' '}
                <span className="text-gradient-accent">Academic</span>
                <br />
                <span className="text-gradient-purple">Trust</span>
                {' '}That Scales
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Pedagogical collaboration meets explainable evidence.
                Stop catching students — start building trust with AI-powered stylometric analysis,
                citation verification, and transparent integrity workflows.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="group px-8 py-4 bg-brand-chartreuse text-brand-dark font-display font-bold rounded-2xl text-lg transition-all shadow-[0_0_30px_rgba(200,255,0,0.25)] btn-shimmer flex items-center gap-3"
                  whileHover={{ scale: 1.03, boxShadow: '0 0 50px rgba(200,255,0,0.35)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Request Demo
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  className="group px-8 py-4 rounded-2xl font-display font-semibold text-lg flex items-center gap-3 transition-all"
                  style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                  whileHover={{ scale: 1.03, borderColor: 'var(--color-border-hover)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play size={18} />
                  Watch Demo
                </motion.button>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                className="mt-20"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown size={28} style={{ color: 'var(--color-text-muted)' }} />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 2: TRUSTED BY MARQUEE ===== */}
        <section className="py-14 overflow-hidden section-divider" style={{ background: 'var(--color-bg-secondary)' }}>
          <div className="container mx-auto px-6 max-w-7xl mb-6">
            <p className="text-center font-mono text-xs tracking-[0.25em] font-semibold" style={{ color: 'var(--color-text-muted)' }}>
              TRUSTED BY 500+ UNIVERSITIES WORLDWIDE
            </p>
          </div>
          <div className="relative w-full flex overflow-hidden group">
            <div className="flex w-max animate-marquee-scroll gap-16 px-8 items-center opacity-50 group-hover:opacity-80 transition-opacity duration-500">
              {[...Array(2)].map((_, setIdx) => (
                <React.Fragment key={setIdx}>
                  {['UCalgary', 'Alberta', 'Mount Royal', 'Lethbridge', 'Stanford', 'MIT', 'Oxford', 'Toronto', 'McGill', 'Harvard'].map(uni => (
                    <div key={`${uni}-${setIdx}`} className="font-display font-bold text-2xl tracking-tight whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>
                      {uni}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: STATS WITH CHARTS ===== */}
        <section className="py-24 md:py-32" ref={statsParallax.ref}>
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
            >
              {[
                { value: 520, suffix: '+', label: 'Universities', icon: GraduationCap, color: '#c8ff00' },
                { value: 2, suffix: 'M+', label: 'Submissions Analyzed', icon: FileCheck, color: '#7c5cfc' },
                { value: 99, suffix: '.2%', label: 'Detection Accuracy', icon: Shield, color: '#00d4ff' },
                { value: 40, suffix: '+', label: 'LMS Integrations', icon: Globe, color: '#ff3d7f' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="glass-card p-6 md:p-8 flex flex-col items-start group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" style={{ background: `${stat.color}15` }}>
                    <stat.icon size={24} style={{ color: stat.color }} />
                  </div>
                  <div className="font-display text-3xl md:text-4xl font-black tracking-tight mb-1" style={{ color: 'var(--color-text)' }}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 4: FEATURE BENTO GRID ===== */}
        <section className="py-24 md:py-32 section-divider" style={{ background: 'var(--color-bg-secondary)' }}>
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                THE EVIDENCE ENGINE
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-5">
                Built Different.<br />
                <span className="text-gradient-accent">Built to Trust.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                Where legacy detectors see black and white, Authentraceio sees the full spectrum of academic authorship.
              </motion.p>
            </motion.div>

            <motion.div
              className="bento-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
            >
              {/* Card 1: Writing DNA — Large */}
              <motion.div variants={fadeUp} className="bento-card col-span-1 md:col-span-2 p-8 group">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-widest mb-4" style={{ color: 'var(--color-accent)' }}>
                  <Fingerprint size={14} /> WRITING DNA
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-brand-chartreuse transition-colors">
                  Stylometric Baselines
                </h3>
                <p className="text-sm leading-relaxed mb-6 max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
                  Authentraceio uses 80+ stylometric markers to build a unique Writing DNA for every student.
                  When submissions deviate beyond the 95th percentile, we flag — not accuse.
                </p>
                {/* Inline Chart */}
                <div className="rounded-xl p-4" style={{ background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.03)', border: '1px solid var(--color-border)' }}>
                  <ResponsiveContainer width="100%" height={160}>
                    <AreaChart data={stylometricData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                      <XAxis dataKey="name" tick={{ fill: chartTextColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          background: isDark ? '#1a1a24' : '#ffffff',
                          border: '1px solid var(--color-border)',
                          borderRadius: '12px',
                          color: isDark ? '#f0f0f5' : '#111118',
                          fontSize: '12px'
                        }}
                      />
                      <Area type="monotone" dataKey="baseline" stroke="#7c5cfc" fill="rgba(124,92,252,0.15)" strokeWidth={2} name="Baseline" />
                      <Area type="monotone" dataKey="current" stroke="#c8ff00" fill="rgba(200,255,0,0.1)" strokeWidth={2} name="Current" />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="flex items-center justify-between mt-2 font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <span>⚠ Stylometric shift detected at Wk5-Wk6</span>
                    <span className="text-brand-rose font-semibold">FLAGGED</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Pedagogical */}
              <motion.div variants={fadeUp} className="bento-card flex flex-col justify-center items-center text-center p-8 group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ background: 'rgba(200,255,0,0.1)' }}>
                  <CheckCircle2 size={32} style={{ color: 'var(--color-accent)' }} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">Pedagogical Focus</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Education over punishment. Every flag triggers a conversation workflow — not an accusation.
                </p>
              </motion.div>

              {/* Card 3: AI Categorization */}
              <motion.div variants={fadeUp} className="bento-card p-8 group">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-widest mb-4" style={{ color: '#00d4ff' }}>
                  <Search size={14} /> DEEP SCAN
                </div>
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-brand-cyan transition-colors">AI Categorization</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  Detecting subtle patterns of synthetic text generation with perplexity and burstiness analysis.
                </p>
                <div className="flex gap-2 flex-wrap">
                  {['GPT-4', 'Claude', 'Gemini', 'Llama'].map(model => (
                    <span key={model} className="px-3 py-1 rounded-lg text-xs font-mono font-medium" style={{ background: 'var(--color-glass-bg)', border: '1px solid var(--color-glass-border)', color: 'var(--color-text-muted)' }}>
                      {model}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Card 4: Citation Verification — Wide */}
              <motion.div variants={fadeUp} className="bento-card col-span-1 md:col-span-2 p-8 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none" style={{ background: 'var(--color-glow-3)', filter: 'blur(80px)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-widest mb-4" style={{ color: '#ff3d7f' }}>
                    <BookOpen size={14} /> CITATION VERIFY
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-brand-rose transition-colors">Eliminate Hallucinated Citations</h3>
                  <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
                    Cross-reference every citation against Google Scholar, CrossRef, Semantic Scholar, and PubMed in real-time.
                    Fabricated sources are flagged instantly.
                  </p>
                  <Link to="/evidence-engine" className="inline-flex items-center gap-2 text-sm font-semibold group/link" style={{ color: 'var(--color-text)' }}>
                    <span className="group-hover/link:text-brand-rose transition-colors">Explore the engine</span>
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 5: EVIDENCE ENGINE SHOWCASE ===== */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left — Text */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                  REAL-TIME ANALYSIS
                </motion.p>
                <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-black tracking-tight mb-6">
                  See the Shift.<br />
                  <span className="text-gradient-accent">Explain It.</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                  Our evidence engine doesn't just flag — it explains. Every analysis comes with a full
                  audit trail showing exactly which markers deviated and why, so professors can have
                  informed conversations with students.
                </motion.p>
                <motion.div variants={fadeUp} className="space-y-4">
                  {[
                    { icon: TrendingUp, label: '80+ Stylometric Markers', desc: 'Sentence length variance, vocabulary richness, syntactic complexity' },
                    { icon: Lock, label: 'Explainable Evidence', desc: 'Every flag comes with a visual breakdown and confidence interval' },
                    { icon: Award, label: 'Zero False Accusations', desc: 'Flags are pedagogical triggers, not verdicts' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(200,255,0,0.1)' }}>
                        <item.icon size={18} style={{ color: 'var(--color-accent)' }} />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-sm mb-0.5">{item.label}</h4>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right — Chart Panel */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card p-6 md:p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="font-display font-bold text-lg">Stylometric Analysis</h4>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Student ID: STU-2849 · ENG 301</p>
                  </div>
                  <div className="px-3 py-1 rounded-lg text-xs font-mono font-semibold" style={{ background: 'rgba(255,61,127,0.1)', color: '#ff3d7f' }}>
                    SHIFT DETECTED
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={stylometricData}>
                    <defs>
                      <linearGradient id="gradBaseline" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c5cfc" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#7c5cfc" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradCurrent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c8ff00" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#c8ff00" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                    <XAxis dataKey="name" tick={{ fill: chartTextColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: chartTextColor, fontSize: 11 }} axisLine={false} tickLine={false} domain={[20, 90]} />
                    <Tooltip
                      contentStyle={{
                        background: isDark ? '#1a1a24' : '#ffffff',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        color: isDark ? '#f0f0f5' : '#111118',
                        fontSize: '12px'
                      }}
                    />
                    <Area type="monotone" dataKey="baseline" stroke="#7c5cfc" fill="url(#gradBaseline)" strokeWidth={2.5} name="Baseline" />
                    <Area type="monotone" dataKey="current" stroke="#c8ff00" fill="url(#gradCurrent)" strokeWidth={2.5} name="Current" />
                  </AreaChart>
                </ResponsiveContainer>
                {/* Bottom Metrics */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { label: 'Confidence', value: '94%', color: '#c8ff00' },
                    { label: 'Deviation', value: '3.2σ', color: '#ff3d7f' },
                    { label: 'Citations', value: '2 flagged', color: '#7c5cfc' },
                  ].map((m, idx) => (
                    <div key={idx} className="text-center p-3 rounded-xl" style={{ background: 'var(--color-glass-bg)', border: '1px solid var(--color-glass-border)' }}>
                      <div className="font-display font-bold text-lg" style={{ color: m.color }}>{m.value}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 6: HOW IT WORKS ===== */}
        <section className="py-24 md:py-32 section-divider" style={{ background: 'var(--color-bg-secondary)' }}>
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
              className="text-center mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                SIMPLE INTEGRATION
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                How It Works
              </motion.h2>
            </motion.div>

            <motion.div
              className="space-y-0 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {/* Vertical Line */}
              <div className="absolute left-[28px] md:left-[39px] top-8 bottom-8 w-[2px]" style={{ background: 'var(--color-border)' }} />

              {[
                {
                  step: '01',
                  title: 'Connect Your LMS',
                  desc: 'Install the LTI 1.3 integration in Canvas, Blackboard, or Brightspace. Single Sign-On is automatic — no separate accounts needed.',
                  icon: Globe,
                  color: '#c8ff00'
                },
                {
                  step: '02',
                  title: 'Students Submit Work',
                  desc: 'Every assignment submission is analyzed in real-time. The Evidence Engine builds and refines the student\'s Writing DNA baseline with each upload.',
                  icon: FileCheck,
                  color: '#7c5cfc'
                },
                {
                  step: '03',
                  title: 'Review Evidence Dashboard',
                  desc: 'Professors see a clear, explainable report directly inside SpeedGrader. Flags are conversation starters — not accusations.',
                  icon: BarChart3,
                  color: '#00d4ff'
                },
              ].map((step, idx) => (
                <motion.div key={idx} variants={fadeUp} className="flex gap-6 md:gap-8 py-8 relative">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center" style={{ background: `${step.color}15`, border: `2px solid ${step.color}30` }}>
                      <step.icon size={28} style={{ color: step.color }} />
                    </div>
                  </div>
                  <div className="flex-1 pt-2 md:pt-4">
                    <div className="font-mono text-xs font-semibold tracking-widest mb-2" style={{ color: step.color }}>
                      STEP {step.step}
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 7: DASHBOARD PREVIEW WITH CHARTS ===== */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                ANALYTICS DASHBOARD
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-5">
                Data-Driven{' '}
                <span className="text-gradient-purple">Insights</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                Real-time analytics give administrators and faculty a bird's-eye view of institutional integrity health.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
            >
              {/* Adoption Chart */}
              <motion.div variants={fadeUp} className="glass-card p-6 lg:col-span-2">
                <h4 className="font-display font-bold text-base mb-1">University Adoption</h4>
                <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>Institutions using Authentraceio (2021–2025)</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={adoptionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                    <XAxis dataKey="name" tick={{ fill: chartTextColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: chartTextColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: isDark ? '#1a1a24' : '#ffffff',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        color: isDark ? '#f0f0f5' : '#111118',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="universities" radius={[8, 8, 0, 0]} name="Universities">
                      {adoptionData.map((_, idx) => (
                        <Cell key={idx} fill={idx === adoptionData.length - 1 ? '#c8ff00' : isDark ? '#333' : '#ddd'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Accuracy Radial */}
              <motion.div variants={fadeUp} className="glass-card p-6 flex flex-col items-center justify-center">
                <h4 className="font-display font-bold text-base mb-1">Detection Accuracy</h4>
                <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>Verified against peer review</p>
                <ResponsiveContainer width="100%" height={180}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={accuracyRadialData} startAngle={90} endAngle={-270}>
                    <RadialBar
                      background={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                      dataKey="value"
                      cornerRadius={12}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="font-display font-black text-3xl -mt-4" style={{ color: 'var(--color-accent)' }}>99.2%</div>
              </motion.div>

              {/* Monthly Submissions */}
              <motion.div variants={fadeUp} className="glass-card p-6 lg:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-display font-bold text-base">Monthly Submissions</h4>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Submissions analyzed per month (H1 2025)</p>
                  </div>
                  <div className="font-display font-bold text-2xl text-gradient-accent">365K</div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={submissionBarData}>
                    <defs>
                      <linearGradient id="gradSubmissions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c5cfc" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#7c5cfc" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                    <XAxis dataKey="month" tick={{ fill: chartTextColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: chartTextColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: isDark ? '#1a1a24' : '#ffffff',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        color: isDark ? '#f0f0f5' : '#111118',
                        fontSize: '12px'
                      }}
                    />
                    <Area type="monotone" dataKey="count" stroke="#7c5cfc" fill="url(#gradSubmissions)" strokeWidth={2.5} name="Submissions" />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 8: TESTIMONIALS ===== */}
        <section className="py-24 md:py-32 section-divider" style={{ background: 'var(--color-bg-secondary)' }}>
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                TESTIMONIALS
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-black tracking-tight">
                Trusted by <span className="text-gradient-accent">Educators</span>
              </motion.h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {[
                {
                  quote: "Authentraceio transformed how we handle academic integrity. The pedagogical approach means students learn from the process rather than fearing it.",
                  name: "Dr. Sarah Chen",
                  role: "Director of Academic Integrity",
                  university: "University of Calgary",
                  stars: 5
                },
                {
                  quote: "The stylometric analysis is incredibly precise. For the first time, I have explainable evidence I can discuss with students — not just a percentage.",
                  name: "Prof. James Mitchell",
                  role: "English Department Chair",
                  university: "Mount Royal University",
                  stars: 5
                },
                {
                  quote: "Integration with Canvas took 24 hours. Our faculty adoption went from 0 to 85% in one semester. The evidence dashboard is intuitive and powerful.",
                  name: "Dr. Amara Okafor",
                  role: "VP Academic Affairs",
                  university: "University of Alberta",
                  stars: 5
                },
              ].map((testimonial, idx) => (
                <motion.div key={idx} variants={fadeUp} className="glass-card p-8 flex flex-col justify-between group">
                  <div>
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: testimonial.stars }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" style={{ color: 'var(--color-accent)' }} />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed mb-6 italic" style={{ color: 'var(--color-text-secondary)' }}>
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm">{testimonial.name}</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{testimonial.role}</div>
                    <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--color-accent)' }}>{testimonial.university}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 9: PRICING ===== */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                PRICING
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-black tracking-tight mb-5">
                Plans for Every <span className="text-gradient-accent">Institution</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                Transparent pricing. No hidden fees. Scale as you grow.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {[
                {
                  name: 'Starter',
                  price: '$2,499',
                  period: '/semester',
                  desc: 'Perfect for individual departments and small pilots.',
                  features: ['Up to 500 students', '1 LMS integration', 'Basic stylometric analysis', 'Email support', 'Standard reports'],
                  highlighted: false,
                  cta: 'Start Pilot'
                },
                {
                  name: 'Enterprise',
                  price: '$9,999',
                  period: '/semester',
                  desc: 'Full-scale institutional deployment with premium support.',
                  features: ['Unlimited students', 'All LMS integrations', 'Full Evidence Engine', '24/7 dedicated support', 'Custom data sovereignty', 'API access', 'Admin analytics'],
                  highlighted: true,
                  cta: 'Contact Sales'
                },
                {
                  name: 'Research',
                  price: 'Custom',
                  period: '',
                  desc: 'For research consortia and multi-institution deployments.',
                  features: ['Multi-tenant deployment', 'Custom NLP models', 'Research API access', 'White-label option', 'SLA guarantees'],
                  highlighted: false,
                  cta: 'Talk to Us'
                },
              ].map((plan, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className={`glass-card p-8 flex flex-col relative ${plan.highlighted ? 'ring-2 ring-brand-chartreuse' : ''}`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-chartreuse text-brand-dark text-xs font-bold font-mono">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="font-display font-bold text-xl mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-display font-black text-4xl">{plan.price}</span>
                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{plan.period}</span>
                  </div>
                  <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>{plan.desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={16} style={{ color: 'var(--color-accent)' }} />
                        <span style={{ color: 'var(--color-text-secondary)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-xl font-display font-bold text-sm transition-all ${
                      plan.highlighted
                        ? 'bg-brand-chartreuse text-brand-dark hover:bg-brand-chartreuseHover shadow-[0_0_25px_rgba(200,255,0,0.25)]'
                        : ''
                    }`}
                    style={!plan.highlighted ? { background: 'var(--color-glass-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' } : {}}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 10: FAQ ACCORDION ===== */}
        <section className="py-24 md:py-32 section-divider" style={{ background: 'var(--color-bg-secondary)' }}>
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                FAQ
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-black tracking-tight">
                Questions & <span className="text-gradient-accent">Answers</span>
              </motion.h2>
            </motion.div>

            <motion.div
              className="space-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {[
                {
                  q: 'How is Authentraceio different from Turnitin or GPTZero?',
                  a: 'Unlike binary detectors, Authentraceio builds an individualized Writing DNA for each student and measures deviations from their own baseline — not a generic model. This eliminates false positives from ESL students, students with disabilities, or varying writing contexts.'
                },
                {
                  q: 'Does Authentraceio use student work to train AI models?',
                  a: 'Absolutely not. We guarantee zero-retention processing. Student submissions are analyzed ephemerally and never stored for model training. Full FERPA and FOIP compliance is maintained at all times.'
                },
                {
                  q: 'How long does LMS integration take?',
                  a: 'A standard Canvas or Blackboard integration takes less than 48 hours to configure in a staging environment. Our engineering team provides IT playbooks and live support for the entire process.'
                },
                {
                  q: 'What happens when a submission is flagged?',
                  a: 'Flags are pedagogical triggers — not accusations. The professor receives an explainable evidence report and is prompted to initiate a conversation with the student. Templates for revision requests, reflective essays, and oral defenses are provided.'
                },
                {
                  q: 'Is data stored in Canada for Canadian universities?',
                  a: 'Yes. We support complete Data Sovereignty. During onboarding, IT administrators choose their hosting region — Canadian data stays in Canada (AWS ca-central-1), EU data in Frankfurt, and US data in Virginia.'
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="glass-card-static overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors rounded-xl"
                    onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                  >
                    <span className="font-display font-semibold text-sm md:text-base pr-4">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: activeAccordion === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown size={20} style={{ color: 'var(--color-text-muted)' }} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {activeAccordion === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border)' }}>
                          <div className="pt-4">
                            {faq.a}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== SECTION 11: CTA BANNER ===== */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          {/* Parallax BG */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-[600px] h-[600px] rounded-full animate-float-slow" style={{ top: '-20%', right: '-10%', background: 'var(--color-glow-2)', filter: 'blur(100px)' }} />
            <div className="absolute w-[500px] h-[500px] rounded-full animate-float" style={{ bottom: '-20%', left: '-10%', background: 'var(--color-glow-1)', filter: 'blur(100px)' }} />
          </div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <motion.div
              className="glass-card p-12 md:p-16 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight mb-6">
                Ready to Build{' '}
                <span className="text-gradient-accent">Trust</span>?
              </h2>
              <p className="text-base md:text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                Join 500+ universities transforming academic integrity with explainable, pedagogical AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="group px-8 py-4 bg-brand-chartreuse text-brand-dark font-display font-bold rounded-2xl text-lg transition-all shadow-[0_0_30px_rgba(200,255,0,0.25)] btn-shimmer flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Request Demo
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  className="px-8 py-4 rounded-2xl font-display font-semibold text-lg transition-all"
                  style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Documentation
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <PublicFooter />
    </div>
  );
}
