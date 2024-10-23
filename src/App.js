import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { GlobalStyle, theme } from './styles/theme';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading';
import useDarkMode from './hooks/useDarkMode';
import { ReadingProgressProvider } from './contexts/ReadingProgressContext';
import { AppContainer, MainContent } from './styles/layout';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Chapters = React.lazy(() => import('./pages/Chapters'));
const Characters = React.lazy(() => import('./pages/Characters'));
const WorldMap = React.lazy(() => import('./pages/WorldMap'));

// Custom loading messages for each route
const loadingMessages = {
  '/': 'Initializing System',
  '/chapters': 'Loading Story Data',
  '/characters': 'Processing Character Profiles',
  '/world': 'Rendering World Map'
};

// Route wrapper to handle loading states
const RouteWrapper = ({ children }) => {
  const params = useParams();
  const path = window.location.pathname;
  const loadingMessage = loadingMessages[path] || 'Loading Content';
  
  console.log('Route params:', params);
  console.log('Current path:', path);
  
  return (
    <Suspense fallback={<Loading status={loadingMessage} fullScreen />}>
      {children}
    </Suspense>
  );
};

const App = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode(true);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={{ ...theme, mode: isDarkMode ? 'dark' : 'light' }}>
        <GlobalStyle />
        <ReadingProgressProvider>
          <Router>
            <ScrollToTop />
            <AppContainer>
              <Navigation toggleTheme={toggleDarkMode} isDarkMode={isDarkMode} />
              <MainContent>
                <Routes>
                  <Route path="/" element={
                    <RouteWrapper>
                      <Home />
                    </RouteWrapper>
                  } />
                  <Route path="/chapters" element={
                    <RouteWrapper>
                      <Chapters />
                    </RouteWrapper>
                  } />
                  <Route path="/chapters/:chapterId" element={
                    <RouteWrapper>
                      <Chapters />
                    </RouteWrapper>
                  } />
                  <Route path="/characters" element={
                    <RouteWrapper>
                      <Characters />
                    </RouteWrapper>
                  } />
                  <Route path="/world" element={
                    <RouteWrapper>
                      <WorldMap />
                    </RouteWrapper>
                  } />
                  <Route path="*" element={
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '4rem 2rem',
                      minHeight: '60vh',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <h1 style={{ 
                        fontSize: '3rem', 
                        marginBottom: '1rem',
                        fontFamily: theme.fonts.primary
                      }}>
                        404: Page Not Found
                      </h1>
                      <p style={{ 
                        fontSize: '1.2rem',
                        opacity: 0.8,
                        maxWidth: '600px',
                        marginBottom: '2rem'
                      }}>
                        The requested optimization protocol does not exist.
                        Perhaps it was deleted during a system update.
                      </p>
                      <div style={{
                        fontFamily: theme.fonts.primary,
                        opacity: 0.6,
                        fontSize: '0.9rem'
                      }}>
                        ERROR_CODE: PAGE_NOT_FOUND_IN_MATRIX
                      </div>
                    </div>
                  } />
                </Routes>
              </MainContent>
            </AppContainer>
          </Router>
        </ReadingProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
