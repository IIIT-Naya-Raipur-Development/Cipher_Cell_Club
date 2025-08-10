import React from 'react';
import MagicBento from './MagicBento';

const ServicesSection = () => {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-content">
          <h2 className="section-title fade-in">Our Focus Areas</h2>
          <p className="section-description fade-in">
            Cybersecurity and Blockchain expertise that shapes the future of digital security.
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
  );
};

export default ServicesSection;