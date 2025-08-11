import React, { useEffect, useRef, useState } from 'react';
import './ScrollStack.css';

const ScrollStack = ({ sections, className = '' }) => {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress through the container
      const scrollProgress = Math.max(0, Math.min(1, 
        (viewportHeight - rect.top) / (viewportHeight + rect.height)
      ));

      // Determine which section should be active based on scroll progress
      const sectionIndex = Math.min(
        sections.length - 1,
        Math.floor(scrollProgress * sections.length)
      );
      
      setActiveSection(sectionIndex);

      // Apply scroll-based transformations to each section
      sections.forEach((_, index) => {
        const sectionEl = container.querySelector(`[data-section="${index}"]`);
        if (!sectionEl) return;

        const sectionProgress = Math.max(0, Math.min(1,
          (scrollProgress * sections.length) - index
        ));

        // Calculate transforms based on section position
        const scale = 0.85 + (sectionProgress * 0.15);
        const opacity = Math.max(0.3, sectionProgress);
        const translateY = (1 - sectionProgress) * 100;
        const rotateX = (1 - sectionProgress) * 15;

        // Apply transforms
        sectionEl.style.transform = `
          translateY(${translateY}px) 
          rotateX(${rotateX}deg) 
          scale(${scale})
        `;
        sectionEl.style.opacity = opacity;
        sectionEl.style.zIndex = sections.length - index + Math.floor(sectionProgress * 10);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  return (
    <div 
      ref={containerRef}
      className={`scroll-stack-container ${className}`}
      style={{ height: `${sections.length * 100}vh` }}
    >
      {sections.map((section, index) => (
        <div
          key={index}
          data-section={index}
          className={`scroll-stack-section ${activeSection === index ? 'active' : ''}`}
        >
          <div className="scroll-stack-content">
            <div className="section-background">
              <div className="cyber-grid"></div>
              <div className="gradient-overlay"></div>
            </div>
            
            <div className="section-inner">
              {section.icon && (
                <div className="section-icon">
                  {section.icon}
                </div>
              )}
              
              <h2 className="section-title">{section.title}</h2>
              
              {section.subtitle && (
                <p className="section-subtitle">{section.subtitle}</p>
              )}
              
              <div className="section-content-area">
                {section.content}
              </div>
              
              {section.features && (
                <div className="features-grid">
                  {section.features.map((feature, idx) => (
                    <div key={idx} className="feature-card">
                      <div className="feature-icon">{feature.icon}</div>
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Floating elements for visual interest */}
            <div className="floating-elements">
              <div className="floating-dot dot-1"></div>
              <div className="floating-dot dot-2"></div>
              <div className="floating-dot dot-3"></div>
              <div className="floating-line line-1"></div>
              <div className="floating-line line-2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;