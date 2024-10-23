import styled from 'styled-components';
import { Card, Title, Button, FlexContainer } from '../../../styles/layout';

export const Section = styled.section`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

export const ChapterContainer = styled(Card)`
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

export const ChapterTitle = styled(Title)`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

export const ChapterNav = styled(FlexContainer)`
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

export const NavButton = styled(Button)`
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

export const BackButton = styled(Button)`
  margin: 2rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.secondary
    : props.theme.colors.light.background};
  color: ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.text
    : props.theme.colors.light.text};
  border: 1px solid ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.border
    : props.theme.colors.light.border};
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${props => props.theme.mode === 'dark'
      ? props.theme.colors.dark.hover
      : props.theme.colors.light.hover};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin: 1rem;
  }
`;

export const CompleteButton = styled(Button)`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.success};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: 0 1rem;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    background: ${props => props.theme.mode === 'dark'
      ? props.theme.colors.dark.disabled
      : props.theme.colors.light.disabled};
    cursor: not-allowed;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0.5rem;
    font-size: 0.9rem;
    margin: 0 0.5rem;
  }
`;

export const ChapterList = styled.div`
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

export const ChapterCard = styled(Card)`
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

export const ChapterMeta = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
  display: flex;
  gap: 1rem;
`;

export const CompletedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.success
    : props.theme.colors.light.success};
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

export const HelpButton = styled(Button)`
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

export const ErrorMessage = styled.div`
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
