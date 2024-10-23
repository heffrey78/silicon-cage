import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    light: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      text: '#333333',
      background: '#ffffff',
      accent: '#007bff',
      danger: '#dc3545',
      warning: '#ffc107',
      success: '#28a745',
      border: '#e0e0e0',
      hover: '#f5f5f5',
      card: '#ffffff',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      primary: '#0a192f',
      secondary: '#172a45',
      text: '#8892b0',
      background: '#020c1b',
      accent: '#64ffda',
      danger: '#ff5555',
      warning: '#f1fa8c',
      success: '#50fa7b',
      border: '#233554',
      hover: '#112240',
      card: '#112240',
      shadow: 'rgba(2, 12, 27, 0.7)',
    },
  },
  fonts: {
    primary: "'IBM Plex Mono', monospace",
    secondary: "'IBM Plex Sans', sans-serif",
  },
  sizes: {
    navHeight: '60px',
    maxWidth: '1200px',
  },
  transitions: {
    standard: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.mode === 'dark' 
      ? props.theme.colors.dark.background 
      : props.theme.colors.light.background};
    color: ${props => props.theme.mode === 'dark' 
      ? props.theme.colors.dark.text 
      : props.theme.colors.light.text};
    transition: background-color ${props => props.theme.transitions.slow};
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    position: relative;
    font-family: ${props => props.theme.fonts.primary};
    
    &:hover {
      &:after {
        content: attr(data-text);
        position: absolute;
        left: 2px;
        text-shadow: -1px 0 ${props => props.theme.mode === 'dark' 
          ? props.theme.colors.dark.accent 
          : props.theme.colors.light.accent};
        top: 0;
        color: ${props => props.theme.mode === 'dark' 
          ? props.theme.colors.dark.text 
          : props.theme.colors.light.text};
        background: ${props => props.theme.mode === 'dark' 
          ? props.theme.colors.dark.background 
          : props.theme.colors.light.background};
        overflow: hidden;
        animation: noise-anim 0.3s infinite linear alternate-reverse;
      }
    }
  }

  pre, code {
    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.mode === 'dark' 
      ? props.theme.colors.dark.secondary 
      : props.theme.colors.light.secondary};
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
    color: ${props => props.theme.mode === 'dark' 
      ? props.theme.colors.dark.accent 
      : props.theme.colors.light.accent};
    text-decoration: none;
    transition: color ${props => props.theme.transitions.standard};

    &:hover {
      color: ${props => props.theme.mode === 'dark' 
        ? props.theme.colors.dark.warning 
        : props.theme.colors.light.warning};
    }
  }

  ::selection {
    background: ${props => props.theme.mode === 'dark' 
      ? props.theme.colors.dark.accent 
      : props.theme.colors.light.accent};
    color: ${props => props.theme.mode === 'dark' 
      ? props.theme.colors.dark.background 
      : props.theme.colors.light.background};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.mode === 'dark' 
      ? props.theme.colors.dark.background 
      : props.theme.colors.light.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.mode === 'dark' 
      ? props.theme.colors.dark.accent 
      : props.theme.colors.light.accent};
    border-radius: 4px;
  }

  @keyframes noise-anim {
    0% {
      clip-path: inset(40% 0 61% 0);
    }
    20% {
      clip-path: inset(92% 0 1% 0);
    }
    40% {
      clip-path: inset(43% 0 1% 0);
    }
    60% {
      clip-path: inset(25% 0 58% 0);
    }
    80% {
      clip-path: inset(54% 0 7% 0);
    }
    100% {
      clip-path: inset(58% 0 43% 0);
    }
  }
`;
