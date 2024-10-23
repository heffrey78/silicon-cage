# ChaptersReader Component

A React component for creating interactive chapter-based reading experiences. Perfect for books, documentation, tutorials, or any content that's organized into chapters.

## Features

- 📚 Chapter navigation and progress tracking
- ⌨️ Keyboard shortcuts for navigation
- 🎨 Customizable theming
- 📱 Responsive design
- 💾 Reading progress persistence
- 🔖 Optional features (progress tracking, keyboard shortcuts)

## Installation

```bash
npm install chapters-reader
# or
yarn add chapters-reader
```

## Basic Usage

```jsx
import { ChaptersReader } from 'chapters-reader';

function App() {
  return (
    <ChaptersReader
      chaptersConfig={{
        indexUrl: '/chapters/index.json',
        chapterUrlPattern: '/chapters/chapter-{id}.md'
      }}
    />
  );
}
```

## Configuration

### Required Data Structure

#### Chapters Index (index.json)
```json
{
  "chapters": [
    {
      "id": 1,
      "title": "Chapter One",
      "readingTime": "5 min",
      "publishedDate": "2024-01-01"
    }
  ],
  "metadata": {
    "title": "Book Title",
    "author": "Author Name"
  }
}
```

#### Chapter Content (chapter-1.md)
```markdown
# Chapter One

Your chapter content in markdown format...
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| chaptersConfig | Object | See below | Configuration for chapters data |
| theme | Object | defaultTheme | Custom theme configuration |
| enableReadingProgress | boolean | true | Enable/disable reading progress tracking |
| enableKeyboardShortcuts | boolean | true | Enable/disable keyboard shortcuts |
| onChapterChange | function | - | Callback when chapter changes |
| onProgressUpdate | function | - | Callback when reading progress updates |
| LoadingComponent | component | DefaultLoading | Custom loading component |
| MarkdownComponent | component | DefaultMarkdown | Custom markdown renderer |

#### Default chaptersConfig
```js
{
  indexUrl: '/chapters/index.json',
  chapterUrlPattern: '/chapters/chapter-{id}.md',
  storageKey: 'chapters-reader-progress'
}
```

### Keyboard Shortcuts

- `←` Previous chapter
- `→` Next chapter
- `ESC` Return to chapter list

## Customization

### Custom Theme

```jsx
import { ChaptersReader, createTheme } from 'chapters-reader';

const customTheme = createTheme({
  colors: {
    primary: '#ff0000',
    secondary: '#00ff00',
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
  },
});

function App() {
  return <ChaptersReader theme={customTheme} />;
}
```

### Custom Components

```jsx
function CustomLoading({ status }) {
  return <div>Loading: {status}</div>;
}

function CustomMarkdown({ content }) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
}

function App() {
  return (
    <ChaptersReader
      LoadingComponent={CustomLoading}
      MarkdownComponent={CustomMarkdown}
    />
  );
}
```

### Progress Tracking

```jsx
function App() {
  const handleProgressUpdate = (progress) => {
    console.log('Reading progress:', progress);
  };

  return (
    <ChaptersReader
      enableReadingProgress={true}
      onProgressUpdate={handleProgressUpdate}
    />
  );
}
```

## TypeScript Support

The component includes TypeScript definitions for all props and configurations.

```typescript
import { ChaptersReader, ChaptersConfig, Theme } from 'chapters-reader';

const config: ChaptersConfig = {
  indexUrl: '/chapters/index.json',
  chapterUrlPattern: '/chapters/chapter-{id}.md'
};

function App() {
  return <ChaptersReader chaptersConfig={config} />;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
