import React from 'react';
import Chart from 'react-apexcharts';

export function ArticlesTopHit({ data }) {
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

  return (
    <Chart
      options={options}
      series={[{ data: series }]}
      type="bar"
      height={500}
      width={500}
    />
  );
}

export function UserAgeAndGender({ data }) {
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

  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar" height={500} />
    </div>
  );
}
