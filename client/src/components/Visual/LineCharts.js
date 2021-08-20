import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Chart from 'react-apexcharts';

export function ArticlesKeyword({ data }) {
  const [ScrollPosition, setScrollPosition] = useState(0);
  const [Indicator, setIndicator] = useState(false);
  const transition = useTransition(Indicator, {
    from: { x: 100, opacity: 0, skew: '20deg' },
    enter: { x: 0, opacity: 1, skew: '0deg' },
    leave: { x: -100, opacity: 0, skew: '20deg' },
  });

  let rect = 400;

  const onScroll = () => {
    setScrollPosition(window.pageYOffset);
    if (ScrollPosition > 0 && ScrollPosition < rect) {
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
    colors: ['#ffdd14', '#ffe33e'],
    stroke: {
      curve: 'smooth',
    },
    fill: {
      colors: ['#ffe33e'],
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: ['#ffdd14', '#ffe33e'],
      },
      markers: {
        fillColors: ['#ffdd14', '#ffe33e'],
      },
    },
    chart: {
      toolbar: {
        show: false,
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
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.4,
      },
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: 'Articles Keyword Per Month',
      align: 'center',
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
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
      title: {
        text: '키워드',
      },
      categories: [],
      labels: {
        style: {
          colors: ['#535353'],
          fontSize: '12px',
          fontFamily: 'Noto Sans KR, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-label',
        },
      },
    },
    yaxis: {
      title: {
        text: '키워드 별 조회 수 Top 5',
      },
      labels: {
        style: {
          colors: ['#535353'],
          fontSize: '12px',
          fontFamily: 'Noto Sans KR, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-label',
        },
      },
    },
  };
  let series = [];
  let categories = [];

  for (const [key, value] of Object.entries(
    data.articles.articles_per_keyword_month,
  )) {
    series.push(value);
    categories.push(key);
  }

  options.xaxis.categories = categories;

  return transition((style, item) =>
    item ? (
      <animated.div style={style}>
        <Chart
          options={options}
          series={[{ name: 'Top Keyword Per Month', data: series }]}
          type="line"
          height={500}
          width={500}
        />
      </animated.div>
    ) : null,
  );
}
