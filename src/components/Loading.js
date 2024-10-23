import React from 'react';
import styled, { keyframes } from 'styled-components';

const glitch = keyframes`
  0% {
    clip: rect(64px, 9999px, 66px, 0);
  }
  5% {
    clip: rect(30px, 9999px, 36px, 0);
  }
  10% {
    clip: rect(87px, 9999px, 95px, 0);
  }
  15% {
    clip: rect(56px, 9999px, 52px, 0);
  }
  20% {
    clip: rect(28px, 9999px, 20px, 0);
  }
  25% {
    clip: rect(74px, 9999px, 78px, 0);
  }
  30% {
    clip: rect(89px, 9999px, 84px, 0);
  }
  35% {
    clip: rect(45px, 9999px, 41px, 0);
  }
  40% {
    clip: rect(92px, 9999px, 98px, 0);
  }
  45% {
    clip: rect(67px, 9999px, 62px, 0);
  }
  50% {
    clip: rect(43px, 9999px, 48px, 0);
  }
  55% {
    clip: rect(79px, 9999px, 73px, 0);
  }
  60% {
    clip: rect(35px, 9999px, 39px, 0);
  }
  65% {
    clip: rect(93px, 9999px, 88px, 0);
  }
  70% {
    clip: rect(58px, 9999px, 54px, 0);
  }
  75% {
    clip: rect(81px, 9999px, 86px, 0);
  }
  80% {
    clip: rect(33px, 9999px, 37px, 0);
  }
  85% {
    clip: rect(69px, 9999px, 65px, 0);
  }
  90% {
    clip: rect(41px, 9999px, 46px, 0);
  }
  95% {
    clip: rect(82px, 9999px, 77px, 0);
  }
  100% {
    clip: rect(91px, 9999px, 96px, 0);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${props => props.fullScreen ? '100vh' : '200px'};
  background-color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.primary
    : theme.colors.light.background};
`;

const LoadingText = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 2rem;
  color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.accent
    : theme.colors.light.accent};
  position: relative;
  
  &:before,
  &:after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.primary
      : theme.colors.light.background};
  }

  &:before {
    left: 2px;
    text-shadow: -2px 0 ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.danger
      : theme.colors.light.danger};
    animation: ${glitch} 650ms infinite linear alternate-reverse;
  }

  &:after {
    left: -2px;
    text-shadow: 2px 0 ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.warning
      : theme.colors.light.warning};
    animation: ${glitch} 375ms infinite linear alternate-reverse;
  }
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 2px;
  background-color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.secondary
    : theme.colors.light.hover};
  margin-top: 2rem;
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background-color: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.accent
      : theme.colors.light.accent};
    animation: progress 1s infinite linear;
  }

  @keyframes progress {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(250%);
    }
  }
`;

const StatusText = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.text
    : theme.colors.light.text};
  margin-top: 1rem;
  opacity: 0.8;
`;

const Loading = ({ fullScreen = false, status = "Optimizing Experience" }) => {
  return (
    <LoadingContainer fullScreen={fullScreen}>
      <LoadingText data-text="LOADING">LOADING</LoadingText>
      <ProgressBar />
      <StatusText>{status}</StatusText>
    </LoadingContainer>
  );
};

export default Loading;
