import React, { useState, useEffect } from 'react';
import LandingInteraction from '../components/Landing/LandingInteraction';
import LandingWrapper from '../components/Landing/LandingWrapper';
import LandingSub from '../components/Landing/LandingSub';

function Landing() {
  const [ScrollActive, setScrollActive] = useState(false);
  const [ScrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    // 컴포넌트가 언마운트 되기 직전에 이벤트를 끝낸다. 메모리 누수 방지
    return () => window.removeEventListener('scroll', onScroll);
  }, [ScrollPosition]);

  const onScroll = () => {
    setScrollPosition(window.pageYOffset);
    if (ScrollPosition > 1200) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      {ScrollActive ? (
        <div
          style={{
            position: 'fixed',
            backgroundColor: 'white',
            height: '400px',
            marginTop: '90px',
            width: '100%',
            top: '0',
          }}
        />
      ) : (
        <LandingInteraction />
      )}
      <LandingWrapper />
      <LandingSub />
    </div>
  );
}

export default Landing;
