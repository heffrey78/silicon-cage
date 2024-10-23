import { useEffect } from 'react';

export const useReaderKeyboardShortcuts = ({
  isEnabled = true,
  onNavigatePrev,
  onNavigateNext,
  onToggleView,
  canNavigatePrev,
  canNavigateNext,
}) => {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyPress = (event) => {
      // Ignore key events when user is typing in an input or textarea
      if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.isContentEditable
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          if (canNavigatePrev) {
            event.preventDefault();
            onNavigatePrev();
          }
          break;
        case 'ArrowRight':
          if (canNavigateNext) {
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
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    isEnabled,
    onNavigatePrev,
    onNavigateNext,
    onToggleView,
    canNavigatePrev,
    canNavigateNext,
  ]);

  return {
    shortcuts: [
      {
        key: '←',
        description: 'Previous chapter',
        enabled: canNavigatePrev,
      },
      {
        key: '→',
        description: 'Next chapter',
        enabled: canNavigateNext,
      },
      {
        key: 'ESC',
        description: 'Return to chapter list',
        enabled: true,
      },
    ],
  };
};
