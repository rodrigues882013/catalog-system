import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import service from '../../services/discs.service';
import collectionService from '../../services/collections.service';


import _ from 'lodash';
import DiscForm from './disc-form';


class DiscDetail extends Component {

  constructor(props, context) {
    super(props, context);

    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      collections: [],
      disc: {title: '', text: '', collection: {}},
      errors: {}
    };
  }

  componentDidMount(){
    collectionService.list()
      .then(response => response.json())
      .then(collections => this.setState({collections}));

    if (_.has(this.props.match.params, 'id')) {
      const id = this.props.match.params.id;

      if (id !== 'create') {
        service.get(id)
          .then(response => response.json())
          .then(disc => this.setState({disc}));
      }
    }
  }

  handleFormValidation(){
    let fields = this.state .disc;
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

  onSave(event){
    event.preventDefault();

    if (this.handleFormValidation()) {
      if (!_.has(this.state.disc.collection, 'title')) {

        const disc = this.state.disc;
        disc.collection = this.state.collections[0];
        this.setState({disc});
      }

      const cb = (disc) => {
        this.setState({disc});
        this.props.history.push(`/discs`)
      };

      if (_.has(this.state.disc, 'id')) {
        const id = this.state.disc.id;
        service.update(id, this.state.disc).then(response => response.json()).then(cb);

      } else {
        service.create(this.state.disc).then(response => response.json()).then(cb);
      }
    }
  }

  onChange(event){
    const elem = event.target.name;
    const val = event.target.value;
    const collections = this.state.collections;
    const disc = this.state.disc;
    disc[elem] = _.isEqual(elem, 'collection') ? _.find(collections, x => x.id === parseInt(val)) : val;
    return this.setState({disc});
  }

  render() {
    return (
      <main className="" role="main">
        <section className="">
          <div className="">
            <DiscForm
              disc={this.state.disc}
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


export default withRouter(DiscDetail);
