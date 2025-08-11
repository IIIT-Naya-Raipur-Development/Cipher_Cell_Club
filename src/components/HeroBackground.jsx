import React from 'react';
import LetterGlitch from './LetterGlitch';

const HeroBackground = ({ isPrimeMode }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      opacity: 0.15
    }}>
        <LetterGlitch
          glitchColors={isPrimeMode ? ['#ff1744', '#ff4569', '#ff6b8a', '#ff8a65'] : ['#10b981', '#06b6d4', '#1e40af', '#4f46e5']}
          glitchSpeed={isPrimeMode ? 25 : 50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
    </div>
  );
};

export default HeroBackground;