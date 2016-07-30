import React, {Component} from 'react'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {selectShow} from '../actions/select_show'

class DrawMap extends Component {

  _createMarkers() {
    return this.props.shows[0].map((show, index) => {
      return (
        <Marker
          key={index}
          position={{lat: Number(show.venue.lat), lng: Number(show.venue.lng)}}
          title ={show.venue.displayName}
          onClick={() =>  this.props.selectShow(show)}
        >
          {this.props.selectedShow === show ? <InfoWindow content={show.displayName} /> : null }
        </Marker>
      )
    })
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={ <div style={{height: '95vh'}} /> }
        googleMapElement={
          <GoogleMap defaultZoom={15} defaultCenter={{lat: this.props.location.lat, lng: this.props.location.long}}>
            {this.props.shows[0] ? this._createMarkers() : null}
          </GoogleMap>
        }
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({selectShow: selectShow}, dispatch)

// read / write
function mapStateToProps(state) {
  return {
           shows: state.shows,
           selectedShow: state.selectedShow
         }
}
export default connect(mapStateToProps,mapDispatchToProps)(DrawMap);
