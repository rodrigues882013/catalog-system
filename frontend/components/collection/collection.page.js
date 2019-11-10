import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {withRouter, NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import actions from '../../actions/collection.actions';
import _ from 'lodash';
import CollectionsList from './collections.list';


class CollectionPage extends Component {

  constructor(props, context) {
    super(props, context);
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  componentWillMount() {
    this.props.actions.loadCollections();
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  render() {
    const collections = this.props.collections;
    const element =
      collections.length ? <CollectionsList collections={collections} /> :
        <div className="">
          <div className="" role="alert">
           No collections available.
          </div>
        </div>;

    return (
      <main className="" role="main">
        <h1> Collections </h1>
        <div className="">
          <div className="">
            Total of collections: {collections.length}
          </div>
        </div>

        <section className="component row placeholders">
          {element}
        </section>
        <div className="row">
          <div className="">
            <NavLink to="collections/new" className="" > New Collection </NavLink>
          </div>
        </div>
      </main>

    );

  }
}

CollectionPage.propTypes = {
  collections: PropTypes.array.isRequired,
};

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function mapStateToProps(state, ownProps) {
  if (!_.isEmpty(state.collections)){
    return {
      collections: state.collections,
    };
  } else {

    return {
      collections: [],
    };
  }
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionPage));
