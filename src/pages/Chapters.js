import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Section, Card, Title, Button, FlexContainer } from '../styles/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { useReadingProgressContext } from '../contexts/ReadingProgressContext';
import useChapters from '../hooks/useChapters';
import useReaderKeyboardShortcuts from '../hooks/useReaderKeyboardShortcuts';
import Loading from '../components/Loading';
import MarkdownRenderer from '../components/MarkdownRenderer';
import KeyboardShortcutsHelp from '../components/KeyboardShortcutsHelp';

const ChapterContainer = styled(Card)`
  max-width: 800px;
  margin: 2rem auto;
  font-family: ${props => props.theme.fonts.secondary};
  line-height: 1.8;
  font-size: 1.1rem;
  padding: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
    margin: 1rem;
  }
`;

const ChapterTitle = styled(Title)`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const ChapterNav = styled(FlexContainer)`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.theme.mode === 'dark'
    ? `${props.theme.colors.dark.primary}ee`
    : `${props.theme.colors.light.background}ee`};
  padding: 1rem;
  border-radius: 2rem;
  box-shadow: 0 4px 6px ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.shadow
    : props.theme.colors.light.shadow};
  backdrop-filter: blur(10px);
  z-index: 100;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 90%;
    padding: 0.5rem;
  }
`;

const NavButton = styled(Button)`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

const ChapterList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
  padding: 0 1rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 0 0.5rem;
  }
`;

const ChapterCard = styled(Card)`
  cursor: pointer;
  transition: all ${props => props.theme.transitions.standard};
  padding: 1.5rem;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px ${props => props.theme.mode === 'dark'
      ? props.theme.colors.dark.shadow
      : props.theme.colors.light.shadow};
  }

  h3 {
    margin-bottom: 0.5rem;
    color: ${props => props.theme.mode === 'dark'
      ? props.theme.colors.dark.accent
      : props.theme.colors.light.accent};
  }
`;

const ChapterMeta = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
  display: flex;
  gap: 1rem;
`;

const CompletedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.success
    : props.theme.colors.light.success};
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const HelpButton = styled(Button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.secondary
    : props.theme.colors.light.card};
  box-shadow: 0 2px 8px ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.shadow
    : props.theme.colors.light.shadow};
  z-index: 99;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    bottom: 5rem;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.dark.danger};
  background: ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.secondary
    : props.theme.colors.light.card};
  border-radius: 8px;
  margin: 2rem auto;
  max-width: 600px;
`;

const Chapters = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [isListView, setIsListView] = useState(!chapterId);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const { readingProgress, markChapterComplete } = useReadingProgressContext();
  const {
    chapters,
    metadata,
    loading,
    error,
    currentChapter,
    loadChapter,
    navigateChapter,
    canNavigate
  } = useChapters();

  // Load chapter from route parameter
  useEffect(() => {
    console.log('Route chapterId:', chapterId);
    if (chapterId) {
      console.log('Loading chapter from route:', chapterId);
      loadChapter(parseInt(chapterId, 10));
      setIsListView(false);
    }
  }, [chapterId, loadChapter]);

  const { shortcuts } = useReaderKeyboardShortcuts({
    isReading: !isListView,
    onNavigatePrev: () => navigateChapter('prev'),
    onNavigateNext: () => navigateChapter('next'),
    onToggleView: () => setIsListView(true),
    canNavigatePrev: canNavigate('prev'),
    canNavigateNext: canNavigate('next'),
  });

  const handleChapterSelect = useCallback(async (id) => {
    console.log('Chapter selected:', id);
    try {
      navigate(`/chapters/${id}`);
    } catch (err) {
      console.error('Error selecting chapter:', err);
    }
  }, [navigate]);

  const handleBackToList = useCallback(() => {
    console.log('Returning to chapter list');
    navigate('/chapters');
    setIsListView(true);
  }, [navigate]);

  console.log('Current state:', {
    isListView,
    loading,
    error,
    chapterId,
    currentChapter: currentChapter ? {
      id: currentChapter.id,
      title: currentChapter.title,
      hasContent: Boolean(currentChapter.content)
    } : null
  });

  if (loading && !currentChapter) {
    console.log('Showing loading state');
    return <Loading status="Loading Chapters" />;
  }

  if (error && !currentChapter) {
    console.log('Showing error state:', error);
    return (
      <Section>
        <ErrorMessage>
          <h2>Error</h2>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </ErrorMessage>
      </Section>
    );
  }

  if (isListView) {
    console.log('Rendering chapter list view');
    return (
      <Section>
        <Title>Chapters</Title>
        <ChapterList>
          {chapters.map(chapter => (
            <ChapterCard 
              key={chapter.id} 
              onClick={() => {
                console.log('Chapter card clicked:', chapter.id);
                handleChapterSelect(chapter.id);
              }}
            >
              <h3>Chapter {chapter.id}</h3>
              <h4>{chapter.title}</h4>
              <ChapterMeta>
                <div>{chapter.readingTime}</div>
                <div>{new Date(chapter.publishedDate).toLocaleDateString()}</div>
              </ChapterMeta>
              {readingProgress.chaptersCompleted.includes(chapter.id) && (
                <CompletedBadge>
                  ✓ Completed
                </CompletedBadge>
              )}
            </ChapterCard>
          ))}
        </ChapterList>
        <HelpButton onClick={() => setShowShortcuts(true)}>
          <FontAwesomeIcon icon={faKeyboard} />
        </HelpButton>
        {showShortcuts && (
          <KeyboardShortcutsHelp 
            shortcuts={shortcuts}
            onClose={() => setShowShortcuts(false)}
          />
        )}
      </Section>
    );
  }

  if (!currentChapter || loading) {
    console.log('Showing chapter loading state');
    return <Loading status="Loading Chapter" />;
  }

  if (error) {
    console.log('Showing chapter error state:', error);
    return (
      <Section>
        <ErrorMessage>
          <h2>Error Loading Chapter</h2>
          <p>{error}</p>
          <Button onClick={handleBackToList}>
            Return to Chapter List
          </Button>
        </ErrorMessage>
      </Section>
    );
  }

  console.log('Rendering chapter view:', {
    id: currentChapter.id,
    title: currentChapter.title,
    contentLength: currentChapter.content?.length
  });

  return (
    <Section>
      <Button 
        onClick={handleBackToList} 
        style={{ marginBottom: '2rem', marginLeft: '2rem' }}
      >
        Back to Chapter List
      </Button>
      
      <ChapterContainer>
        <ChapterTitle>
          Chapter {currentChapter.id}: {currentChapter.title}
        </ChapterTitle>
        {currentChapter.content ? (
          <MarkdownRenderer content={currentChapter.content} />
        ) : (
          <ErrorMessage>No content available for this chapter</ErrorMessage>
        )}
      </ChapterContainer>

      <ChapterNav justify="center">
        <NavButton
          onClick={() => navigateChapter('prev')}
          disabled={!canNavigate('prev')}
        >
          <FontAwesomeIcon icon={faChevronLeft} /> Previous
        </NavButton>
        <Button
          onClick={() => markChapterComplete(currentChapter.id)}
          disabled={readingProgress.chaptersCompleted.includes(currentChapter.id)}
          style={{ margin: '0 1rem' }}
        >
          Mark as Complete
        </Button>
        <NavButton
          onClick={() => navigateChapter('next')}
          disabled={!canNavigate('next')}
        >
          Next <FontAwesomeIcon icon={faChevronRight} />
        </NavButton>
      </ChapterNav>

      <HelpButton onClick={() => setShowShortcuts(true)}>
        <FontAwesomeIcon icon={faKeyboard} />
      </HelpButton>
      
      {showShortcuts && (
        <KeyboardShortcutsHelp 
          shortcuts={shortcuts}
          onClose={() => setShowShortcuts(false)}
        />
      )}
    </Section>
  );
};

export default Chapters;
