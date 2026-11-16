import React from 'react';
import TechIcon from './TechIcon';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrap">
      <div className="footer-container">
        <div className="footer-main-row">
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="brand-icon-box">
                <TechIcon name="SiLaravel" size={20} />
              </div>
              <div className="brand-text-wrap">
                <span className="brand-name">{personalInfo.name}</span>
                <span className="brand-role">PHP Laravel Developer</span>
              </div>
            </div>
            <p className="footer-tagline">
              Crafting high-scale backend architectures, optimized database ledgers, and responsive modern user interfaces.
            </p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <div className="footer-links-list">
              <a href="#about" className="footer-link">About</a>
              <a href="#skills" className="footer-link">Skills</a>
              <a href="#nexerp" className="footer-link">NexERP Project</a>
              <a href="#architecture" className="footer-link">Architecture</a>
              <a href="#experience" className="footer-link">Experience</a>
              <a href="#api-sandbox" className="footer-link">API Sandbox</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
          </div>

          <div className="footer-contact-col">
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <TechIcon name="FaEnvelope" size={13} color="#FF2D20" />
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </div>
              <div className="footer-contact-row">
                <TechIcon name="FaPhone" size={13} color="#06B6D4" />
                <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
              </div>
              <div className="footer-contact-row">
                <TechIcon name="FaMapMarkerAlt" size={13} color="#10B981" />
                <span>Tirupur - 641652, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved. Designed with precision & clean code.
          </div>

          <button onClick={scrollToTop} className="back-to-top-btn" title="Back to top">
            <span>Back to top</span>
            <TechIcon name="FaArrowRight" size={12} className="rotate-up" />
          </button>
        </div>
      </div>
    </footer>
  );
}
