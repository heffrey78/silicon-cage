export const defaultTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    error: '#dc3545',
    text: '#212529',
    textMuted: '#6c757d',
    background: '#ffffff',
    cardBackground: '#ffffff',
    navBackground: 'rgba(255, 255, 255, 0.9)',
    buttonBackground: '#007bff',
    buttonHoverBackground: '#0056b3',
    buttonText: '#ffffff',
    errorBackground: '#fff5f5',
  },
  fonts: {
    heading: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    content: "Georgia, 'Times New Roman', Times, serif",
    ui: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: '0.375rem',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  boxShadowHover: '0 4px 8px rgba(0, 0, 0, 0.15)',
  transitions: {
    standard: '0.2s ease-in-out',
  },
  // Dark mode colors
  dark: {
    colors: {
      primary: '#4dabf7',
      secondary: '#868e96',
      success: '#40c057',
      error: '#fa5252',
      text: '#ced4da',
      textMuted: '#868e96',
      background: '#212529',
      cardBackground: '#343a40',
      navBackground: 'rgba(33, 37, 41, 0.9)',
      buttonBackground: '#4dabf7',
      buttonHoverBackground: '#339af0',
      buttonText: '#212529',
      errorBackground: '#2c2124',
    },
  },
};

// Helper function to create a custom theme
export const createTheme = (customTheme = {}) => {
  return {
    ...defaultTheme,
    ...customTheme,
    colors: {
      ...defaultTheme.colors,
      ...(customTheme.colors || {}),
    },
    dark: {
      colors: {
        ...defaultTheme.dark.colors,
        ...(customTheme.dark?.colors || {}),
      },
    },
    fonts: {
      ...defaultTheme.fonts,
      ...(customTheme.fonts || {}),
    },
    breakpoints: {
      ...defaultTheme.breakpoints,
      ...(customTheme.breakpoints || {}),
    },
    spacing: {
      ...defaultTheme.spacing,
      ...(customTheme.spacing || {}),
    },
  };
};

// Example usage:
// const customTheme = createTheme({
//   colors: {
//     primary: '#ff0000',
//     secondary: '#00ff00',
//   },
//   fonts: {
//     heading: 'Montserrat, sans-serif',
//   },
// });
