import * as THREE from 'three';
import React, { Suspense, useState, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import data from '../../assets/datas/LandingData/data';
import BlinkText from './BlinkText';

function Image({ url, index, camera }) {
  const [Active, setActive] = useState(0);
  const mesh = useRef();
  let speed = 1.5;
  let positionX = 0;
  let plus = 0;

  let start_X = 0;
  let end_X = 0;

  function touchFunc(e) {
    let type = null;
    let touch = null;

    switch (e.type) {
      case 'touchstart':
        type = 'mousedown';
        touch = e.changedTouches[0];
        start_X = touch.clientX;
        end_X = 0;
        break;
      case 'touchend':
        type = 'mouseup';
        touch = e.changedTouches[0];
        end_X = touch.clientX;

        var chkNum = start_X - end_X;
        var chkNumAbs = Math.abs(chkNum);

        if (chkNumAbs > 100) {
          if (chkNum < 0) {
            speed = speed + -0.2;
          } else {
            speed = speed + 0.2;
          }
        }
        break;
    }
  }

  window.addEventListener('wheel', e => {
    speed += e.deltaY * 0.0005;
  });
  window.addEventListener('touchstart', touchFunc, false);
  window.addEventListener('touchend', touchFunc, false);

  const { spring } = useSpring({
    spring: Number(Active),
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });
  const scale = spring.to([0, 1], [1, 1.2]);
  const rotation = spring.to([0, 1], [0, Math.PI * 2]);
  const position = useMemo(() => {
    return [index * 1.2, -0.5, 3.5];
  }, []);

  const texture = useLoader(THREE.TextureLoader, url);

  useFrame(() => {
    positionX += speed - plus;
    speed *= 0.95;
    plus *= 0.95;
    Active ? (mesh.current.position.y = -0.5) : (mesh.current.position.y = -1);
    camera.position.x = positionX * 1.2;

    if (camera.position.x > 42) {
      plus = camera.position.x - 42;
    } else if (camera.position.x < 0) {
      plus = camera.position.x;
    }
  });

  return (
    <animated.mesh
      ref={mesh}
      position={position}
      rotation-y={rotation}
      scale-x={scale}
      scale-y={scale}
      onClick={() => {
        setActive(!Active);
      }}
    >
      <planeBufferGeometry attach="geometry" args={[1, 1.2]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={THREE.DoubleSide}
      />
    </animated.mesh>
  );
}

function Images() {
  const { camera } = useThree();
  return data.map((el, index) => (
    <Suspense fallback={null} key={index}>
      <Image key={el} url={el} index={index} camera={camera} />
    </Suspense>
  ));
}

function LandingInteraction() {
  return (
    <div className="landinginteractioncontainer">
      <div className="textwrapper stopdragging">
        <div className="description">
          <div>IT 트렌드를 찾는 당신을 위한 매거진</div>
        </div>
        <div className="subject">DEVzine</div>
      </div>
      <BlinkText />
      <Canvas>
        <Images />
      </Canvas>
    </div>
  );
}

export default LandingInteraction;
