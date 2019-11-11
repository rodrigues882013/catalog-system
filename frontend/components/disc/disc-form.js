import React from 'react';
import TextInput from '../commons/text-input';
import SelectInput from '../commons/select-input';
import {NavLink} from "react-router-dom";

const DiscForm = ({disc, collections, errors, onSave, onChange}) => {
    return (
        <form>
          <div className="">
            <TextInput
              id="txtTitle"
              name="title"
              label="Title"
              placeHolder="Title"
              value={disc.title}
              error={errors['title']}
              onChange={onChange}/>
          </div>
          <div className="">
            <TextInput
              id="txtText"
              name="text"
              label="Text"
              placeHolder="Text"
              value={disc.text}
              error={errors['text']}
              onChange={onChange}/>
          </div>
          <SelectInput
            id='collection'
            label='Collection'
            element='collection'
            dataSource={collections}
            selected={disc.collection}
            onChange={onChange}/>
          <button type="submit" onClick={onSave} className="button">Save</button>
          <NavLink to="/discs" className="button m-l"> Back </NavLink>

        </form>
      );
};

export default DiscForm;
//
// EmployeeFrom.propTypes = {
//   name: PropTypes.string.isRequired,
//   lastName: PropTypes.string.isRequired,
//   cpf: PropTypes.string.isRequired,
//   celPhone: PropTypes.string.isRequired,
//   departments: PropTypes.object.isRequired
// };
