import React from 'react';
import {Link} from 'react-router-dom';


const Header = ({...props}) => {
  return (
    <nav>
      <Link to="/" activeClassName="active">Home</Link>
      {" | "}
      <Link to="/cats" activeClassName="active">Cats</Link>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
    </nav>
  );
};

export default Header;
