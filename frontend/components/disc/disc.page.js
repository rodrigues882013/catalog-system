import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {withRouter, NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import actions from '../../actions/disc.actions';
import _ from 'lodash';
import DiscList from './disc.list';


class DiscPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.onDelete = this.onDelete.bind(this);
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  componentWillMount() {
    this.props.actions.loadDiscs();
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  onDelete(disc) {
    this.props.actions.deleteDisc(disc.id, this.props.history);
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  render() {
    const discs = this.props.discs;
    const element =
      discs.length ? <DiscList discs={discs} onDelete={this.onDelete}/> :
        <div className="">
          <div className="" role="alert">
            No employee available.
          </div>
        </div>;

    return (
      <main className="" role="main">
        <h1> Discs </h1>
        <div className="">
          <div className="">
            Total of discs: {discs.length}
          </div>
        </div>
        <section className="">
          {element}
        </section>
        <div className="">
          <div className="">
            <NavLink to="discs/new" className="" > New Discs </NavLink>
          </div>
        </div>
      </main>
    );
  }
}


//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

DiscPage.propTypes = {
  discs: PropTypes.array.isRequired
};

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function mapStateToProps(state, ownProps) {
  if (!_.isEmpty(state.discs)){
    return {
      discs: state.discs
    };
  } else {

    return {
      discs: []
    };
  }
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiscPage));
