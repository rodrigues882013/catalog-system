
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const CollectionItem = ({collection}) => {
  return (
    <tr>
      <td>{collection.id}</td>
      <td>{collection.title}</td>
      <td>{collection.description}</td>
      <td>
        <NavLink to={`/collections/${collection.id}`} className=""><i className=""/></NavLink>
      </td>
    </tr>
  );
};

const CollectionsList = ({collections, hideButtonNew}) => {
  console.log(collections);
  const items = collections.map( cl => <CollectionItem key={cl.id} collection={cl} />);

  return (
    <div className="col-sm-12 col-md-12 col-xs-12">
      <table className="table table-striped">
        <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
        {items}
        </tbody>
      </table>
    </div>
  );
};

CollectionsList.propTypes = {
  collections: PropTypes.array.isRequired
};

CollectionItem.protoType = {
  collection: PropTypes.object.isRequired
};

export default CollectionsList;
