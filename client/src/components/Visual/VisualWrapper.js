import React, { useState, useEffect } from 'react';
import { customAxios } from '../../utils/customAxios';
import { UserTopLanguage, UserTopPosition } from './RoundCharts';
import { ArticlesTopHit, UserAgeAndGender } from './BarChart';
import { ArticlesKeywordAccumulated } from './TreeMapChart';
import { ArticlesKeyword } from './LineCharts';
import { UserAge } from './PolarAreaChart';

function VisualWrapper() {
  const [ChartData, setChartData] = useState('');

  useEffect(async () => {
    await customAxios
      .get('/visual')
      .then(res => {
        setChartData(res.data.data);
      })
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
                    <ArticlesKeyword data={ChartData} />
                  </section>
                </div>
                <div className="chartcontainer">
                  <section className="chartwrapper">
                    <ArticlesTopHit data={ChartData} />
                  </section>
                </div>
                <div className="chartcontainer">
                  <section className="chartwrapper">
                    <UserAgeAndGender data={ChartData} />
                  </section>
                </div>
                <div className="chartcontainer">
                  <section className="chartwrapper">
                    <UserAge data={ChartData} />
                  </section>
                </div>
                <div className="chartcontainer">
                  <section className="chartwrapper">
                    <ArticlesKeywordAccumulated data={ChartData} />
                  </section>
                </div>
                <div className="chartcontainer">
                  <section className="chartwrapper">
                    <UserTopPosition data={ChartData} />
                  </section>
                </div>
                <div className="chartcontainer">
                  <section className="chartwrapper">
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
