import Chart from 'react-apexcharts';
import { userGenerationDataConvert } from '../../utils/userGenerationDataConvert';

export function UserGeneration({ data }) {
  console.log(data);

  let options = {
    colors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
    // fill: {
    //   opacity: 0.9,
    //   colors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
    // },
    legend: {
      show: false,
    },
    chart: {
      toolbar: {
        show: false,
      },
      height: 380,
      type: 'treemap',
    },
    title: {
      text: '사용자 연령대',
      align: 'center',
      style: {
        colors: ['#535353'],
        fontSize: '15px',
        fontFamily: 'Noto Sans KR, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-xaxis-label',
      },
    },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
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
  let series = [];

  for (const [key, value] of Object.entries(data.users.user_generation)) {
    series.push({ x: userGenerationDataConvert(key), y: value });
  }
  return (
    <Chart
      options={options}
      series={[{ data: series }]}
      type="treemap"
      width={500}
      height={500}
    />
  );
}
