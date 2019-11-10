import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';


class Home extends Component {


  constructor(props, context) {
    super(props, context);
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  componentDidMount(){
    this.props.history.push('/home');
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  render() {
    return (
      <main className="" role="main">
        <h1> Home </h1>

        <section className="">
          <div className="">
            Hello, welcome to my qualification test for <a href="https://www.passeidireto.com/"> Passei Direto </a>.
            <br/>
            More about me <a href="https://www.linkedin.com/in/felipernx/"> here </a> and
            <a href="https://github.com/rodrigues882013"> here </a>
          </div>
        </section>
      </main>

    );
  }
}

export default withRouter(Home);
