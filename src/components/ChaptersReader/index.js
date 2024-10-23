import React from 'react';
import { ChaptersReaderProvider } from './context/ChaptersReaderContext';
import ChaptersReaderComponent from './components/ChaptersReader';
import { useChaptersReader } from './hooks/useChaptersReader';
import { defaultTheme, createTheme } from './styles/theme';

// Main component that combines provider and reader
const ChaptersReader = ({
  theme = defaultTheme,
  chaptersConfig,
  enableReadingProgress = true,
  enableKeyboardShortcuts = true,
  onChapterChange,
  onProgressUpdate,
  LoadingComponent,
  MarkdownComponent
}) => {
  return (
    <ChaptersReaderProvider
      theme={theme}
      chaptersConfig={chaptersConfig}
      enableReadingProgress={enableReadingProgress}
      enableKeyboardShortcuts={enableKeyboardShortcuts}
      onChapterChange={onChapterChange}
      onProgressUpdate={onProgressUpdate}
      LoadingComponent={LoadingComponent}
      MarkdownComponent={MarkdownComponent}
    >
      <ChaptersReaderComponent />
    </ChaptersReaderProvider>
  );
};

// Export everything needed for external usage
export {
  ChaptersReader as default,
  ChaptersReaderProvider,
  useChaptersReader,
  defaultTheme,
  createTheme
};
