import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import 'aos/dist/aos.css';
import Aos from 'aos';

export function UserTopLanguage({ data }) {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
    });
  }, []);

  let options = {
    colors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
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
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
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
    <div
      className="chartcontainer"
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <div className="chartwrapper" data-aos="fade-left">
        <Chart
          options={options}
          series={series}
          type="pie"
          height={504}
          width={740}
        />
      </div>
    </div>
  );
}

export function UserTopPosition({ data }) {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
    });
  }, []);

  let options = {
    colors: ['#b2b3b9', '#d9d9d9', '#ffdd14', '#ffc803', '#ffe33e'],
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
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
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
    <div className="chartcontainer" style={{ marginBottom: '72px' }}>
      <div className="chartwrapper" data-aos="fade-right">
        <Chart
          options={options}
          series={series}
          type="donut"
          height={504}
          width={740}
        />
      </div>
    </div>
  );
}
