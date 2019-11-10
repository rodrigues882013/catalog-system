import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';



const Navbar = ({...props}) => {

  return (
    <nav className="">
      <a href="#">Dashboard</a>

      <div className="">
        <ul className="">
          <li className="" >
            <NavLink to="/home" className="" activeClassName="active">Home</NavLink>
          </li>
          <li className="">
            <NavLink to="/collections" className="" activeClassName="active">Collections</NavLink>
          </li>
          <li className="" >
            <NavLink to="/discs" className="" activeClassName="active">Discs</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
