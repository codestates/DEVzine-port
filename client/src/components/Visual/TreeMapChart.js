import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Chart from 'react-apexcharts';

export function ArticlesKeywordAccumulated({ data }) {
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
    if (ScrollPosition > 1600 && ScrollPosition < 1600 + rect) {
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
    colors: [
      '#535353',
      '#999',
      '#b2b3b9',
      '#d9d9d9',
      '#f2f2f2',
      '#ffe33e',
      '#ffdd14',
      '#ffc803',
    ].reverse(),
    legend: {
      show: false,
    },
    chart: {
      toolbar: {
        show: false,
      },
      height: 380,
      type: 'treemap',
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
    // title: {
    //   text: '사용자 연령대',
    //   align: 'center',
    //   style: {
    //     colors: ['#535353'],
    //     fontSize: '15px',
    //     fontFamily: 'Noto Sans KR, sans-serif',
    //     fontWeight: 600,
    //     cssClass: 'apexcharts-xaxis-label',
    //   },
    // },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: ['#191a20'],
      },
    },
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

  return transition((style, item) =>
    item ? (
      <animated.div style={style}>
        <Chart
          options={options}
          series={[{ data: data.articles.all_keywords_accumulated }]}
          type="treemap"
          width={500}
          height={500}
        />
      </animated.div>
    ) : null,
  );
}
