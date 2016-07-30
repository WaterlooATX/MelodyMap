import React from 'react';
import ShowList from './ShowList';
import DrawMap from './DrawMap';


export default function Main(props) {
  console.log('main props', props);
  return (
    <div className="container-fluid text-center">
      <div className="row content">
        <div className="col-sm-8 text-left Main">
          <ShowList shows={props.shows} location={props.location} />
        </div>
        <div className="col-sm-4 sidenav">
          <DrawMap shows={props.shows} location={props.location} selectedShow={props.selectedShow} />
        </div>
      </div>
    </div>
  );
}
