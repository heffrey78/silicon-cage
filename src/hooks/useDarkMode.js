import { useState, useEffect } from 'react';

const useDarkMode = (defaultValue = true) => {
  // Get initial value from localStorage or use default
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : defaultValue;
  });

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        isDarkMode ? '#020c1b' : '#ffffff'
      );
    }

    // Update body class for potential CSS targeting
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  // Handle system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      const systemPrefersDark = e.matches;
      const savedMode = localStorage.getItem('darkMode');
      
      // Only update if user hasn't explicitly set a preference
      if (savedMode === null) {
        setIsDarkMode(systemPrefersDark);
      }
    };

    // Add listener for system preference changes
    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;
