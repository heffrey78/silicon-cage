import React from 'react';
import styled from 'styled-components';
import { Section, Card, Title, FlexContainer } from '../styles/layout';

const CharacterCard = styled(Card)`
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ type, theme }) => {
      switch (type) {
        case 'protagonist':
          return theme.mode === 'dark' 
            ? theme.colors.dark.success 
            : theme.colors.light.success;
        case 'antagonist':
          return theme.mode === 'dark' 
            ? theme.colors.dark.danger 
            : theme.colors.light.danger;
        default:
          return theme.mode === 'dark' 
            ? theme.colors.dark.warning 
            : theme.colors.light.warning;
      }
    }};
  }
`;

const CharacterName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.accent
    : theme.colors.light.accent};
`;

const CharacterRole = styled.h3`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.text
    : theme.colors.light.text};
  opacity: 0.8;
`;

const CharacterDetail = styled.div`
  margin: 1rem 0;

  h4 {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.accent
      : theme.colors.light.accent};
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 0.25rem 0;
    padding-left: 1rem;
    position: relative;

    &:before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.mode === 'dark'
        ? theme.colors.dark.accent
        : theme.colors.light.accent};
    }
  }
`;

const RelationshipDiagram = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  background: ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.secondary
    : theme.colors.light.hover};
  border-radius: 4px;
  
  img {
    width: 100%;
    height: auto;
  }
`;

const characters = {
  protagonists: [
    {
      name: "Maya Chen",
      role: "Senior Software Developer",
      age: 32,
      background: "Former Silicon Valley developer who moved to Ohio for better work-life balance",
      traits: ["analytical", "independent", "skeptical", "resourceful"],
      goals: ["Expose the truth about TechCorp's sinister plans", "Maintain independence while helping others"],
      skills: ["coding", "system analysis", "pattern recognition", "social engineering"]
    },
    {
      name: "Marcus Thompson",
      role: "IT Security Specialist",
      age: 35,
      background: "Ex-military cybersecurity expert, hired to upgrade campus security",
      traits: ["detail-oriented", "loyal", "protective", "persistent"],
      goals: ["Protect employees from hidden threats", "Redeem himself for unknowingly helping implement control systems"],
      skills: ["security systems", "surveillance", "combat training", "investigation"]
    }
  ],
  antagonists: [
    {
      name: "Dr. Elizabeth Nash",
      role: "Chief Innovation Officer",
      age: 45,
      background: "Behavioral psychology PhD, pioneer in corporate culture engineering",
      traits: ["brilliant", "manipulative", "charismatic", "ruthless"],
      goals: ["Create the ultimate 'efficient' workforce", "Prove her theories about human productivity"],
      skills: ["psychology", "manipulation", "corporate politics", "system design"]
    },
    {
      name: "Bob Martinez",
      role: "Head of Employee Experience",
      age: 41,
      background: "Former startup founder, early convert to the program",
      traits: ["enthusiastic", "artificial", "controlling", "methodical"],
      goals: ["Convert all employees to the new system", "Expand the program to other companies"],
      skills: ["corporate culture", "event planning", "behavior modification"]
    }
  ],
  supporting: [
    {
      name: "Sarah Kim",
      role: "Junior Developer",
      age: 24,
      background: "Recent bootcamp graduate, first corporate job",
      traits: ["eager", "observant", "adaptable", "naive"],
      goals: ["Prove herself in the tech world", "Maintain her individuality"],
      skills: ["coding", "social media", "documentation"]
    },
    {
      name: "David Chen",
      role: "Facilities Manager",
      age: 52,
      background: "Long-time employee who knows all the building's secrets",
      traits: ["quiet", "observant", "careful", "helpful"],
      goals: ["Protect the employees he sees as family", "Preserve his role in an increasingly automated workplace"],
      skills: ["building systems", "maintenance", "observation"]
    }
  ]
};

const Characters = () => {
  return (
    <Section>
      <Title>Characters</Title>

      <Section>
        <h2>Protagonists</h2>
        <FlexContainer wrap="wrap" gap="2rem">
          {characters.protagonists.map(char => (
            <CharacterCard key={char.name} type="protagonist">
              <CharacterName>{char.name}</CharacterName>
              <CharacterRole>{char.role}</CharacterRole>
              
              <CharacterDetail>
                <h4>Background</h4>
                <p>{char.background}</p>
              </CharacterDetail>

              <CharacterDetail>
                <h4>Traits</h4>
                <ul>
                  {char.traits.map(trait => (
                    <li key={trait}>{trait}</li>
                  ))}
                </ul>
              </CharacterDetail>

              <CharacterDetail>
                <h4>Goals</h4>
                <ul>
                  {char.goals.map(goal => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </CharacterDetail>

              <CharacterDetail>
                <h4>Skills</h4>
                <ul>
                  {char.skills.map(skill => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </CharacterDetail>
            </CharacterCard>
          ))}
        </FlexContainer>
      </Section>

      <Section>
        <h2>Antagonists</h2>
        <FlexContainer wrap="wrap" gap="2rem">
          {characters.antagonists.map(char => (
            <CharacterCard key={char.name} type="antagonist">
              <CharacterName>{char.name}</CharacterName>
              <CharacterRole>{char.role}</CharacterRole>
              
              <CharacterDetail>
                <h4>Background</h4>
                <p>{char.background}</p>
              </CharacterDetail>

              <CharacterDetail>
                <h4>Traits</h4>
                <ul>
                  {char.traits.map(trait => (
                    <li key={trait}>{trait}</li>
                  ))}
                </ul>
              </CharacterDetail>

              <CharacterDetail>
                <h4>Goals</h4>
                <ul>
                  {char.goals.map(goal => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </CharacterDetail>

              <CharacterDetail>
                <h4>Skills</h4>
                <ul>
                  {char.skills.map(skill => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </CharacterDetail>
            </CharacterCard>
          ))}
        </FlexContainer>
      </Section>

      <Section>
        <h2>Supporting Characters</h2>
        <FlexContainer wrap="wrap" gap="2rem">
          {characters.supporting.map(char => (
            <CharacterCard key={char.name} type="supporting">
              <CharacterName>{char.name}</CharacterName>
              <CharacterRole>{char.role}</CharacterRole>
              
              <CharacterDetail>
                <h4>Background</h4>
                <p>{char.background}</p>
              </CharacterDetail>

              <CharacterDetail>
                <h4>Traits</h4>
                <ul>
                  {char.traits.map(trait => (
                    <li key={trait}>{trait}</li>
                  ))}
                </ul>
              </CharacterDetail>

              <CharacterDetail>
                <h4>Goals</h4>
                <ul>
                  {char.goals.map(goal => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </CharacterDetail>

              <CharacterDetail>
                <h4>Skills</h4>
                <ul>
                  {char.skills.map(skill => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </CharacterDetail>
            </CharacterCard>
          ))}
        </FlexContainer>
      </Section>

      <RelationshipDiagram>
        <h2>Character Relationships</h2>
        <img src="/character_relationships.svg" alt="Character Relationship Diagram" />
      </RelationshipDiagram>
    </Section>
  );
};

export default Characters;
