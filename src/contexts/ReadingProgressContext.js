import React, { createContext, useContext } from 'react';
import useReadingProgress from '../hooks/useReadingProgress';

const ReadingProgressContext = createContext(null);

export const ReadingProgressProvider = ({ children }) => {
  const readingProgressHook = useReadingProgress();

  return (
    <ReadingProgressContext.Provider value={readingProgressHook}>
      {children}
    </ReadingProgressContext.Provider>
  );
};

export const useReadingProgressContext = () => {
  const context = useContext(ReadingProgressContext);
  if (context === null) {
    throw new Error('useReadingProgressContext must be used within a ReadingProgressProvider');
  }
  return context;
};

// Progress Bar Component
export const ReadingProgressBar = ({ className }) => {
  const { getReadingStats } = useReadingProgressContext();
  const { progressPercentage } = getReadingStats();

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '4px',
        backgroundColor: 'rgba(100, 255, 218, 0.1)',
        position: 'relative',
        borderRadius: '2px',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${progressPercentage}%`,
          backgroundColor: '#64ffda',
          transition: 'width 0.3s ease-in-out'
        }}
      />
    </div>
  );
};

// Reading Stats Component
export const ReadingStats = ({ className }) => {
  const { getReadingStats } = useReadingProgressContext();
  const stats = getReadingStats();

  return (
    <div className={className}>
      <div>Chapters Read: {stats.completedCount} / {stats.totalChapters}</div>
      <div>Progress: {Math.round(stats.progressPercentage)}%</div>
      <div>Bookmarks: {stats.bookmarkCount}</div>
      <div>Notes: {stats.noteCount}</div>
      {stats.lastReadDate && (
        <div>
          Last Read: {stats.lastReadDate.toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

// Reading Controls Component
export const ReadingControls = ({ className, chapterNumber }) => {
  const {
    addBookmark,
    removeBookmark,
    addNote,
    readingProgress
  } = useReadingProgressContext();

  const isBookmarked = readingProgress.bookmarks.some(
    b => b.chapterNumber === chapterNumber
  );

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      const bookmark = readingProgress.bookmarks.find(
        b => b.chapterNumber === chapterNumber
      );
      if (bookmark) {
        removeBookmark(bookmark.id);
      }
    } else {
      addBookmark(chapterNumber, 0);
    }
  };

  const handleAddNote = () => {
    const note = prompt('Enter your note:');
    if (note) {
      addNote(chapterNumber, note);
    }
  };

  return (
    <div className={className}>
      <button onClick={handleBookmarkToggle}>
        {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      </button>
      <button onClick={handleAddNote}>
        Add Note
      </button>
    </div>
  );
};

// Chapter Progress Component
export const ChapterProgress = ({ className, chapterNumber }) => {
  const { readingProgress, markChapterComplete } = useReadingProgressContext();
  const isCompleted = readingProgress.chaptersCompleted.includes(chapterNumber);

  return (
    <div className={className}>
      {isCompleted ? (
        <span>✓ Completed</span>
      ) : (
        <button onClick={() => markChapterComplete(chapterNumber)}>
          Mark as Complete
        </button>
      )}
    </div>
  );
};

export default ReadingProgressContext;
