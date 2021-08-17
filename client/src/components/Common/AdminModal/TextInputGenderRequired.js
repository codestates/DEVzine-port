import React from 'react';

function TextInputGenderRequired({
  stateName,
  stateFunc,
  placeholder,
  type,
  maxLength,
}) {
  //inputname은 이메일 같은거, detailString은 state에 문자열한거, stateName은 state, stateFunc은 set함수
  return (
      <input
        type={type}
        placeholder={placeholder}
        className="inputlarge"
        value={stateName}
        onChange={e => stateFunc(e.target.value)}
        maxLength={maxLength}
      />
  );
}

export default TextInputGenderRequired;
