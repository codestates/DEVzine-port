import React, { useState, useEffect } from 'react';
import { customAxios } from '../../utils/customAxios';
import { UserTopLanguage, UserTopPosition } from './RoundCharts';
import { ArticlesTopHit, UserAgeAndGender } from './BarChart';
import { ArticlesKeywordAccumulated } from './TreeMapChart';
import { ArticlesKeyword } from './LineCharts';

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
                <ArticlesKeyword data={ChartData} />

                <ArticlesKeywordAccumulated data={ChartData} />

                <ArticlesTopHit data={ChartData} />

                <UserAgeAndGender data={ChartData} />

                <UserTopPosition data={ChartData} />

                <UserTopLanguage data={ChartData} />

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
