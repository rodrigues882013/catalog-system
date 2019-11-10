import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/collection.actions';
import _ from 'lodash';
import CollectionForm from './collection.form';



class CollectionDetail extends Component {

  constructor(props, context) {
    super(props, context);

    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      collection: this.props.collection,
      errors: {}
    };
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //
  // componentWillMount(){
  //   this.props.employeesActions.loadEmployees();
  // }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  componentWillReceiveProps(nextProps){
    if (!_.isEmpty(nextProps.collection)) {
      this.setState({collection: nextProps.collection});
    }
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;

  handleFormValidation(){
    let fields = this.props.collection;
    let formIsValid = true;
    let errors = {};

    //Title
    if(fields["title"] === ""){
      formIsValid = false;
      errors["title"] = "Title cannot be empty";
    }

    if(fields["description"] === ""){
      formIsValid = false;
      errors["description"] = "Description cannot be empty";
    }


    this.setState({errors: errors});
    return formIsValid;

  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  onChange(event){
    const field = event.target.name;
    const collection = this.props.collection;
    collection[field] = event.target.value;
    return this.setState({collection});
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  onSave(event){
    event.preventDefault();

    if (this.handleFormValidation()) {
      if (_.has(this.props.collection, 'id')) {
        this.props.actions.updateCollection(this.props.collection.id, this.props.collection, this.props.history);
      } else {
        this.props.actions.createCollection(this.props.collection, this.props.history);
      }
    }

  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  render() {
    return (
      <main className="" role="main">
        <section className="">
          <div className="">
            <CollectionForm
              collection={this.props.collection}
              formName="collectionForm"
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
  let collection = {title: '', description: ''};

  if (state.collections.length && ownProps.match.params.id !== 'new'){
    collection = Object.assign({}, _.find(state.collections, x => x.id === parseInt(ownProps.match.params.id)));
  }
  return {
    collection: collection,
  };
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}


CollectionDetail.propTypes = {
  collection: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionDetail));
