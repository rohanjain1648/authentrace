import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ShieldAlert, CheckCircle, Clock, Activity, FileWarning, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const dnaData = [
  { name: 'Sep 1', score: 85, baseline: 82 },
  { name: 'Sep 15', score: 88, baseline: 83 },
  { name: 'Oct 1', score: 86, baseline: 84 },
  { name: 'Oct 15', score: 91, baseline: 85 },
  { name: 'Nov 1', score: 42, baseline: 86 }, // Sudden drop = AI flag
  { name: 'Nov 15', score: 87, baseline: 86 },
];

export function ProfessorDashboard() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [interveneNote, setInterveneNote] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const res = await fetch(`${API_URL}/api/submissions`);
        const data = await res.json();
        setSubmissions(data);
      } catch (err) {
        console.error('Failed to fetch submissions', err);
      }
    };
    fetchSubmissions();
    const interval = setInterval(fetchSubmissions, 2000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <DashboardLayout role="professor">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px', background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Faculty Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Welcome back, Dr. Smith. You have <span style={{color: 'var(--accent-orange)', fontWeight: 600}}>3 submissions</span> requiring attention.</p>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="dash-grid">
        {/* Metric Cards */}
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="metric-card" style={{ gridColumn: 'span 4', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.05 }}><Activity size={100} /></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '10px', background: 'var(--bg-tertiary)', borderRadius: '10px' }}><Activity size={20} color="var(--accent-blue)" /></div>
            <div className="metric-title" style={{ margin: 0 }}>Total Submissions</div>
          </div>
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="metric-value">142</motion.div>
          <div className="metric-trend trend-up" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={14}/> +12% from last week</div>
        </motion.div>
        
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="metric-card" style={{ gridColumn: 'span 4', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.05 }}><FileWarning size={100} /></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '10px', background: 'rgba(229,62,62,0.1)', borderRadius: '10px' }}><FileWarning size={20} color="#e53e3e" /></div>
            <div className="metric-title" style={{ margin: 0 }}>Active AI Flags</div>
          </div>
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="metric-value">18</motion.div>
          <div className="metric-trend trend-down" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>-5% from last week</div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="metric-card" style={{ gridColumn: 'span 4', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.05 }}><CheckCircle size={100} /></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '10px', background: 'rgba(56,161,105,0.1)', borderRadius: '10px' }}><CheckCircle size={20} color="#38a169" /></div>
            <div className="metric-title" style={{ margin: 0 }}>Avg. DNA Consistency</div>
          </div>
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }} className="metric-value">91%</motion.div>
          <div className="metric-trend trend-up">Healthy baseline maintained</div>
        </motion.div>

        {/* Charts */}
        <motion.div variants={itemVariants} className="metric-card" style={{ gridColumn: 'span 8', minHeight: '380px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Class Stylometric Baseline (Aggregate)</h3>
            <span style={{ fontSize: '0.8rem', padding: '4px 12px', background: 'var(--bg-tertiary)', borderRadius: '12px', color: 'var(--text-secondary)' }}>Last 90 Days</span>
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dnaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '12px', boxShadow: 'var(--shadow-card)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="score" stroke="var(--accent-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" name="Submission Score" animationDuration={1500} />
                <Line type="monotone" dataKey="baseline" stroke="var(--accent-purple)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Expected Baseline" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Action Items Bento */}
        <motion.div variants={itemVariants} className="metric-card" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '24px' }}>Action Items</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            <motion.div whileHover={{ scale: 1.02 }} style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ background: 'rgba(229, 62, 62, 0.1)', color: '#e53e3e', padding: '12px', borderRadius: '12px' }}>
                <ShieldAlert size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Stylometric Shift</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Alex J. • 94% Confidence</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ background: 'rgba(237, 137, 54, 0.1)', color: 'var(--accent-orange)', padding: '12px', borderRadius: '12px' }}>
                <Clock size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Oral Defense</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Michael T. • Tomorrow 10am</p>
              </div>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ background: 'rgba(56, 161, 105, 0.1)', color: '#38a169', padding: '12px', borderRadius: '12px' }}>
                <CheckCircle size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Batch Cleared</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>12 Essays analyzed.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Submissions Table */}
        <motion.div variants={itemVariants} className="metric-card" style={{ gridColumn: 'span 12' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Recent Submissions Pipeline</h3>
            <button style={{ background: 'var(--text-primary)', border: 'none', padding: '8px 16px', borderRadius: '8px', color: 'var(--bg-primary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>View All Reports</button>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <th style={{ paddingBottom: '16px', fontWeight: 500 }}>ID</th>
                <th style={{ paddingBottom: '16px', fontWeight: 500 }}>Student</th>
                <th style={{ paddingBottom: '16px', fontWeight: 500 }}>Assignment</th>
                <th style={{ paddingBottom: '16px', fontWeight: 500 }}>Time</th>
                <th style={{ paddingBottom: '16px', fontWeight: 500 }}>Risk Level</th>
                <th style={{ paddingBottom: '16px', fontWeight: 500 }}>Status</th>
                <th style={{ paddingBottom: '16px', fontWeight: 500 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, index) => (
                <React.Fragment key={sub.id}>
                  <motion.tr 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    style={{ borderBottom: reviewingId === sub.id ? 'none' : '1px solid var(--border-color)', cursor: 'pointer' }}
                    onClick={() => setReviewingId(reviewingId === sub.id ? null : sub.id)}
                    whileHover={{ backgroundColor: 'var(--bg-tertiary)' }}
                  >
                    <td style={{ padding: '20px 8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{sub.id}</td>
                    <td style={{ padding: '20px 8px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{sub.student}</td>
                    <td style={{ padding: '20px 8px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{sub.assignment}</td>
                    <td style={{ padding: '20px 8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{sub.date}</td>
                    <td style={{ padding: '20px 8px' }}>
                      <span style={{ 
                        padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700,
                        background: sub.risk === 'High' ? 'rgba(229, 62, 62, 0.1)' : sub.risk === 'Medium' ? 'rgba(237, 137, 54, 0.1)' : 'rgba(56, 161, 105, 0.1)',
                        color: sub.risk === 'High' ? '#e53e3e' : sub.risk === 'Medium' ? 'var(--accent-orange)' : '#38a169',
                        display: 'inline-block'
                      }}>
                        {sub.risk}
                      </span>
                    </td>
                    <td style={{ padding: '20px 8px', fontSize: '0.9rem', fontWeight: 500 }}>
                      <span style={{ color: sub.status === 'Flagged' ? '#e53e3e' : sub.status === 'Analyzing' ? 'var(--accent-orange)' : 'var(--text-secondary)' }}>
                        {sub.status}
                      </span>
                    </td>
                    <td style={{ padding: '20px 8px' }}>
                      <button 
                        style={{ background: reviewingId === sub.id ? 'var(--text-primary)' : 'transparent', border: '1px solid var(--border-color)', padding: '8px 16px', borderRadius: '8px', color: reviewingId === sub.id ? 'var(--bg-primary)' : 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.2s' }}
                      >
                        {reviewingId === sub.id ? 'Close' : 'Review'}
                      </button>
                    </td>
                  </motion.tr>
                  
                  {/* Inline Review Panel */}
                  <AnimatePresence>
                    {reviewingId === sub.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ borderBottom: '1px solid var(--border-color)' }}
                      >
                        <td colSpan={7} style={{ padding: '0 8px 24px 8px' }}>
                          <div style={{ background: 'var(--bg-primary)', padding: '32px', borderRadius: '16px', border: '1px solid var(--color-glass-border)', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', gap: '32px', flexDirection: 'column', md: {flexDirection: 'row'} }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                  <div style={{ padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}><ShieldAlert size={20} color="var(--accent-orange)" /></div>
                                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>Evidence Engine Report</h4>
                                </div>
                                
                                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                                  <div style={{ padding: '12px 24px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Score</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: sub.aiScore > 50 ? '#e53e3e' : 'var(--text-primary)' }}>{sub.aiScore}%</div>
                                  </div>
                                  <div style={{ padding: '12px 24px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Disclosed</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{sub.aiDisclosed ? 'Yes' : 'No'}</div>
                                  </div>
                                </div>

                                <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '24px', lineHeight: 1.6, background: 'rgba(124, 92, 252, 0.05)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--accent-purple)' }}>
                                  <em>{sub.rationale}</em>
                                </p>
                                
                                <h5 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Flagged Passages:</h5>
                                {sub.flaggedPassages?.length > 0 ? sub.flaggedPassages.map((fp: any, idx: number) => (
                                  <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #e53e3e', marginBottom: '12px' }}>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '8px', fontStyle: 'italic' }}>"{fp.text}"</p>
                                    <p style={{ fontSize: '0.8rem', color: '#e53e3e', fontWeight: 500 }}>Detected: {fp.reason}</p>
                                  </div>
                                )) : (
                                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>No specific passages flagged.</p>
                                )}
                              </div>
                              
                              <div style={{ width: '100%', maxWidth: '350px', background: 'var(--bg-secondary)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>Pedagogical Intervention</h4>
                                <textarea 
                                  value={interveneNote}
                                  onChange={e => setInterveneNote(e.target.value)}
                                  placeholder="Type notes for the student..."
                                  rows={5}
                                  style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', resize: 'vertical', marginBottom: '16px', fontSize: '0.95rem' }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                  <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                                      fetch(`${API_URL}/api/submissions/${sub.id}/intervene`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ status: 'Request Revision', note: interveneNote })
                                      }).then(() => { setReviewingId(null); setInterveneNote(''); });
                                    }}
                                    style={{ background: 'var(--accent-blue)', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}
                                  >
                                    Request Revision
                                  </motion.button>
                                  <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                                      fetch(`${API_URL}/api/submissions/${sub.id}/intervene`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ status: 'Cleared', note: interveneNote })
                                      }).then(() => { setReviewingId(null); setInterveneNote(''); });
                                    }}
                                    style={{ background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}
                                  >
                                    Clear Flag (Accept)
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
