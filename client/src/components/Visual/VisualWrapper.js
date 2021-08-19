import React, { useState, useEffect, useCallback } from 'react';
import { customAxios } from '../../utils/customAxios';
import { UserTopLanguage, UserTopPosition } from './RoundCharts';
import { ArticlesTopHit, UserAgeAndGender } from './BarChart';
import { UserGeneration } from './TreeMapChart';
import { ArticlesKeyword } from './LineCharts';

function VisualWrapper() {
  const [ChartData, setChartData] = useState('');
  const [Pos, setPos] = useState(0);
  const [Indicator, setIndicator] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const chartcontainer = document.querySelectorAll('.chartcontainer');

  function onScroll() {
    setPos(window.scrollY);
    // determineIdx()
    determineIdx(Pos);
  }

  // const determinePos = useCallback(() => {
  //   setPos(window.scrollY);
  // }, []);

  const determineIdx = useCallback(Pos => {
    for (let i = 0; i < chartcontainer.length; i++) {
      if (
        Pos > chartcontainer[i].offsetTop - window.outerHeight / 3 &&
        Pos <
          chartcontainer[i].offsetTop -
            window.outerHeight / 2 +
            chartcontainer[i].offsetHeight
      ) {
        setIndicator(
          Indicator.map((el, idx) => {
            if (i === idx) {
              return true;
            } else {
              return false;
            }
          }),
        );
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.addEventListener('scroll', onScroll);
    };
  }, [Pos]);

  useEffect(async () => {
    await customAxios
      .get('/visual')
      .then(res => setChartData(res.data.data))
      .catch(err => alert(err));
  }, []);

  return ChartData ? (
    <>
      <div className="visualcontainer">
        <div className="container">
          <div className="row">
            <div className="co-sm-4">
              <div className="visualwrapper">
                <div className="chartcontainer">
                  <section className="chartwrapper">
                    {Indicator[0] ? <ArticlesKeyword data={ChartData} /> : null}
                  </section>
                </div>
                <div className="chartcontainer">
                  <section className="chartwrapper">
                    {Indicator[1] ? <ArticlesTopHit data={ChartData} /> : null}
                  </section>
                </div>
                <div className="chartcontainer">
                  <section className="chartwrapper">
                    {Indicator[2] ? (
                      <UserAgeAndGender data={ChartData} />
                    ) : null}
                  </section>
                </div>
                <div className="chartcontainer">
                  <section className="chartwrapper">
                    {Indicator[3] ? <UserGeneration data={ChartData} /> : null}
                  </section>
                </div>
                <div className="chartcontainer">
                  <section className="chartwrapper">
                    {Indicator[4] ? <UserTopPosition data={ChartData} /> : null}
                  </section>
                </div>
                <div className="chartcontainer">
                  <section className="chartwrapper">
                    {Indicator[5] ? <UserTopLanguage data={ChartData} /> : null}
                  </section>
                </div>
                <div className="visualwrapper-footer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default VisualWrapper;
