import React, { useState, useEffect } from 'react';
import { customAxios } from '../../utils/customAxios';
import { UserTopLanguage, UserTopPosition } from './RoundCharts';
import { ArticlesTopHit, UserAgeAndGender } from './BarChart';
import { UserGeneration } from './TreeMapChart';
import { ArticlesKeyword } from './LineCharts';

function VisualWrapper() {
  const [ChartData, setChartData] = useState();

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
                <div>
                  <section className="chartcontainer">
                    <ArticlesKeyword data={ChartData} />
                  </section>
                </div>
                <div>
                  <section className="chartcontainer">
                    <ArticlesTopHit data={ChartData} />
                  </section>
                </div>
                <div>
                  <section className="chartcontainer">
                    <UserAgeAndGender data={ChartData} />
                  </section>
                </div>
                <div>
                  <section className="chartcontainer">
                    <UserGeneration data={ChartData} />
                  </section>
                </div>
                <div>
                  <section className="chartcontainer">
                    <UserTopPosition data={ChartData} />
                  </section>
                </div>
                <div>
                  <section className="chartcontainer">
                    <UserTopLanguage data={ChartData} />
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
