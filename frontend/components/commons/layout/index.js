import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Navbar from '../navbar';

class Layout extends Component {

  componentDidMount(){

  }

  onLogout(event){
    // event.preventDefault();
    // this.props.actions.logOutUser(this.props.history);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container flex">
          <div className="item">
            {/*<Sidebar />*/}
            {this.props.children}
          </div>
        </div>
        {/*<Footer />*/}
      </div>
    );
  }
}

export default Layout;
