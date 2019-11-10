import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';



class Content extends Component{

    constructor(){
        super();

        this.state = {
            children: ""
        };
    }

    componentDidMount(){
        this.setChildren(this.props.children);
    }

    render() {
        return (
            <main className="main" role="main">
                <h1>Dashboard</h1>
                {this.state.children}
            </main>
        );
    }
}

export default Content;
