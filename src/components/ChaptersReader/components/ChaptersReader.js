import React, { useState } from 'react';
import { useChaptersReaderContext } from '../context/ChaptersReaderContext';
import {
  Section,
  ChapterContainer,
  ChapterTitle,
  ChapterNav,
  NavButton,
  BackButton,
  CompleteButton,
  ChapterList,
  ChapterCard,
  ChapterMeta,
  CompletedBadge,
  ErrorMessage,
  HelpButton
} from '../styles/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import KeyboardShortcuts from './KeyboardShortcuts';
import { useReaderKeyboardShortcuts } from '../hooks/useReaderKeyboardShortcuts';

const DefaultLoading = ({ status }) => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h2>{status || 'Loading...'}</h2>
  </div>
);

const DefaultMarkdown = ({ content }) => (
  <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
);

const ChaptersReader = () => {
  const {
    chapters,
    loading,
    error,
    currentChapter,
    loadChapter,
    getAdjacentChapterId,
    canNavigate,
    readingProgress,
    markChapterComplete,
    enableKeyboardShortcuts,
    LoadingComponent = DefaultLoading,
    MarkdownComponent = DefaultMarkdown
  } = useChaptersReaderContext();

  const [isListView, setIsListView] = useState(!currentChapter);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const handleNavigate = (direction) => {
    const nextChapterId = getAdjacentChapterId(direction);
    if (nextChapterId) {
      loadChapter(nextChapterId);
    }
  };

  const handleChapterSelect = async (id) => {
    loadChapter(id);
    setIsListView(false);
  };

  const handleBackToList = () => {
    setIsListView(true);
  };

  useReaderKeyboardShortcuts({
    isEnabled: enableKeyboardShortcuts && !isListView,
    onNavigatePrev: () => handleNavigate('prev'),
    onNavigateNext: () => handleNavigate('next'),
    onToggleView: handleBackToList,
    canNavigatePrev: canNavigate('prev'),
    canNavigateNext: canNavigate('next'),
  });

  if (loading && !chapters.length && !currentChapter) {
    return <LoadingComponent status="Loading Chapters" />;
  }

  if (error && !chapters.length && !currentChapter) {
    return (
      <Section>
        <ErrorMessage>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </ErrorMessage>
      </Section>
    );
  }

  if (isListView) {
    return (
      <Section>
        <h1>Chapters</h1>
        <ChapterList>
          {chapters.map(chapter => (
            <ChapterCard 
              key={chapter.id} 
              onClick={() => handleChapterSelect(chapter.id)}
            >
              <h3>Chapter {chapter.id}</h3>
              <h4>{chapter.title}</h4>
              <ChapterMeta>
                <div>{chapter.readingTime}</div>
                <div>{new Date(chapter.publishedDate).toLocaleDateString()}</div>
              </ChapterMeta>
              {readingProgress?.chaptersCompleted.includes(chapter.id) && (
                <CompletedBadge>
                  ✓ Completed
                </CompletedBadge>
              )}
            </ChapterCard>
          ))}
        </ChapterList>
        
        {enableKeyboardShortcuts && (
          <>
            <HelpButton onClick={() => setShowShortcuts(true)}>
              <FontAwesomeIcon icon={faKeyboard} />
            </HelpButton>
            {showShortcuts && (
              <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />
            )}
          </>
        )}
      </Section>
    );
  }

  if (currentChapter) {
    const canNavigatePrev = canNavigate('prev');
    const canNavigateNext = canNavigate('next');

    return (
      <Section>
        <BackButton onClick={handleBackToList}>
          Back to Chapter List
        </BackButton>
        
        <ChapterContainer>
          <ChapterTitle>
            Chapter {currentChapter.id}: {currentChapter.title}
          </ChapterTitle>
          {currentChapter.content ? (
            <MarkdownComponent content={currentChapter.content} />
          ) : (
            <ErrorMessage>No content available for this chapter</ErrorMessage>
          )}
        </ChapterContainer>

        <ChapterNav>
          <NavButton
            onClick={() => handleNavigate('prev')}
            disabled={!canNavigatePrev || loading}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Previous
          </NavButton>
          
          {readingProgress && (
            <CompleteButton
              onClick={() => markChapterComplete(currentChapter.id)}
              disabled={readingProgress.chaptersCompleted.includes(currentChapter.id)}
            >
              Mark as Complete
            </CompleteButton>
          )}
          
          <NavButton
            onClick={() => handleNavigate('next')}
            disabled={!canNavigateNext || loading}
          >
            Next <FontAwesomeIcon icon={faChevronRight} />
          </NavButton>
        </ChapterNav>

        {enableKeyboardShortcuts && (
          <>
            <HelpButton onClick={() => setShowShortcuts(true)}>
              <FontAwesomeIcon icon={faKeyboard} />
            </HelpButton>
            {showShortcuts && (
              <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />
            )}
          </>
        )}
      </Section>
    );
  }

  return <LoadingComponent status="Loading Chapter" />;
};

export default ChaptersReader;
