import React from 'react';
import Select from 'react-select';

function MultiSelect({ options, name, selectInputHandler }) {
  return (
    <div className="multiselectcontent">
      <div className="subjectwrapper">{name}</div>
      <Select
        className="basicmulti"
        classNamePrefix="select"
        isMulti
        name={name}
        options={options}
        onChange={e => selectInputHandler(e, name)}
      />
    </div>
  );
}

export default MultiSelect;
