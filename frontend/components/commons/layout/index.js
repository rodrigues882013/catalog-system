import React, {Component} from 'react';

import Navbar from '../navbar';

class Layout extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <div className="flex-container">
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
