import React from 'react';
import Select from 'react-select';

function MultiSelect({ options, name, selectInputHandler, defaultValue }) {
  return defaultValue.length !== 0 ? (
    <div className="multiselectcontent">
      <div className="subjectwrapper">{name}</div>
      <Select
        className="basicmulti"
        classNamePrefix="select"
        isMulti
        name={name}
        options={options}
        onChange={selectInputHandler}
        defaultValue={defaultValue}
      />
    </div>
  ) : null;
}

export default MultiSelect;
