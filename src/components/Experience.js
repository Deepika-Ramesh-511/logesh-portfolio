import React from 'react';
import TechIcon from './TechIcon';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="section-header">
        <span className="section-badge">
          <TechIcon name="FaBriefcase" size={13} />
          <span>Career Milestones</span>
        </span>
        <h2 className="section-title">
          Professional <span className="gradient-text">Work Experience</span>
        </h2>
        <p className="section-subtitle">
          Proven track record architecting production backends, building RESTful APIs, and optimizing database performance.
        </p>
      </div>

      <div className="experience-timeline">
        {experienceData.map((exp, idx) => (
          <div key={idx} className="timeline-item">
            {/* Timeline node & connector */}
            <div className="timeline-marker">
              <div className="marker-dot">
                <TechIcon name="SiLaravel" size={16} color="#FF2D20" />
              </div>
              {idx < experienceData.length - 1 && <div className="marker-line" />}
            </div>

            {/* Timeline content card */}
            <div className="timeline-card">
              <div className="exp-card-header">
                <div>
                  <div className="exp-company-row">
                    <h3 className="exp-company">{exp.company}</h3>
                    <span className="exp-type-tag">{exp.type}</span>
                  </div>
                  <h4 className="exp-role">{exp.role}</h4>
                </div>

                <div className="exp-meta-badge">
                  <div className="exp-period">
                    <TechIcon name="FaRegClock" size={12} className="mr-1" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="exp-location">
                    <TechIcon name="FaMapMarkerAlt" size={11} className="mr-1" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Achievements list */}
              <ul className="exp-highlights-list">
                {exp.highlights.map((item, hIdx) => (
                  <li key={hIdx} className="exp-highlight-item">
                    <TechIcon name="FaCheckCircle" size={14} color="#10B981" className="highlight-bullet" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="exp-tech-row">
                <span className="exp-tech-label">Technologies:</span>
                <div className="exp-tech-pills">
                  {exp.tech.map((t, tIdx) => (
                    <span key={tIdx} className="exp-tech-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
