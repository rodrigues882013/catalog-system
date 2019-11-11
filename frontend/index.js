import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Layout from './components/commons/layout/index';
import Home from './components/home';
import CollectionPage from './components/collection/collection-page';
import CollectionDetail from './components/collection/collection-detail';
import CollectionDiscsPage from './components/collection/collection-discs-page';
import DiscPage from './components/disc/disc-page';
import DiscDetail from './components/disc/disc-detail';
import './index.scss';


const history = createBrowserHistory();
const app = document.getElementById('app');

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Layout>
        <Route exact path="/" component={Home}/>
        <Route exact path="/collections" component={CollectionPage}/>
        <Route exact path="/collections/:id" component={CollectionDetail}/>
        <Route exact path="/collections/:id/discs" component={CollectionDiscsPage}/>
        <Route exact path="/discs" component={DiscPage}/>
        <Route exact path="/discs/:id" component={DiscDetail}/>
        <Route exact path="/home" component={Home} />
      </Layout>
    </Switch>
  </Router>,
  app
);
