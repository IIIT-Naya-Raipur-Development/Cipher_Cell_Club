import React, { useEffect, useState } from 'react';
import HeroBackground from './HeroBackground';
import DecryptedText from './DecryptedText';

const HeroSection = () => {
  const [shouldStartAnimations, setShouldStartAnimations] = useState(false);

  useEffect(() => {
    // Wait for website to be fully loaded before starting animations
    const handleWebsiteReady = () => {
      setTimeout(() => {
        setShouldStartAnimations(true);
        // Dispatch hero ready event after loading is complete
        const heroReadyEvent = new CustomEvent('heroSectionReady');
        document.dispatchEvent(heroReadyEvent);
      }, 10); // Small delay to ensure everything is ready
    };

    // Check if website is already ready
    if (document.body.style.opacity === '1') {
      handleWebsiteReady();
    } else {
      // Listen for website ready event
      document.addEventListener('websiteReady', handleWebsiteReady);
    }

    return () => {
      document.removeEventListener('websiteReady', handleWebsiteReady);
    };
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
          
          <div className="hero-subtitle" id="heroSubtitle">
            {shouldStartAnimations ? (
              <DecryptedText
                text="Defending tomorrow's digital world through advanced cybersecurity research, blockchain innovation, and ethical hacking excellence."
                animateOn="view"
                speed={25}
                maxIterations={30}
                sequential={true}
                revealDirection="start"
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]|:;',.?/"
                className="subtitle-revealed"
                encryptedClassName="subtitle-encrypted"
              />
            ) : (
              <span className="subtitle-revealed">
                Defending tomorrow's digital world through advanced cybersecurity research, blockchain innovation, and ethical hacking excellence.
              </span>
            )}
          </div>
          
          <div className="hero-features" id="heroFeatures">
            <div className="cyber-grid">
              <div className="grid-item">
                <div className="grid-icon">▲</div>
                <div className="grid-label">SECURE</div>
              </div>
              <div className="grid-item">
                <div className="grid-icon">◆</div>
                <div className="grid-label">ANALYZE</div>
              </div>
              <div className="grid-item">
                <div className="grid-icon">●</div>
                <div className="grid-label">DEFEND</div>
              </div>
              <div className="grid-item">
                <div className="grid-icon">■</div>
                <div className="grid-label">EVOLVE</div>
              </div>
            </div>
            
            <div className="access-panel">
              <div className="panel-header">
                <span className="access-status">ACCESS GRANTED</span>
                <div className="status-indicator"></div>
              </div>
              <div className="panel-content">
                {shouldStartAnimations ? (
                  <DecryptedText
                    text="INITIATING SECURE CONNECTION..."
                    animateOn="view"
                    speed={40}
                    maxIterations={20}
                    characters="0123456789ABCDEF!@#$%^&*"
                    className="access-text-revealed"
                    encryptedClassName="access-text-encrypted"
                  />
                ) : (
                  <span className="access-text-revealed">INITIATING SECURE CONNECTION...</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="hero-actions" id="heroActions">
            <div className="cyber-button" data-text="ENTER CYBERSPACE">
              <span className="btn-text">ENTER CYBERSPACE</span>
              <div className="btn-overlay"></div>
            </div>
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
                {shouldStartAnimations ? (
                  <DecryptedText
                    text="SECURE"
                    animateOn="view"
                    speed={80}
                    maxIterations={15}
                    characters="01ABCDEF!@#$%^&*"
                    className="stat-revealed"
                    encryptedClassName="stat-encrypted"
                  />
                ) : (
                  <span className="stat-revealed">SECURE</span>
                )}
              </div>
              <div className="stat-label">Network Status</div>
            </div>
            <div className="stat-card">
              <div className="stat-text">
                {shouldStartAnimations ? (
                  <DecryptedText
                    text="ELITE"
                    animateOn="view"
                    speed={90}
                    maxIterations={18}
                    characters="HACKER01234567!?"
                    className="stat-revealed"
                    encryptedClassName="stat-encrypted"
                  />
                ) : (
                  <span className="stat-revealed">ELITE</span>
                )}
              </div>
              <div className="stat-label">Skill Level</div>
            </div>
            <div className="stat-card">
              <div className="stat-text">
                {shouldStartAnimations ? (
                  <DecryptedText
                    text="ACTIVE"
                    animateOn="view"
                    speed={70}
                    maxIterations={12}
                    characters="CYBER0123456789"
                    className="stat-revealed"
                    encryptedClassName="stat-encrypted"
                  />
                ) : (
                  <span className="stat-revealed">ACTIVE</span>
                )}
              </div>
              <div className="stat-label">Threat Detection</div>
            </div>
            <div className="stat-card">
              <div className="stat-text">
                {shouldStartAnimations ? (
                  <DecryptedText
                    text="ONLINE"
                    animateOn="view"
                    speed={60}
                    maxIterations={20}
                    characters="BLOCKCHAIN01!@#"
                    className="stat-revealed"
                    encryptedClassName="stat-encrypted"
                  />
                ) : (
                  <span className="stat-revealed">ONLINE</span>
                )}
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