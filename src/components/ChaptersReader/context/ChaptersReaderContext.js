import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/theme';

const ChaptersReaderContext = createContext(null);

export const ChaptersReaderProvider = ({
  children,
  theme = defaultTheme,
  chaptersConfig = {
    indexUrl: '/chapters/index.json',
    chapterUrlPattern: '/chapters/chapter-{id}.md',
    storageKey: 'chapters-reader-progress'
  },
  enableReadingProgress = true,
  enableKeyboardShortcuts = true,
  onChapterChange,
  onProgressUpdate,
  LoadingComponent,
  MarkdownComponent
}) => {
  // Chapters state
  const [chapters, setChapters] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);

  // Reading progress state
  const [readingProgress, setReadingProgress] = useState(() => {
    if (!enableReadingProgress) return null;
    
    const savedProgress = localStorage.getItem(chaptersConfig.storageKey);
    return savedProgress ? JSON.parse(savedProgress) : {
      currentChapter: 1,
      lastRead: null,
      chaptersCompleted: [],
      bookmarks: [],
      notes: {}
    };
  });

  // Save reading progress to localStorage
  useEffect(() => {
    if (enableReadingProgress && readingProgress) {
      localStorage.setItem(chaptersConfig.storageKey, JSON.stringify(readingProgress));
      onProgressUpdate?.(readingProgress);
    }
  }, [readingProgress, chaptersConfig.storageKey, enableReadingProgress, onProgressUpdate]);

  // Load chapters index
  useEffect(() => {
    const loadChaptersIndex = async () => {
      try {
        const response = await fetch(chaptersConfig.indexUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setChapters(data.chapters);
        setMetadata(data.metadata);
        setLoading(false);
      } catch (err) {
        setError('Failed to load chapters index');
        setLoading(false);
      }
    };

    loadChaptersIndex();
  }, [chaptersConfig.indexUrl]);

  // Load chapter content
  const loadChapter = async (chapterId) => {
    if (loading || !chapters.length) return;

    setLoading(true);
    setError(null);
    
    try {
      const chapter = chapters.find(c => c.id === parseInt(chapterId, 10));
      if (!chapter) throw new Error('Chapter not found');

      if (currentChapter?.id === chapter.id && currentChapter?.content) {
        setLoading(false);
        return;
      }

      const chapterUrl = chaptersConfig.chapterUrlPattern.replace('{id}', chapterId);
      const response = await fetch(chapterUrl);
      if (!response.ok) throw new Error(`Failed to fetch chapter: ${response.status}`);

      const content = await response.text();
      if (!content) throw new Error('Chapter content is empty');

      const updatedChapter = { ...chapter, content };
      setCurrentChapter(updatedChapter);
      onChapterChange?.(updatedChapter);

      if (enableReadingProgress) {
        setReadingProgress(prev => ({
          ...prev,
          currentChapter: chapterId,
          lastRead: new Date().toISOString()
        }));
      }
    } catch (err) {
      setError(`Failed to load chapter ${chapterId}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Reading progress functions
  const markChapterComplete = (chapterId) => {
    if (!enableReadingProgress) return;
    
    setReadingProgress(prev => ({
      ...prev,
      chaptersCompleted: [...new Set([...prev.chaptersCompleted, chapterId])],
      lastRead: new Date().toISOString()
    }));
  };

  const getReadingStats = () => {
    if (!enableReadingProgress || !readingProgress) return null;

    const totalChapters = chapters.length;
    const completedCount = readingProgress.chaptersCompleted.length;
    const progressPercentage = (completedCount / totalChapters) * 100;
    const lastReadDate = readingProgress.lastRead 
      ? new Date(readingProgress.lastRead)
      : null;

    return {
      totalChapters,
      completedCount,
      progressPercentage,
      lastReadDate,
      bookmarkCount: readingProgress.bookmarks.length,
      noteCount: Object.values(readingProgress.notes)
        .reduce((total, chapter) => total + Object.keys(chapter).length, 0)
    };
  };

  // Navigation functions
  const getAdjacentChapterId = (direction) => {
    if (!currentChapter || loading || !chapters.length) return null;
    
    const currentIndex = chapters.findIndex(c => c.id === currentChapter.id);
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (nextIndex >= 0 && nextIndex < chapters.length) {
      return chapters[nextIndex].id;
    }
    
    return null;
  };

  const canNavigate = (direction) => {
    if (!currentChapter || loading || !chapters.length) return false;
    
    const currentIndex = chapters.findIndex(c => c.id === currentChapter.id);
    return direction === 'next' 
      ? currentIndex < chapters.length - 1
      : currentIndex > 0;
  };

  const contextValue = {
    // State
    chapters,
    metadata,
    loading,
    error,
    currentChapter,
    readingProgress: enableReadingProgress ? readingProgress : null,
    
    // Chapter functions
    loadChapter,
    getAdjacentChapterId,
    canNavigate,
    
    // Reading progress functions
    markChapterComplete: enableReadingProgress ? markChapterComplete : null,
    getReadingStats: enableReadingProgress ? getReadingStats : null,
    
    // Config
    enableReadingProgress,
    enableKeyboardShortcuts,
    
    // Components
    LoadingComponent,
    MarkdownComponent
  };

  return (
    <ThemeProvider theme={theme}>
      <ChaptersReaderContext.Provider value={contextValue}>
        {children}
      </ChaptersReaderContext.Provider>
    </ThemeProvider>
  );
};

export const useChaptersReaderContext = () => {
  const context = useContext(ChaptersReaderContext);
  if (context === null) {
    throw new Error('useChaptersReaderContext must be used within a ChaptersReaderProvider');
  }
  return context;
};
