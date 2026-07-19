import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--color-footer-bg)', borderTop: '1px solid var(--color-border)' }}>
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-30 pointer-events-none" style={{ background: 'var(--color-glow-1)', filter: 'blur(120px)' }} />

      <div className="container mx-auto max-w-7xl px-6 pt-20 pb-10 relative z-10">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-16">
          {/* Brand */}
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-accent to-brand-cyan opacity-80" />
                <div className="absolute inset-[2px] rounded-[10px] flex items-center justify-center" style={{ background: 'var(--color-footer-bg)' }}>
                  <span className="font-display font-black text-sm text-gradient-accent">A</span>
                </div>
              </div>
              <span className="font-display font-bold text-xl tracking-tight" style={{ color: 'var(--color-text)' }}>
                Authentraceio AI
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'var(--color-text-secondary)' }}>
              Transforming academic integrity from a punitive measure into a pedagogical conversation. Built for modern universities.
            </p>
            <div className="flex gap-3">
              {['GitHub', 'Twitter', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="px-4 py-2 rounded-xl text-xs font-medium transition-all hover:scale-105" style={{ background: 'var(--color-glass-bg)', border: '1px solid var(--color-glass-border)', color: 'var(--color-text-secondary)' }}>
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:w-2/3">
            <div className="flex flex-col gap-3">
              <h4 className="font-display font-semibold text-sm mb-2 tracking-wide" style={{ color: 'var(--color-accent)' }}>Platform</h4>
              {[
                { to: '/evidence-engine', label: 'Evidence Engine' },
                { to: '/dashboard/professor', label: 'Professor Dashboard' },
                { to: '/dashboard/student', label: 'Student Portal' },
                { to: '/admin', label: 'Admin Analytics' },
                { to: '/integrations', label: 'Integrations' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="text-sm transition-colors flex items-center gap-1 group" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="group-hover:text-brand-chartreuse transition-colors">{link.label}</span>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-display font-semibold text-sm mb-2 tracking-wide" style={{ color: 'var(--color-accent)' }}>Resources</h4>
              {[
                { to: '/documentation', label: 'Documentation' },
                { to: '/api', label: 'API Reference' },
                { to: '/pedagogical-guides', label: 'Pedagogical Guides' },
                { to: '/case-studies', label: 'Case Studies' },
                { to: '/blog', label: 'Blog' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="text-sm transition-colors group" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="group-hover:text-brand-chartreuse transition-colors">{link.label}</span>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
              <h4 className="font-display font-semibold text-sm mb-2 tracking-wide" style={{ color: 'var(--color-accent)' }}>Company</h4>
              {[
                { to: '/security', label: 'Security' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="text-sm transition-colors group" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="group-hover:text-brand-chartreuse transition-colors">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            &copy; {new Date().getFullYear()} Authentraceio AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { to: '/privacy', label: 'Privacy Policy' },
              { to: '/terms', label: 'Terms of Service' },
              { to: '/cookies', label: 'Cookie Policy' },
            ].map(link => (
              <Link key={link.to} to={link.to} className="text-sm transition-colors hover:text-brand-chartreuse" style={{ color: 'var(--color-text-muted)' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
