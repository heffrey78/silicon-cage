import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Section, Card, Title, Button, FlexContainer } from '../styles/layout';

const HeroSection = styled(Section)`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.mode === 'dark'
        ? `${theme.colors.dark.primary}00`
        : `${theme.colors.light.primary}00`} 0%,
      ${({ theme }) => theme.mode === 'dark'
        ? theme.colors.dark.primary
        : theme.colors.light.primary} 100%
    );
    z-index: -1;
  }
`;

const HeroTitle = styled(Title)`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.shadow
    : theme.colors.light.shadow};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 600px;
  color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.text
    : theme.colors.light.text};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const FeatureCard = styled(Card)`
  text-align: center;
  background: ${({ theme }) => theme.mode === 'dark'
    ? `linear-gradient(135deg, ${theme.colors.dark.card} 0%, ${theme.colors.dark.primary} 100%)`
    : `linear-gradient(135deg, ${theme.colors.light.card} 0%, ${theme.colors.light.background} 100%)`};

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.accent
      : theme.colors.light.accent};
  }
`;

const Quote = styled.blockquote`
  font-style: italic;
  font-size: 1.25rem;
  margin: 2rem 0;
  padding: 1rem 2rem;
  border-left: 4px solid ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.accent
    : theme.colors.light.accent};
  background: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.secondary
    : theme.colors.light.hover};
`;

const Home = () => {
  return (
    <>
      <HeroSection>
        <HeroTitle data-text="The Silicon Cage">The Silicon Cage</HeroTitle>
        <Tagline>
          A corporate thriller where the greatest threat isn't AI taking over humanity,
          but humanity being optimized out of existence.
        </Tagline>
        <FlexContainer justify="center" gap="1.5rem">
          <Button as={Link} to="/chapters" variant="primary">
            Start Reading
          </Button>
          <Button as={Link} to="/world">
            Explore the World
          </Button>
        </FlexContainer>
      </HeroSection>

      <Section>
        <Quote>
          "The best code, like the best lies, comes from complete isolation.
          But isolation might be the only thing keeping us human."
        </Quote>

        <FeatureGrid>
          <FeatureCard>
            <h3>Corporate Horror</h3>
            <p>
              Experience the terrifying transformation of workplace culture
              into something inhuman.
            </p>
          </FeatureCard>

          <FeatureCard>
            <h3>Digital Resistance</h3>
            <p>
              Follow Maya Chen's fight to maintain humanity in an increasingly
              optimized world.
            </p>
          </FeatureCard>

          <FeatureCard>
            <h3>Technical Thriller</h3>
            <p>
              Uncover the sinister truth behind the perfect productivity
              algorithms.
            </p>
          </FeatureCard>
        </FeatureGrid>

        <Card>
          <h2>About the Story</h2>
          <p>
            Set in a seemingly ordinary tech company campus in Ohio, "The Silicon Cage"
            follows senior software developer Maya Chen as she uncovers the dark truth
            behind her company's return-to-office mandate. What begins as corporate
            inconvenience evolves into a fight for human autonomy against the perfect
            optimization of the workforce.
          </p>
          <br />
          <p>
            This story blends elements of corporate satire, psychological horror, and
            technical thriller to explore themes of human connection, digital isolation,
            and the cost of convenience in our modern workplace.
          </p>
        </Card>
      </Section>
    </>
  );
};

export default Home;
