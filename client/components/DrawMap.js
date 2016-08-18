import React, {Component} from 'react'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import {getDistanceFromLatLonInKm} from "../models/getDistanceFromLatLonInKm"


export default class DrawMap extends Component {

  constructor(props) {
    super(props);

    this._Map = null;
    this.venues = props.venues;
  }

  _findClosestShow() {
    const location = this.props.location;
    const shows = this.props.shows;

    if (Array.isArray(shows)) {
      let array = shows.map(show => getDistanceFromLatLonInKm(+location.lat, +location.long, +show.venue.lat, +show.venue.lng));
      let sorted = array.slice().sort((a, b) => a - b)
      return shows[array.indexOf(sorted[0])];
    } else return null;
  }


  _getVenueInfo(show) {
    for (var key in this.venues) {
      if (key == show.venue.id) {
        return this.venues[key].address
      }
    }
  }


  _setCenter() {
    const locA = this.props.selectedShow;
    // Loc B commented out because centering map on closest show hurts UX more than it helps
    //const locB = this._findClosestShow();
    const locC = this.props.location;
    let center;

    if (locA) center = {
      lat: +locA.venue.lat,
      lng: +locA.venue.lng
    };
    // Loc B commented out because centering map on closest show hurts UX more than it helps
    //else if (locB) center = {lat: +locB.venue.lat, lng: +locB.venue.lng};
    else center = {
      lat: +locC.lat,
      lng: +locC.long
    };
    return center;
  }

  _createMarkers() {
    if (Array.isArray(this.props.shows)) {
      return this.props.shows.map((show, index) => {
        // for(var key in this.venues){
        //   // console.log("VENUEID SHOW",show.venue.id)
        //   // console.log("KEY",key)
        //   if(key == show.venue.id){
        //     console.log("KEY",key, "VENUE ID",show.venue.id)
        // }
        // }

        return (
          <Marker
            key={ index }
            position={ {lat: +show.venue.lat, lng: +show.venue.lng} }
            title ={ show.venue.displayName }
            onClick={ (marker) => this._onMarkerClickHandler(marker, show) }
            defaultAnimation= { 2 }
           >

            { this.props.selectedShow === show ?
              <InfoWindow maxWidth = { 300 }>
                <div id="iw-container">
                  <div className="iw-title">{ show.venue.displayName }</div>
                  <div className="iw-content">
                    <div className="iw-subTitle">{show.performance[0].displayName}</div>
                    <div className="iw-address">{ this._getVenueInfo(show) }</div>
                    <a onClick={ this.props.onNavigateClick.bind(this) }>(Directions to here)</a>
                  </div>
                </div>
              </InfoWindow> : null }
          </Marker>
        )
      })
    }
  }

  _onMarkerClickHandler(marker, show) {
    this._Map.panTo(marker.latLng);
    this.props.selectShow(show);
    $(`#heading${show.id}`)[0].scrollIntoView( true );
  }

  render() {
    if (this.props.location.lat) {
      return (
        <GoogleMapLoader
          containerElement={ <div className="mapContainer" /> }
          googleMapElement={
            <GoogleMap
              ref={ (map) => (this._Map = map) }
              zoomControl = "true"
              defaultZoom={ 14 }
              defaultOptions={ {styles: styles, disableDefaultUI: true} }
              center={ this._setCenter() }
            >
              { this.props.shows ? this._createMarkers.call(this) : null }
            </GoogleMap>
          }
        />
      )
    } else return null;
  }

}

var styles = [{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]}]
