import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTransition = (delay = 300) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Start transition when location changes
    setIsTransitioning(true);
    setShowContent(false);

    // Show content after a brief delay
    const showTimer = setTimeout(() => {
      setShowContent(true);
    }, delay / 2);

    // End transition after delay
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, delay);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(transitionTimer);
    };
  }, [location, delay]);

  return {
    isTransitioning,
    showContent,
    // CSS classes for transitions
    transitionClass: isTransitioning ? 'transitioning' : '',
    contentClass: showContent ? 'content-visible' : 'content-hidden'
  };
};

export default usePageTransition;
