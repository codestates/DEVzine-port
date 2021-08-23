import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import 'aos/dist/aos.css';
import Aos from 'aos';

export function ArticlesKeywordAccumulated({ data }) {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
    });
  }, []);

  let options = {
    colors: [
      '#535353',
      '#999',
      '#b2b3b9',
      '#d9d9d9',
      '#f2f2f2',
      '#ffe33e',
      '#ffdd14',
      '#ffc803',
    ].reverse(),
    legend: {
      show: false,
    },
    chart: {
      toolbar: {
        show: false,
      },
      height: 380,
      type: 'treemap',
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
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: ['#191a20'],
      },
    },
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

  return (
    <div className="chartcontainer" style={{ marginTop: '72px' }}>
      <div className="chartwrapper" data-aos="fade-right" data-aos-delay="300">
        <Chart
          options={options}
          series={[{ data: data.articles.all_keywords_accumulated }]}
          type="treemap"
          height={504}
          width={740}
        />
      </div>
      <div
        className="chartdesc"
        data-aos="fade-left"
        style={{ textAlign: 'right' }}
      >
        <div className="chartsubject">어떤 소식을 다룰까?</div>
        <div className="chartdetail">
          DEVzine의 모든 키워드와 <br />
          키워드 별 콘텐츠 수를 확인해보세요.
        </div>
      </div>
    </div>
  );
}
