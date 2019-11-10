import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom';
import configureStore from './store/configure.store';
import {Provider} from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';


import Layout from './components/commons/layout/index';
import Home from './components/home';
import CollectionPage from './components/collection/collection.page';
import CollectionDetail from './components/collection/collection.detail';
import DiscPage from './components/disc/disc.page';
import DiscDetail from './components/disc/disc.detail';
import 'bootstrap';
import './index.scss';


const history = createBrowserHistory();
const app = document.getElementById('app');
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home}/>
          <Route exact path="/collections" component={CollectionPage}/>
          <Route exact path="/collections/:id" component={CollectionDetail}/>
          <Route exact path="/discs" component={DiscPage}/>
          <Route exact path="/discs/:id" component={DiscDetail}/>
          <Route exact path="/home" component={Home} />
        </Layout>
      </Switch>
    </Router>
  </Provider>,
  app
);
