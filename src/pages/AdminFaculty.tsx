import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Search, Filter, TrendingUp, TrendingDown, Users, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const faculty = [
  { id: 'FAC-001', name: 'Dr. Emily Chen', dept: 'Computer Science', flags: 42, rate: 'High' },
  { id: 'FAC-002', name: 'Prof. Mark Davis', dept: 'English', flags: 5, rate: 'Low' },
  { id: 'FAC-003', name: 'Dr. Sarah Smith', dept: 'History', flags: 12, rate: 'Average' },
  { id: 'FAC-004', name: 'Prof. John Doe', dept: 'Physics', flags: 2, rate: 'Low' },
  { id: 'FAC-005', name: 'Dr. Jane Roe', dept: 'Business', flags: 89, rate: 'High' },
];

export function AdminFaculty() {
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
          <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Faculty Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Identify flagging trends and departments requiring AI literacy training.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="text" placeholder="Search faculty..." style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', transition: 'border-color 0.2s', outline: 'none' }} onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'} onBlur={e => e.target.style.borderColor = 'var(--border-color)'} />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '14px 20px', borderRadius: '12px', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500, fontSize: '1rem' }}>
            <Filter size={18} /> Filter Department
          </motion.button>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <motion.table variants={containerVariants} initial="hidden" animate="visible" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Name</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Department</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Total AI Flags (Term)</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Flagging Rate</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}></th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((fac, idx) => (
                <motion.tr variants={itemVariants} key={fac.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '20px 24px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <GraduationCap size={20} />
                      </div>
                      {fac.name}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BookOpen size={16} color="var(--text-secondary)" />
                      {fac.dept}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{fac.flags}</td>
                  <td style={{ padding: '20px 24px', fontSize: '0.95rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: fac.rate === 'High' ? '#e53e3e' : fac.rate === 'Average' ? 'var(--accent-orange)' : '#38a169', fontWeight: 600, background: fac.rate === 'High' ? 'rgba(229, 62, 62, 0.1)' : fac.rate === 'Average' ? 'rgba(237, 137, 54, 0.1)' : 'rgba(56, 161, 105, 0.1)', padding: '6px 12px', borderRadius: '20px' }}>
                      {fac.rate === 'High' ? <TrendingUp size={16} /> : fac.rate === 'Low' ? <TrendingDown size={16} /> : null}
                      {fac.rate}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ color: 'var(--text-primary)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                      Recommend Training <ChevronRight size={16} />
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
