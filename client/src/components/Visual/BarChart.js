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
        breakpoint: 880,
        options: {
          chart: {
            width: '650',
            height: '650',
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: '460',
            height: '460',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 500,
        options: {
          chart: {
            width: '100%',
            height: '300',
          },
          legend: {
            position: 'bottom',
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
    <div className="chartcontainer" style={{ margin: '30% 0' }}>
      <div className="chartdesc" data-aos="fade-right">
        <div className="chartsubject">
          ?????? ?????? ??? ?????????
          <br /> ?????????????
        </div>
        <div className="chartdetail">
          ?????? ??? ??? ???????????? <br />
          ?????? ?????? ??? ????????? ????????? ??? ?????????.
        </div>
      </div>
      <div className="chartwrapper" data-aos="fade-left" data-aos-delay="300">
        <Chart
          options={options}
          series={[{ name: '?????????', data: series }]}
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
      name: '??????',
      data: data.users.series[1].data
        .map(el => {
          return -el;
        })
        .reverse(),
    },
    {
      name: '??????',
      data: data.users.series[0].data
        .map(el => {
          return el;
        })
        .reverse(),
    },
  ];

  let maxCount = Math.max(
    ...series[0].data.map(el => Math.abs(el)),
    ...series[1].data,
  );
  maxCount = maxCount + 5 - (maxCount % 5);

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
        breakpoint: 880,
        options: {
          chart: {
            width: '650',
            height: '650',
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: '460',
            height: '460',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 500,
        options: {
          chart: {
            width: '100%',
            height: '300',
          },
          legend: {
            position: 'bottom',
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
          return Math.abs(val) + '???';
        },
      },
    },
    xaxis: {
      categories: [
        '10???',
        '20???',
        '30???',
        '40???',
        '50???',
        '60??? ??????',
      ].reverse(),
      labels: {
        formatter: function (val) {
          return Math.abs(val) + '???';
        },
      },
    },
  };

  return (
    <div className="chartcontainer" style={{ marginBottom: '72px' }}>
      <div
        className="chartdesc lg-hidden "
        data-aos="fade-left"
        style={{ textAlign: 'right' }}
      >
        <div className="chartsubject">
          ?????? ????????? <br />
          IT ????????? ?????????????
        </div>
        <div className="chartdetail">
          DEVzine??? ????????? ????????? <br />
          ?????? ???????????? ????????????
          <br />
          DEVzine??? ????????? ????????????
          <br />
          ??????, ??????, ??????, ????????? ????????? ??? ?????????.
        </div>
      </div>
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
        className="chartdesc lg-only "
        data-aos="fade-left"
        style={{ textAlign: 'right' }}
      >
        <div className="chartsubject">
          ?????? ????????? <br />
          IT ????????? ?????????????
        </div>
        <div className="chartdetail">
          DEVzine??? ????????? ????????? <br />
          ?????? ???????????? ????????????
          <br />
          DEVzine??? ????????? ????????????
          <br />
          ??????, ??????, ??????, ????????? ????????? ??? ?????????.
        </div>
      </div>
    </div>
  );
}
