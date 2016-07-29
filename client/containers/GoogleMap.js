// Austin Coords: 30.2672° N, 97.7431° W
import React, {Component} from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
// import AustinJSON from '../../songkickEventsAustinJSON';
// const austinEvents = AustinJSON().resultsPage.results.event;
import {connect} from 'react-redux';



class DrawMap extends Component {
// const austinEvents = this.props.shows[0].resultsPage.results.event;

  render() {
    console.log('show this.props.shows in GOOGLEMAP', this.props.shows);
    return (
      <div>
        <GoogleMapLoader
          containerElement={ <div style={{height: '300px'}} /> }
          googleMapElement={
            <GoogleMap defaultZoom={12} defaultCenter={{lat: 30.307182, lng: -97.755996}} >
              {
                this.props.shows[0]
                ? this.props.shows[0].resultsPage.results.event.map( (show, index) => {
                  return (
                    <Marker
                      position={{lat: show.venue.lat, lng: show.venue.lng}}
                    />
                  );
                })
                : null
              }

            </GoogleMap>
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { shows: state.shows }
}

export default connect(mapStateToProps)(DrawMap)
