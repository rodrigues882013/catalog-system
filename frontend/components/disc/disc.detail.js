import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import actions from '../../actions/disc.actions';
import collectionActions from '../../actions/collection.actions';

import _ from 'lodash';
import DiscForm from './disc.form';



class DiscDetail extends Component {

  constructor(props, context) {
    super(props, context);

    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      collections: this.props.collections,
      disc: this.props.disc,
      errors: {}
    };
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  componentWillMount(){
    this.props.collectionActions.loadCollections();
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  componentWillReceiveProps(nextProps){
    if (!_.isEmpty(nextProps.discs)) {
      this.setState({disc: nextProps.disc});
    }

    if (!_.isEmpty(nextProps.discs) && _.first(nextProps.discs).id !== ''){
      this.setState({discs: nextProps.discs});
    }
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  handleFormValidation(){
    let fields = this.props.disc;
    let formIsValid = true;
    let errors = {};

    //Title
    if(fields["title"] === ""){
      formIsValid = false;
      errors["title"] = "Title cannot be empty";
    }

    if(fields["text"] === ""){
      formIsValid = false;
      errors["text"] = "Text cannot be empty";
    }

    this.setState({errors: errors});
    return formIsValid;

  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  onSave(event){
    event.preventDefault();

    if (this.handleFormValidation()) {
      if (!_.has(this.props.disc.collection, 'title')) {

        const disc = this.props.disc;
        disc.collection = this.state.collections[0];
        this.setState({disc});
      }

      if (_.has(this.props.disc, 'id')) {
        this.props.actions.updateDisc(this.props.disc.id, this.props.disc, this.props.history);
      } else {
        this.props.actions.createDisc(this.props.disc, this.props.history);
      }
    }
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  onChange(event){
    const value = _.isEqual(event.target.name, 'collection') ?
      _.find(this.state.collections, x => x.id === parseInt(event.target.value)) : event.target.value;
    const field = event.target.name;
    const disc = this.props.disc;

    disc[field] = value;
    return this.setState({disc});
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  render() {
    return (
      <main className="" role="main">
        <section className="">
          <div className="">
            <DiscForm
              disc={this.props.disc}
              collections={this.state.collections}
              errors={this.state.errors}
              onSave={this.onSave}
              onChange={this.onChange}/>
          </div>
        </section>
      </main>

    );
  }
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function mapStateToProps(state, ownProps) {
  let disc = {title: '', text: '', collection: {}};
  let collections = [{id: '', title: '', description: ''}];

  if (state.discs.length && ownProps.match.params.id !== 'new'){
    disc = Object.assign({}, _.find(state.discs, x => x.id === parseInt(ownProps.match.params.id)));
  }

  if (!_.isEmpty(state.collections)){
    collections = state.collections;
  }


  return {
    disc: disc,
    collections: collections
  };


}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    collectionActions: bindActionCreators(collectionActions, dispatch),
  };
}


DiscDetail.propTypes = {
  collection: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiscDetail));
