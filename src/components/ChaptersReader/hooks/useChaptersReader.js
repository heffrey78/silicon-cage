import { useChaptersReaderContext } from '../context/ChaptersReaderContext';

export const useChaptersReader = () => {
  const context = useChaptersReaderContext();
  
  return {
    // Chapter state
    chapters: context.chapters,
    currentChapter: context.currentChapter,
    loading: context.loading,
    error: context.error,
    
    // Navigation
    loadChapter: context.loadChapter,
    canNavigateNext: () => context.canNavigate('next'),
    canNavigatePrev: () => context.canNavigate('prev'),
    navigateNext: () => {
      const nextId = context.getAdjacentChapterId('next');
      if (nextId) context.loadChapter(nextId);
    },
    navigatePrev: () => {
      const prevId = context.getAdjacentChapterId('prev');
      if (prevId) context.loadChapter(prevId);
    },
    
    // Reading progress
    readingProgress: context.readingProgress,
    markChapterComplete: context.markChapterComplete,
    getReadingStats: context.getReadingStats,
    
    // Config
    enableReadingProgress: context.enableReadingProgress,
    enableKeyboardShortcuts: context.enableKeyboardShortcuts
  };
};

export default useChaptersReader;
