import React, { useState, useEffect } from 'react';
import TechIcon from './TechIcon';
import BackgroundCanvas from './BackgroundCanvas';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import sayHiAnimationData from '../assets/sayHiAnimation.json';

const defaultSentences = [
  "Hi! Welcome to Logeshwaran's Portfolio 🚀",
  "Architecting Scalable PHP & Laravel Systems ⚡",
  "Explore High-Concurrency MySQL & NexERP ERP 📦",
  "Secured with Laravel Sanctum & Role-Based Access 🔐"
];

export default function LoginGate({ onLoginSuccess, theme, toggleTheme }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const [customNote, setCustomNote] = useState(() => {
    return localStorage.getItem('logesh_welcome_note') || '';
  });
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    document.title = "🔐 Gateway Access | Logeshwaran - PHP Laravel Developer";
  }, []);

  useEffect(() => {
    const activeSentence = customNote
      ? `Hi! Welcome: "${customNote}" 👋`
      : defaultSentences[sentenceIndex];

    const typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(activeSentence.substring(0, displayText.length + 1));
        if (displayText.length === activeSentence.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(activeSentence.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setSentenceIndex((prev) => (prev + 1) % defaultSentences.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, sentenceIndex, customNote]);

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (customNote.trim()) {
      localStorage.setItem('logesh_welcome_note', customNote.trim());
      setNoteSaved(true);
      setDisplayText('');
      setIsDeleting(false);
      setTimeout(() => setNoteSaved(false), 2000);
    } else {
      localStorage.removeItem('logesh_welcome_note');
    }
  };

  const handleQuickFill = () => {
    setUsername('logesh_look');
    setPassword('123456');
    setErrorMsg('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both username and password.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (username.trim() === 'logesh_look' && password === '123456') {
        setIsSuccess(true);
        localStorage.setItem('logesh_auth', 'true');
        localStorage.setItem('logesh_auth_user', 'logesh_look');
        localStorage.setItem('logesh_auth_time', new Date().toISOString());

        setTimeout(() => {
          onLoginSuccess();
        }, 700);
      } else {
        setIsSubmitting(false);
        setErrorMsg('Invalid credentials! Username is logesh_look and password is 123456');
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
    }, 450);
  };

  return (
    <div className="login-gate-overlay">
      <BackgroundCanvas theme={theme} />

      <header className="login-top-bar">
        <div className="brand-logo">
          <div className="brand-icon-box">
            <TechIcon name="SiLaravel" size={20} />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-name">LOGESHWARAN</span>
            <span className="brand-role">Security Gateway</span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="action-icon-btn"
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          <TechIcon name={theme === 'dark' ? 'FaSun' : 'FaMoon'} size={16} />
        </button>
      </header>

      <div className={`login-card-container ${shake ? 'login-shake' : ''}`}>
        <div className="login-card-glow" />

        <div className="login-card">
          <div className="login-card-header">
            <div className="login-lottie-frame">
              <DotLottieReact
                data={sayHiAnimationData}
                loop
                autoplay
                className="login-say-hi-lottie"
                style={{ width: '130px', height: '130px' }}
              />
              <div className="login-lock-badge">
                <TechIcon name={isSuccess ? 'FaUnlock' : 'FaLock'} size={12} color="#ffffff" />
              </div>
            </div>

            <h2 className="login-welcome-title">Logeshwaran's Portfolio</h2>
            <div className="login-badge-pill">
              <TechIcon name="FaShieldAlt" size={11} color="#FF2D20" />
              <span>Sanctum Authentication Portal</span>
            </div>
          </div>

          <div className="animated-welcome-box">
            <div className="welcome-wave-icon">
              <TechIcon name="FaHandPeace" size={18} color="#f59e0b" />
            </div>
            <div className="welcome-text-container">
              <span className="animated-typing-sentence">
                {displayText}
                <span className="cursor-blink">|</span>
              </span>
            </div>
          </div>

          <div className="welcome-sentence-customizer">
            <button
              type="button"
              className="toggle-note-btn"
              onClick={() => setShowNoteEditor(!showNoteEditor)}
            >
              <span>{showNoteEditor ? 'Hide Custom Greeting' : '+ Set Your Own Welcome Greeting'}</span>
            </button>

            {showNoteEditor && (
              <form onSubmit={handleSaveNote} className="note-editor-form">
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Welcome Recruiter / Team Lead!"
                  className="note-input"
                  maxLength={60}
                />
                <button type="submit" className="note-save-btn">
                  {noteSaved ? 'Saved!' : 'Save'}
                </button>
              </form>
            )}
          </div>

          {errorMsg && (
            <div className="login-error-alert">
              <TechIcon name="FaShieldAlt" size={14} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-field-group">
              <label htmlFor="login-username">Username</label>
              <div className="login-input-wrap">
                <TechIcon name="FaUser" size={14} className="field-icon" />
                <input
                  type="text"
                  id="login-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="logesh_look"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="login-field-group">
              <div className="label-with-hint">
                <label htmlFor="login-password">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-pw-btn"
                >
                  <TechIcon name={showPassword ? 'FaEyeSlash' : 'FaEye'} size={12} />
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <div className="login-input-wrap">
                <TechIcon name="FaKey" size={14} className="field-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="123456"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <div className="demo-credentials-strip">
              <div className="cred-hint-text">
                Demo Credentials: <code>logesh_look</code> / <code>123456</code>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="btn-quick-fill"
                title="Autofill username and password"
              >
                Auto Fill
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`login-submit-btn ${isSuccess ? 'btn-success' : ''}`}
            >
              {isSuccess ? (
                <>
                  <TechIcon name="FaCheckCircle" size={18} />
                  <span>Access Granted • Entering Portfolio...</span>
                </>
              ) : isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <TechIcon name="FaUnlock" size={16} />
                  <span>Unlock & Enter Portfolio</span>
                </>
              )}
            </button>
          </form>

          <div className="login-card-footer">
            <TechIcon name="FaCheckCircle" size={12} color="#10B981" />
            <span>Encrypted Session • Credentials Stored via Tomporarily</span>
          </div>
        </div>
      </div>
    </div>
  );
}
