import React, { useState, useEffect } from 'react';
import { customAxios } from '../../utils/customAxios';
import { UserTopLanguage, UserTopPosition } from './RoundCharts';
import { ArticlesTopHit } from './BarChart';

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
                <section className="chartcontainer"></section>
                <section className="chartcontainer"></section>
                <section className="chartcontainer">
                  <ArticlesTopHit data={ChartData} />
                </section>
                <section className="chartcontainer"></section>
                <section className="chartcontainer">
                  <UserTopPosition data={ChartData} />
                </section>
                <section className="chartcontainer">
                  <UserTopLanguage data={ChartData} />
                </section>
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
