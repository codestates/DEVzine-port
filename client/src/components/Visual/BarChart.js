import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import 'aos/dist/aos.css';
import Aos from 'aos';

export function ArticlesTopHit({ data }) {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
    });
  }, []);

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
            width: 300,
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

  return (
    <div className="chartcontainer" style={{ margin: '240px 0' }}>
      <div className="chartdesc" data-aos="fade-right">
        <div className="chartsubject">
          가장 많이 본 소식은
          <br /> 무엇일까?
        </div>
        <div className="chartdetail">
          DEVzine이 시작한 날부터 <br />
          바로 전일까지 기준으로 <br />
          가장 많이 본 소식을 알아볼 수 있어요.
        </div>
      </div>
      <div className="chartwrapper" data-aos="fade-left" data-aos-delay="300">
        <Chart
          options={options}
          series={[{ data: series }]}
          type="bar"
          height={504}
          width={740}
        />
      </div>
    </div>
  );
}

export function UserAgeAndGender({ data }) {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
    });
  }, []);

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

  // 최대값과 가장 근접한 5의 배수를 찾는 로직 
  let maxCount = Math.max(...series[0].data.map(el => Math.abs(el)), ...series[1].data)
  maxCount = maxCount + 5 - (maxCount % 5)

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
            width: 300,
          },
        },
      },
    ],
    yaxis: {
      min: maxCount * -1,
      max: maxCount,
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

  return (
    <div className="chartcontainer" style={{ marginBottom: '72px' }}>
      <div className="chartwrapper" data-aos="fade-right" data-aos-delay="300">
        <Chart
          options={options}
          series={series}
          type="bar"
          height={504}
          width={740}
        />
      </div>
      <div
        className="chartdesc"
        data-aos="fade-left"
        style={{ textAlign: 'right' }}
      >
        <div className="chartsubject">
          어떤 분들이 <br />
          IT 소식을 보실까요?
        </div>
        <div className="chartdetail">
          DEVzine이 시작한 날부터 <br />
          바로 전일까지 기준으로
          <br />
          DEVzine에 가입한 회원들의
          <br />
          성별, 나이, 직무, 언어를 알아볼 수 있어요.
        </div>
      </div>
    </div>
  );
}
