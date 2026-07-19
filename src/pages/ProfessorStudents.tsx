import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User, Activity, AlertCircle, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const studentDNA = [
  { term: 'Week 1', score: 85 },
  { term: 'Week 2', score: 86 },
  { term: 'Week 3', score: 84 },
  { term: 'Week 4', score: 88 },
  { term: 'Week 5', score: 85 },
  { term: 'Week 6', score: 87 },
  { term: 'Week 7 (Midterm)', score: 32 }, // Major shift
  { term: 'Week 8', score: 86 },
];

export function ProfessorStudents() {
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
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Student Directory & DNA Profiles</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Analyze individual student writing evolution and baseline consistency.</p>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        
        {/* Student Profile Card */}
        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 16px rgba(124, 92, 252, 0.2)' }}>
              <User size={36} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)' }}>Alex Johnson</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>Computer Science • Year 3</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '24px', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={16} /> Total Submissions</span>
              <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>14</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(229, 62, 62, 0.05)', borderRadius: '8px', borderLeft: '3px solid #e53e3e' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={16} color="#e53e3e" /> DNA Consistency</span>
              <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#e53e3e' }}>Critical Shift</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircle size={16} /> Active Flags</span>
              <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>1</span>
            </div>
          </div>
          
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ width: '100%', marginTop: '32px', background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '14px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <MessageCircle size={18} /> Message Student
          </motion.button>
        </motion.div>

        {/* DNA Graph */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Activity size={24} color="var(--accent-blue)" /> Writing DNA Baseline
              </h3>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#e53e3e', fontSize: '0.9rem', fontWeight: 600, background: 'rgba(229, 62, 62, 0.1)', padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(229, 62, 62, 0.2)' }}>
                <AlertCircle size={18} /> Stylometric Shift Detected
              </span>
            </div>
            
            <div style={{ height: '320px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studentDNA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                  <XAxis dataKey="term" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} dx={-10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
                    itemStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
                    cursor={{ stroke: 'var(--border-color)', strokeWidth: 2, strokeDasharray: '4 4' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="var(--accent-blue)" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: 'var(--bg-primary)', strokeWidth: 2, stroke: 'var(--accent-blue)' }} 
                    activeDot={{ r: 8, fill: 'var(--accent-blue)', stroke: 'var(--bg-primary)', strokeWidth: 2 }} 
                    name="DNA Match %" 
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="#38a169" /> Peer Average Baseline
              </h4>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>84%</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '8px' }}>Class average for this assignment</p>
            </div>
            
            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} color="var(--accent-purple)" /> Complexity Delta
              </h4>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>+3.2<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400, marginLeft: '4px' }}>grade levels</span></div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '8px' }}>Sudden spike in lexical density</p>
            </div>
          </motion.div>

        </div>

      </motion.div>
    </DashboardLayout>
  );
}
