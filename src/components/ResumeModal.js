import React, { useEffect } from 'react';
import TechIcon from './TechIcon';
import { personalInfo, experienceData, nexErpProject, educationData, languagesData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
LOGESHWARAN
PHP Laravel Developer
Email: ${personalInfo.email} | Phone: ${personalInfo.phone}
Location: ${personalInfo.location}

PROFILE
${personalInfo.bio}

WORK EXPERIENCE
CHERAN SOFTWARES (11/2024 – Present)
${experienceData[0].highlights.map((h) => `- ${h}`).join('\n')}

AWP GLOBAL SOLUTIONS (02/2024 – 08/2024)
${experienceData[1].highlights.map((h) => `- ${h}`).join('\n')}

PROJECTS
NexERP — Multi-Branch Enterprise Resource Planning System
${nexErpProject.overview}

EDUCATION
B.Sc. Information Technology (2021 – 2024)
Kathir College of Arts and Science

TECHNICAL SKILLS
- Backend: PHP (7.x/8.x), Laravel (10/11), RESTful APIs, Sanctum, Passport
- Databases: MySQL 8.4, Redis, Database Schema Design, Query Optimization
- Frontend: JavaScript, React 19, Tailwind CSS, Bootstrap, Zustand
- DevOps: Docker, Docker Compose, Nginx, Git, Postman, XAMPP

LANGUAGES
- Tamil (Native)
- English (Advanced)
    `.trim();

    navigator.clipboard.writeText(text);
    alert('Resume text copied to clipboard!');
  };

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Controls Header */}
        <div className="resume-modal-header no-print">
          <div className="modal-title-wrap">
            <TechIcon name="FaFilePdf" size={20} color="#FF2D20" />
            <span className="modal-header-title">Curriculum Vitae — {personalInfo.name}</span>
          </div>

          <div className="modal-actions-wrap">
            <button onClick={handlePrint} className="btn btn-primary btn-sm">
              <TechIcon name="FaDownload" size={14} />
              <span>Print / Save as PDF</span>
            </button>
            <button onClick={handleCopyText} className="btn btn-outline btn-sm">
              <TechIcon name="FaCopy" size={14} />
              <span>Copy Text</span>
            </button>
            <button onClick={onClose} className="action-icon-btn" aria-label="Close modal">
              <TechIcon name="FaTimes" size={18} />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="resume-paper" id="printable-resume">
          {/* Header */}
          <div className="resume-sheet-header">
            <div className="resume-header-titles">
              <h1 className="resume-person-name">{personalInfo.name.toUpperCase()}</h1>
              <h2 className="resume-person-title">{personalInfo.title}</h2>
            </div>

            <div className="resume-contact-block">
              <div>
                <TechIcon name="FaEnvelope" size={12} /> {personalInfo.email}
              </div>
              <div>
                <TechIcon name="FaPhone" size={12} /> {personalInfo.phone}
              </div>
              <div className="resume-address">
                <TechIcon name="FaMapMarkerAlt" size={12} /> {personalInfo.location}
              </div>
            </div>
          </div>

          <hr className="resume-divider" />

          {/* Profile Section */}
          <div className="resume-section">
            <h3 className="resume-heading">PROFILE</h3>
            <p className="resume-text">{personalInfo.bio}</p>
          </div>

          {/* Work Experience */}
          <div className="resume-section">
            <h3 className="resume-heading">WORK EXPERIENCE</h3>

            <div className="resume-entry">
              <div className="resume-entry-header">
                <span className="resume-company">CHERAN SOFTWARES</span>
                <span className="resume-dates">{experienceData[0].period}</span>
              </div>
              <div className="resume-role-sub">Backend Laravel Developer</div>
              <ul className="resume-bullet-list">
                {experienceData[0].highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="resume-entry">
              <div className="resume-entry-header">
                <span className="resume-company">AWP GLOBAL SOLUTIONS</span>
                <span className="resume-dates">{experienceData[1].period}</span>
              </div>
              <div className="resume-role-sub">Web Developer</div>
              <ul className="resume-bullet-list">
                {experienceData[1].highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Featured Project */}
          <div className="resume-section">
            <h3 className="resume-heading">PROJECTS</h3>
            <div className="resume-entry">
              <div className="resume-entry-header">
                <span className="resume-company">{nexErpProject.title}</span>
              </div>
              <p className="resume-text mb-2">{nexErpProject.overview}</p>
              <ul className="resume-bullet-list">
                {nexErpProject.architectureModules.map((mod, i) => (
                  <li key={i}>
                    <strong>{mod.title}:</strong> {mod.desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="resume-section">
            <h3 className="resume-heading">TECHNICAL SKILLS</h3>
            <div className="resume-skills-cols">
              <div>
                <strong>Backend & Core:</strong> PHP (7.x / 8.x), Laravel (10/11), RESTful APIs, Sanctum, Passport, Blade, SOLID
              </div>
              <div>
                <strong>Databases & Caching:</strong> MySQL 8.4, Redis, Schema Design, Indexing, Query Optimization, AVCO
              </div>
              <div>
                <strong>Frontend:</strong> React 19, JavaScript (ES6+), Tailwind CSS, Bootstrap, Zustand, TanStack Query
              </div>
              <div>
                <strong>DevOps & Tools:</strong> Docker & Docker Compose, Nginx Reverse Proxy, Git / GitHub, Postman, XAMPP
              </div>
            </div>
          </div>

          {/* Education & Languages */}
          <div className="resume-section">
            <div className="resume-split-grid">
              <div>
                <h3 className="resume-heading">EDUCATION</h3>
                <div className="resume-company">{educationData[0].degree}</div>
                <div className="resume-institution">{educationData[0].institution}</div>
                <div className="resume-dates">{educationData[0].period}</div>
              </div>

              <div>
                <h3 className="resume-heading">LANGUAGES</h3>
                {languagesData.map((lang, i) => (
                  <div key={i} className="resume-lang-row">
                    <strong>{lang.language}:</strong> {lang.proficiency}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
