import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import discService from '../../services/discs.service';
import _ from "lodash";
import DiscList from "../disc/disc-list";

class CollectionDiscsPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      collection: {},
      discs: []
    }
  }

  fetchData() {
    if (_.has(this.props.match.params, 'id')) {
      const id = this.props.match.params.id;
      const parameter = `?collectionId=${id}`;

      discService.search(parameter)
        .then(response => response.json())
        .then(discs => this.setState({discs}));
    }
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
    const discs = this.state.discs;
    const element =
      discs && discs.length ? <DiscList discs={discs} hiddenDelete={true} onDelete={this.onDelete}/> :
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
            {/*Total of discs: {discs.length}*/}
          </div>
        </div>
        <section className="">
          {element}
        </section>
      </main>
    );
  }
}

export default withRouter(CollectionDiscsPage);
