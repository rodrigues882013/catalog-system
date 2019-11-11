import React from 'react';
import {NavLink} from 'react-router-dom';


const Navbar = ({...props}) => {

  return (
    <div className="topnav" id="myTopnav">
      <NavLink to="/home" className="" activeClassName="active">Home</NavLink>
      <NavLink to="/collections" className="" activeClassName="active">Collections</NavLink>
      <NavLink to="/discs" className="" activeClassName="active">Discs</NavLink>
    </div>
  );
};

export default Navbar;
