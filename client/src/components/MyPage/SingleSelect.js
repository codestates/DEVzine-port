import React from 'react';
import Select from 'react-select';

function SingleSelect({ options, name, selectInputHandler, defaultValue }) {
  return (
    <div className="singleselectcontent">
      <div className="subjectwrapper">{name}</div>
      <Select
        className="basicsingle"
        classNamePrefix="select"
        name={name}
        options={options}
        onChange={e => selectInputHandler(e, name)}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default SingleSelect;
