import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Global variable to track if root has been created
let reactRoot = null;

// Wait for DOM to be ready and mount React app
const initApp = () => {
  const root = document.getElementById('root');
  if (root && !reactRoot) {
    reactRoot = createRoot(root);
    reactRoot.render(<App />);
  } else if (reactRoot) {
    // If root already exists, just re-render
    reactRoot.render(<App />);
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}