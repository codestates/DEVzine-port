import React from 'react';
import LandingInteraction from '../components/Landing/LandingInteraction';
import LandingWrapper from '../components/Landing/LandingWrapper';

function Landing() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <LandingInteraction />
      <LandingWrapper />
    </div>
  );
}

export default Landing;
