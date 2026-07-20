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
  
  // Phase 2: Multi-layer highlight toggles
  const [showAiHigh, setShowAiHigh] = useState(true);
  const [showAiBorderline, setShowAiBorderline] = useState(true);
  const [showPlagiarism, setShowPlagiarism] = useState(true);

  // Phase 2 & 3: Admin settings, Audit & LTI states
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<'scoring' | 'audit' | 'lti_sso' | 'retention'>('scoring');
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({
    institution_name: 'State University',
    ai_weight: 0.5,
    similarity_weight: 0.5,
    total_seats: 100,
    used_seats: 15,
    tier: 'Trial',
    retention_days: 365
  });
  const [bulkUploading, setBulkUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(`${API_URL}/api/submissions`);
        if (res.ok) {
          const data = await res.json();
          setSubmissions(data);
        }
      } catch (err) {
        console.error('Failed to fetch submissions', err);
      }
    };

    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/settings`);
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (err) {
        console.error('Failed to fetch settings', err);
      }
    };

    fetchSubmissions();
    fetchSettings();
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

  const handleBulkUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setBulkUploading(true);
    setStatusMsg('Processing bulk upload batch...');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const formData = new FormData();
    formData.append('assignment', 'Class Set Batch');
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('files', e.target.files[i]);
    }

    try {
      const res = await fetch(`${API_URL}/api/submissions/bulk`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setStatusMsg(data.message || 'Bulk batch queued successfully!');
        setTimeout(() => setStatusMsg(''), 4000);
      } else {
        setStatusMsg('Error processing bulk upload.');
      }
    } catch (err) {
      console.error(err);
      setStatusMsg('Connection error during bulk upload.');
    } finally {
      setBulkUploading(false);
    }
  };

  const handleSaveSettings = async (updated: any) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    try {
      const res = await fetch(`${API_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        setAdminModalOpen(false);
      }
    } catch (err) {
      console.error('Failed to save settings', err);
    }
  };

  const handleUpgradeTier = async (newTier: string) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const formData = new FormData();
    formData.append('tier', newTier);
    try {
      const res = await fetch(`${API_URL}/api/billing/upgrade`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setSettings((prev: any) => ({ ...prev, tier: data.tier, total_seats: data.total_seats }));
      }
    } catch (err) {
      console.error('Upgrade error', err);
    }
  };

  return (
    <DashboardLayout role="professor">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Faculty Dashboard
            </h1>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', background: settings?.tier === 'Institution' ? 'rgba(56,161,105,0.15)' : settings?.tier === 'Department' ? 'rgba(49,130,206,0.15)' : 'rgba(237,137,54,0.15)', color: settings?.tier === 'Institution' ? '#38a169' : settings?.tier === 'Department' ? '#3182ce' : '#ed8936', border: '1px solid currentColor' }}>
              {settings?.tier || 'Trial'} Plan ({settings?.used_seats || 15}/{settings?.total_seats || 100} seats)
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0 }}>
            Welcome back, Dr. Smith. Managing <span style={{color: 'var(--accent-orange)', fontWeight: 600}}>{submissions.length} submissions</span>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <label style={{ background: 'var(--accent-blue)', color: '#fff', padding: '10px 18px', borderRadius: '10px', cursor: bulkUploading ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {bulkUploading ? 'Uploading...' : 'Bulk Upload (.zip / files)'}
            <input type="file" multiple accept=".zip,.docx,.pdf,.txt" onChange={handleBulkUploadChange} disabled={bulkUploading} style={{ display: 'none' }} />
          </label>

          <button 
            onClick={() => setAdminModalOpen(true)}
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
          >
            Institution Admin
          </button>
        </div>
      </motion.div>

      {statusMsg && (
        <div style={{ padding: '12px 20px', borderRadius: '10px', background: 'rgba(49,130,206,0.1)', color: '#3182ce', marginBottom: '24px', border: '1px solid #3182ce', fontWeight: 500 }}>
          {statusMsg}
        </div>
      )}
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
                                
                                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                                  <div style={{ padding: '12px 24px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', flex: 1, minWidth: '120px' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Overall Score</div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: sub.overall_score > 50 ? '#e53e3e' : 'var(--text-primary)' }}>{Math.round(sub.overall_score)}%</div>
                                  </div>
                                  <div style={{ padding: '12px 24px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', flex: 1, minWidth: '120px' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Gen</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{Math.round(sub.ai_score)}%</div>
                                  </div>
                                  <div style={{ padding: '12px 24px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', flex: 1, minWidth: '120px' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Similarity</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{Math.round(sub.similarity_score)}%</div>
                                  </div>
                                  <div style={{ padding: '12px 24px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', flex: 1, minWidth: '120px' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Language</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-purple)' }}>{sub.language || 'EN'}</div>
                                  </div>
                                </div>

                                {/* Phase 4: Citation & Reference Checker Card */}
                                {sub.citation_analysis && (
                                  <div style={{ background: 'var(--bg-secondary)', padding: '16px 20px', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                      <h5 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>Citation &amp; Reference Verification</h5>
                                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: sub.citation_analysis.hallucinated_count > 0 ? '#e53e3e' : '#38a169' }}>
                                        {sub.citation_analysis.valid_count} Valid / {sub.citation_analysis.hallucinated_count} Flagged Citations
                                      </span>
                                    </div>
                                    {sub.citation_analysis.issues && sub.citation_analysis.issues.length > 0 ? (
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {sub.citation_analysis.issues.map((iss: any, iIdx: number) => (
                                          <div key={iIdx} style={{ fontSize: '0.85rem', color: '#e53e3e', background: 'rgba(229,62,62,0.08)', padding: '8px 12px', borderRadius: '6px', borderLeft: '3px solid #e53e3e' }}>
                                            <strong>{iss.citation}:</strong> {iss.issue}
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>All cited references verified against academic DOIs.</p>
                                    )}
                                  </div>
                                )}

                                <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '24px', lineHeight: 1.6, background: 'rgba(124, 92, 252, 0.05)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--accent-purple)' }}>
                                  <em>{sub.rationale}</em>
                                </p>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                  <h5 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Document Viewer & Multi-Layer Highlighting</h5>
                                  {/* Multi-layer toggles and legend */}
                                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', background: showAiHigh ? 'rgba(229, 62, 62, 0.15)' : 'var(--bg-tertiary)', padding: '4px 10px', borderRadius: '6px', border: '1px solid #e53e3e', color: 'var(--text-primary)' }}>
                                      <input type="checkbox" checked={showAiHigh} onChange={e => setShowAiHigh(e.target.checked)} style={{ accentColor: '#e53e3e' }} />
                                      AI High (&gt;50%)
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', background: showAiBorderline ? 'rgba(237, 137, 54, 0.15)' : 'var(--bg-tertiary)', padding: '4px 10px', borderRadius: '6px', border: '1px solid #ed8936', color: 'var(--text-primary)' }}>
                                      <input type="checkbox" checked={showAiBorderline} onChange={e => setShowAiBorderline(e.target.checked)} style={{ accentColor: '#ed8936' }} />
                                      Borderline (20-50%)
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', background: showPlagiarism ? 'rgba(49, 130, 206, 0.15)' : 'var(--bg-tertiary)', padding: '4px 10px', borderRadius: '6px', border: '1px solid #3182ce', color: 'var(--text-primary)' }}>
                                      <input type="checkbox" checked={showPlagiarism} onChange={e => setShowPlagiarism(e.target.checked)} style={{ accentColor: '#3182ce' }} />
                                      Plagiarism Match
                                    </label>
                                  </div>
                                </div>

                                <div style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '24px', maxHeight: '400px', overflowY: 'auto' }}>
                                  {sub.span_highlights && sub.span_highlights.length > 0 ? (
                                    <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.7 }}>
                                      {sub.span_highlights.map((span: any, sIdx: number) => {
                                        let bg = 'transparent';
                                        let border = 'none';
                                        let isVisible = false;

                                        if (span.category === 'ai_high' && showAiHigh) {
                                          bg = 'rgba(229, 62, 62, 0.2)';
                                          border = '1px solid #e53e3e';
                                          isVisible = true;
                                        } else if (span.category === 'ai_borderline' && showAiBorderline) {
                                          bg = 'rgba(237, 137, 54, 0.25)';
                                          border = '1px solid #ed8936';
                                          isVisible = true;
                                        } else if (span.category === 'plagiarism_match' && showPlagiarism) {
                                          bg = 'rgba(49, 130, 206, 0.25)';
                                          border = '1px solid #3182ce';
                                          isVisible = true;
                                        }

                                        return (
                                          <span 
                                            key={sIdx} 
                                            title={isVisible ? `[${span.category.toUpperCase()}] ${span.reason}${span.source ? ' (Source: ' + span.source + ')' : ''}` : ''}
                                            style={{ 
                                              backgroundColor: bg, 
                                              borderBottom: border,
                                              padding: isVisible ? '2px 4px' : '0', 
                                              borderRadius: '4px',
                                              marginRight: '4px',
                                              cursor: isVisible ? 'help' : 'inherit'
                                            }}
                                          >
                                            {span.text}{' '}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                                      {sub.text_content ? sub.text_content : 'No text content available.'}
                                    </p>
                                  )}
                                </div>

                                {sub.span_highlights?.length > 0 ? (
                                  <div>
                                    <h5 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>Granular Span Breakdown</h5>
                                    {sub.span_highlights.map((fp: any, idx: number) => (
                                      <div key={idx} style={{ 
                                        background: 'var(--bg-secondary)', 
                                        padding: '12px 16px', 
                                        borderRadius: '10px', 
                                        borderLeft: `4px solid ${fp.category === 'ai_high' ? '#e53e3e' : fp.category === 'ai_borderline' ? '#ed8936' : '#3182ce'}`, 
                                        marginBottom: '10px' 
                                      }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: fp.category === 'ai_high' ? '#e53e3e' : fp.category === 'ai_borderline' ? '#ed8936' : '#3182ce' }}>
                                            {fp.category.replace('_', ' ')} ({Math.round(fp.score)}%)
                                          </span>
                                          {fp.source && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Source: {fp.source}</span>}
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px', fontStyle: 'italic' }}>"{fp.text}"</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>{fp.reason}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : sub.flagged_passages?.length > 0 ? (
                                  <div>
                                    <h5 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>Detected Anomalies</h5>
                                    {sub.flagged_passages.map((fp: any, idx: number) => (
                                      <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #e53e3e', marginBottom: '12px' }}>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '8px', fontStyle: 'italic' }}>"{fp.text}"</p>
                                        <p style={{ fontSize: '0.8rem', color: '#e53e3e', fontWeight: 500 }}>Detected: {fp.reason}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
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
                                    onClick={async () => {
                                      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                                      try {
                                        const res = await fetch(`${API_URL}/api/cases`, {
                                          method: 'POST',
                                          headers: { 'Content-Type': 'application/json' },
                                          body: JSON.stringify({
                                            submission_id: sub.id,
                                            student_name: sub.student,
                                            instructor_email: 'dr.smith@university.edu',
                                            severity: sub.risk === 'High' ? 'High' : 'Medium',
                                            summary: interveneNote || `High risk submission (${Math.round(sub.overall_score)}% Overall, ${Math.round(sub.ai_score)}% AI Gen).`
                                          })
                                        });
                                        if (res.ok) {
                                          const data = await res.json();
                                          alert(`Escalated to Academic Integrity Office!\nCase File: ${data.id}`);
                                          setReviewingId(null);
                                          setInterveneNote('');
                                        }
                                      } catch (e) { console.error(e); }
                                    }}
                                    style={{ background: 'rgba(229, 62, 62, 0.1)', color: '#e53e3e', border: '1px solid #e53e3e', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}
                                  >
                                    Escalate to Integrity Office
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

      {/* Institution Admin & Billing Modal */}
      <AnimatePresence>
        {adminModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Institution Admin &amp; Compliance Hub</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, marginTop: '4px' }}>Manage scoring weights, LTI 1.3 integrations, SSO authentication, FERPA data retention, and audit logs.</p>
                </div>
                <button onClick={() => setAdminModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              {/* Admin Modal Navigation Tabs */}
              <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}>
                <button 
                  onClick={() => setAdminTab('scoring')} 
                  style={{ padding: '8px 16px', border: 'none', background: 'transparent', borderBottom: adminTab === 'scoring' ? '2px solid var(--accent-blue)' : 'none', color: adminTab === 'scoring' ? 'var(--accent-blue)' : 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Scoring &amp; Seats
                </button>
                <button 
                  onClick={async () => {
                    setAdminTab('audit');
                    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                    try {
                      const res = await fetch(`${API_URL}/api/audit-logs`);
                      if (res.ok) setAuditLogs(await res.json());
                    } catch(e) { console.error(e); }
                  }} 
                  style={{ padding: '8px 16px', border: 'none', background: 'transparent', borderBottom: adminTab === 'audit' ? '2px solid var(--accent-blue)' : 'none', color: adminTab === 'audit' ? 'var(--accent-blue)' : 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Audit Logs
                </button>
                <button 
                  onClick={() => setAdminTab('lti_sso')} 
                  style={{ padding: '8px 16px', border: 'none', background: 'transparent', borderBottom: adminTab === 'lti_sso' ? '2px solid var(--accent-blue)' : 'none', color: adminTab === 'lti_sso' ? 'var(--accent-blue)' : 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  LMS &amp; SSO
                </button>
                <button 
                  onClick={() => setAdminTab('retention')} 
                  style={{ padding: '8px 16px', border: 'none', background: 'transparent', borderBottom: adminTab === 'retention' ? '2px solid var(--accent-blue)' : 'none', color: adminTab === 'retention' ? 'var(--accent-blue)' : 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  FERPA / Data Policy
                </button>
              </div>

              {/* Tab 1: Scoring & Seats */}
              {adminTab === 'scoring' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Institution Name</label>
                    <input 
                      type="text" 
                      value={settings.institution_name || ''} 
                      onChange={e => setSettings({ ...settings, institution_name: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.95rem' }} 
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>AI Content Weight: {Math.round((settings.ai_weight || 0.5) * 100)}%</label>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Similarity Weight: {Math.round((settings.similarity_weight || 0.5) * 100)}%</label>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={settings.ai_weight || 0.5} 
                      onChange={e => {
                        const val = parseFloat(e.target.value);
                        setSettings({ ...settings, ai_weight: val, similarity_weight: parseFloat((1 - val).toFixed(2)) });
                      }}
                      style={{ width: '100%', accentColor: 'var(--accent-blue)' }} 
                    />
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary)' }}>Subscription &amp; Seat Allocation</h4>
                    <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Current Plan: {settings.tier || 'Trial'}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{settings.used_seats || 15} / {settings.total_seats || 100} Faculty Seats Provisioned</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => handleUpgradeTier('Department')}
                        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--accent-blue)', background: settings.tier === 'Department' ? 'var(--accent-blue)' : 'transparent', color: settings.tier === 'Department' ? '#fff' : 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        Department Plan (250 seats)
                      </button>
                      <button 
                        onClick={() => handleUpgradeTier('Institution')}
                        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #38a169', background: settings.tier === 'Institution' ? '#38a169' : 'transparent', color: settings.tier === 'Institution' ? '#fff' : '#38a169', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        Enterprise Plan (2500 seats)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Audit Logs */}
              {adminTab === 'audit' && (
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary)' }}>Immutable Compliance Log Trail</h4>
                  <div style={{ maxHeight: '280px', overflowY: 'auto', background: 'var(--bg-primary)', borderRadius: '10px', border: '1px solid var(--border-color)', padding: '12px' }}>
                    {auditLogs.length > 0 ? (
                      <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                            <th style={{ padding: '6px' }}>Time</th>
                            <th style={{ padding: '6px' }}>Actor</th>
                            <th style={{ padding: '6px' }}>Action</th>
                            <th style={{ padding: '6px' }}>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {auditLogs.map((log: any, idx: number) => (
                            <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                              <td style={{ padding: '8px 6px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                              <td style={{ padding: '8px 6px', fontWeight: 500 }}>{log.actor_email}</td>
                              <td style={{ padding: '8px 6px' }}><span style={{ padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-tertiary)', fontWeight: 600 }}>{log.action}</span></td>
                              <td style={{ padding: '8px 6px', color: 'var(--text-secondary)' }}>{log.details}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Loading audit logs...</p>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 3: LMS & SSO */}
              {adminTab === 'lti_sso' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>IMS Global LTI 1.3 Advantage Config</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Download the official JSON configuration to register AuthenTrace inside Canvas, Blackboard, or Moodle.</p>
                    <a 
                      href={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/lti/config.json`} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ display: 'inline-block', background: 'var(--accent-blue)', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}
                    >
                      Download LTI 1.3 JSON Config
                    </a>
                  </div>

                  <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Institutional SSO (SAML 2.0 / OAuth2)</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Supported identity providers: Okta, Auth0, Microsoft Entra ID, and Google Workspace.</p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <input 
                        type="email" 
                        placeholder="test@university.edu" 
                        id="ssoEmailInput"
                        style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem' }} 
                      />
                      <button 
                        onClick={async () => {
                          const inp = (document.getElementById('ssoEmailInput') as HTMLInputElement)?.value || 'dr.smith@university.edu';
                          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                          const res = await fetch(`${API_URL}/api/auth/sso/login`, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({ email: inp, provider: 'okta' })
                          });
                          if (res.ok) {
                            const data = await res.json();
                            alert(`SSO Login Simulated!\nSession: ${data.session_token}\nUser: ${data.user.name} (${data.user.role})`);
                          }
                        }}
                        style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                      >
                        Simulate SSO Login
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: FERPA / Data Retention */}
              {adminTab === 'retention' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                  <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>FERPA &amp; GDPR Data Retention Schedule</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>Submissions and extracted text older than the configured threshold will be permanently purged.</p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Retention Period:</label>
                      <select 
                        value={settings.retention_days || 365}
                        onChange={e => setSettings({ ...settings, retention_days: parseInt(e.target.value) })}
                        style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                      >
                        <option value={180}>180 Days (1 Semester)</option>
                        <option value={365}>365 Days (1 Academic Year)</option>
                        <option value={730}>730 Days (2 Academic Years)</option>
                      </select>
                    </div>

                    <button 
                      onClick={async () => {
                        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                        try {
                          const res = await fetch(`${API_URL}/api/data-retention/purge`, { method: 'DELETE' });
                          if (res.ok) {
                            const data = await res.json();
                            alert(data.status);
                          }
                        } catch(e) { console.error(e); }
                      }}
                      style={{ background: 'rgba(229, 62, 62, 0.1)', color: '#e53e3e', border: '1px solid #e53e3e', padding: '8px 14px', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      Trigger FERPA Data Purge Now
                    </button>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button 
                  onClick={() => setAdminModalOpen(false)}
                  style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
                >
                  Close
                </button>
                <button 
                  onClick={() => handleSaveSettings(settings)}
                  style={{ background: 'var(--accent-blue)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Save Configuration
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
