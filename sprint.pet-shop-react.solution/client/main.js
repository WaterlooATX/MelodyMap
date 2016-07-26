// React package that deals with DOM interactions
import ReactDOM from 'react-dom';

// React package for constructing components (and all non-DOM related actions)
import React from 'react';


// Import parent app component
import App from './components/app.solution';

// Render that component to the DOM!
ReactDOM.render(<App />, document.getElementById('app'));
