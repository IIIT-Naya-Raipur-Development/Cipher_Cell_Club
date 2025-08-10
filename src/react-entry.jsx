import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import HeroSection from './components/HeroSection.jsx';

// Wait for DOM to be ready
const initReactApp = () => {
  // Create a container for the React loading screen
  const loadingContainer = document.createElement('div');
  loadingContainer.id = 'react-loading-root';
  loadingContainer.style.position = 'fixed';
  loadingContainer.style.top = '0';
  loadingContainer.style.left = '0';
  loadingContainer.style.width = '100%';
  loadingContainer.style.height = '100%';
  loadingContainer.style.zIndex = '10000';
  
  document.body.appendChild(loadingContainer);

  // Mount the React loading app
  const root = createRoot(loadingContainer);
  root.render(<App />);
  
  // Mount Hero Section with LetterGlitch background
  const heroRoot = document.getElementById('hero-section-root');
  if (heroRoot) {
    const heroReactRoot = createRoot(heroRoot);
    heroReactRoot.render(<HeroSection />);
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReactApp);
} else {
  initReactApp();
}