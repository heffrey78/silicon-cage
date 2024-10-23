import { useState, useEffect } from 'react';

const useChapters = () => {
  const [chapters, setChapters] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [loadingChapter, setLoadingChapter] = useState(false);

  // Load chapters index
  useEffect(() => {
    const loadChaptersIndex = async () => {
      try {
        console.log('Loading chapters index...');
        const response = await fetch('/chapters/index.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Chapters index loaded:', data);
        setChapters(data.chapters);
        setMetadata(data.metadata);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load chapters index:', err);
        setError('Failed to load chapters index');
        setLoading(false);
      }
    };

    loadChaptersIndex();
  }, []);

  // Load specific chapter content
  const loadChapter = async (chapterId) => {
    console.log('loadChapter called with:', { chapterId, loading, chapters: chapters.length });
    
    // Wait for chapters to be loaded first
    if (loading) {
      console.log('Waiting for chapters to load before loading chapter...');
      return;
    }

    console.log(`Starting to load chapter ${chapterId}...`);
    setLoadingChapter(true);
    setError(null);
    
    try {
      const chapter = chapters.find(c => c.id === parseInt(chapterId, 10));
      console.log('Found chapter:', chapter);
      
      if (!chapter) {
        console.error('Chapter not found in chapters array:', { chapterId, chapters });
        throw new Error('Chapter not found');
      }

      // If we already have this chapter loaded, don't reload it
      if (currentChapter?.id === chapter.id && currentChapter?.content) {
        console.log('Chapter already loaded:', currentChapter);
        setLoadingChapter(false);
        return;
      }

      // Construct the correct path for the chapter file
      const chapterPath = `/chapters/chapter-${chapterId}.md`;
      console.log('Fetching from path:', chapterPath);

      const response = await fetch(chapterPath);
      if (!response.ok) {
        console.error('Failed to fetch chapter:', response.status, response.statusText);
        throw new Error(`Failed to fetch chapter: ${response.status} ${response.statusText}`);
      }

      const content = await response.text();
      console.log(`Chapter ${chapterId} content loaded, length:`, content.length);
      
      if (!content) {
        console.error('Chapter content is empty');
        throw new Error('Chapter content is empty');
      }

      const updatedChapter = {
        ...chapter,
        content: content
      };
      console.log('Setting current chapter:', updatedChapter);

      setCurrentChapter(updatedChapter);
      setLoadingChapter(false);
      console.log(`Successfully loaded chapter ${chapterId}`);
    } catch (err) {
      console.error(`Failed to load chapter ${chapterId}:`, err);
      setError(`Failed to load chapter ${chapterId}: ${err.message}`);
      setLoadingChapter(false);
    }
  };

  // Get next/previous chapter ID
  const getAdjacentChapterId = (direction) => {
    console.log('getAdjacentChapterId called:', { 
      direction, 
      currentChapter: currentChapter?.id,
      loading,
      chaptersLength: chapters.length
    });

    if (!currentChapter || loading || !chapters.length) {
      console.log('Cannot get adjacent chapter: no current chapter, still loading, or no chapters');
      return null;
    }
    
    const currentIndex = chapters.findIndex(c => c.id === currentChapter.id);
    console.log('Current chapter index:', currentIndex);
    
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    console.log('Next chapter index:', nextIndex);
    
    if (nextIndex >= 0 && nextIndex < chapters.length) {
      const nextChapterId = chapters[nextIndex].id;
      console.log(`Found ${direction} chapter:`, nextChapterId);
      return nextChapterId;
    }
    
    console.log('No adjacent chapter found:', { direction, currentIndex, nextIndex });
    return null;
  };

  // Check if navigation is possible
  const canNavigate = (direction) => {
    if (!currentChapter || loading || !chapters.length) {
      console.log('canNavigate: false - no current chapter, loading, or no chapters');
      return false;
    }
    
    const currentIndex = chapters.findIndex(c => c.id === currentChapter.id);
    const canNav = direction === 'next' 
      ? currentIndex < chapters.length - 1
      : currentIndex > 0;
    
    console.log('canNavigate:', { 
      direction, 
      currentIndex, 
      chaptersLength: chapters.length,
      result: canNav 
    });
    
    return canNav;
  };

  return {
    chapters,
    metadata,
    loading: loading || loadingChapter,
    error,
    currentChapter,
    loadChapter,
    getAdjacentChapterId,
    canNavigate
  };
};

export default useChapters;
