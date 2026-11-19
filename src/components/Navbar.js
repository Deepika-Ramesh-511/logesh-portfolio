import React, { useState, useEffect } from 'react';
import TechIcon from './TechIcon';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ theme, toggleTheme, onOpenResume, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'about',
        'skills',
        'nexerp', 'architecture', 'crud-manager', 'experience', 'api-sandbox', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'NexERP', href: '#nexerp', id: 'nexerp' },
    { label: 'Architecture', href: '#architecture', id: 'architecture' },
    { label: 'CRUD Manager', href: '#crud-manager', id: 'crud-manager' },
    { label: 'API Sandbox', href: '#api-sandbox', id: 'api-sandbox' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand */}
        <a href="#hero" className="brand-logo" onClick={() => setActiveSection('hero')}>
          <div className="brand-icon-box">
            <TechIcon name="SiLaravel" size={20} className="brand-laravel-icon" />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-name">{personalInfo.name}</span>
            <span className="brand-role">Laravel Dev</span>
          </div>
          <span className="availability-dot" title="Available for immediate hiring" />
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.label}
              {activeSection === link.id && <span className="active-glow-pill" />}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="action-icon-btn"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            <TechIcon name={theme === 'dark' ? 'FaSun' : 'FaMoon'} size={16} />
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={onOpenResume}
            className="btn btn-outline btn-sm resume-btn"
            title="Preview and download formatted CV"
          >
            <TechIcon name="FaFilePdf" size={14} />
            <span>CV</span>
          </button>

          {/* Quick Hire CTA */}
          <a href="#contact" className="btn btn-primary btn-sm hire-btn">
            <TechIcon name="FaPaperPlane" size={13} />
            <span>Hire Me</span>
          </a>

          {/* Logout Action */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="action-icon-btn logout-nav-btn"
              aria-label="Logout"
              title="Lock & Log out of portfolio"
            >
              <TechIcon name="FaSignOutAlt" size={15} />
            </button>
          )}

          {/* Mobile Hamburger Button */}
          <button
            className="action-icon-btn mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <TechIcon name={mobileMenuOpen ? 'FaTimes' : 'FaBars'} size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="brand-logo">
                <div className="brand-icon-box">
                  <TechIcon name="SiLaravel" size={18} />
                </div>
                <span className="brand-name">{personalInfo.name}</span>
              </div>
              <button
                className="action-icon-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <TechIcon name="FaTimes" size={18} />
              </button>
            </div>

            <div className="mobile-nav-links">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <TechIcon name="FaArrowRight" size={12} className="mobile-arrow" />
                </a>
              ))}
            </div>

            <div className="mobile-drawer-footer">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="btn btn-outline w-full mb-2"
              >
                <TechIcon name="FaFilePdf" size={16} />
                <span>View Full Resume</span>
              </button>
              <a
                href="#contact"
                className="btn btn-primary w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <TechIcon name="FaPaperPlane" size={16} />
                <span>Get In Touch</span>
              </a>

              {onLogout && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="btn btn-ghost w-full mt-2"
                >
                  <TechIcon name="FaSignOutAlt" size={15} />
                  <span>Lock & Log Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
