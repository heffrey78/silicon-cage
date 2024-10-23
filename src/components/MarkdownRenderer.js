import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const SystemLog = styled.pre`
  font-family: ${props => props.theme?.fonts?.primary || 'monospace'};
  background: ${props => props.theme?.mode === 'dark'
    ? props.theme?.colors?.dark?.secondary || '#172a45'
    : props.theme?.colors?.light?.secondary || '#f5f5f5'};
  padding: 1rem;
  border-radius: 4px;
  margin: 1.5rem 0;
  color: ${props => props.theme?.mode === 'dark'
    ? props.theme?.colors?.dark?.accent || '#64ffda'
    : props.theme?.colors?.light?.accent || '#007bff'};
  border-left: 4px solid ${props => props.theme?.mode === 'dark'
    ? props.theme?.colors?.dark?.accent || '#64ffda'
    : props.theme?.colors?.light?.accent || '#007bff'};
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const CodeBlock = styled.pre`
  font-family: ${props => props.theme?.fonts?.primary || 'monospace'};
  background: ${props => props.theme?.mode === 'dark'
    ? props.theme?.colors?.dark?.secondary || '#172a45'
    : props.theme?.colors?.light?.hover || '#f5f5f5'};
  padding: 1rem;
  border-radius: 4px;
  margin: 1.5rem 0;
  overflow-x: auto;
  position: relative;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: ${props => props.theme?.mode === 'dark'
    ? props.theme?.colors?.dark?.text || '#8892b0'
    : props.theme?.colors?.light?.text || '#333333'};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${props => props.theme?.mode === 'dark'
        ? props.theme?.colors?.dark?.accent || '#64ffda'
        : props.theme?.colors?.light?.accent || '#007bff'} 0%,
      transparent 100%
    );
  }
`;

const InlineCode = styled.code`
  font-family: ${props => props.theme?.fonts?.primary || 'monospace'};
  background: ${props => props.theme?.mode === 'dark'
    ? props.theme?.colors?.dark?.secondary || '#172a45'
    : props.theme?.colors?.light?.hover || '#f5f5f5'};
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.9em;
  color: ${props => props.theme?.mode === 'dark'
    ? props.theme?.colors?.dark?.text || '#8892b0'
    : props.theme?.colors?.light?.text || '#333333'};
`;

const Heading = styled.h1`
  font-family: ${props => props.theme?.fonts?.primary || 'sans-serif'};
  color: ${props => props.theme?.mode === 'dark'
    ? props.theme?.colors?.dark?.text || '#8892b0'
    : props.theme?.colors?.light?.text || '#333333'};
  margin: 2rem 0 1rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 2rem;
    height: 2px;
    background: ${props => props.theme?.mode === 'dark'
      ? props.theme?.colors?.dark?.accent || '#64ffda'
      : props.theme?.colors?.light?.accent || '#007bff'};
  }
`;

const Paragraph = styled.p`
  margin: 1rem 0;
  line-height: 1.8;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  
  th, td {
    padding: 0.75rem;
    border: 1px solid ${props => props.theme?.mode === 'dark'
      ? props.theme?.colors?.dark?.border || '#233554'
      : props.theme?.colors?.light?.border || '#e0e0e0'};
    text-align: left;
  }

  th {
    background: ${props => props.theme?.mode === 'dark'
      ? props.theme?.colors?.dark?.secondary || '#172a45'
      : props.theme?.colors?.light?.hover || '#f5f5f5'};
    font-weight: 600;
  }

  tr:nth-child(even) {
    background: ${props => props.theme?.mode === 'dark'
      ? `${props.theme?.colors?.dark?.secondary || '#172a45'}33`
      : `${props.theme?.colors?.light?.hover || '#f5f5f5'}66`};
  }
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 2rem;

  li {
    margin: 0.5rem 0;
  }
`;

const OrderedList = styled.ol`
  margin: 1rem 0;
  padding-left: 2rem;

  li {
    margin: 0.5rem 0;
  }
`;

const Blockquote = styled.blockquote`
  margin: 1.5rem 0;
  padding: 1rem;
  border-left: 4px solid ${props => props.theme?.mode === 'dark'
    ? props.theme?.colors?.dark?.accent || '#64ffda'
    : props.theme?.colors?.light?.accent || '#007bff'};
  background: ${props => props.theme?.mode === 'dark'
    ? props.theme?.colors?.dark?.secondary || '#172a45'
    : props.theme?.colors?.light?.hover || '#f5f5f5'};
  font-style: italic;
`;

const ErrorContainer = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  background: ${props => props.theme?.mode === 'dark'
    ? `${props.theme?.colors?.dark?.danger || '#ff5555'}33`
    : `${props.theme?.colors?.light?.danger || '#dc3545'}33`};
  border: 1px solid ${props => props.theme?.mode === 'dark'
    ? props.theme?.colors?.dark?.danger || '#ff5555'
    : props.theme?.colors?.light?.danger || '#dc3545'};
  color: ${props => props.theme?.mode === 'dark'
    ? props.theme?.colors?.dark?.text || '#8892b0'
    : props.theme?.colors?.light?.text || '#333333'};
`;

const MarkdownRenderer = ({ content }) => {
  if (!content) {
    console.warn('MarkdownRenderer: No content provided');
    return (
      <ErrorContainer>
        No content available
      </ErrorContainer>
    );
  }

  const components = {
    h1: ({ children }) => <Heading as="h1">{children}</Heading>,
    h2: ({ children }) => <Heading as="h2">{children}</Heading>,
    h3: ({ children }) => <Heading as="h3">{children}</Heading>,
    h4: ({ children }) => <Heading as="h4">{children}</Heading>,
    p: ({ children }) => <Paragraph>{children}</Paragraph>,
    code: ({ inline, className, children }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const isSystemLog = language === 'bash' || language === 'shell';

      if (inline) {
        return <InlineCode>{children}</InlineCode>;
      }

      const StyledBlock = isSystemLog ? SystemLog : CodeBlock;
      return <StyledBlock>{children}</StyledBlock>;
    },
    pre: ({ children }) => <>{children}</>,
    table: ({ children }) => <Table>{children}</Table>,
    ul: ({ children }) => <List>{children}</List>,
    ol: ({ children }) => <OrderedList>{children}</OrderedList>,
    blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
  };

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
