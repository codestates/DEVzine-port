import React from 'react';
import Select from 'react-select';

function SingleSelect({ options, name, selectInputHandler }) {
  return (
    <div className="singleselectcontent">
      <div className="subjectwrapper">{name}</div>
      <Select
        className="basicsingle"
        classNamePrefix="select"
        name={name}
        options={options}
        onChange={selectInputHandler}
      />
    </div>
  );
}

export default SingleSelect;
