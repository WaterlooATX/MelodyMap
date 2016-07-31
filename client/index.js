import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise'
import App from './containers/App';
import ArtistPage from './components/ArtistPage';
import VenuePage from './components/VenuePage';

import {createStore, applyMiddleware} from 'redux';

import reducers from './reducers'
//import configureStore from './store/configureStore';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)
//const store = configureStore();

// Render to DOM
ReactDOM.render(
  (<Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={browserHistory}>
          <Route path='/' component={App} >
          </Route>
            <Route path="artistpage" component={ArtistPage} />
            <Route path="venuepage" component={VenuePage} />
        </Router>
  </Provider>),
  document.getElementById('mount')
);
