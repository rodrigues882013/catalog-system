import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const DiscItem = ({disc, onDelete, hiddenDelete=false}) => {
    return (
        <tr>
            <td>{disc.title}</td>
            <td>{disc.text}</td>
            <td>{disc.collection.title}</td>
            <td>
                <button className="button" hidden={hiddenDelete} onClick={() => onDelete(disc)}> Delete <i className=""/></button>
                <NavLink to={`/discs/${disc.id}`} className="button m-l"> Detail <i className=""/></NavLink>
            </td>
        </tr>
    );
};

const DiscList = ({discs, onDelete, hiddenDelete=false}) => {

    const discItems = discs.map( disc => <DiscItem key={disc.id} disc={disc} onDelete={onDelete} hiddenDelete={hiddenDelete}/>);

    return (
            <table className="items">
                <tr>
                    <th>Title</th>
                    <th>Text</th>
                    <th>Collection</th>
                    <th>Actions</th>
                </tr>
              {discItems}
            </table>


    );
};

DiscList.propTypes = {
    discs: PropTypes.array.isRequired
};

DiscItem.protoType = {
    disc: PropTypes.object.isRequired
};

export default DiscList;
