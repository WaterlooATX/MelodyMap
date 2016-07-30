import React, {Component} from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {selectShow} from '../actions/select_show'

class DrawMap extends Component {

  constructor(props) {
    super(props)
  }

  handleMarkerClick (show) {
    this.props.selectShow(show)
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

                    {this.props.selectedShow === show
                      ?
                       <InfoWindow
                        content = {show.displayName}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectShow: selectShow}, dispatch)
}
// read / write
function mapStateToProps(state) {
  //console.log("mapStateToProps", state.shows,state.selectShow)
  return {
           shows: state.shows,
           selectedShow: state.selectedShow
         }
}
export default connect(mapStateToProps,mapDispatchToProps)(DrawMap);
