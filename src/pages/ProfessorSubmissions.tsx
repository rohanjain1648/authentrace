import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Search, Filter, MoreVertical, FileText, Download, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const mockSubmissions = Array.from({ length: 25 }).map((_, i) => {
  const student = ['Alex Johnson', 'Sarah Smith', 'David Chen', 'Emily White', 'Michael T.', 'Jessica L.'][i % 6] ?? 'Unknown Student';
  const assignment = ['Final Thesis Draft', 'Midterm Essay', 'Lab Report 4', 'Literature Review', 'Chapter 2 Draft'][i % 5] ?? 'Assignment';
  const date = `${i % 5 + 1} days ago`;
  const risk = ['High', 'Low', 'Medium', 'Low', 'Low'][i % 5] ?? 'Low';
  const status = ['Flagged', 'Cleared', 'Review', 'Cleared', 'Cleared'][i % 5] ?? 'Cleared';
  const score = [94, 12, 65, 8, 4][i % 5] ?? 0;
  return { id: `SUB-10${25 - i}`, student, assignment, date, risk, status, score };
});

export function ProfessorSubmissions() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <DashboardLayout role="professor">
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>All Submissions</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>View and filter all student submissions across your courses.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '10px 20px', borderRadius: '12px', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500 }}>
            <Filter size={18} /> Filter
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>
            <Download size={18} /> Export CSV
          </motion.button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="text" placeholder="Search by student name or ID..." style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', transition: 'border-color 0.2s', outline: 'none' }} onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'} onBlur={e => e.target.style.borderColor = 'var(--border-color)'} />
          </div>
          <select style={{ padding: '14px 20px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}>
            <option>All Assignments</option>
            <option>Final Thesis Draft</option>
            <option>Midterm Essay</option>
            <option>Lab Report 4</option>
          </select>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <motion.table variants={containerVariants} initial="hidden" animate="visible" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>ID</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Student</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Assignment</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>AI Score</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}></th>
              </tr>
            </thead>
            <tbody>
              {mockSubmissions.map((sub, idx) => (
                <motion.tr variants={itemVariants} key={sub.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '20px 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{sub.id}</td>
                  <td style={{ padding: '20px 24px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem' }}>
                        {sub.student.charAt(0)}
                      </div>
                      {sub.student}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={16} style={{ color: 'var(--text-secondary)' }} />
                      {sub.assignment}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{sub.date}</td>
                  <td style={{ padding: '20px 24px', fontSize: '1rem', fontWeight: 700 }}>
                    <span style={{ color: sub.score > 80 ? '#e53e3e' : sub.score > 40 ? 'var(--accent-orange)' : '#38a169' }}>
                      {sub.score}%
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '0.9rem' }}>
                    <span style={{ 
                      padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700,
                      background: sub.status === 'Flagged' ? 'rgba(229, 62, 62, 0.1)' : sub.status === 'Review' ? 'rgba(237, 137, 54, 0.1)' : 'rgba(56, 161, 105, 0.1)',
                      color: sub.status === 'Flagged' ? '#e53e3e' : sub.status === 'Review' ? 'var(--accent-orange)' : '#38a169',
                      border: `1px solid ${sub.status === 'Flagged' ? 'rgba(229, 62, 62, 0.2)' : sub.status === 'Review' ? 'rgba(237, 137, 54, 0.2)' : 'rgba(56, 161, 105, 0.2)'}`
                    }}>
                      {sub.status}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '8px', borderRadius: '50%', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <ChevronRight size={20} />
                    </button>
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
