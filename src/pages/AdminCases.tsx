import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Search, Filter, AlertTriangle, Download, ChevronRight, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

const cases = [
  { id: 'CASE-405', student: 'Alex Johnson', course: 'CS 301', status: 'Under Investigation', date: 'Oct 24, 2025' },
  { id: 'CASE-404', student: 'Michael T.', course: 'ENG 101', status: 'Pending Oral Defense', date: 'Oct 22, 2025' },
  { id: 'CASE-402', student: 'Sarah Smith', course: 'HIS 202', status: 'Resolved - Warning', date: 'Oct 15, 2025' },
];

export function AdminCases() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <DashboardLayout role="admin">
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Integrity Cases</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Manage and audit university-wide academic integrity investigations.</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>
          <Download size={18} /> Export Report
        </motion.button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="text" placeholder="Search case ID or student..." style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', transition: 'border-color 0.2s', outline: 'none' }} onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'} onBlur={e => e.target.style.borderColor = 'var(--border-color)'} />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '14px 20px', borderRadius: '12px', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500, fontSize: '1rem' }}>
            <Filter size={18} /> Filter Status
          </motion.button>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <motion.table variants={containerVariants} initial="hidden" animate="visible" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Case ID</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Student</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Course</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Date Opened</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}></th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c, idx) => (
                <motion.tr variants={itemVariants} key={c.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '20px 24px', fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Scale size={16} color="var(--accent-purple)" />
                      {c.id}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.student}</td>
                  <td style={{ padding: '20px 24px', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{c.course}</td>
                  <td style={{ padding: '20px 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{c.date}</td>
                  <td style={{ padding: '20px 24px', fontSize: '0.9rem' }}>
                    <span style={{ 
                      padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700,
                      background: c.status.includes('Resolved') ? 'rgba(56, 161, 105, 0.1)' : 'rgba(237, 137, 54, 0.1)',
                      color: c.status.includes('Resolved') ? '#38a169' : 'var(--accent-orange)',
                      border: `1px solid ${c.status.includes('Resolved') ? 'rgba(56, 161, 105, 0.2)' : 'rgba(237, 137, 54, 0.2)'}`
                    }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                    <motion.button whileHover={{ scale: 1.05, x: 5 }} style={{ color: 'var(--accent-blue)', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', width: '100%' }}>
                      View Dossier <ChevronRight size={16} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
