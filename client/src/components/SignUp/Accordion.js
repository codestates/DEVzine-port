import React, { useState } from 'react';
import RadioInputGender from './RadioInputGender';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';
import {
  radioInputData,
  singleSelectData,
  multiSelectData,
} from '../../assets/datas/SignUpData/data';

function Accordion({ radioInputHandler, selectInputHandler }) {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="accordioncontainer">
      <div className="header">
        추가 정보 입력하기
        <div className="btn" onClick={() => setIsOn(!isOn)}>
          {isOn ? '닫기' : '열기'}
        </div>
      </div>
      <div
        className="contentswrapper"
        style={{
          height: isOn ? '260px' : '0',
        }}
      >
        <div
          className="radiowrapper"
          style={{
            opacity: isOn ? 1 : 0,
          }}
        >
          <div className="subjectwrapper">성별</div>
          <div className="radiocontents">
            {radioInputData.map((el, i) => {
              return (
                <RadioInputGender
                  key={i}
                  value={el[0]}
                  name={el[1]}
                  width={el[2]}
                  isChecked={el[3]}
                  radioInputHandler={radioInputHandler}
                />
              );
            })}
          </div>
        </div>
        <div
          className="singleselectwrapper"
          style={{
            opacity: isOn ? 1 : 0,
          }}
        >
          <div className="singleselectcontents">
            {singleSelectData.map((el, i) => {
              return (
                <SingleSelect
                  key={i}
                  options={el[0]}
                  name={el[1]}
                  selectInputHandler={selectInputHandler}
                />
              );
            })}
          </div>
        </div>
        <div
          className="multiselectwrapper"
          style={{
            opacity: isOn ? 1 : 0,
          }}
        >
          <div className="multiselectcontents">
            <MultiSelect
              options={multiSelectData[0]}
              name={multiSelectData[1]}
              selectInputHandler={selectInputHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
