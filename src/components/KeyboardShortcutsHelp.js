import React from 'react';
import styled from 'styled-components';

const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.primary
    : props.theme.colors.light.background};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px ${props => props.theme.mode === 'dark'
    ? 'rgba(0, 0, 0, 0.5)'
    : 'rgba(0, 0, 0, 0.2)'};
  max-width: 500px;
  width: 90%;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.mode === 'dark'
    ? 'rgba(0, 0, 0, 0.8)'
    : 'rgba(0, 0, 0, 0.5)'};
  backdrop-filter: blur(2px);
  z-index: 999;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.accent
    : props.theme.colors.light.accent};
`;

const Category = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    margin-bottom: 0.5rem;
    color: ${props => props.theme.mode === 'dark'
      ? props.theme.colors.dark.text
      : props.theme.colors.light.text};
  }
`;

const ShortcutList = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Shortcut = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.secondary
    : props.theme.colors.light.hover};
  border-radius: 4px;
`;

const KeyCombo = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Key = styled.span`
  padding: 0.25rem 0.5rem;
  background: ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.primary
    : props.theme.colors.light.background};
  border: 1px solid ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.border
    : props.theme.colors.light.border};
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.9rem;
  color: ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.accent
    : props.theme.colors.light.accent};
`;

const Description = styled.span`
  color: ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.text
    : props.theme.colors.light.text};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.mode === 'dark'
    ? props.theme.colors.dark.text
    : props.theme.colors.light.text};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  
  &:hover {
    color: ${props => props.theme.mode === 'dark'
      ? props.theme.colors.dark.accent
      : props.theme.colors.light.accent};
  }
`;

const KeyboardShortcutsHelp = ({ shortcuts, onClose }) => {
  return (
    <>
      <Overlay onClick={onClose} />
      <Dialog>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Keyboard Shortcuts</Title>
        {shortcuts.map((category, index) => (
          <Category key={index}>
            <h3>{category.category}</h3>
            <ShortcutList>
              {category.shortcuts.map((shortcut, shortcutIndex) => (
                <Shortcut key={shortcutIndex}>
                  <KeyCombo>
                    {shortcut.keys.map((key, keyIndex) => (
                      <Key key={keyIndex}>{key}</Key>
                    ))}
                  </KeyCombo>
                  <Description>{shortcut.description}</Description>
                </Shortcut>
              ))}
            </ShortcutList>
          </Category>
        ))}
      </Dialog>
    </>
  );
};

export default KeyboardShortcutsHelp;
