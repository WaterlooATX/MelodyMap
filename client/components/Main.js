import React from 'react';
import ShowList from './ShowList';
import GoogleMap from './GoogleMap';


export default function Main(props) {
  return (
    <div className="container-fluid text-center">
      <div className="row content">
        <div className="col-sm-8 text-left Main">
          <ShowList shows={props.shows} location={props.location}/>
        </div>
        <div className="col-sm-4 sidenav">
          <GoogleMap shows={props.shows} location={props.location}/>
        </div>
      </div>
    </div>
  );
}
