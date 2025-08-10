import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Wait for DOM to be ready and mount React app
const initApp = () => {
  const root = document.getElementById('root');
  if (root) {
    const reactRoot = createRoot(root);
    reactRoot.render(<App />);
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}