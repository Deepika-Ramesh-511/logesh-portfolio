import React, { useState } from 'react';
import TechIcon from './TechIcon';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    setSubmitting(true);
    // Simulate API dispatch to Logeshwaran's backend queue
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Inquiry regarding Laravel Development')}&body=${encodeURIComponent(`Hi Logeshwaran,\n\n${formData.message || 'I came across your portfolio and would like to discuss an opportunity.'}\n\nBest regards,\n${formData.name || ''}`)}`;

  return (
    <section id="contact" className="section contact-section">
      <div className="section-header">
        <span className="section-badge">
          <TechIcon name="FaPaperPlane" size={13} />
          <span>Let's Build Together</span>
        </span>
        <h2 className="section-title">
          Get in Touch with <span className="gradient-text">{personalInfo.name}</span>
        </h2>
        <p className="section-subtitle">
          Have an enterprise application, backend API, or high-performance Laravel project to discuss? Send a message or connect directly.
        </p>
      </div>

      <div className="contact-grid">
        {/* Left Side: Contact Details & Fast Action Cards */}
        <div className="contact-info-column">
          <div className="contact-status-card">
            <div className="status-header">
              <span className="beacon-dot" />
              <span className="status-heading">Open for Opportunities</span>
            </div>
            <p className="status-desc">
              Currently available for full-time roles, backend engineering contracts, and high-concurrency Laravel consulting.
            </p>
          </div>

          {/* Email Card */}
          <div className="contact-method-card">
            <div className="method-icon-box">
              <TechIcon name="FaEnvelope" size={22} color="#FF2D20" />
            </div>
            <div className="method-content">
              <span className="method-label">Direct Email</span>
              <a href={`mailto:${personalInfo.email}`} className="method-val">
                {personalInfo.email}
              </a>
            </div>
            <button
              onClick={() => handleCopy(personalInfo.email, 'email')}
              className="method-copy-btn"
              title="Copy email to clipboard"
            >
              <TechIcon name="FaCopy" size={14} />
              <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Phone & WhatsApp Card */}
          <div className="contact-method-card">
            <div className="method-icon-box">
              <TechIcon name="FaPhone" size={22} color="#06B6D4" />
            </div>
            <div className="method-content">
              <span className="method-label">Phone & WhatsApp</span>
              <a href={`tel:${personalInfo.phone}`} className="method-val">
                {personalInfo.phone}
              </a>
            </div>
            <div className="method-action-group">
              <button
                onClick={() => handleCopy(personalInfo.phone, 'phone')}
                className="method-copy-btn"
                title="Copy phone number"
              >
                <TechIcon name="FaCopy" size={14} />
                <span>{copiedPhone ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Location Card */}
          <div className="contact-method-card">
            <div className="method-icon-box">
              <TechIcon name="FaMapMarkerAlt" size={22} color="#10B981" />
            </div>
            <div className="method-content">
              <span className="method-label">Location</span>
              <span className="method-val location-text">{personalInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="contact-form-card">
          <div className="form-top-title">
            <TechIcon name="FaEnvelope" size={18} className="text-laravel" />
            <h3>Send a Direct Message</h3>
          </div>

          {submitted ? (
            <div className="form-success-alert">
              <div className="success-icon-wrap">
                <TechIcon name="FaCheckCircle" size={32} color="#10B981" />
              </div>
              <h4>Message Dispatched Successfully!</h4>
              <p>
                Thank you for reaching out. Logeshwaran will review your inquiry and respond to your email promptly.
              </p>
              <div className="mt-4 flex gap-3">
                <a href={mailtoUrl} className="btn btn-outline btn-sm">
                  <span>Open in Mail App</span>
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-primary btn-sm"
                >
                  <span>Send Another Message</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              {errorMsg && <div className="form-error-banner">{errorMsg}</div>}

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Your Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. sarah@company.com"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Laravel Backend Role / Project Discussion"
                />
              </div>

              <div className="form-field">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell Logeshwaran about your project, timeline, or position requirements..."
                  required
                />
              </div>

              <div className="form-submit-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-lg w-full"
                >
                  {submitting ? (
                    <span>Dispatching message...</span>
                  ) : (
                    <>
                      <TechIcon name="FaPaperPlane" size={16} />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </div>

              <p className="form-disclaimer">
                Alternatively, open directly in your mail client via{' '}
                <a href={mailtoUrl} className="disclaimer-link">
                  direct mailto link
                </a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
