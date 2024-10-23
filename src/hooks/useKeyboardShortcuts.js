import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useKeyboardShortcuts = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Only handle keyboard shortcuts if no input element is focused
      if (
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA' ||
        document.activeElement.isContentEditable
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        // Navigation shortcuts
        case 'h':
          if (event.altKey) {
            event.preventDefault();
            navigate('/');
          }
          break;
        case 'c':
          if (event.altKey) {
            event.preventDefault();
            navigate('/chapters');
          }
          break;
        case 'p':
          if (event.altKey) {
            event.preventDefault();
            navigate('/characters');
          }
          break;
        case 'w':
          if (event.altKey) {
            event.preventDefault();
            navigate('/world');
          }
          break;

        // Theme toggle
        case 't':
          if (event.altKey) {
            event.preventDefault();
            toggleDarkMode();
          }
          break;

        // Chapter navigation (when in chapters view)
        case 'arrowleft':
          if (
            location.pathname.startsWith('/chapters') &&
            event.altKey
          ) {
            event.preventDefault();
            // Navigate to previous chapter logic here
            // This should be implemented in the Chapters component
            document.dispatchEvent(new CustomEvent('previousChapter'));
          }
          break;
        case 'arrowright':
          if (
            location.pathname.startsWith('/chapters') &&
            event.altKey
          ) {
            event.preventDefault();
            // Navigate to next chapter logic here
            // This should be implemented in the Chapters component
            document.dispatchEvent(new CustomEvent('nextChapter'));
          }
          break;

        // Search (to be implemented)
        case 'k':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            document.dispatchEvent(new CustomEvent('toggleSearch'));
          }
          break;

        // Help dialog
        case '?':
          if (event.shiftKey) {
            event.preventDefault();
            document.dispatchEvent(new CustomEvent('toggleHelp'));
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate, location.pathname, toggleDarkMode]);

  // Return help text for keyboard shortcuts
  const getShortcutsHelp = () => [
    {
      category: 'Navigation',
      shortcuts: [
        { keys: ['Alt', 'H'], description: 'Go to Home' },
        { keys: ['Alt', 'C'], description: 'Go to Chapters' },
        { keys: ['Alt', 'P'], description: 'Go to Characters' },
        { keys: ['Alt', 'W'], description: 'Go to World' },
      ]
    },
    {
      category: 'Reading',
      shortcuts: [
        { keys: ['Alt', '←'], description: 'Previous Chapter' },
        { keys: ['Alt', '→'], description: 'Next Chapter' },
        { keys: ['Alt', 'T'], description: 'Toggle Theme' },
      ]
    },
    {
      category: 'General',
      shortcuts: [
        { keys: ['Ctrl', 'K'], description: 'Search' },
        { keys: ['Shift', '?'], description: 'Show Help' },
      ]
    }
  ];

  return {
    shortcuts: getShortcutsHelp()
  };
};

export default useKeyboardShortcuts;
