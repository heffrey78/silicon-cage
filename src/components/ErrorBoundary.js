import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background-color: ${({ theme }) => theme?.mode === 'dark'
    ? theme?.colors?.dark?.primary || '#0a192f'
    : theme?.colors?.light?.background || '#ffffff'};
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme?.mode === 'dark'
    ? theme?.colors?.dark?.danger || '#ff5555'
    : theme?.colors?.light?.danger || '#dc3545'};
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme?.mode === 'dark'
    ? theme?.colors?.dark?.text || '#8892b0'
    : theme?.colors?.light?.text || '#333333'};
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  color: ${({ theme }) => theme?.mode === 'dark'
    ? theme?.colors?.dark?.text || '#8892b0'
    : theme?.colors?.light?.text || '#333333'};
`;

const RefreshButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme?.mode === 'dark'
    ? theme?.colors?.dark?.accent || '#64ffda'
    : theme?.colors?.light?.accent || '#007bff'};
  color: ${({ theme }) => theme?.mode === 'dark'
    ? theme?.colors?.dark?.background || '#020c1b'
    : theme?.colors?.light?.background || '#ffffff'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorDetails = styled.pre`
  margin-top: 2rem;
  text-align: left;
  padding: 1rem;
  background-color: ${({ theme }) => theme?.mode === 'dark'
    ? theme?.colors?.dark?.secondary || '#172a45'
    : theme?.colors?.light?.secondary || '#f5f5f5'};
  border-radius: 4px;
  overflow-x: auto;
  max-width: 100%;
  color: ${({ theme }) => theme?.mode === 'dark'
    ? theme?.colors?.dark?.text || '#8892b0'
    : theme?.colors?.light?.text || '#333333'};
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error details
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorIcon>
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </ErrorIcon>
          <ErrorTitle>System Malfunction Detected</ErrorTitle>
          <ErrorMessage>
            An unexpected error has occurred in the optimization protocol.
            Our systems are working to resolve the issue.
          </ErrorMessage>
          <RefreshButton onClick={this.handleRefresh}>
            Reinitialize System
          </RefreshButton>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <ErrorDetails>
              {this.state.error.toString()}
              {this.state.errorInfo.componentStack}
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
