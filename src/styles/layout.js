import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  padding-top: calc(${({ theme }) => theme.sizes.navHeight} + 2rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1rem;
    padding-top: calc(${({ theme }) => theme.sizes.navHeight} + 1rem);
  }
`;

export const Section = styled.section`
  margin: 2rem 0;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.mode === 'dark' 
    ? theme.colors.dark.card 
    : theme.colors.light.card};
  border: 1px solid ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.border
    : theme.colors.light.border};
  border-radius: 4px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 2px 4px ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.shadow
    : theme.colors.light.shadow};
  transition: transform ${({ theme }) => theme.transitions.standard};

  &:hover {
    transform: translateY(-2px);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  gap: ${({ gap }) => gap || '1rem'};
  flex-wrap: ${({ wrap }) => wrap || 'wrap'};
`;

export const Button = styled.button`
  background-color: ${({ theme, variant }) => {
    if (variant === 'primary') return theme.mode === 'dark' 
      ? theme.colors.dark.accent 
      : theme.colors.light.accent;
    if (variant === 'danger') return theme.mode === 'dark'
      ? theme.colors.dark.danger
      : theme.colors.light.danger;
    return theme.mode === 'dark'
      ? theme.colors.dark.secondary
      : theme.colors.light.hover;
  }};
  color: ${({ theme, variant }) => {
    if (variant === 'primary' || variant === 'danger') return theme.mode === 'dark'
      ? theme.colors.dark.primary
      : theme.colors.light.background;
    return theme.mode === 'dark'
      ? theme.colors.dark.text
      : theme.colors.light.text;
  }};
  border: 1px solid ${({ theme, variant }) => {
    if (variant === 'primary') return theme.mode === 'dark'
      ? theme.colors.dark.accent
      : theme.colors.light.accent;
    if (variant === 'danger') return theme.mode === 'dark'
      ? theme.colors.dark.danger
      : theme.colors.light.danger;
    return theme.mode === 'dark'
      ? theme.colors.dark.border
      : theme.colors.light.border;
  }};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.9rem;
  transition: all ${({ theme }) => theme.transitions.standard};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.shadow
      : theme.colors.light.shadow};
    background-color: ${({ theme, variant }) => {
      if (variant === 'primary') return theme.mode === 'dark'
        ? theme.colors.dark.warning
        : theme.colors.light.warning;
      if (variant === 'danger') return theme.mode === 'dark'
        ? theme.colors.dark.warning
        : theme.colors.light.warning;
      return theme.mode === 'dark'
        ? theme.colors.dark.hover
        : theme.colors.light.secondary;
    }};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Input = styled.input`
  background-color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.secondary
    : theme.colors.light.background};
  color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.text
    : theme.colors.light.text};
  border: 1px solid ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.border
    : theme.colors.light.border};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.9rem;
  width: 100%;
  transition: all ${({ theme }) => theme.transitions.standard};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.accent
      : theme.colors.light.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.mode === 'dark'
      ? `${theme.colors.dark.accent}33`
      : `${theme.colors.light.accent}33`};
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.text
    : theme.colors.light.text};
  font-weight: 600;
  letter-spacing: -0.5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.text
    : theme.colors.light.text};
  font-weight: 500;
`;
