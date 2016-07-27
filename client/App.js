import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import PageOneContainer from './containers/PageOneContainer';
import PageTwo from './components/pageTwo';
import Home from './components/home';

import configureStore from './store/configureStore';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={Home} />
        <Route path='/pageone' component={PageOneContainer} />
        <Route path='/pagetwo' component={PageTwo} />
      </Router>
    </Provider>
  );
}
