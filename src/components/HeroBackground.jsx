import React from 'react';
import LetterGlitch from './LetterGlitch';
import ErrorBoundary from './ErrorBoundary';

const HeroBackground = () => {
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
      <ErrorBoundary>
        <LetterGlitch
          glitchColors={['#10b981', '#06b6d4', '#1e40af', '#4f46e5']}
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </ErrorBoundary>
    </div>
  );
};

export default HeroBackground;