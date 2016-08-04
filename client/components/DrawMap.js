import React, {Component} from 'react'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import {getDistanceFromLatLonInKm} from "../models/getDistanceFromLatLonInKm"

export default class DrawMap extends Component {

  _findClosestShow() {
    const location = this.props.location;
    const shows = this.props.shows[0];

    if (shows) {
      let array = shows.map(show => getDistanceFromLatLonInKm(+location.lat, +location.long, +show.venue.lat, +show.venue.lng));
      let sorted = array.slice().sort((a,b) => a - b)
      return shows[array.indexOf(sorted[0])];
    } else return null;
  }

 _setCenter(){
  const locA = this.props.selectedShow;
  const locB = this._findClosestShow();
  const locC = this.props.location;
  let center;

  if (locA) center = {lat: +locA.venue.lat, lng: +locA.venue.lng};
  else if (locB) center = {lat: +locB.venue.lat, lng: +locB.venue.lng};
  else center = {lat: +locC.lat, lng: +locC.long};
  return center;
  }

  _createMarkers() {
    return this.props.shows[0].map((show, index) => {
      return ( <Marker
        key={ index }
        position={ {lat: +show.venue.lat, lng: +show.venue.lng} }
        title ={ show.venue.displayName }
        onClick={ (marker) => this._onMarkerClickHandler(marker, show) }
        defaultAnimation= { 2 }
      >
        {this.props.selectedShow === show ? <InfoWindow content={ show.displayName } /> : null }
      </Marker>
      )
    })
  }

  _onMarkerClickHandler(marker, show) {
    this._Map.panTo(marker.latLng);
    this.props.selectShow(show);
    $(`#heading${this.props.selectedShow.id}`)[0].scrollIntoView( true );
  }

  render() {
    if (this.props.location.lat) {
      return (
        <GoogleMapLoader
          containerElement={ <div className="mapContainer" /> }
          googleMapElement={
            <GoogleMap
              ref={ (map) => (this._Map = map) }
              defaultZoom={ 14 }
              defaultOptions={ {styles: styles, disableDefaultUI: true} }
              center={ this._setCenter() }
            >
              { this.props.shows[0] ? this._createMarkers.call(this) : null }
            </GoogleMap>
          }
        />
      )
    } else return null;
  }

}

var styles = [{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]}]
