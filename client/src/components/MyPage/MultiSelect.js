import React from 'react';
import Select from 'react-select';

function MultiSelect({ options, name, selectInputHandler, defaultValue }) {
  return (
    <div className="multiselectcontent">
      <div className="subjectwrapper">{name}</div>
      <Select
        className="basicmulti"
        classNamePrefix="select"
        name={name}
        options={options}
        isMulti
        onChange={e => selectInputHandler(e, name)}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default MultiSelect;
