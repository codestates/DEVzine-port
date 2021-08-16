import React from 'react';
import RadioInputGender from './RadioInputGender';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';
import ContributionStatus from './ContributionStatus';
import {
  radioInputGenderData,
  multiSelectData,
  singleSelectData,
  radioInputSubscribedData,
} from '../../assets/datas/MyPageData/data';

function OptContents({
  radioInputHandler,
  selectInputHandler,
  Gender,
  Scribed,
  Age,
  Position,
  Language,
  Contribution,
}) {
  let ageIdx;
  let positionIdx;
  let languageIdxArr = [];

  singleSelectData[0][0].forEach((el, idx) => {
    if (el.value === Age) {
      ageIdx = idx;
    }
  });
  singleSelectData[1][0].forEach((el, idx) => {
    if (el.value === Position) {
      positionIdx = idx;
    }
  });
  multiSelectData[0].forEach((el, idx) => {
    if (Language.includes(el.value)) {
      languageIdxArr.push(multiSelectData[0][idx]);
    }
  });
  singleSelectData[0][2] = ageIdx;
  singleSelectData[1][2] = positionIdx;

  return (
    <div className="optcontentswrapper">
      <div className="radiowrapper">
        <div className="subjectwrapper">성별</div>
        <div className="radiocontents">
          {radioInputGenderData.map((el, i) => {
            return (
              <RadioInputGender
                key={i}
                value={el[0]}
                name={el[1]}
                width={el[2]}
                radioInputHandler={radioInputHandler}
                stateName={Gender}
              />
            );
          })}
        </div>
      </div>
      <div className="singleselectwrapper">
        <div className="singleselectcontents">
          {singleSelectData.map((el, i) => {
            return (
              <SingleSelect
                key={i}
                options={el[0]}
                name={el[1]}
                defaultValue={el[0][el[2]]}
                selectInputHandler={selectInputHandler}
              />
            );
          })}
        </div>
      </div>
      <div className="multiselectwrapper">
        <div className="multiselectcontents">
          <MultiSelect
            options={multiSelectData[0]}
            name={multiSelectData[1]}
            selectInputHandler={selectInputHandler}
            defaultValue={languageIdxArr}
          />
        </div>
      </div>
      <div className="radiowrapper" style={{ marginTop: '24px' }}>
        <div className="subjectwrapper">구독</div>
        <div className="radiocontents">
          {radioInputSubscribedData.map((el, i) => {
            return (
              <RadioInputGender
                key={`Scribed${i}`}
                value={el[0]}
                name={el[1]}
                width={el[2]}
                radioInputHandler={radioInputHandler}
                stateName={Scribed}
              />
            );
          })}
        </div>
      </div>
      <ContributionStatus Contribution={Contribution} />
    </div>
  );
}

export default OptContents;
