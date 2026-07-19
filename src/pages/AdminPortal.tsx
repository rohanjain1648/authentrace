import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, ShieldAlert, FileSearch, Activity, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const analyticsData = [
  { name: 'Computer Science', flags: 42 },
  { name: 'English Lit', flags: 89 },
  { name: 'History', flags: 55 },
  { name: 'Physics', flags: 12 },
  { name: 'Business', flags: 110 },
];

export function AdminPortal() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <DashboardLayout role="admin">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>University Analytics</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Institutional overview of academic integrity and AI usage trends.</p>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        
        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05, transform: 'rotate(15deg)' }}>
            <Users size={120} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '10px', background: 'rgba(66, 153, 225, 0.1)', borderRadius: '12px', color: 'var(--accent-blue)' }}>
              <Users size={24} />
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Total Active Students</div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>12,450</div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05, transform: 'rotate(15deg)' }}>
            <ShieldAlert size={120} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '10px', background: 'rgba(229, 62, 62, 0.1)', borderRadius: '12px', color: '#e53e3e' }}>
              <ShieldAlert size={24} />
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Integrity Cases (Active)</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>34</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#38a169', fontSize: '0.9rem', fontWeight: 600, background: 'rgba(56, 161, 105, 0.1)', padding: '4px 10px', borderRadius: '12px' }}>
              &darr; 12%
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05, transform: 'rotate(15deg)' }}>
            <Cpu size={120} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '10px', background: 'rgba(124, 92, 252, 0.1)', borderRadius: '12px', color: 'var(--accent-purple)' }}>
              <Cpu size={24} />
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>AI Tool Disclosures</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>4,892</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-purple)', fontSize: '0.9rem', fontWeight: 600, background: 'rgba(124, 92, 252, 0.1)', padding: '4px 10px', borderRadius: '12px' }}>
              &uarr; 45%
            </div>
          </div>
        </motion.div>

      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        
        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Activity size={24} color="var(--accent-purple)" /> AI Flags by Department
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'var(--bg-tertiary)' }}
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
                itemStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
              />
              <Bar dataKey="flags" radius={[6, 6, 0, 0]} name="Total Flags" animationDuration={1500}>
                {analyticsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#7c5cfc' : '#4299e1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={24} color="var(--accent-blue)" /> System Audit Log
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.95rem' }}>
            {[
              { text: 'Policy updated by Dr. Smith', time: '10m ago' },
              { text: 'Case #402 resolved', time: '1h ago' },
              { text: 'Canvas LMS Sync Completed', time: '3h ago' },
              { text: 'New Faculty Account: E. Wong', time: '1d ago' }
            ].map((log, idx) => (
              <motion.div key={idx} whileHover={{ x: 5 }} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', transition: 'transform 0.2s' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{log.text}</span>
                <span style={{ color: 'var(--text-tertiary)' }}>{log.time}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.button whileHover={{ x: 5 }} style={{ marginTop: '24px', background: 'transparent', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontSize: '1rem', fontWeight: 600, padding: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            View Full Log <ArrowRight size={18} />
          </motion.button>
        </motion.div>

      </motion.div>
    </DashboardLayout>
  );
}
