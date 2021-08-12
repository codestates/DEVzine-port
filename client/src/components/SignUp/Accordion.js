import React, { useState } from 'react';
import RadioInputGender from './RadioInputGender';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';

function Accordion({ radioInputHandler, selectInputHandler }) {
  const [isOn, setIsOn] = useState(false);
  const radioInputData = [
    ['남자', 'gender', '60px', 0],
    ['여자', 'gender', '60px', 0],
    ['선택안함', 'gender', '91px', 1],
  ];
  const singleSelectData = [
    [
      [
        { value: '10대', label: '10대' },
        { value: '20대', label: '20대' },
        { value: '30대', label: '30대' },
        { value: '40대', label: '40대' },
        { value: '50대', label: '50대' },
        { value: '60대 이상', label: '60대 이상' },
      ],
      '나이',
    ],
    [
      [
        { value: '서버/백엔드', label: '서버/백엔드' },
        { value: '프론트엔드', label: '프론트엔드' },
        { value: '풀스택', label: '풀스택' },
        { value: '머신러닝/인공지능', label: '머신러닝/인공지능' },
        { value: '학생', label: '학생' },
        { value: '데이터분석', label: '데이터분석' },
        { value: 'Android', label: 'Android' },
        { value: 'IOS', label: 'IOS' },
        { value: '기타', label: '기타' },
      ],
      '직무',
    ],
  ];
  const multiSelectData = [
    [
      { value: 'C', label: 'C' },
      { value: 'C++', label: 'C++' },
      { value: 'C#', label: 'C#' },
      { value: 'Java', label: 'Java' },
      { value: 'JavaScript', label: 'JavaScript' },
      { value: 'Python', label: 'Python' },
      { value: 'SQL', label: 'SQL' },
      { value: 'PHP', label: 'PHP' },
      { value: '기타', label: '기타' },
    ],
    '언어',
  ];

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
