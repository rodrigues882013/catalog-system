
import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../commons/text-input';
import SelectInput from '../commons/select-input';

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
         
          <button type="submit" onClick={onSave} className="">Save</button>
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
