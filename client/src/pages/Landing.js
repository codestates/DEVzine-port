import React from 'react';
import LandingInteraction from '../components/Landing/LandingInteraction';
import LandingWrapper from '../components/Landing/LandingWrapper';
import LandingSub from '../components/Landing/LandingSub';

function Landing() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <LandingInteraction />
      <LandingWrapper />
      <LandingSub />
    </div>
  );
}

export default Landing;
