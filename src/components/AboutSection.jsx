import React from 'react';
import MagicBento from './MagicBento';

const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-content">
          <h2 className="section-title fade-in">About C1PH3RC3LL</h2>
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

export default AboutSection;