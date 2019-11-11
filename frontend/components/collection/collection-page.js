import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import CollectionsList from './collections-list';
import service from '../../services/collections.service';

class CollectionPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      collections: []
    }
  }

  fetchData() {
    service.list()
      .then(response => response.json())
      .then(collections => this.setState({collections}))
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.collections === null) {
      this.fetchData();
    }
  }

  render() {
    const collections = this.state.collections;
    const element =
      collections && collections.length ? <CollectionsList collections={collections} /> :
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
        <div className="m-t">
          <NavLink to="collections/create" className="button" > New Collection </NavLink>
        </div>
      </main>

    );

  }
}

export default withRouter(CollectionPage);
