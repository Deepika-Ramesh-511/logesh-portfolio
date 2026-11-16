import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import LoginGate from './components/LoginGate';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import About from './components/About';
import Projects from './components/Projects';
import ArchitectureViewer from './components/ArchitectureViewer';
import ApiSandbox from './components/ApiSandbox';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import BackgroundCanvas from './components/BackgroundCanvas';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('logesh_theme') || 'dark';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('logesh_auth') === 'true';
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('logesh_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isAuthenticated) {
      document.title = "Logeshwaran | PHP Laravel Developer & Backend Architect";
    }
  }, [isAuthenticated]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = () => {
    localStorage.removeItem('logesh_auth');
    setIsAuthenticated(false);
  };

  // If not authenticated, show security login gateway
  if (!isAuthenticated) {
    return (
      <div className="app-container">
        <LoginGate
          onLoginSuccess={() => setIsAuthenticated(true)}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Interactive Background Particle Mesh */}
      <BackgroundCanvas theme={theme} />

      {/* Navigation Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Sections */}
      <main className="main-content">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <StatsBar />
        <About />
        <Projects />
        <ArchitectureViewer />
        <ApiSandbox />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default App;
