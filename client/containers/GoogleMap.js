// Austin Coords: 30.2672° N, 97.7431° W

import React from 'react';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';


export default (props) => {
  return (
    <GoogleMapLoader
      containerElement={ <div style={{height: '100%'}} /> }
      googleMapElement={
        <GoogleMap defaultZoom={12} defaultCenter={{lat: 30.2672, lng: 97.7431}} />
      }
      />
  );
}