import Chart from 'react-apexcharts';

export function UserTopLanguage({ data }) {
  console.log(data);

  let options = {
    fill: {
      colors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
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
      width: 380,
      type: 'pie',
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };
  let series = [];
  let labels = [];

  for (const [key, value] of Object.entries(data.users.users_top_language)) {
    series.push(value);
    labels.push(key);
  }

  options.labels = labels;

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      width={500}
      height={320}
    />
  );
}

export function UserTopPosition({ data }) {
  let options = {
    //datalabels는 차트 위의 숫자의 색을 바꿔주는 것
    fill: {
      colors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
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
      width: 380,
      type: 'donut',
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };
  let series = [];
  let labels = [];

  for (const [key, value] of Object.entries(data.users.users_top_position)) {
    series.push(value);
    labels.push(key);
  }

  options.labels = labels;

  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      width={500}
      height={320}
    />
  );
}
