import React from 'react';

function TextInputGenderRequired({
  stateName,
  stateFunc,
  placeholder,
  type,
  maxLength,
}) {
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
