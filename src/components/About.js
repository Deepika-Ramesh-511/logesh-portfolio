import React from 'react';
import TechIcon from './TechIcon';
import InteractiveTerminal from './InteractiveTerminal';
import { personalInfo, languagesData } from '../data/portfolioData';
import profileImg from '../assets/profile.png';

export default function About() {
  const pillars = [
    {
      title: 'Clean Architecture & SOLID',
      desc: 'Adhering to single responsibility, interface segregation, and repository design patterns to engineer resilient, testable backend systems.',
      icon: 'FaCode',
      color: '#10B981'
    },
    {
      title: 'Database & Concurrency Tuning',
      desc: 'Mastery of MySQL 8.4 schema design, composite indexing, transaction isolation, and Redis in-memory caching to eliminate bottlenecks.',
      icon: 'SiMysql',
      color: '#00758F'
    },
    {
      title: 'API Security & RBAC',
      desc: 'Engineering bulletproof endpoints using Laravel Sanctum, Passport OAuth2, granular role-based permissions, and strict request validation.',
      icon: 'FaShieldAlt',
      color: '#FF2D20'
    },
    {
      title: 'Modern Full-Stack Synergy',
      desc: 'Connecting rock-solid PHP backend foundations with lightning-fast React 19 frontend interfaces powered by Zustand and Tailwind CSS.',
      icon: 'SiReact',
      color: '#06B6D4'
    }
  ];

  return (
    <section id="about" className="section about-section">
      <div className="section-header">
        <span className="section-badge">
          <TechIcon name="FaBriefcase" size={13} />
          <span>Professional Profile</span>
        </span>
        <h2 className="section-title">
          Engineering High-Performance <span className="gradient-text">Backend Systems</span>
        </h2>
        <p className="section-subtitle">
          A blend of rock-solid PHP/Laravel architecture, database query optimization, and modern React 19 development.
        </p>
      </div>

      <div className="about-grid">
        {/* Left Column: Narrative & Values */}
        <div className="about-narrative-card">
          <div className="card-top-header">
            <div className="profile-mini-header">
              <div className="mini-avatar-wrap">
                <img
                  src={profileImg}
                  alt={personalInfo.name}
                  className="mini-avatar-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = process.env.PUBLIC_URL + '/profile.png';
                  }}
                />
              </div>
              <div>
                <h3 className="about-name">{personalInfo.name}</h3>
                <p className="about-role-sub">{personalInfo.title} • Tirupur, India</p>
              </div>
            </div>
            <span className="experience-tag">2+ Yrs Professional Exp</span>
          </div>

          <p className="about-bio-text">
            {personalInfo.bio}
          </p>

          <div className="languages-strip">
            <span className="lang-label">Languages:</span>
            {languagesData.map((lang, idx) => (
              <div key={idx} className="lang-chip">
                <span className="lang-name">{lang.language}</span>
                <span className="lang-level">({lang.proficiency})</span>
              </div>
            ))}
          </div>

          {/* Pillars 2x2 grid */}
          <div className="pillars-grid">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="pillar-item">
                <div className="pillar-icon-box" style={{ borderColor: pillar.color, color: pillar.color }}>
                  <TechIcon name={pillar.icon} size={18} />
                </div>
                <div>
                  <h4 className="pillar-title">{pillar.title}</h4>
                  <p className="pillar-desc">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Artisan CLI Terminal */}
        <div className="about-terminal-container">
          <div className="terminal-intro-header">
            <TechIcon name="FaTerminal" size={16} className="text-laravel" />
            <span>Interactive Laravel Artisan Shell</span>
          </div>
          <InteractiveTerminal />
        </div>
      </div>
    </section>
  );
}
