import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Search, Filter, MoreVertical, FileText } from 'lucide-react';

const mockSubmissions = Array.from({ length: 25 }).map((_, i) => {
  const student = ['Alex Johnson', 'Sarah Smith', 'David Chen', 'Emily White', 'Michael T.', 'Jessica L.'][i % 6] ?? 'Unknown Student';
  const assignment = ['Final Thesis Draft', 'Midterm Essay', 'Lab Report 4', 'Literature Review', 'Chapter 2 Draft'][i % 5] ?? 'Assignment';
  const date = `${i % 5} days ago`;
  const risk = ['High', 'Low', 'Medium', 'Low', 'Low'][i % 5] ?? 'Low';
  const status = ['Flagged', 'Cleared', 'Review', 'Cleared', 'Cleared'][i % 5] ?? 'Cleared';
  const score = [94, 12, 65, 8, 4][i % 5] ?? 0;
  return { id: `SUB-10${25 - i}`, student, assignment, date, risk, status, score };
});

export function ProfessorSubmissions() {
  return (
    <DashboardLayout role="professor">
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '8px' }}>All Submissions</h1>
          <p style={{ color: 'var(--text-secondary)' }}>View and filter all student submissions across your courses.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '8px 16px', borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <Filter size={16} /> Filter
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
            Export CSV
          </button>
        </div>
      </div>

      <div className="metric-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="text" placeholder="Search by student name or ID..." style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
          </div>
          <select style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <option>All Assignments</option>
            <option>Final Thesis Draft</option>
            <option>Midterm Essay</option>
          </select>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <th style={{ padding: '12px 24px', fontWeight: 500 }}>ID</th>
              <th style={{ padding: '12px 24px', fontWeight: 500 }}>Student</th>
              <th style={{ padding: '12px 24px', fontWeight: 500 }}>Assignment</th>
              <th style={{ padding: '12px 24px', fontWeight: 500 }}>Date</th>
              <th style={{ padding: '12px 24px', fontWeight: 500 }}>AI Score</th>
              <th style={{ padding: '12px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '12px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            {mockSubmissions.map(sub => (
              <tr key={sub.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{sub.id}</td>
                <td style={{ padding: '16px 24px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))' }}></div>
                    {sub.student}
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={16} style={{ color: 'var(--text-secondary)' }} />
                    {sub.assignment}
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{sub.date}</td>
                <td style={{ padding: '16px 24px', fontSize: '0.9rem', fontWeight: 500 }}>
                  <span style={{ color: sub.score > 80 ? '#e53e3e' : sub.score > 40 ? 'var(--accent-orange)' : '#38a169' }}>
                    {sub.score}%
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '0.9rem' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                    background: sub.status === 'Flagged' ? 'rgba(229, 62, 62, 0.1)' : sub.status === 'Review' ? 'rgba(237, 137, 54, 0.1)' : 'rgba(56, 161, 105, 0.1)',
                    color: sub.status === 'Flagged' ? '#e53e3e' : sub.status === 'Review' ? 'var(--accent-orange)' : '#38a169'
                  }}>
                    {sub.status}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
