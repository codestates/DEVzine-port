import Chart from 'react-apexcharts';

export function ArticlesKeyword({ data }) {
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
      text: 'Articles Keyword Per Day',
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
    data.articles.articles_per_keyword_day,
  )) {
    series.push(value);
    categories.push(key);
  }

  options.xaxis.categories = categories;

  return (
    <Chart
      options={options}
      series={[{ name: 'Top Keyword Per Day', data: series }]}
      type="line"
      height={500}
      width={500}
    />
  );
}
