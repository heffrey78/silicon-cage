import React from 'react';
import ChaptersReader from '../components/ChaptersReader';
import { useTheme } from 'styled-components';
import Loading from '../components/Loading';
import MarkdownRenderer from '../components/MarkdownRenderer';

const Chapters = () => {
  const theme = useTheme();

  return (
    <ChaptersReader
      theme={theme}
      chaptersConfig={{
        indexUrl: '/chapters/index.json',
        chapterUrlPattern: '/chapters/chapter-{id}.md',
        storageKey: 'silicon-cage-reading-progress'
      }}
      enableReadingProgress={true}
      enableKeyboardShortcuts={true}
      LoadingComponent={Loading}
      MarkdownComponent={MarkdownRenderer}
      onChapterChange={(chapter) => {
        document.title = `${chapter.title} - Silicon Cage`;
      }}
    />
  );
};

export default Chapters;
