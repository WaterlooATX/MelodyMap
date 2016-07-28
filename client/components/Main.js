import React from 'react';
import ShowList from '../containers/ShowList';
import GoogleMap from '../containers/GoogleMap';


export default function Main() {
  return (
    <div className="container-fluid text-center">
      <div className="row content">
        <div className="col-sm-8 text-left">
          <ShowList />
        </div>
        <div className="col-sm-4 sidenav">
          <GoogleMap />
        </div>
      </div>
    </div>
  );
}
