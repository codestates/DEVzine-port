import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Chart from 'react-apexcharts';

export function ArticlesTopHit({ data }) {
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
    if (ScrollPosition > 400 && ScrollPosition < 400 + rect) {
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
    stroke: {
      width: 4,
      colors: ['#fff'],
    },
    fill: {
      colors: ['#ffe33e'],
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
      toolbar: {
        show: false,
      },
      height: 350,
      type: 'bar',
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
    plotOptions: {
      bar: {
        borderRadius: 20,
        columnWidth: '40%',
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      column: {
        colors: [`#fff`, `#f2f2f2`],
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 320,
            width: 320,
          },
        },
      },
    ],
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: ['#535353'],
          fontSize: '15px',
          fontFamily: 'Noto Sans KR, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-label',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ['#535353'],
          fontSize: '15px',
          fontFamily: 'Noto Sans KR, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-label',
        },
      },
    },
  };
  let series = [];
  let categories = [];

  for (const [key, value] of Object.entries(data.articles.articles_top_hit)) {
    series.push(value.hit);
    categories.push(value.article_title);
  }

  options.xaxis.categories = categories;

  return transition((style, item) =>
    item ? (
      <animated.div style={style}>
        <Chart
          options={options}
          series={[{ data: series }]}
          type="bar"
          height={500}
          width={500}
        />
      </animated.div>
    ) : null,
  );
}

export function UserAgeAndGender({ data }) {
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
    if (ScrollPosition > 800 && ScrollPosition < 800 + rect) {
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

  let series = [
    {
      name: '남자',
      data: data.users.series[1].data.map(el => {
        return -el;
      }),
    },
    {
      name: '여자',
      data: data.users.series[0].data,
    },
  ];
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
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
    colors: ['#ffdd14', '#ffc803'],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },

    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 320,
            width: 320,
          },
        },
      },
    ],
    yaxis: {
      min: -5,
      max: 5,
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function (val) {
          return val;
        },
      },
      y: {
        formatter: function (val) {
          return Math.abs(val) + '명';
        },
      },
    },
    xaxis: {
      categories: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
      labels: {
        formatter: function (val) {
          return Math.abs(val) + '명';
        },
      },
    },
  };

  return transition((style, item) =>
    item ? (
      <animated.div style={style}>
        <Chart options={options} series={series} type="bar" height={500} />
      </animated.div>
    ) : null,
  );
}
