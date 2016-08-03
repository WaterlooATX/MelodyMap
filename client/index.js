import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise'
import NavBar from './components/NavBar';
import App from './containers/App';
import Artists from './components/Artists';
import Venues from './components/Venues';
import ArtistDetail from './components/ArtistDetail';
import VenueDetail from './components/VenueDetail';
import NavLogin from './components/NavLogin';
import Error from './components/Error';
import User from './components/user';
import Home from './containers/Home';


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
            <IndexRoute component={Home} />
	          <Route path="artists" component={Artists} />
	          <Route path="venues" component={Venues} />
          </Route>
        </Router>
  </Provider>),
  document.getElementById('mount')
);
// {/* <Route path='/' component={NavLogin} /> */}
// <Route path='/user/:accessToken/:refreshToken' component={App}/>
// <Route path='/error:errorMsg' component={Error} />
// {/* On artist name click, route to corresponding ArtistDetail */}
//     <Route path=':id' component={ArtistDetail} />
