import React from 'react';

function RequestRadio({ value, name, isChecked, radioInputHandler }) {
  return (
    <div>
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
      <label htmlFor={value}>{value}</label>
    </div>
  );
}

export default RequestRadio;
