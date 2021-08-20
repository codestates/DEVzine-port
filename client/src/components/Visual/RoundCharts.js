import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export function UserTopLanguage({ data }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const onScroll = () => {
    setScrollPosition(window.pageYOffset);
    // console.log(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    // 컴포넌트가 언마운트 되기 직전에 이벤트를 끝낸다. 메모리 누수 방지
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return scrollPosition > 1700 ? (
    <Chart
      options={options}
      series={series}
      type="pie"
      width={500}
      height={320}
    />
  ) : null;
}

export function UserTopPosition({ data }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const onScroll = () => {
    setScrollPosition(window.pageYOffset);
    console.log(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    // 컴포넌트가 언마운트 되기 직전에 이벤트를 끝낸다. 메모리 누수 방지
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return scrollPosition > 1400 ? (
    <Chart
      options={options}
      series={series}
      type="donut"
      width={500}
      height={320}
    />
  ) : null;
}
