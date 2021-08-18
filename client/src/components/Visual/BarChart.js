import Chart from 'react-apexcharts';

export function ArticlesTopHit({ data }) {
  console.log(data);

  let options = {
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
      width: 380,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320,
          },
        },
      },
    ],
    xaxis: {
      categories: [],
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
    />
  );
}
