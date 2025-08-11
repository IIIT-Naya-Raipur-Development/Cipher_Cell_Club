import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen.jsx';
import HeroSection from './components/HeroSection.jsx';
import MagicBento from './components/MagicBento.jsx';
import ScrollStack from './components/ScrollStack.jsx';
import './style.css';

// Navigation Component
const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'events', 'team', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          
          // Update scroll dots
          const dots = document.querySelectorAll('.scroll-dot');
          dots.forEach((dot, index) => {
            if (index === i) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
          
          // Update nav items
          const navItems = document.querySelectorAll('.nav-item');
          navItems.forEach((item, index) => {
            if (index === i) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Left Sidebar Navigation */}
      <nav className="sidebar-nav" id="navbar">
        <Link to="/" className="nav-logo">CipherCell</Link>
        <ul className="nav-links">
          <li className="nav-item">
            <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')}>
              <span className="nav-icon">🏠</span>
            </a>
            <div className="nav-tooltip">Home</div>
          </li>
          <li className="nav-item">
            <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>
              <span className="nav-icon">🔍</span>
            </a>
            <div className="nav-tooltip">About Us</div>
          </li>
          <li className="nav-item">
            <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>
              <span className="nav-icon">🛡️</span>
            </a>
            <div className="nav-tooltip">Security Services</div>
          </li>
          <li className="nav-item">
            <a href="#events" onClick={(e) => handleSmoothScroll(e, '#events')}>
              <span className="nav-icon">📅</span>
            </a>
            <div className="nav-tooltip">Events & CTFs</div>
          </li>
          <li className="nav-item">
            <a href="#team" onClick={(e) => handleSmoothScroll(e, '#team')}>
              <span className="nav-icon">👥</span>
            </a>
            <div className="nav-tooltip">Our Team</div>
          </li>
          <li className="nav-item">
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>
              <span className="nav-icon">📧</span>
            </a>
            <div className="nav-tooltip">Contact</div>
          </li>
        </ul>
      </nav>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" id="scroll-indicator">
        <div className="scroll-dot" data-target="#hero"></div>
        <div className="scroll-dot" data-target="#about"></div>
        <div className="scroll-dot" data-target="#services"></div>
        <div className="scroll-dot" data-target="#events"></div>
        <div className="scroll-dot" data-target="#team"></div>
        <div className="scroll-dot" data-target="#contact"></div>
      </div>
    </>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <div className="page-container">
      <div id="hero">
        <HeroSection />
      </div>
      
      {/* About Section with MagicBento */}
      <section id="about" className="section" style={{ padding: '4rem 0' }}>
        <div style={{ maxWidth: '100%', width: '100%', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title fade-in" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>About C1PH3RC3LL</h2>
            <p className="section-description fade-in" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: '800px', margin: '0 auto' }}>
              Elite Cybersecurity & Blockchain Club - Interactive Experience
            </p>
          </div>
          <div className="slide-in-left">
            <MagicBento 
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="132, 0, 255"
            />
          </div>
        </div>
      </section>

      {/* Scroll Stack Sections */}
      <ScrollStack
        sections={[
          {
            title: "Security Services",
            subtitle: "Advanced cybersecurity solutions that protect and empower your digital infrastructure",
            icon: "🛡️",
            features: [
              {
                icon: "🔍",
                title: "Penetration Testing",
                description: "Comprehensive security assessments to identify and eliminate vulnerabilities before attackers can exploit them."
              },
              {
                icon: "🔬",
                title: "Vulnerability Research",
                description: "Cutting-edge research into emerging threats and zero-day vulnerabilities in modern systems."
              },
              {
                icon: "⚡",
                title: "Incident Response",
                description: "Rapid response and forensic analysis to contain breaches and minimize damage to your organization."
              },
              {
                icon: "🏗️",
                title: "Security Architecture",
                description: "Design and implementation of robust security frameworks tailored to your business needs."
              }
            ]
          },
          {
            title: "Events & CTFs",
            subtitle: "Competitive cybersecurity challenges and educational workshops that sharpen skills",
            icon: "🏆",
            features: [
              {
                icon: "⚔️",
                title: "Capture The Flag",
                description: "Intense competitive hacking challenges covering web security, cryptography, and reverse engineering."
              },
              {
                icon: "🎓",
                title: "Security Workshops",
                description: "Hands-on learning sessions covering the latest tools, techniques, and methodologies in cybersecurity."
              },
              {
                icon: "🌐",
                title: "Bug Bounty Programs",
                description: "Collaborative vulnerability hunting programs with rewards for discovering critical security flaws."
              },
              {
                icon: "🤝",
                title: "Industry Partnerships",
                description: "Exclusive events with leading cybersecurity companies and government agencies."
              }
            ]
          },
          {
            title: "Elite Team",
            subtitle: "Meet the cybersecurity experts and blockchain specialists driving innovation",
            icon: "👥",
            features: [
              {
                icon: "💻",
                title: "Security Researchers",
                description: "PhD-level experts in vulnerability research, malware analysis, and advanced persistent threat detection."
              },
              {
                icon: "⛓️",
                title: "Blockchain Developers",
                description: "Smart contract auditors and DeFi protocol specialists with proven track records in Web3 security."
              },
              {
                icon: "🎯",
                title: "Red Team Operators",
                description: "Elite penetration testers and social engineers who simulate real-world attack scenarios."
              },
              {
                icon: "🔐",
                title: "Cryptography Experts",
                description: "Mathematics and computer science experts specializing in cryptographic protocol design and analysis."
              }
            ]
          }
        ]}
      />

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-content">
            <div className="section-placeholder">
              <h2 className="section-title slide-in-right">Join CipherCell</h2>
              <p className="section-description slide-in-left">
                Ready to secure the digital frontier? Connect with us and become part of the cybersecurity revolution.
              </p>
              <div className="scale-up">
                <div style={{height: '300px', border: '2px dashed var(--accent-cyan)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)'}}>
                  <p>Custom Contact Design Area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// About Page Component
const AboutPage = () => {
  return (
    <div className="page-container">
      <section id="about" className="section">
        <div className="container">
          <div className="section-content">
            <h2 className="section-title fade-in">About C1PH3RC3LL</h2>
            <p className="section-description fade-in">
              Elite Cybersecurity & Blockchain Club - Interactive Experience
            </p>
            <div className="slide-in-left">
              <MagicBento 
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="132, 0, 255"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Services Page Component
const ServicesPage = () => {
  return (
    <div className="page-container">
      <section id="services" className="section">
        <div className="container">
          <div className="section-content">
            <div className="section-placeholder">
              <h2 className="section-title fade-in">Our Focus Areas</h2>
              <p className="section-description fade-in">
                Cybersecurity and Blockchain expertise that shapes the future of digital security.
              </p>
              <div className="slide-in-left">
                <div style={{height: '400px', border: '2px dashed var(--accent-green)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)'}}>
                  <p>Custom Services Design Area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Events Page Component
const EventsPage = () => {
  return (
    <div className="page-container">
      <section id="events" className="section">
        <div className="container">
          <div className="section-content">
            <div className="section-placeholder">
              <h2 className="section-title slide-in-right">Events & Activities</h2>
              <p className="section-description slide-in-left">
                Workshops, competitions, and collaborative projects that build expertise and community.
              </p>
              <div className="scale-up">
                <div style={{height: '350px', border: '2px dashed var(--accent-purple)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)'}}>
                  <p>Custom Events Design Area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Team Page Component
const TeamPage = () => {
  return (
    <div className="page-container">
      <section id="team" className="section">
        <div className="container">
          <div className="section-content">
            <div className="section-placeholder">
              <h2 className="section-title fade-in">Our Team</h2>
              <p className="section-description fade-in">
                Meet the experts and enthusiasts driving innovation in cybersecurity and blockchain.
              </p>
              <div className="slide-in-left">
                <div style={{height: '400px', border: '2px dashed var(--accent-blue)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)'}}>
                  <p>Custom Team Design Area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact Page Component
const ContactPage = () => {
  return (
    <div className="page-container">
      <section id="contact" className="section">
        <div className="container">
          <div className="section-content">
            <div className="section-placeholder">
              <h2 className="section-title slide-in-right">Join CipherCell</h2>
              <p className="section-description slide-in-left">
                Ready to secure the digital frontier? Connect with us and become part of the cybersecurity revolution.
              </p>
              <div className="scale-up">
                <div style={{height: '300px', border: '2px dashed var(--accent-cyan)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)'}}>
                  <p>Custom Contact Design Area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize main website functionality in the background
    const initializeWebsite = async () => {
      try {
        // Wait a bit to ensure DOM is ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Import and initialize main.js
        const mainModule = await import('./main.js');
        console.log('Website content preloaded during animation');
        
        // Ensure body is visible
        document.body.style.opacity = '1';
        
        // All components now visible by default - no fade animations needed
        
      } catch (error) {
        console.log('Website initialization error:', error);
        // Ensure body is visible even if there's an error
        document.body.style.opacity = '1';
      }
    };

    // Start initialization immediately
    initializeWebsite();
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    // Ensure the main website is fully visible and cleanup
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
      
      console.log('CipherCell website fully loaded and ready');
    }, 100);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;