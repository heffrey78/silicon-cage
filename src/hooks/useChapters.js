import { useState, useEffect } from 'react';

const useChapters = () => {
  const [chapters, setChapters] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);

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
    console.log(`Starting to load chapter ${chapterId}...`);
    setLoading(true);
    setError(null);
    
    try {
      const chapter = chapters.find(c => c.id === parseInt(chapterId, 10));
      if (!chapter) {
        console.error('Chapter not found in chapters array:', { chapterId, chapters });
        throw new Error('Chapter not found');
      }

      console.log('Found chapter in index:', chapter);

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

      // Log the first few characters of content
      console.log('Content preview:', content.substring(0, 100));

      const updatedChapter = {
        ...chapter,
        content: content
      };
      console.log('Setting current chapter:', updatedChapter);

      setCurrentChapter(updatedChapter);
      setLoading(false);
      console.log(`Successfully loaded chapter ${chapterId}`);
    } catch (err) {
      console.error(`Failed to load chapter ${chapterId}:`, err);
      setError(`Failed to load chapter ${chapterId}: ${err.message}`);
      setLoading(false);
    }
  };

  // Navigate to next/previous chapter
  const navigateChapter = (direction) => {
    if (!currentChapter) {
      console.log('Cannot navigate: no current chapter');
      return;
    }
    
    const currentIndex = chapters.findIndex(c => c.id === currentChapter.id);
    console.log('Current chapter index:', currentIndex);
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (nextIndex >= 0 && nextIndex < chapters.length) {
      console.log(`Navigating to ${direction} chapter:`, chapters[nextIndex].id);
      loadChapter(chapters[nextIndex].id);
    } else {
      console.log('Cannot navigate:', { direction, currentIndex, nextIndex });
    }
  };

  // Check if navigation is possible
  const canNavigate = (direction) => {
    if (!currentChapter) return false;
    
    const currentIndex = chapters.findIndex(c => c.id === currentChapter.id);
    return direction === 'next' 
      ? currentIndex < chapters.length - 1
      : currentIndex > 0;
  };

  return {
    chapters,
    metadata,
    loading,
    error,
    currentChapter,
    loadChapter,
    navigateChapter,
    canNavigate
  };
};

export default useChapters;
