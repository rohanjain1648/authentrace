import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function PublicNavbar() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/evidence-engine', label: 'Evidence Engine' },
    { to: '/integrations', label: 'Integrations' },
    { to: '/case-studies', label: 'Institutions' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
              scrolled
                ? 'glass-panel shadow-lg'
                : 'bg-transparent border border-transparent'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-accent to-brand-cyan opacity-80" />
                <div className="absolute inset-[2px] rounded-[10px] flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
                  <span className="font-display font-black text-sm text-gradient-accent">A</span>
                </div>
              </div>
              <span className="font-display font-bold text-xl tracking-tight" style={{ color: 'var(--color-text)' }}>
                Authentraceio
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium tracking-wide transition-colors hover:text-brand-chartreuse"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: 'var(--color-glass-bg)', border: '1px solid var(--color-glass-border)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun size={18} style={{ color: 'var(--color-accent)' }} />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon size={18} style={{ color: 'var(--color-purple)' }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Sign In */}
              <Link to="/dashboard/professor" className="hidden sm:block">
                <button className="text-sm font-medium px-4 py-2 rounded-xl transition-colors" style={{ color: 'var(--color-text-secondary)' }}>
                  Sign in
                </button>
              </Link>

              {/* CTA Button */}
              <Link to="/dashboard/professor" className="hidden sm:block">
                <button className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-brand-chartreuse text-brand-dark hover:bg-brand-chartreuseHover transition-all shadow-[0_0_20px_rgba(200,255,0,0.3)] btn-shimmer">
                  Dashboard
                </button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--color-glass-bg)', border: '1px solid var(--color-glass-border)' }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} style={{ color: 'var(--color-text)' }} /> : <Menu size={18} style={{ color: 'var(--color-text)' }} />}
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute top-20 left-4 right-4 glass-panel p-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-base font-medium py-2 transition-colors hover:text-brand-chartreuse"
                  style={{ color: 'var(--color-text)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t pt-4 flex flex-col gap-3" style={{ borderColor: 'var(--color-border)' }}>
                <Link to="/dashboard/professor" onClick={() => setMobileOpen(false)}>
                  <button className="w-full px-5 py-3 text-sm font-semibold rounded-xl bg-brand-chartreuse text-brand-dark hover:bg-brand-chartreuseHover transition-all">
                    Dashboard
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
