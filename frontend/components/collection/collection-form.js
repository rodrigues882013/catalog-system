import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../commons/text-input';
import {NavLink} from "react-router-dom";

const CollectionForm = ({collection, formName, errors, onSave, onChange}) => {
  return (
    <form name={formName}>
      <div className="">
        <TextInput
          id="txtTitle"
          name="title"
          label="Title"
          placeHolder="Title"
          value={collection.title}
          error={errors['title']}
          onChange={onChange}/>
      </div>
      <div className="">
        <TextInput
          id="txtDescription"
          name="description"
          label="Description"
          placeHolder="Description"
          value={collection.description}
          error={errors['description']}
          onChange={onChange}/>
      </div>
      <button type="submit" onClick={onSave} className="button"> Save </button>
      <NavLink to="/collections" className="button m-l"> Back </NavLink>
    </form>
  );
};

export default CollectionForm;

CollectionForm.propTypes = {
  collection: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};
