import React, {Component} from 'react'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {selectShow} from '../actions/select_show'

class DrawMap extends Component {
  
  render() {
    var styles = [
      {
        stylers: [
          { hue: '#00ffe6' },
          { saturation: -20 }
        ]
      },{
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          { lightness: 100 },
          { visibility: 'simplified' }
        ]
      },{
        featureType: 'road',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      }
    ];

    if (this.props.location.lat) {
      return (
        <GoogleMapLoader
          containerElement={ <div style={{height: '95vh'}} /> }
          googleMapElement={
            <GoogleMap
              ref={ (map) => (this._Map = map) }
              defaultZoom={ 13 }
              defaultOptions={ {styles: styles} }
              center={ this._setCenter()
            }>
              { this.props.shows[0] ? this._createMarkers.call(this) : null }
            </GoogleMap>
          }
        />
      )
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

  _findClosestShow() {
    const location = this.props.location;
    const shows = this.props.shows[0];

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
       var R = 6371; // Radius of the earth in km
       var dLat = deg2rad(lat2 - lat1); // deg2rad below
       var dLon = deg2rad(lon2 - lon1);
       var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
       var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
       var d = R * c; // Distance in km
       return d;
    }

    function deg2rad(deg) {
       return deg * (Math.PI / 180)
    }

    if (shows) {
      let array = shows.map(show => getDistanceFromLatLonInKm(+location.lat, +location.long, +show.venue.lat, +show.venue.lng));
      let sorted = array.slice().sort((a,b) => a - b)
      return shows[array.indexOf(sorted[0])];
    } else return null;    
  }

  _onMarkerClickHandler(marker, show) {
    this._Map.panTo(marker.latLng);
    this.props.selectShow(show);
  }

}

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ selectShow: selectShow }, dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(DrawMap);