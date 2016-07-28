import React from 'react';
import NavBar from './NavBar';
import Main from './Main';
import GoogleMap from '../containers/GoogleMap';

export default function App() {
  return (
    <div>
      <NavBar />
      <Main />
      <GoogleMap />
    </div>
  );
}
