import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useReaderKeyboardShortcuts = ({
  isReading,
  onNavigatePrev,
  onNavigateNext,
  onToggleView,
  canNavigatePrev,
  canNavigateNext,
}) => {
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

      // Navigation shortcuts
      if (isReading) {
        switch (event.key) {
          case 'ArrowLeft':
            if (event.altKey && canNavigatePrev) {
              event.preventDefault();
              onNavigatePrev();
            }
            break;
          case 'ArrowRight':
            if (event.altKey && canNavigateNext) {
              event.preventDefault();
              onNavigateNext();
            }
            break;
          case 'Escape':
            event.preventDefault();
            onToggleView();
            break;
          default:
            break;
        }
      }

      // Reading shortcuts
      switch (event.key.toLowerCase()) {
        case 'f':
          // Toggle fullscreen reading mode
          if (event.altKey) {
            event.preventDefault();
            document.documentElement.requestFullscreen?.();
          }
          break;
        case 'b':
          // Back to chapter list
          if (event.altKey && isReading) {
            event.preventDefault();
            onToggleView();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    isReading,
    onNavigatePrev,
    onNavigateNext,
    onToggleView,
    canNavigatePrev,
    canNavigateNext,
  ]);

  // Return help text for keyboard shortcuts
  const getShortcutsHelp = () => [
    {
      category: 'Navigation',
      shortcuts: [
        { keys: ['Alt', '←'], description: 'Previous Chapter' },
        { keys: ['Alt', '→'], description: 'Next Chapter' },
        { keys: ['Alt', 'B'], description: 'Back to Chapter List' },
      ]
    },
    {
      category: 'Reading',
      shortcuts: [
        { keys: ['Alt', 'F'], description: 'Toggle Fullscreen' },
        { keys: ['Esc'], description: 'Exit Reading Mode' },
      ]
    }
  ];

  return {
    shortcuts: getShortcutsHelp()
  };
};

export default useReaderKeyboardShortcuts;
