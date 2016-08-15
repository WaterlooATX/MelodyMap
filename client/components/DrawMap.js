import React, {Component} from 'react'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import {getDistanceFromLatLonInKm} from "../models/getDistanceFromLatLonInKm"

const DrawMap = (props) => {
  let _Map;
  
  function _findClosestShow() {
    const location = props.location;
    const shows = props.shows;

    if (Array.isArray(shows)) {
      let array = shows.map(show => getDistanceFromLatLonInKm(+location.lat, +location.long, +show.venue.lat, +show.venue.lng));
      let sorted = array.slice().sort((a,b) => a - b)
      return shows[array.indexOf(sorted[0])];
    } else return null;
  }

  function _setCenter(){
    const locA = props.selectedShow;
    // Loc B commented out because centering map on closest show hurts UX more than it helps
    //const locB = _findClosestShow();
    const locC = props.location;
    let center;

    if (locA) center = {lat: +locA.venue.lat, lng: +locA.venue.lng};
    // Loc B commented out because centering map on closest show hurts UX more than it helps
    //else if (locB) center = {lat: +locB.venue.lat, lng: +locB.venue.lng};
    else center = {lat: +locC.lat, lng: +locC.long};
    return center;
  }

  function _createMarkers() {
    if (Array.isArray(props.shows)) {
      return props.shows.map((show, index) => {
         props.venues.map(venue => {
          console.log("Venues", venue)
        return (
          <Marker
            key={ index }
            position={ {lat: +show.venue.lat, lng: +show.venue.lng} }
            title ={ show.venue.displayName }
            onClick={ (marker) => _onMarkerClickHandler(marker, show) }
            defaultAnimation= { 2 }
           >
            {props.selectedShow === show ? <InfoWindow maxWidth = {800}><div id="iw-container">
                    <div className="iw-title">{show.performance[0].displayName}</div>
                    <div className="iw-content">
                      <div className="iw-subTitle">{show.venue.displayName}</div>
                      <div className="iw-subTitle">Contacts</div>
                      <p>VISTA ALEGRE ATLANTIS, SA 3830-292 Ílhavo - Portugal
                      Phone. +351 234 320 600 e-mail: geral@vaa.pt www: www.myvistaalegre.com</p>
                    </div>  
                  <a onClick={ props.onNavigateClick.bind(this) }>(Directions to here)</a></div></InfoWindow> : null }
                    <div className="iw-bottom-gradient"></div>
         </Marker>
        )
        })
      })
    }
  }

  function _onMarkerClickHandler(marker, show) {
    _Map.panTo(marker.latLng);
    props.selectShow(show);
    $(`#heading${show.id}`)[0].scrollIntoView( true );
  }

  if (props.location.lat) {
    return (
      <GoogleMapLoader
        containerElement={ <div className="mapContainer" /> }
        googleMapElement={
          <GoogleMap
            ref={ (map) => (_Map = map) }
            zoomControl = "true"
            defaultZoom={ 14 }
            defaultOptions={ {styles: styles, disableDefaultUI: true} }
            center={ _setCenter() }
          >
            { props.shows ? _createMarkers.call(this) : null }
          </GoogleMap>
        }
      />
    )
  } else return null;

}

export default DrawMap;

var styles = [{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]}]
