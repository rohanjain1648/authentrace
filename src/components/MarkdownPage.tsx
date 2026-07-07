import React from 'react';
import { PublicLayout } from './PublicLayout';

interface MarkdownPageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function MarkdownPage({ title, subtitle, children }: MarkdownPageProps) {
  return (
    <PublicLayout>
      <div className="container" style={{ maxWidth: '800px', paddingTop: '64px' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 700, 
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          marginBottom: '16px'
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-secondary)',
            marginBottom: '48px',
            lineHeight: 1.6
          }}>
            {subtitle}
          </p>
        )}
        
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '48px',
          color: 'var(--text-primary)',
          lineHeight: 1.8,
          fontSize: '1.05rem'
        }} className="markdown-content">
          {children}
        </div>
      </div>
    </PublicLayout>
  );
}
