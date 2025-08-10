import React, { useEffect } from 'react';
import HeroBackground from './HeroBackground';
import DecryptedText from './DecryptedText';

const HeroSection = () => {
  useEffect(() => {
    // GSAP is already initialized by main.js, so we don't need to initialize it again
    // Just dispatch a custom event to let the system know the hero section is ready
    setTimeout(() => {
      const heroReadyEvent = new CustomEvent('heroSectionReady');
      document.dispatchEvent(heroReadyEvent);
    }, 100);
  }, []);

  return (
    <section id="home" className="section hero-section">
      {/* LetterGlitch Background */}
      <HeroBackground />
      
      <div className="hero-container">
        <div className="hero-content" id="heroContent">
          <div className="hero-badge" id="heroBadge">
            🛡️ Elite Cybersecurity Club
          </div>
          
          <h1 className="hero-title" id="heroTitle">
            <span className="title-main">C1PH3R</span><span className="title-accent">C3LL</span>
          </h1>
          
          <h2 className="hero-subtitle" id="heroSubtitle">
            <DecryptedText
              text="Defending tomorrow's digital world through advanced cybersecurity research, blockchain innovation, and ethical hacking excellence."
              animateOn="view"
              speed={25}
              maxIterations={30}
              sequential={true}
              revealDirection="start"
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]|\\:;',.?/"
              className="subtitle-revealed"
              encryptedClassName="subtitle-encrypted"
            />
          </h2>
          
          <div className="hero-features" id="heroFeatures">
            <div className="feature-item">
              <span className="feature-icon">🔍</span>
              <span className="feature-text">Advanced Penetration Testing</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⛓️</span>
              <span className="feature-text">Blockchain Security Research</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏆</span>
              <span className="feature-text">Competitive CTF Challenges</span>
            </div>
          </div>
          
          <div className="hero-actions" id="heroActions">
            <a href="#about" className="btn btn-primary">JOIN THE CELL</a>
            <a href="#services" className="btn btn-secondary">VIEW PROJECTS</a>
          </div>
        </div>
        
        <div className="hero-visual" id="heroVisual">
          <div className="hero-terminal" id="heroTerminal">
            <div className="terminal-header">
              <div className="terminal-dot dot-red"></div>
              <div className="terminal-dot dot-yellow"></div>
              <div className="terminal-dot dot-green"></div>
              <div className="terminal-title">root@ciphercell-hq:~#</div>
            </div>
            
            <div className="terminal-content">
              <div className="terminal-line">
                <span className="terminal-prompt">root@ciphercell-hq:~#</span>
                <span className="terminal-command">nmap -sS -O target.domain.com</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-output">Starting Nmap scan...</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-output">ssh     open   filtered</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-output">http    open   Apache/2.4.41</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-output">https   open   Apache/2.4.41</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">root@ciphercell-hq:~#</span>
                <span className="terminal-command">vulnerability detected</span>
                <span className="typing-cursor"></span>
              </div>
            </div>
          </div>
          
          <div className="security-stats" id="securityStats">
            <div className="stat-card">
              <div className="stat-text">
                <DecryptedText
                  text="SECURE"
                  animateOn="view"
                  speed={80}
                  maxIterations={15}
                  characters="01ABCDEF!@#$%^&*"
                  className="stat-revealed"
                  encryptedClassName="stat-encrypted"
                />
              </div>
              <div className="stat-label">Network Status</div>
            </div>
            <div className="stat-card">
              <div className="stat-text">
                <DecryptedText
                  text="ELITE"
                  animateOn="view"
                  speed={90}
                  maxIterations={18}
                  characters="HACKER01234567!?"
                  className="stat-revealed"
                  encryptedClassName="stat-encrypted"
                />
              </div>
              <div className="stat-label">Skill Level</div>
            </div>
            <div className="stat-card">
              <div className="stat-text">
                <DecryptedText
                  text="ACTIVE"
                  animateOn="view"
                  speed={70}
                  maxIterations={12}
                  characters="CYBER0123456789"
                  className="stat-revealed"
                  encryptedClassName="stat-encrypted"
                />
              </div>
              <div className="stat-label">Threat Detection</div>
            </div>
            <div className="stat-card">
              <div className="stat-text">
                <DecryptedText
                  text="ONLINE"
                  animateOn="view"
                  speed={60}
                  maxIterations={20}
                  characters="BLOCKCHAIN01!@#"
                  className="stat-revealed"
                  encryptedClassName="stat-encrypted"
                />
              </div>
              <div className="stat-label">System Status</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;