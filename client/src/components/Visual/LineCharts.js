import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import 'aos/dist/aos.css';
import Aos from 'aos';

export function ArticlesKeyword({ data }) {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
    });
  }, []);

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
        breakpoint: 768,
        options: {
          chart: {
            width: '100%',
            height: 'auto',
          },
        },
      },
    ],
    xaxis: {
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

  return (
    <div className="chartcontainer">
      <div className="chartdesc" data-aos="fade-right">
        <div className="chartsubject">
          핵심 IT 키워드는 <br />
          무엇일까?
        </div>
        <div className="chartdetail">
          전월 한 달의 핵심 키워드를 <br />
          알아볼 수 있어요.
        </div>
      </div>
      <div className="chartwrapper" data-aos="fade-left" data-aos-delay="300">
        <Chart
          options={options}
          series={[{ name: 'Top Keyword Per Month', data: series }]}
          type="line"
          height={504}
          width={740}
        />
      </div>
    </div>
  );
}
