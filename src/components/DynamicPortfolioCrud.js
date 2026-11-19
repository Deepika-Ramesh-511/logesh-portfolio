import React, { useState, useEffect } from 'react';
import TechIcon from './TechIcon';
import {
  DEFAULT_PORTFOLIO_COLLECTION,
  getFlatBracketMap
} from '../data/portfolioStoreData';
import {
  getApiBaseUrl,
  setApiBaseUrl,
  getStoredCollection,
  showPortfolio,
  storePortfolio,
  updatePortfolio,
  destroyPortfolio,
  pingPortfolioApi
} from '../services/portfolioApi';

export default function DynamicPortfolioCrud({ onDataUpdated }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState(() => getStoredCollection());
  const [apiBaseUrl, setApiBaseUrlState] = useState(() => getApiBaseUrl());
  const [targetId, setTargetId] = useState('1');
  const [sendAsFormData, setSendAsFormData] = useState(false);

  const [loading, setLoading] = useState(false);
  const [apiLog, setApiLog] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [serverStatus, setServerStatus] = useState({ checked: false, online: false });

  useEffect(() => {
    checkServer();
  }, []);

  const checkServer = async () => {
    const res = await pingPortfolioApi();
    setServerStatus({ checked: true, online: res.online, status: res.status, error: res.error });
  };

  const handleBaseUrlChange = (e) => {
    const val = e.target.value;
    setApiBaseUrlState(val);
    setApiBaseUrl(val);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset form fields to Logeshwaran\'s default seed collection?')) {
      setFormData(JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_COLLECTION)));
      setStatusMessage({ type: 'info', text: 'Form populated with Logeshwaran\'s exact resume collection!' });
    }
  };

  const handleProfileChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handleExpChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.experiences];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experiences: updated };
    });
  };

  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          company: 'NEW COMPANY',
          role: 'Backend Developer',
          location: 'Remote / On-site',
          start_date: '2024-01-01',
          end_date: '',
          is_current: 1,
          sort_order: prev.experiences.length + 1,
          highlights: ['Engineered scalable microservices with Laravel and MySQL.']
        }
      ]
    }));
  };

  const handleRemoveExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
  };

  const handleAddHighlight = (expIndex) => {
    setFormData((prev) => {
      const updated = [...prev.experiences];
      updated[expIndex].highlights = [...updated[expIndex].highlights, 'New achievement or architectural milestone...'];
      return { ...prev, experiences: updated };
    });
  };

  const handleHighlightChange = (expIndex, hlIndex, value) => {
    setFormData((prev) => {
      const updated = [...prev.experiences];
      updated[expIndex].highlights[hlIndex] = value;
      return { ...prev, experiences: updated };
    });
  };

  const handleRemoveHighlight = (expIndex, hlIndex) => {
    setFormData((prev) => {
      const updated = [...prev.experiences];
      updated[expIndex].highlights = updated[expIndex].highlights.filter((_, i) => i !== hlIndex);
      return { ...prev, experiences: updated };
    });
  };

  const handleCategoryNameChange = (catIndex, name) => {
    setFormData((prev) => {
      const updated = [...prev.skill_categories];
      updated[catIndex].name = name;
      return { ...prev, skill_categories: updated };
    });
  };

  const handleAddSkillToCat = (catIndex, skillName) => {
    if (!skillName.trim()) return;
    setFormData((prev) => {
      const updated = [...prev.skill_categories];
      updated[catIndex].skills = [...updated[catIndex].skills, { name: skillName.trim() }];
      return { ...prev, skill_categories: updated };
    });
  };

  const handleRemoveSkillFromCat = (catIndex, skillIndex) => {
    setFormData((prev) => {
      const updated = [...prev.skill_categories];
      updated[catIndex].skills = updated[catIndex].skills.filter((_, i) => i !== skillIndex);
      return { ...prev, skill_categories: updated };
    });
  };

  const handleAddCategory = () => {
    setFormData((prev) => ({
      ...prev,
      skill_categories: [
        ...prev.skill_categories,
        {
          name: 'Cloud & Infrastructure',
          sort_order: prev.skill_categories.length + 1,
          skills: [{ name: 'AWS' }, { name: 'Linux' }]
        }
      ]
    }));
  };

  const handleRemoveCategory = (catIndex) => {
    setFormData((prev) => ({
      ...prev,
      skill_categories: prev.skill_categories.filter((_, i) => i !== catIndex)
    }));
  };

  const handleProjectChange = (projIndex, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.projects];
      updated[projIndex] = { ...updated[projIndex], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const handleAddProjectSkill = (projIndex, skillName) => {
    if (!skillName.trim()) return;
    setFormData((prev) => {
      const updated = [...prev.projects];
      updated[projIndex].skills = [...(updated[projIndex].skills || []), skillName.trim()];
      return { ...prev, projects: updated };
    });
  };

  const handleRemoveProjectSkill = (projIndex, sIndex) => {
    setFormData((prev) => {
      const updated = [...prev.projects];
      updated[projIndex].skills = updated[projIndex].skills.filter((_, i) => i !== sIndex);
      return { ...prev, projects: updated };
    });
  };

  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: 'New Laravel System',
          subtitle: 'Enterprise Microservice Platform',
          summary: 'High performance API and distributed processing system.',
          architecture_notes: 'RESTful clean architecture with MySQL and Redis.',
          is_featured: 1,
          sort_order: prev.projects.length + 1,
          skills: ['Laravel', 'MySQL', 'Redis']
        }
      ]
    }));
  };

  const handleRemoveProject = (projIndex) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== projIndex)
    }));
  };

  const handleEduChange = (eduIndex, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.educations];
      updated[eduIndex] = { ...updated[eduIndex], [field]: value };
      return { ...prev, educations: updated };
    });
  };

  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educations: [
        ...prev.educations,
        {
          degree: 'B.Sc. Information Technology',
          institution: 'College of Arts and Science',
          location: 'Coimbatore, Tamil Nadu',
          start_year: 2021,
          end_year: 2024
        }
      ]
    }));
  };

  const handleRemoveEducation = (eduIndex) => {
    setFormData((prev) => ({
      ...prev,
      educations: prev.educations.filter((_, i) => i !== eduIndex)
    }));
  };

  const handleLangChange = (lIndex, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.languages];
      updated[lIndex] = { ...updated[lIndex], [field]: value };
      return { ...prev, languages: updated };
    });
  };

  const handleAddLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      languages: [...prev.languages, { name: 'Language', proficiency: 'Professional' }]
    }));
  };

  const handleRemoveLanguage = (lIndex) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== lIndex)
    }));
  };

  const handleStore = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const res = await storePortfolio(formData, sendAsFormData);
    setLoading(false);
    setApiLog(res);

    if (res.success) {
      setStatusMessage({
        type: 'success',
        text: `POST /portfolio succeeded (HTTP ${res.status}). Stored collection! ${res.notice || ''}`
      });
      if (onDataUpdated) onDataUpdated(formData);
    } else {
      setStatusMessage({
        type: 'error',
        text: `POST /portfolio failed (HTTP ${res.status}): ${res.error}`
      });
    }
  };

  // UPDATE: PUT /portfolio/{id}
  const handleUpdate = async () => {
    setLoading(true);
    setStatusMessage(null);

    const res = await updatePortfolio(targetId, formData);
    setLoading(false);
    setApiLog(res);

    if (res.success) {
      setStatusMessage({
        type: 'success',
        text: `PUT /portfolio/${targetId} succeeded (HTTP ${res.status}). Updated collection! ${res.notice || ''}`
      });
      if (onDataUpdated) onDataUpdated(formData);
    } else {
      setStatusMessage({
        type: 'error',
        text: `PUT /portfolio/${targetId} failed (HTTP ${res.status}): ${res.error}`
      });
    }
  };

  // SHOW: GET /portfolio/{id}
  const handleShow = async () => {
    setLoading(true);
    setStatusMessage(null);

    const res = await showPortfolio(targetId);
    setLoading(false);
    setApiLog(res);

    if (res.success && res.data) {
      setFormData(res.data);
      setStatusMessage({
        type: 'success',
        text: `GET /portfolio/${targetId} fetched successfully (HTTP ${res.status})! Loaded into form.`
      });
      if (onDataUpdated) onDataUpdated(res.data);
    } else {
      setStatusMessage({
        type: 'error',
        text: `GET /portfolio/${targetId} failed (HTTP ${res.status}): ${res.error}`
      });
    }
  };

  // DESTROY: DELETE /portfolio/{id}
  const handleDestroy = async () => {
    if (!window.confirm(`Are you sure you want to delete portfolio record ID ${targetId}?`)) {
      return;
    }
    setLoading(true);
    setStatusMessage(null);

    const res = await destroyPortfolio(targetId);
    setLoading(false);
    setApiLog(res);

    if (res.success) {
      setStatusMessage({
        type: 'warning',
        text: `DELETE /portfolio/${targetId} executed (HTTP ${res.status}). Record removed!`
      });
    } else {
      setStatusMessage({
        type: 'error',
        text: `DELETE /portfolio/${targetId} failed: ${res.error}`
      });
    }
  };

  // Flattened preview map
  const flatBracketMap = getFlatBracketMap(formData);

  return (
    <section id="crud-manager" className="section crud-manager-section">
      <div className="section-header">
        <span className="section-badge">
          <TechIcon name="SiLaravel" size={13} />
          <span>Dynamic Form Development & CRUD Engine</span>
        </span>
        <h2 className="section-title">
          Portfolio <span className="gradient-text">CRUD Management Portal</span>
        </h2>
        <p className="section-subtitle">
          Dynamically manage and dispatch your portfolio collection to Laravel <code>PortfolioController</code> endpoints.
        </p>
      </div>

      <div className="crud-portal-card">
        {/* Top Control Bar: Server Status & Quick Actions */}
        <div className="crud-top-bar">
          <div className="api-config-strip">
            <div className="server-status-pill">
              <span className={`status-beacon ${serverStatus.online ? 'beacon-green' : 'beacon-amber'}`} />
              <span className="status-text">
                {serverStatus.online
                  ? `Backend API Online (${serverStatus.status || 200})`
                  : `Backend Standby / Local Sync (${apiBaseUrl.replace('http://', '')})`}
              </span>
              <button
                type="button"
                onClick={checkServer}
                className="btn-ping"
                title="Ping server"
              >
                <TechIcon name="FaSync" size={11} className={loading ? 'animate-spin' : ''} />
                <span>Ping</span>
              </button>
            </div>

            <div className="endpoint-url-input-wrap">
              <label htmlFor="apiBaseUrlInput">Base URL:</label>
              <input
                id="apiBaseUrlInput"
                type="text"
                value={apiBaseUrl}
                onChange={handleBaseUrlChange}
                className="base-url-input"
                placeholder="http://10.235.62.70:8080/api/portfolio"
              />
            </div>
          </div>

          <div className="crud-header-actions">
            <div className="target-id-box">
              <label htmlFor="targetIdInput">Target ID:</label>
              <input
                id="targetIdInput"
                type="text"
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="target-id-input"
              />
            </div>

            <button
              type="button"
              onClick={handleResetToDefault}
              className="btn btn-outline btn-sm"
              title="Pre-fill form with Logeshwaran's collection"
            >
              <TechIcon name="FaCheck" size={12} />
              <span>Load Seed Collection</span>
            </button>
          </div>
        </div>

        {/* Route Action Button Bar */}
        <div className="laravel-routes-bar">
          <div className="route-actions-group">
            <button
              type="button"
              onClick={handleStore}
              disabled={loading}
              className="btn-route-action btn-store"
              title="Route::post('/portfolio', [PortfolioController::class, 'store'])"
            >
              <span className="method-tag method-post">POST</span>
              <span>/portfolio (Store)</span>
            </button>

            <button
              type="button"
              onClick={handleUpdate}
              disabled={loading}
              className="btn-route-action btn-update"
              title="Route::put('/portfolio/{id}', [PortfolioController::class, 'update'])"
            >
              <span className="method-tag method-put">PUT</span>
              <span>/portfolio/{targetId} (Update)</span>
            </button>

            <button
              type="button"
              onClick={handleShow}
              disabled={loading}
              className="btn-route-action btn-show"
              title="Route::get('/portfolio/{id}', [PortfolioController::class, 'show'])"
            >
              <span className="method-tag method-get">GET</span>
              <span>/portfolio/{targetId} (Show)</span>
            </button>

            <button
              type="button"
              onClick={handleDestroy}
              disabled={loading}
              className="btn-route-action btn-destroy"
              title="Route::delete('/portfolio/{id}', [PortfolioController::class, 'destroy'])"
            >
              <span className="method-tag method-delete">DELETE</span>
              <span>/portfolio/{targetId} (Destroy)</span>
            </button>
          </div>

          <div className="format-toggle-group">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={sendAsFormData}
                onChange={(e) => setSendAsFormData(e.target.checked)}
              />
              <span>Send as FormData (bracket keys)</span>
            </label>
          </div>
        </div>

        {/* Notification Alert */}
        {statusMessage && (
          <div className={`crud-alert alert-${statusMessage.type}`}>
            <TechIcon
              name={
                statusMessage.type === 'success'
                  ? 'FaCheckCircle'
                  : statusMessage.type === 'error'
                    ? 'FaExclamationTriangle'
                    : 'FaShieldAlt'
              }
              size={16}
            />
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Form Category Navigation Tabs */}
        <div className="crud-tabs-strip">
          <button
            type="button"
            className={`crud-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <TechIcon name="FaUser" size={14} />
            <span>Profile ({formData.profile.full_name})</span>
          </button>

          <button
            type="button"
            className={`crud-tab ${activeTab === 'experiences' ? 'active' : ''}`}
            onClick={() => setActiveTab('experiences')}
          >
            <TechIcon name="FaBriefcase" size={14} />
            <span>Experiences ({formData.experiences.length})</span>
          </button>

          <button
            type="button"
            className={`crud-tab ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <TechIcon name="FaCode" size={14} />
            <span>Skill Categories ({formData.skill_categories.length})</span>
          </button>

          <button
            type="button"
            className={`crud-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <TechIcon name="FaLayerGroup" size={14} />
            <span>Projects ({formData.projects.length})</span>
          </button>

          <button
            type="button"
            className={`crud-tab ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            <TechIcon name="FaGraduationCap" size={14} />
            <span>Education & Languages</span>
          </button>

          <button
            type="button"
            className={`crud-tab ${activeTab === 'inspector' ? 'active' : ''}`}
            onClick={() => setActiveTab('inspector')}
          >
            <TechIcon name="FaTerminal" size={14} />
            <span>API Traffic Console</span>
          </button>
        </div>

        {/* Form Tab Contents */}
        <div className="crud-form-body">
          {/* TAB 1: PROFILE FORM */}
          {activeTab === 'profile' && (
            <div className="form-sub-panel">
              <div className="panel-title-bar">
                <h4 className="panel-title">profile[*] — Personal & Contact Details</h4>
                <span className="field-hint">Mapped to <code>profile[field]</code></span>
              </div>

              <div className="form-fields-grid">
                <div className="form-group">
                  <label>Full Name (profile[full_name])</label>
                  <input
                    type="text"
                    value={formData.profile.full_name}
                    onChange={(e) => handleProfileChange('full_name', e.target.value)}
                    placeholder="LOGESHWARAN"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Professional Title (profile[title])</label>
                  <input
                    type="text"
                    value={formData.profile.title}
                    onChange={(e) => handleProfileChange('title', e.target.value)}
                    placeholder="PHP Laravel Developer"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address (profile[email])</label>
                  <input
                    type="email"
                    value={formData.profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    placeholder="logeshwaran5887@gmail.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number (profile[phone])</label>
                  <input
                    type="text"
                    value={formData.profile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    placeholder="+91 8072877253"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Location (profile[location])</label>
                  <input
                    type="text"
                    value={formData.profile.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                    placeholder="243 4th Street, Thilagarnagar, Anupparpalayam, Tirupur - 641652"
                  />
                </div>

                <div className="form-group">
                  <label>GitHub URL (profile[github_url])</label>
                  <input
                    type="url"
                    value={formData.profile.github_url}
                    onChange={(e) => handleProfileChange('github_url', e.target.value)}
                    placeholder="https://github.com/logeshwaran"
                  />
                </div>

                <div className="form-group">
                  <label>LinkedIn URL (profile[linkedin_url])</label>
                  <input
                    type="url"
                    value={formData.profile.linkedin_url}
                    onChange={(e) => handleProfileChange('linkedin_url', e.target.value)}
                    placeholder="https://linkedin.com/in/logeshwaran"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Professional Summary (profile[summary])</label>
                  <textarea
                    rows={4}
                    value={formData.profile.summary}
                    onChange={(e) => handleProfileChange('summary', e.target.value)}
                    placeholder="Backend Developer with professional experience..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXPERIENCES FORM */}
          {activeTab === 'experiences' && (
            <div className="form-sub-panel">
              <div className="panel-title-bar">
                <h4 className="panel-title">experiences[*] — Employment History</h4>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="btn btn-outline btn-sm"
                >
                  <TechIcon name="FaPlus" size={12} />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="dynamic-cards-list">
                {formData.experiences.map((exp, idx) => (
                  <div key={idx} className="dynamic-entry-card">
                    <div className="entry-card-header">
                      <span className="entry-number-badge">#{idx + 1} experiences[{idx}]</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExperience(idx)}
                        className="btn-remove-entry"
                        title="Remove experience"
                      >
                        <TechIcon name="FaTrash" size={13} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="form-fields-grid">
                      <div className="form-group">
                        <label>Company (company)</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExpChange(idx, 'company', e.target.value)}
                          placeholder="CHERAN SOFTWARES"
                        />
                      </div>

                      <div className="form-group">
                        <label>Role (role)</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleExpChange(idx, 'role', e.target.value)}
                          placeholder="PHP Laravel Developer"
                        />
                      </div>

                      <div className="form-group">
                        <label>Location (location)</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => handleExpChange(idx, 'location', e.target.value)}
                          placeholder="Tirupur, Tamil Nadu, India"
                        />
                      </div>

                      <div className="form-group">
                        <label>Start Date (start_date)</label>
                        <input
                          type="date"
                          value={exp.start_date || ''}
                          onChange={(e) => handleExpChange(idx, 'start_date', e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>End Date (end_date)</label>
                        <input
                          type="date"
                          value={exp.end_date || ''}
                          disabled={!!exp.is_current}
                          onChange={(e) => handleExpChange(idx, 'end_date', e.target.value)}
                        />
                      </div>

                      <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={!!exp.is_current}
                            onChange={(e) => handleExpChange(idx, 'is_current', e.target.checked ? 1 : 0)}
                          />
                          <span>Currently Working Here (is_current: 1)</span>
                        </label>
                      </div>
                    </div>

                    {/* Highlights Sub-List */}
                    <div className="highlights-editor-section">
                      <div className="highlights-header">
                        <label>Key Accomplishments & Highlights (experiences[{idx}][highlights][*]):</label>
                        <button
                          type="button"
                          onClick={() => handleAddHighlight(idx)}
                          className="btn-add-mini"
                        >
                          <TechIcon name="FaPlus" size={10} />
                          <span>Add Bullet</span>
                        </button>
                      </div>

                      <div className="highlights-inputs-list">
                        {exp.highlights.map((hl, hlIdx) => (
                          <div key={hlIdx} className="highlight-input-row">
                            <span className="hl-bullet">›</span>
                            <input
                              type="text"
                              value={hl}
                              onChange={(e) => handleHighlightChange(idx, hlIdx, e.target.value)}
                              placeholder="Describe backend architecture, performance optimization, etc."
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveHighlight(idx, hlIdx)}
                              className="btn-del-mini"
                              title="Delete highlight"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SKILL CATEGORIES FORM */}
          {activeTab === 'skills' && (
            <div className="form-sub-panel">
              <div className="panel-title-bar">
                <h4 className="panel-title">skill_categories[*] — Technical Stacks & Competencies</h4>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="btn btn-outline btn-sm"
                >
                  <TechIcon name="FaPlus" size={12} />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="dynamic-cards-list">
                {formData.skill_categories.map((cat, catIdx) => (
                  <div key={catIdx} className="dynamic-entry-card">
                    <div className="entry-card-header">
                      <span className="entry-number-badge">Category #{catIdx + 1} (sort_order: {cat.sort_order || catIdx + 1})</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(catIdx)}
                        className="btn-remove-entry"
                      >
                        <TechIcon name="FaTrash" size={13} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="form-fields-grid">
                      <div className="form-group full-width">
                        <label>Category Name (e.g. Backend, Databases, Frontend, DevOps)</label>
                        <input
                          type="text"
                          value={cat.name}
                          onChange={(e) => handleCategoryNameChange(catIdx, e.target.value)}
                          placeholder="Category Name"
                        />
                      </div>
                    </div>

                    {/* Skill Tags */}
                    <div className="skills-tags-section">
                      <label>Skills in this category ({cat.skills.length}):</label>
                      <div className="tags-chips-cloud">
                        {cat.skills.map((s, sIdx) => (
                          <span key={sIdx} className="skill-edit-tag">
                            <span>{s.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkillFromCat(catIdx, sIdx)}
                              className="tag-close-btn"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Add new skill inline */}
                      <div className="add-tag-inline-form">
                        <input
                          type="text"
                          id={`newSkillInput_${catIdx}`}
                          placeholder="Type skill (e.g. Laravel 11, Redis)..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddSkillToCat(catIdx, e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            const input = document.getElementById(`newSkillInput_${catIdx}`);
                            if (input) {
                              handleAddSkillToCat(catIdx, input.value);
                              input.value = '';
                            }
                          }}
                        >
                          <TechIcon name="FaPlus" size={11} />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS FORM */}
          {activeTab === 'projects' && (
            <div className="form-sub-panel">
              <div className="panel-title-bar">
                <h4 className="panel-title">projects[*] — Featured Software Applications</h4>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="btn btn-outline btn-sm"
                >
                  <TechIcon name="FaPlus" size={12} />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="dynamic-cards-list">
                {formData.projects.map((proj, pIdx) => (
                  <div key={pIdx} className="dynamic-entry-card">
                    <div className="entry-card-header">
                      <span className="entry-number-badge">Project #{pIdx + 1} — {proj.title}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(pIdx)}
                        className="btn-remove-entry"
                      >
                        <TechIcon name="FaTrash" size={13} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="form-fields-grid">
                      <div className="form-group">
                        <label>Title (projects[{pIdx}][title])</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => handleProjectChange(pIdx, 'title', e.target.value)}
                          placeholder="NexERP"
                        />
                      </div>

                      <div className="form-group">
                        <label>Subtitle (projects[{pIdx}][subtitle])</label>
                        <input
                          type="text"
                          value={proj.subtitle}
                          onChange={(e) => handleProjectChange(pIdx, 'subtitle', e.target.value)}
                          placeholder="Multi-Branch ERP System"
                        />
                      </div>

                      <div className="form-group full-width">
                        <label>Summary / Overview (projects[{pIdx}][summary])</label>
                        <textarea
                          rows={3}
                          value={proj.summary}
                          onChange={(e) => handleProjectChange(pIdx, 'summary', e.target.value)}
                          placeholder="NexERP is an enterprise-grade ERP system engineered to solve..."
                        />
                      </div>

                      <div className="form-group full-width">
                        <label>Architecture Notes (projects[{pIdx}][architecture_notes])</label>
                        <textarea
                          rows={2}
                          value={proj.architecture_notes}
                          onChange={(e) => handleProjectChange(pIdx, 'architecture_notes', e.target.value)}
                          placeholder="Multi-tenant database isolation, Redis-backed queues..."
                        />
                      </div>

                      <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={!!proj.is_featured}
                            onChange={(e) => handleProjectChange(pIdx, 'is_featured', e.target.checked ? 1 : 0)}
                          />
                          <span>Featured Flagship Project (is_featured: 1)</span>
                        </label>
                      </div>
                    </div>

                    {/* Project Skills */}
                    <div className="skills-tags-section">
                      <label>Tech Stacks Leveraged ({proj.skills?.length || 0}):</label>
                      <div className="tags-chips-cloud">
                        {(proj.skills || []).map((sk, sIdx) => (
                          <span key={sIdx} className="skill-edit-tag">
                            <span>{sk}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveProjectSkill(pIdx, sIdx)}
                              className="tag-close-btn"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="add-tag-inline-form">
                        <input
                          type="text"
                          id={`newProjSkillInput_${pIdx}`}
                          placeholder="Add tech (e.g. Docker, MySQL 8.4)..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddProjectSkill(pIdx, e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            const input = document.getElementById(`newProjSkillInput_${pIdx}`);
                            if (input) {
                              handleAddProjectSkill(pIdx, input.value);
                              input.value = '';
                            }
                          }}
                        >
                          <TechIcon name="FaPlus" size={11} />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: EDUCATION & LANGUAGES FORM */}
          {activeTab === 'education' && (
            <div className="form-sub-panel">
              {/* Educations */}
              <div className="panel-title-bar">
                <h4 className="panel-title">educations[*] — Academic Qualifications</h4>
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="btn btn-outline btn-sm"
                >
                  <TechIcon name="FaPlus" size={12} />
                  <span>Add Education</span>
                </button>
              </div>

              <div className="dynamic-cards-list mb-6">
                {formData.educations.map((edu, eIdx) => (
                  <div key={eIdx} className="dynamic-entry-card">
                    <div className="entry-card-header">
                      <span className="entry-number-badge">Education #{eIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEducation(eIdx)}
                        className="btn-remove-entry"
                      >
                        <TechIcon name="FaTrash" size={13} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="form-fields-grid">
                      <div className="form-group">
                        <label>Degree (degree)</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleEduChange(eIdx, 'degree', e.target.value)}
                          placeholder="B.Sc. Information Technology"
                        />
                      </div>

                      <div className="form-group">
                        <label>Institution (institution)</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleEduChange(eIdx, 'institution', e.target.value)}
                          placeholder="Kathir College of Arts and Science"
                        />
                      </div>

                      <div className="form-group">
                        <label>Location (location)</label>
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => handleEduChange(eIdx, 'location', e.target.value)}
                          placeholder="Coimbatore, Tamil Nadu"
                        />
                      </div>

                      <div className="form-group">
                        <label>Start / End Year (start_year / end_year)</label>
                        <div className="year-pair-row">
                          <input
                            type="number"
                            value={edu.start_year || 2021}
                            onChange={(e) => handleEduChange(eIdx, 'start_year', parseInt(e.target.value, 10))}
                          />
                          <span>–</span>
                          <input
                            type="number"
                            value={edu.end_year || 2024}
                            onChange={(e) => handleEduChange(eIdx, 'end_year', parseInt(e.target.value, 10))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="panel-title-bar mt-8">
                <h4 className="panel-title">languages[*] — Spoken Languages</h4>
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="btn btn-outline btn-sm"
                >
                  <TechIcon name="FaPlus" size={12} />
                  <span>Add Language</span>
                </button>
              </div>

              <div className="dynamic-cards-list">
                {formData.languages.map((lang, lIdx) => (
                  <div key={lIdx} className="language-inline-row">
                    <div className="form-group">
                      <label>Language Name</label>
                      <input
                        type="text"
                        value={lang.name}
                        onChange={(e) => handleLangChange(lIdx, 'name', e.target.value)}
                        placeholder="Tamil"
                      />
                    </div>

                    <div className="form-group">
                      <label>Proficiency</label>
                      <select
                        value={lang.proficiency}
                        onChange={(e) => handleLangChange(lIdx, 'proficiency', e.target.value)}
                      >
                        <option value="Native">Native</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Intermediate">Intermediate</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveLanguage(lIdx)}
                      className="btn-del-mini mt-6"
                      title="Remove language"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: API TRAFFIC CONSOLE & BRACKET PREVIEW */}
          {activeTab === 'inspector' && (
            <div className="form-sub-panel">
              <div className="panel-title-bar">
                <h4 className="panel-title">Laravel Route & Payload Inspector</h4>
                <span className="field-hint">Real-time HTTP traffic and payload generator</span>
              </div>

              <div className="api-inspector-grid">
                {/* Left: Flattened Form Data Brackets */}
                <div className="bracket-preview-box">
                  <div className="box-title">
                    <TechIcon name="FaList" size={13} />
                    <span>Flattened Laravel Keys (FormData Preview)</span>
                  </div>
                  <pre className="bracket-code-block">
                    {Object.entries(flatBracketMap)
                      .slice(0, 45)
                      .map(([k, v]) => `${k} = ${typeof v === 'string' ? `"${v}"` : v}`)
                      .join('\n')}
                    {'\n... and more'}
                  </pre>
                </div>

                {/* Right: Last Dispatched API Log */}
                <div className="traffic-log-box">
                  <div className="box-title">
                    <TechIcon name="FaTerminal" size={13} />
                    <span>Last Request / Response Transaction</span>
                  </div>

                  {apiLog ? (
                    <div className="transaction-details">
                      <div className="txn-meta-strip">
                        <span className={`method-badge method-${apiLog.method.toLowerCase()}`}>
                          {apiLog.method}
                        </span>
                        <span className="txn-url">{apiLog.url}</span>
                        <span className={`txn-status ${apiLog.status < 300 ? 'status-ok' : 'status-err'}`}>
                          HTTP {apiLog.status}
                        </span>
                        <span className="txn-latency">{apiLog.latency} ms</span>
                      </div>

                      {apiLog.isLocalFallback && (
                        <div className="local-fallback-badge">
                          <TechIcon name="FaShieldAlt" size={12} />
                          <span>{apiLog.notice}</span>
                        </div>
                      )}

                      <div className="payload-json-wrap">
                        <label>Payload / Response JSON:</label>
                        <pre className="json-code-block">
                          {JSON.stringify(apiLog.data || apiLog.payload || apiLog, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="empty-log-hint">
                      <p>No transactions dispatched yet. Click <strong>POST /portfolio (Store)</strong> or <strong>PUT /portfolio/{targetId} (Update)</strong> above to test!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Persistent Action Bar */}
        <div className="crud-footer-bar">
          <div className="footer-status-hint">
            <span className="dot-indicator" />
            <span>Target: <code>{apiBaseUrl}</code></span>
          </div>

          <div className="footer-btn-group">
            <button
              type="button"
              onClick={handleUpdate}
              disabled={loading}
              className="btn btn-outline"
            >
              <TechIcon name="FaEdit" size={14} />
              <span>Update ID #{targetId} (PUT)</span>
            </button>

            <button
              type="button"
              onClick={handleStore}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <span>Dispatching...</span>
              ) : (
                <>
                  <TechIcon name="FaCloudUploadAlt" size={16} />
                  <span>Store Collection (POST /portfolio)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
