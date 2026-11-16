import React, { useState, useEffect } from 'react';
import TechIcon from './TechIcon';
import { personalInfo } from '../data/portfolioData';
import profileImg from '../assets/profile.png';

const titles = [
  'PHP Laravel Developer',
  'Enterprise ERP Architect',
  'MySQL & Query Optimizer',
  'RESTful API Engineer',
  'Full-Stack Developer (React 19)'
];

export default function Hero({ onOpenResume }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    const updateSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.substring(0, displayText.length + 1));
        if (displayText.length === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(current.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, updateSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid">
        {/* Left Column: Text & Actions */}
        <div className="hero-content">
          <div className="hero-status-pill">
            <span className="beacon-dot" />
            <span className="status-text">{personalInfo.status}</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
            <br />
            <span className="hero-dynamic-role">
              {displayText}
              <span className="cursor-blink">|</span>
            </span>
          </h1>

          <p className="hero-description">
            Backend Developer with professional experience designing, building, and maintaining scalable web
            applications using <strong>PHP</strong> and the <strong>Laravel framework</strong>. Proven track record in engineering secure RESTful APIs,
            optimizing MySQL performance, and integrating modern <strong>React 19</strong> user interfaces.
          </p>

          {/* Quick CTA buttons */}
          <div className="hero-actions">
            <a href="#nexerp" className="btn btn-primary btn-lg">
              <TechIcon name="FaNetworkWired" size={18} />
              <span>Explore NexERP</span>
              <TechIcon name="FaArrowRight" size={14} className="btn-arrow" />
            </a>

            <button onClick={onOpenResume} className="btn btn-outline btn-lg">
              <TechIcon name="FaDownload" size={17} />
              <span>Download CV</span>
            </button>

            <a href="#contact" className="btn btn-ghost btn-lg">
              <TechIcon name="FaEnvelope" size={16} />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Contact Fast Copy Strip */}
          <div className="hero-quick-contact">
            <button
              onClick={handleCopyEmail}
              className="quick-contact-chip"
              title="Click to copy email address"
            >
              <TechIcon name="FaEnvelope" size={14} className="chip-icon text-laravel" />
              <span>{personalInfo.email}</span>
              <span className="copy-badge">{copiedEmail ? 'Copied!' : 'Copy'}</span>
            </button>

            <a href={`tel:${personalInfo.phone}`} className="quick-contact-chip">
              <TechIcon name="FaPhone" size={14} className="chip-icon text-cyan" />
              <span>{personalInfo.phone}</span>
            </a>

            <div className="quick-contact-chip">
              <TechIcon name="FaMapMarkerAlt" size={14} className="chip-icon text-emerald" />
              <span>Tirupur, India</span>
            </div>
          </div>

          {/* Tech stack badge row */}
          <div className="hero-tech-stack">
            <span className="tech-stack-label">Core Technologies:</span>
            <div className="tech-pill-row">
              <span className="tech-pill"><TechIcon name="SiLaravel" size={14} color="#FF2D20" /> Laravel</span>
              <span className="tech-pill"><TechIcon name="SiPhp" size={14} color="#777BB4" /> PHP 8.x</span>
              <span className="tech-pill"><TechIcon name="SiMysql" size={14} color="#00758F" /> MySQL 8.4</span>
              <span className="tech-pill"><TechIcon name="SiRedis" size={14} color="#DC2626" /> Redis</span>
              <span className="tech-pill"><TechIcon name="SiDocker" size={14} color="#2496ED" /> Docker</span>
              <span className="tech-pill"><TechIcon name="SiReact" size={14} color="#61DAFB" /> React 19</span>
              <span className="tech-pill"><TechIcon name="SiTailwindcss" size={14} color="#38BDF8" /> Tailwind</span>
              <span className="tech-pill"><TechIcon name="SiNginx" size={14} color="#009639" /> Nginx</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Profile Card */}
        <div className="hero-visual">
          <div className="profile-card-container">
            {/* Glowing orb behind */}
            <div className="profile-glow-ring" />

            <div className="profile-card">
              <div className="profile-image-frame">
                <img
                  src={profileImg}
                  alt={personalInfo.name}
                  className="profile-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = process.env.PUBLIC_URL + '/profile.png';
                  }}
                />
                <div className="profile-gradient-overlay" />
                <div className="verified-badge" title="Verified Backend Developer">
                  <TechIcon name="FaCheckCircle" size={18} color="#10B981" />
                </div>
              </div>

              {/* Floating badges around photo */}
              <div className="floating-badge badge-top-left">
                <TechIcon name="SiLaravel" size={20} color="#FF2D20" />
                <div>
                  <div className="badge-text-bold">Laravel 11</div>
                  <div className="badge-text-sub">Clean Architecture</div>
                </div>
              </div>

              <div className="floating-badge badge-bottom-right">
                <TechIcon name="SiMysql" size={22} color="#00758F" />
                <div>
                  <div className="badge-text-bold">MySQL 8.4</div>
                  <div className="badge-text-sub">65% Faster Queries</div>
                </div>
              </div>

              <div className="floating-badge badge-top-right">
                <TechIcon name="SiDocker" size={20} color="#2496ED" />
                <div>
                  <div className="badge-text-bold">Dockerized</div>
                  <div className="badge-text-sub">Micro-Services</div>
                </div>
              </div>

              <div className="floating-badge badge-bottom-left">
                <TechIcon name="SiReact" size={20} color="#61DAFB" />
                <div>
                  <div className="badge-text-bold">React 19</div>
                  <div className="badge-text-sub">Zustand State</div>
                </div>
              </div>

              <div className="profile-footer-strip">
                <div className="profile-stat-box">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Years Exp</span>
                </div>
                <div className="stat-divider" />
                <div className="profile-stat-box">
                  <span className="stat-number">NexERP</span>
                  <span className="stat-label">Flagship Project</span>
                </div>
                <div className="stat-divider" />
                <div className="profile-stat-box">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">SOLID Clean Code</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
