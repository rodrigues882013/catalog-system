
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
        <NavLink to={`/collections/${collection.id}`} className="button"> Detail <i className=""/></NavLink>
        <NavLink to={`/collections/${collection.id}/discs`} className="button m-l"> List discs <i className=""/></NavLink>
      </td>
    </tr>
  );
};

const CollectionsList = ({collections, hideButtonNew}) => {
  const items = collections.map( cl => <CollectionItem key={cl.id} collection={cl} />);

  return (
    <table className="items">
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
      {items}
    </table>
  );
};

CollectionsList.propTypes = {
  collections: PropTypes.array.isRequired
};

CollectionItem.protoType = {
  collection: PropTypes.object.isRequired
};

export default CollectionsList;
