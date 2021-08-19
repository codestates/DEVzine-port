import Chart from 'react-apexcharts';

export function UserGender({ data }) {
  console.log(data);

  let options = {
    colors: ['#ffc803', '#ffe33e'],
    fill: {
      opacity: 0.9,
      colors: ['#ffc803', '#ffe33e'],
    },
    legend: {
      labels: {
        colors: ['#ffc803', '#ffe33e'],
      },
      markers: {
        fillColors: ['#ffc803', '#ffe33e'],
      },
    },
    chart: {
      width: 380,
      type: 'polarArea',
    },
    labels: [],
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
  let series = [];
  let labels = [];

  for (const [key, value] of Object.entries(data.users.users_gender)) {
    series.push(value);
    labels.push(key === 'users_male' ? '남자' : '여자');
  }

  options.labels = labels;

  return (
    <Chart
      options={options}
      series={series}
      type="polarArea"
      width={500}
      height={500}
    />
  );
}
