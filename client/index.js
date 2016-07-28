import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';


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
