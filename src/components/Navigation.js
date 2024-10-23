import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.sizes.navHeight};
  background-color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.primary
    : theme.colors.light.background};
  border-bottom: 1px solid ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.border
    : theme.colors.light.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;
  transition: all ${({ theme }) => theme.transitions.standard};
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.accent
    : theme.colors.light.accent};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.primary};

  &:hover {
    color: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.warning
      : theme.colors.light.warning};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    top: ${({ theme }) => theme.sizes.navHeight};
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.primary
      : theme.colors.light.background};
    flex-direction: column;
    padding: 2rem;
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
    transition: transform ${({ theme }) => theme.transitions.standard};
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme, active }) => {
    if (active) {
      return theme.mode === 'dark'
        ? theme.colors.dark.accent
        : theme.colors.light.accent;
    }
    return theme.mode === 'dark'
      ? theme.colors.dark.text
      : theme.colors.light.text;
  }};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.primary};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.accent
      : theme.colors.light.accent};
    transform: scaleX(${({ active }) => (active ? 1 : 0)});
    transition: transform ${({ theme }) => theme.transitions.standard};
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.text
    : theme.colors.light.text};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${({ theme }) => theme.transitions.standard};

  &:hover {
    color: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.accent
      : theme.colors.light.accent};
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.text
    : theme.colors.light.text};
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Navigation = ({ toggleTheme, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <Nav>
      <Logo to="/">The Silicon Cage</Logo>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </MenuButton>
      <NavLinks isOpen={isOpen}>
        <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
          Home
        </NavLink>
        <NavLink to="/chapters" active={location.pathname === '/chapters' ? 1 : 0}>
          Chapters
        </NavLink>
        <NavLink to="/characters" active={location.pathname === '/characters' ? 1 : 0}>
          Characters
        </NavLink>
        <NavLink to="/world" active={location.pathname === '/world' ? 1 : 0}>
          World
        </NavLink>
        <ThemeToggle onClick={toggleTheme}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </ThemeToggle>
      </NavLinks>
    </Nav>
  );
};

export default Navigation;
