import { useState, useEffect } from 'react';

const STORAGE_KEY = 'silicon-cage-reading-progress';

const useReadingProgress = () => {
  // Initialize state from localStorage
  const [readingProgress, setReadingProgress] = useState(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    return savedProgress ? JSON.parse(savedProgress) : {
      currentChapter: 1,
      lastRead: null,
      chaptersCompleted: [],
      bookmarks: [],
      notes: {}
    };
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readingProgress));
  }, [readingProgress]);

  // Update current chapter
  const setCurrentChapter = (chapterNumber) => {
    setReadingProgress(prev => ({
      ...prev,
      currentChapter: chapterNumber,
      lastRead: new Date().toISOString()
    }));
  };

  // Mark chapter as completed
  const markChapterComplete = (chapterNumber) => {
    setReadingProgress(prev => ({
      ...prev,
      chaptersCompleted: [...new Set([...prev.chaptersCompleted, chapterNumber])],
      lastRead: new Date().toISOString()
    }));
  };

  // Add bookmark
  const addBookmark = (chapterNumber, position, note = '') => {
    const bookmark = {
      id: Date.now(),
      chapterNumber,
      position,
      note,
      timestamp: new Date().toISOString()
    };

    setReadingProgress(prev => ({
      ...prev,
      bookmarks: [...prev.bookmarks, bookmark]
    }));

    return bookmark.id;
  };

  // Remove bookmark
  const removeBookmark = (bookmarkId) => {
    setReadingProgress(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.filter(b => b.id !== bookmarkId)
    }));
  };

  // Add note
  const addNote = (chapterNumber, content) => {
    const noteId = Date.now();
    const note = {
      id: noteId,
      content,
      timestamp: new Date().toISOString()
    };

    setReadingProgress(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [chapterNumber]: {
          ...(prev.notes[chapterNumber] || {}),
          [noteId]: note
        }
      }
    }));

    return noteId;
  };

  // Remove note
  const removeNote = (chapterNumber, noteId) => {
    setReadingProgress(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [chapterNumber]: Object.fromEntries(
          Object.entries(prev.notes[chapterNumber] || {})
            .filter(([id]) => id !== noteId.toString())
        )
      }
    }));
  };

  // Get reading statistics
  const getReadingStats = () => {
    const totalChapters = 30; // Update this based on actual chapter count
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

  // Reset all progress
  const resetProgress = () => {
    setReadingProgress({
      currentChapter: 1,
      lastRead: null,
      chaptersCompleted: [],
      bookmarks: [],
      notes: {}
    });
  };

  return {
    readingProgress,
    setCurrentChapter,
    markChapterComplete,
    addBookmark,
    removeBookmark,
    addNote,
    removeNote,
    getReadingStats,
    resetProgress
  };
};

export default useReadingProgress;
