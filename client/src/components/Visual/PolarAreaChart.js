import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Chart from 'react-apexcharts';
import { userGenerationDataConvert } from '../../utils/userGenerationDataConvert';

export function UserAge({ data }) {
  const [ScrollPosition, setScrollPosition] = useState(0);
  const [Indicator, setIndicator] = useState(false);
  const transition = useTransition(Indicator, {
    from: { x: -100, opacity: 0, skew: '20deg' },
    enter: { x: 0, opacity: 1, skew: '0deg' },
    leave: { x: 100, opacity: 0, skew: '20deg' },
  });
  let rect = 500;

  const onScroll = () => {
    setScrollPosition(window.pageYOffset);
    if (ScrollPosition > 1200 && ScrollPosition < 1200 + rect) {
      setIndicator(true);
    } else {
      setIndicator(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    // 컴포넌트가 언마운트 되기 직전에 이벤트를 끝낸다. 메모리 누수 방지
    return () => window.removeEventListener('scroll', onScroll);
  }, [ScrollPosition]);

  let options = {
    colors: ['#d9d9d9', '#f2f2f2', '#ffe33e', '#ffdd14', '#ffc803'],
    fill: {
      opacity: 0.9,
      colors: ['#d9d9d9', '#f2f2f2', '#ffe33e', '#ffdd14', '#ffc803'],
    },
    legend: {
      labels: {
        colors: ['#d9d9d9', '#f2f2f2', '#ffe33e', '#ffdd14', '#ffc803'],
      },
      markers: {
        fillColors: ['#d9d9d9', '#f2f2f2', '#ffe33e', '#ffdd14', '#ffc803'],
      },
    },
    chart: {
      width: 380,
      type: 'polarArea',
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
            height: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };
  let series = [];
  let labels = [];

  for (const [key, value] of Object.entries(data.users.user_generation)) {
    series.push(value);
    labels.push(userGenerationDataConvert(key));
  }

  options.labels = labels;

  return transition((style, item) =>
    item ? (
      <animated.div style={style}>
        <Chart
          options={options}
          series={series}
          type="polarArea"
          width={500}
          height={500}
        />
      </animated.div>
    ) : null,
  );
}
