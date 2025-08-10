import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen.jsx';

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
      
      // Remove the React loading container after fade out
      const loadingContainer = document.getElementById('react-loading-root');
      if (loadingContainer) {
        setTimeout(() => {
          loadingContainer.remove();
        }, 1000);
      }
      
      // Trigger a custom event to indicate the website is ready
      const websiteReadyEvent = new CustomEvent('websiteReady');
      document.dispatchEvent(websiteReadyEvent);
      
      console.log('CipherCell website fully loaded and ready');
    }, 100);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
    </>
  );
};

export default App;