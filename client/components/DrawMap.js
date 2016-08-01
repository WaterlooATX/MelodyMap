import React, {Component} from 'react'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {selectShow} from '../actions/select_show'

class DrawMap extends Component {

 _setCenter(){
   let locA = this.props.selectedShow
   let locB = this.props.location
    return (
      locA ?
      {lat: +locA.venue.lat, lng: +locA.venue.lng} :
      {lat: +locB.lat, lng: +locB.long}
      )
  }

  _createMarkers() {
    return this.props.shows[0].map((show, index) => {
      return (

        <Marker
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
    this._googleMapComponent.panTo(marker.latLng);
    this.props.selectShow(show);
  }

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
              ref={ (map) => (this._googleMapComponent = map) }
              defaultZoom={ 14 }
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

}

const mapDispatchToProps = (dispatch) => bindActionCreators({ selectShow: selectShow }, dispatch)

// read / write
function mapStateToProps(state) {
  return {
           shows: state.shows,
           selectedShow: state.selectedShow
         }
}
export default connect(mapStateToProps,mapDispatchToProps)(DrawMap);
