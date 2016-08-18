import React, {Component} from 'react'
import { GoogleMapLoader, GoogleMap, DirectionsRenderer } from 'react-google-maps'


export default class DrawNavigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      origin: {
        lat: +this.props.location.lat,
        lng: +this.props.location.long
      },
      destination: {
        lat: +this.props.selectedShow.venue.lat,
        lng: +this.props.selectedShow.venue.lng
      },
      directions: null
    }
  }

  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: this.state.origin,
      destination: this.state.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${ result }`, result);
      }
    });
  }

  render() {
    return (
      <div className="navigation-container">
        <div className="navigation-close" onClick={ this.props.onCloseNavigate.bind(this) }>
          <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
          <span className="navigation-close-text">Close Directions</span>
        </div>
        <GoogleMapLoader
          containerElement={ <div className="mapContainer" /> }
          googleMapElement={
            <GoogleMap
              defaultZoom={ 15 }
              defaultOptions={ {styles: styles, disableDefaultUI: true} }
              center={ this.state.origin }
            >
              { this.state.directions ? <DirectionsRenderer directions={ this.state.directions } /> : null }
            </GoogleMap>
          }
        />
      </div>
    )
  }

}

const styles = [{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]}]
