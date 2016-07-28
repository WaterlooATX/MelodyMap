import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App'

// import PageOneContainer from './containers/PageOneContainer';
// import PageTwo from './components/pageTwo';
// import Home from './components/home';

import configureStore from './store/configureStore';

const store = configureStore();

// Render to DOM
ReactDOM.render(
  (<Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' component={App} />
        </Router>
  </Provider>),
  document.getElementById('mount')
);
