import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Chart from 'react-apexcharts';

export function UserTopLanguage({ data }) {
  const [ScrollPosition, setScrollPosition] = useState(0);
  const [Indicator, setIndicator] = useState(false);
  const transition = useTransition(Indicator, {
    from: { x: 100, opacity: 0, skew: '20deg' },
    enter: { x: 0, opacity: 1, skew: '0deg' },
    leave: { x: -100, opacity: 0, skew: '20deg' },
  });

  let rect = 500;

  const onScroll = () => {
    setScrollPosition(window.pageYOffset);
    if (ScrollPosition > 2400 && ScrollPosition < 2400 + rect) {
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
    colors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
    fill: {
      colors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
    },
    legend: {
      labels: {
        colors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
      },
      markers: {
        fillColors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
      },
    },
    chart: {
      width: 380,
      type: 'pie',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1200,
        animateGradually: {
          enabled: true,
          delay: 300,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 1000,
        },
      },
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320,
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

  for (const [key, value] of Object.entries(data.users.users_top_language)) {
    series.push(value);
    labels.push(key);
  }

  options.labels = labels;

  return transition((style, item) =>
    item ? (
      <animated.div style={style}>
        <Chart
          options={options}
          series={series}
          type="pie"
          width={500}
          height={320}
        />
      </animated.div>
    ) : null,
  );
}

export function UserTopPosition({ data }) {
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
    if (ScrollPosition > 2000 && ScrollPosition < 2000 + rect) {
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
    colors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
    fill: {
      colors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
    },
    legend: {
      labels: {
        colors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
      },
      markers: {
        fillColors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
      },
    },
    chart: {
      width: 380,
      type: 'donut',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1200,
        animateGradually: {
          enabled: true,
          delay: 300,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 1000,
        },
      },
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320,
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

  for (const [key, value] of Object.entries(data.users.users_top_position)) {
    series.push(value);
    labels.push(key);
  }

  options.labels = labels;

  return transition((style, item) =>
    item ? (
      <animated.div style={style}>
        <Chart
          options={options}
          series={series}
          type="donut"
          width={500}
          height={320}
        />
      </animated.div>
    ) : null,
  );
}
