import React from 'react';
import { animated, useSpring } from 'react-spring';

function BlinkText() {
  const styles = useSpring({
    loop: true,
    to: [{ opacity: 0.5 }, { opacity: 0.2 }],
    from: { opacity: 0.2 },
    config: { duration: 1200 },
  });

  return (
    <>
      <div
        className="sm-hidden stopdragging"
        style={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '310px',
          color: '#fff',
          fontSize: '20px',
        }}
      >
        <animated.div style={styles}>Scroll and Click</animated.div>
      </div>
      <div
        className="sm-only stopdragging"
        style={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '190px',
          color: '#fff',
          fontSize: '14px',
        }}
      >
        <animated.div style={styles}>Drag and Touch</animated.div>
      </div>
    </>
  );
}
export default BlinkText;
