import Chart from 'react-apexcharts';

export function ArticlesTopHit({ data }) {
  console.log(data);

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
