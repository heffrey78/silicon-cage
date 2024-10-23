import React, { useState } from 'react';
import styled from 'styled-components';
import { Section, Card, Title, Button, FlexContainer } from '../styles/layout';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 2rem 0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 6px ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.shadow
    : theme.colors.light.shadow};

  svg {
    width: 100%;
    height: auto;
    background: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.secondary
      : theme.colors.light.hover};
  }
`;

const LocationCard = styled(Card)`
  position: relative;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.standard};

  &:hover {
    transform: translateX(8px);
  }

  &:before {
    content: '';
    position: absolute;
    left: -8px;
    top: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.accent
      : theme.colors.light.accent};
    transform: scaleY(0);
    transition: transform ${({ theme }) => theme.transitions.standard};
  }

  &:hover:before {
    transform: scaleY(1);
  }
`;

const TabContainer = styled.div`
  margin-bottom: 2rem;
`;

const TabButtons = styled(FlexContainer)`
  border-bottom: 1px solid ${({ theme }) => theme.mode === 'dark'
    ? theme.colors.dark.border
    : theme.colors.light.border};
  margin-bottom: 2rem;
`;

const TabButton = styled(Button)`
  background: none;
  border: none;
  padding: 1rem 2rem;
  color: ${({ active, theme }) => active
    ? theme.mode === 'dark'
      ? theme.colors.dark.accent
      : theme.colors.light.accent
    : theme.mode === 'dark'
      ? theme.colors.dark.text
      : theme.colors.light.text};
  border-bottom: 2px solid ${({ active, theme }) => active
    ? theme.mode === 'dark'
      ? theme.colors.dark.accent
      : theme.colors.light.accent
    : 'transparent'};
  
  &:hover {
    background: none;
    color: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.accent
      : theme.colors.light.accent};
  }
`;

const WorldGuideSection = styled.div`
  h2 {
    margin: 2rem 0 1rem;
    color: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.accent
      : theme.colors.light.accent};
  }

  h3 {
    margin: 1.5rem 0 0.5rem;
    color: ${({ theme }) => theme.mode === 'dark'
      ? theme.colors.dark.text
      : theme.colors.light.text};
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  ul {
    list-style: none;
    padding-left: 1rem;
    margin-bottom: 1rem;

    li {
      position: relative;
      margin-bottom: 0.5rem;

      &:before {
        content: '•';
        position: absolute;
        left: -1rem;
        color: ${({ theme }) => theme.mode === 'dark'
          ? theme.colors.dark.accent
          : theme.colors.light.accent};
      }
    }
  }
`;

const locations = [
  {
    id: 'main-building',
    name: 'The Hub',
    description: 'The central six-story building where most employees work. Features open floor plans, collaboration pods, and hidden monitoring systems.',
    details: [
      'Smart building systems throughout',
      'Biometric scanners disguised as wellness monitors',
      'Modified HVAC systems for behavior control',
      'Hidden dormitory levels'
    ]
  },
  {
    id: 'wellness-center',
    name: 'Wellness Center',
    description: 'A state-of-the-art facility for employee health and wellness, doubling as a control center for behavioral modification.',
    details: [
      'Meditation rooms with subtle psychological influence',
      'Gym equipment that harvests biometric data',
      'Medical facilities for "optimization" procedures',
      'Relaxation areas with air composition controls'
    ]
  },
  {
    id: 'underground',
    name: 'Underground Facility',
    description: 'A vast network of subterranean levels housing the true purpose of the campus.',
    details: [
      'Control center for campus-wide systems',
      'Research laboratories',
      'Long-term storage facilities',
      'Emergency containment areas'
    ]
  }
];

const WorldMap = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <Section>
      <Title>World of The Silicon Cage</Title>

      <TabContainer>
        <TabButtons>
          <TabButton
            active={activeTab === 'map'}
            onClick={() => setActiveTab('map')}
          >
            Campus Map
          </TabButton>
          <TabButton
            active={activeTab === 'guide'}
            onClick={() => setActiveTab('guide')}
          >
            World Guide
          </TabButton>
        </TabButtons>

        {activeTab === 'map' ? (
          <>
            <MapContainer>
              <img src="/world_map.svg" alt="TechCorp Campus Map" style={{ width: '100%' }} />
            </MapContainer>

            <FlexContainer wrap="wrap" gap="2rem">
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h2>Locations</h2>
                {locations.map(location => (
                  <LocationCard
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <h3>{location.name}</h3>
                    <p>{location.description}</p>
                  </LocationCard>
                ))}
              </div>

              {selectedLocation && (
                <Card style={{ flex: 2, minWidth: '300px' }}>
                  <h2>{selectedLocation.name}</h2>
                  <p>{selectedLocation.description}</p>
                  <h3>Key Features:</h3>
                  <ul>
                    {selectedLocation.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </Card>
              )}
            </FlexContainer>
          </>
        ) : (
          <WorldGuideSection>
            <Card>
              <h2>Physical Setting</h2>
              <p>The TechCorp Ohio Campus spans 50 acres of carefully maintained grounds, designed to be a self-contained ecosystem of productivity and innovation. Located in suburban Columbus, the campus represents a perfect fusion of Silicon Valley aesthetics with Midwestern practicality.</p>
              
              <h3>Campus Layout</h3>
              <ul>
                <li>Central six-story main building ("The Hub")</li>
                <li>Two parking structures with "smart" parking systems</li>
                <li>Wellness center with gym, meditation rooms, and medical facilities</li>
                <li>Extensive underground infrastructure for "utilities"</li>
              </ul>

              <h2>Corporate Environment</h2>
              <h3>Surface Culture</h3>
              <ul>
                <li>Promotes "work-life integration" rather than work-life balance</li>
                <li>Emphasizes "family-like" atmosphere</li>
                <li>Free meals, snacks, and beverages available 24/7</li>
                <li>Regular team-building events and mandatory fun activities</li>
              </ul>

              <h3>Hidden Elements</h3>
              <ul>
                <li>Biometric scanners disguised as wellness monitors</li>
                <li>AI-powered surveillance masked as productivity tools</li>
                <li>Sound frequencies promoting alertness and compliance</li>
                <li>Air composition alterations in different zones</li>
              </ul>

              <h2>Technology</h2>
              <h3>Visible Systems</h3>
              <ul>
                <li>State-of-the-art workstations</li>
                <li>VR/AR collaboration tools</li>
                <li>Smart building controls</li>
                <li>Wellness monitoring devices</li>
              </ul>

              <h3>Hidden Systems</h3>
              <ul>
                <li>Behavior modification algorithms</li>
                <li>Psychological profiling systems</li>
                <li>Neural influence devices</li>
                <li>Memory alteration technology</li>
              </ul>
            </Card>
          </WorldGuideSection>
        )}
      </TabContainer>
    </Section>
  );
};

export default WorldMap;
