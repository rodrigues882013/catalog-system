import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';
import CollectionForm from './collection-form';
import service from "../../services/collections.service";
import discService from '../../services/discs.service';

class CollectionDetail extends Component {

  constructor(props, context) {
    super(props, context);

    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      collection: {title: '', description: ''},
      discs: [],
      errors: {}
    };
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  componentDidMount(){

    if (_.has(this.props.match.params, 'id')) {
      const id = this.props.match.params.id;

      if (id !== 'create') {
        service.get(id)
          .then(response => response.json())
          .then(collection => this.setState({collection}));

        const parameter = `?collectionId=${id}`;
        discService.search(parameter)
          .then(response => response.json())
          .then(discs => this.setState({discs}));
      }
    }
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;

  handleFormValidation(){
    let fields = this.state.collection;
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
    const collection = this.state.collection;
    collection[field] = event.target.value;
    return this.setState({collection});
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  onSave(event){
    event.preventDefault();

    if (this.handleFormValidation()) {
      if (_.has(this.state.collection, 'id')) {
        const id = this.state.collection.id;

        service.update(id, this.state.collection)
          .then(response => response.json())
          .then(collection => this.setState({collection}))

      } else {
        service.create(this.state.collection)
          .then(response => response.json())
          .then(collection => {
            this.setState({collection});
            this.props.history.push(`/collections`);
          })
      }
    }

  }

  render() {
    return (
      <main className="" role="main">
        <section className="">
          <div className="">
            <CollectionForm
              collection={this.state.collection}
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

export default withRouter(CollectionDetail);
