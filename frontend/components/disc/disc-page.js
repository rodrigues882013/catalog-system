import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import DiscList from './disc-list';
import service from '../../services/discs.service';
import TextInput from "../commons/text-input";


class DiscPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.onDelete = this.onDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      discs: [],
      query: ''
    };
  }

  fetchData() {
    service
      .list()
      .then(response => response.json())
      .then(discs => this.setState({discs}))
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.discs === null) this.fetchData();
  }


  onDelete(disc) {
    const id = disc.id;
    const proceed = confirm("Are you sure?");
    if (proceed) service.delete(id).then(() => this.fetchData())
  }

  onSearch() {
    const query = `?text=${this.state.query}`;
    service.search(query)
      .then(response => response.json())
      .then(discs => this.setState({discs}));
  }

  onChange(event) {
    const query = event.target.value;
    this.setState({query});
  }

  render() {
    const discs = this.state.discs;
    const element =
      discs && discs.length ? <DiscList discs={discs} onDelete={this.onDelete} hiddenDelete={false}/> :
        <div className="">
          <div className="" role="alert">
            No employee available.
          </div>
        </div>;

    return (
      <main className="" role="main">
        <h1> Discs </h1>
        <div className="flex-container-form">
          <TextInput
            id="txtQuery"
            name="query"
            label=""
            placeHolder="Type for word which you would search"
            value={this.state.query}
            onChange={this.onChange}/>
          <div>
            <a className="button search" onClick={this.onSearch}> Search </a>
          </div>
        </div>

        <div className="">
          Total of discs: {discs.length}
        </div>
        <section className="">
          {element}
        </section>
        <div className="m-t">
          <NavLink to="discs/create" className="button" > New Discs </NavLink>
        </div>
      </main>
    );
  }
}
export default withRouter(DiscPage);
