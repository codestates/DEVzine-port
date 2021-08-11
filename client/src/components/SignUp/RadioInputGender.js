import React from 'react';

function RadioInputGender({
  value,
  name,
  width,
  isChecked,
  radioInputHandler,
}) {
  return (
    <div className="radiocontent" style={{ width: width }}>
      {isChecked ? (
        <input
          type="radio"
          className="radioinput"
          name={name}
          value={value}
          defaultChecked
          onChange={() => radioInputHandler()}
        />
      ) : (
        <input
          type="radio"
          className="radioinput"
          name={name}
          value={value}
          onChange={() => radioInputHandler()}
        />
      )}
      <label className="radiorabel" htmlFor={value}>
        {value}
      </label>
    </div>
  );
}

export default RadioInputGender;
