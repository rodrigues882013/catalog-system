import React from 'react';
import {PropTypes} from 'prop-types';


const TextInput = ({id, name, label, onChange, placeHolder, value, error, type='text'}) => {

  const className = "";

  return (
    <div>
      <label for={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        className={className}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        required/>
      {error && <div className="">{error}</div>}
    </div>
  );
};


TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
