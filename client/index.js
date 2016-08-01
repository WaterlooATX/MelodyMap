import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise'
import NavBar from './components/NavBar';
import App from './containers/App';
import Artist from './components/Artist';
import Venue from './components/Venue';

import {createStore, applyMiddleware} from 'redux';

import reducers from './reducers'
//import configureStore from './store/configureStore';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)
//const store = configureStore();

// Render to DOM
ReactDOM.render(
  (<Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={browserHistory}>
          <Route path='/' component={NavBar} >
            <IndexRoute component={App} />
            <Route path="artist" component={Artist} />
            <Route path="venue" component={Venue} />
          </Route>
        </Router>
  </Provider>),
  document.getElementById('mount')
);
