import React from 'react';
import 'select2';
import _ from 'lodash';
import 'select2/dist/css/select2.css';


const SelectInput = ({id, dataSource, selected, element, label, error, onChange}) => {

  let elements = _.map(dataSource, x => <option key={x.id} value={x.id}>{x.title}</option>);
  let value = (selected !== undefined) ? selected.id : _.first(dataSource).id;

  return (
    <div>
      <label className="label" for={id}>{label}</label>
      <br/>
      <select
        value={value}
        name={element}
        className={"form-control " + element}
        onChange={onChange}>
        {elements}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};


export default SelectInput;
