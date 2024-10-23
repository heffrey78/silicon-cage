import React, { useEffect } from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

const ModalContent = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius};
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${props => props.theme.boxShadow};
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.heading};
`;

const ShortcutList = styled.div`
  display: grid;
  gap: 1rem;
`;

const ShortcutItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.textMuted}20;

  &:last-child {
    border-bottom: none;
  }
`;

const KeyCombo = styled.kbd`
  background: ${props => props.theme.colors.buttonBackground};
  color: ${props => props.theme.colors.buttonText};
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius};
  font-family: ${props => props.theme.fonts.ui};
  font-size: 0.9rem;
  min-width: 2rem;
  text-align: center;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const Description = styled.span`
  color: ${props => props.theme.colors.text};
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textMuted};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

const KeyboardShortcuts = ({ shortcuts = [], onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Keyboard Shortcuts</Title>
        <ShortcutList>
          {shortcuts.map((shortcut, index) => (
            <ShortcutItem key={index}>
              <Description disabled={!shortcut.enabled}>
                {shortcut.description}
              </Description>
              <KeyCombo disabled={!shortcut.enabled}>
                {shortcut.key}
              </KeyCombo>
            </ShortcutItem>
          ))}
        </ShortcutList>
      </ModalContent>
    </Modal>
  );
};

export default KeyboardShortcuts;
