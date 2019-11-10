import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const DiscItem = ({disc, onDelete}) => {
    return (
        <tr>
            <td>{disc.title}</td>
            <td>{disc.text}</td>
            <td>{disc.collection.title}</td>
            <td>
                <button className="" onClick={() => onDelete(disc)}> Delete <i className=""/></button>
                <NavLink to={`/discs/${disc.id}`} className=""> Detail <i className=""/></NavLink>
            </td>
        </tr>
    );
};

const DiscList = ({discs, onDelete}) => {

    const discItems = discs.map( disc => <DiscItem key={disc.id} disc={disc} onDelete={onDelete}/>);

    return (
        <div className="">
            <table className="">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Text</th>
                    <th>Collection</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {discItems}
                </tbody>
            </table>
        </div>
        

    );
};

DiscList.propTypes = {
    discs: PropTypes.array.isRequired
};

DiscItem.protoType = {
    disc: PropTypes.object.isRequired
};

export default DiscList;
