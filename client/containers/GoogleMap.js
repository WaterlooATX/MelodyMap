// Austin Coords: 30.2672° N, 97.7431° W
import React, {Component} from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
// import AustinJSON from '../../songkickEventsAustinJSON';
// const austinEvents = AustinJSON().resultsPage.results.event;
import {connect} from 'react-redux';



class DrawMap extends Component {
// const austinEvents = this.props.shows[0].resultsPage.results.event;

  constructor(props) {
    super(props)

    state: {

    }
  }

  render() {
    console.log('show this.props.shows in GOOGLEMAP', this.props.shows);
    return (
      <div>
        <GoogleMapLoader
          containerElement={ <div style={{height: '95vh'}} /> }
          googleMapElement={
            <GoogleMap defaultZoom={12} defaultCenter={{lat: 30.2747, lng: -97.7404}} >
              {
                this.props.shows[0]
                ? this.props.shows[0].resultsPage.results.event.map( (show, index) => {
                  return (
                    <Marker
                      position={{lat: show.venue.lat, lng: show.venue.lng}}
                      clickable={true}
                      title={"Hello"}
                    >
                      <InfoWindow

                      />
                    </Marker>
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
