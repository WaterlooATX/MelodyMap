import React, {Component} from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import {connect} from 'react-redux';

export default class DrawMap extends Component {

  constructor(props) {
    super(props)

    this.state= {
      currMarker: null
    }
  }

  handleMarkerClick(show) {
    console.log("CLICKSHOW", show)
    this.setState({currMarker: show});
  }

  render() {
    return (
      <div>
        <GoogleMapLoader
          containerElement={ <div style={{height: '95vh'}} /> }
          googleMapElement={
            <GoogleMap defaultZoom={15} defaultCenter={{lat: this.props.location.lat, lng: this.props.location.long}} >
              {
                this.props.shows[0]
                ? this.props.shows[0].map( (show, index) => {
                  return (
                    <Marker
                      key={index}
                      position={{lat: Number(show.venue.lat), lng: Number(show.venue.lng)}}
                      title ={show.venue.displayName}
                      onClick={this.handleMarkerClick.bind(this, show)}
                    >

                    {this.state.currMarker === show
                      ?
                       <InfoWindow
                        content = {show.venue.displayName}
                        />
                      : null
                    }

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

// hey i want to set this
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchShows,fetchGeoLocation}, dispatch)
}
