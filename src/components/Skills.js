import React, { useState } from 'react';
import TechIcon from './TechIcon';
import LottieAnimation from './LottieAnimation';
import { skillsData } from '../data/portfolioData';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'backend', label: 'Backend & Frameworks' },
    { id: 'database', label: 'Databases & Caching' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'devops', label: 'DevOps & Tools' }
  ];

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="section skills-section">
      <div className="section-header">
        <span className="section-badge">
          <TechIcon name="FaCode" size={13} />
          <span>Technical Competencies</span>
        </span>
        <h2 className="section-title">
          Tech Stack & <span className="gradient-text">Engineering Skills</span>
        </h2>
        <p className="section-subtitle">
          Hands-on expertise across backend architectures, high-concurrency databases, and responsive modern frontends.
        </p>
      </div>

      <div className="skills-controls-bar">
        {/* Category Pills */}
        <div className="category-pills-row">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`cat-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search Filter */}
        <div className="skill-search-box">
          <TechIcon name="FaSearch" size={14} className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skill (e.g., Laravel, Redis, Docker)..."
            className="skill-search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="clear-search-btn">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="skills-grid">
        {filteredSkills.map((skill, index) => (
          <div key={index} className="skill-card">
            <div className="skill-card-top">
              <div
                className="skill-icon-container"
                style={{ backgroundColor: `${skill.color}15`, borderColor: `${skill.color}40` }}
              >
                <TechIcon name={skill.icon} size={28} color={skill.color} />
              </div>

              <div className="skill-title-block">
                <div className="skill-name-row">
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-percent-text">{skill.level}%</span>
                </div>
                <span className="skill-cat-tag">{skill.category}</span>
              </div>
            </div>

            <p className="skill-desc-text">{skill.desc}</p>

            {/* Proficiency Meter */}
            <div className="skill-meter-track">
              <div
                className="skill-meter-fill"
                style={{
                  width: `${skill.level}%`,
                  backgroundColor: skill.color
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="no-skills-found">
          <TechIcon name="FaSearch" size={32} className="mb-2 text-muted" />
          <p>No technologies matched "{searchTerm}". Try another keyword.</p>
        </div>
      )}

      {/* Feature banner with animated Lottie / Icons */}
      <div className="skills-highlight-banner mt-12">
        <div className="banner-lottie-side">
          <LottieAnimation iconFallback="SiLaravel" className="lottie-badge-anim" />
        </div>
        <div className="banner-content-side">
          <h4 className="banner-headline">Backend Mastery Grounded in SOLID Principles</h4>
          <p className="banner-body">
            Writing scalable PHP is more than just syntax; it requires thoughtful schema indexing in MySQL,
            careful transaction locks, and clean service abstractions so features scale seamlessly as user traffic surges.
          </p>
          <div className="banner-badges">
            <span className="banner-badge-item"><TechIcon name="FaCheckCircle" size={13} color="#10B981" /> Zero N+1 Queries</span>
            <span className="banner-badge-item"><TechIcon name="FaCheckCircle" size={13} color="#10B981" /> Strict Type Hints</span>
            <span className="banner-badge-item"><TechIcon name="FaCheckCircle" size={13} color="#10B981" /> Secure Password Hashing</span>
            <span className="banner-badge-item"><TechIcon name="FaCheckCircle" size={13} color="#10B981" /> Continuous Optimization</span>
          </div>
        </div>
      </div>
    </section>
  );
}
