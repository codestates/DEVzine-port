import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { customAxios } from '../../utils/customAxios';
import { UserTopLanguage, UserTopPosition } from './RoundCharts';
import { ArticlesTopHit, UserAgeAndGender } from './BarChart';
import { ArticlesKeywordAccumulated } from './TreeMapChart';
import { ArticlesKeyword } from './LineCharts';

function Bar() {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.z += 0.003;
  });
  return (
    <mesh ref={mesh} position={[8, 0, 0]}>
      <planeGeometry args={[7, 40]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function VisualWrapper() {
  const [ChartData, setChartData] = useState('');

  useEffect(async () => {
    await customAxios
      .get('/visual')
      .then(res => {
        setChartData(res.data.data);
      })
      .catch(err => alert(err));
  }, []);

  return ChartData ? (
    <>
      <div className="visualcontainer">
        <div className="container">
          <div className="row">
            <div className="co-sm-4">
              <div className="canvascontainer">
                <Canvas>
                  <ambientLight intensity={1} />
                  <Bar />
                </Canvas>
              </div>
              <div className="visualwrapper">
                <ArticlesKeyword data={ChartData} />

                <ArticlesKeywordAccumulated data={ChartData} />

                <ArticlesTopHit data={ChartData} />

                <UserAgeAndGender data={ChartData} />

                <UserTopPosition data={ChartData} />

                <UserTopLanguage data={ChartData} />

                <div className="visualwrapper-footer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default VisualWrapper;
