import React from 'react';
import TechIcon from './TechIcon';
import { educationData, languagesData } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="section education-section">
      <div className="section-header">
        <span className="section-badge">
          <TechIcon name="FaGraduationCap" size={13} />
          <span>Academic Foundation & Languages</span>
        </span>
        <h2 className="section-title">
          Education & <span className="gradient-text">Communication</span>
        </h2>
        <p className="section-subtitle">
          Solid theoretical grounding in computer science and information systems paired with clear technical communication.
        </p>
      </div>

      <div className="education-grid">
        {/* Left: Academic Degree */}
        <div className="education-card">
          <div className="edu-card-top">
            <div className="edu-icon-wrap">
              <TechIcon name="FaGraduationCap" size={26} color="#06B6D4" />
            </div>
            <div>
              <span className="edu-period">{educationData[0].period}</span>
              <h3 className="edu-degree">{educationData[0].degree}</h3>
              <h4 className="edu-institution">{educationData[0].institution}</h4>
            </div>
          </div>

          <p className="edu-description">{educationData[0].description}</p>

          <div className="edu-key-topics">
            <span className="topic-tag">Relational Database Systems (RDBMS)</span>
            <span className="topic-tag">Object-Oriented Design</span>
            <span className="topic-tag">Data Structures & Algorithms</span>
            <span className="topic-tag">Web Technologies</span>
            <span className="topic-tag">Computer Networks</span>
          </div>
        </div>

        {/* Right: Languages & Communication */}
        <div className="languages-card">
          <div className="lang-card-header">
            <div className="edu-icon-wrap">
              <TechIcon name="FaEnvelope" size={24} color="#10B981" />
            </div>
            <div>
              <h3 className="lang-section-title">Languages & Collaboration</h3>
              <p className="lang-section-sub">Fluent technical discussions, documentation, and agile team communication.</p>
            </div>
          </div>

          <div className="languages-progress-list">
            {languagesData.map((item, idx) => (
              <div key={idx} className="lang-progress-item">
                <div className="lang-progress-label">
                  <span className="lang-name-bold">{item.language}</span>
                  <span className="lang-level-badge">{item.proficiency}</span>
                </div>
                <div className="lang-meter-track">
                  <div
                    className="lang-meter-fill"
                    style={{
                      width: `${item.level}%`,
                      backgroundColor: idx === 0 ? '#10B981' : '#06B6D4'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="lang-callout-box">
            <TechIcon name="FaCheckCircle" size={16} color="#10B981" />
            <span>Adept at collaborative Git workflows, code reviews, Postman API documentation, and cross-functional team delivery.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
