import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import {Link} from 'react-router';
import NavBar from './NavBar';
import UpcomingShows from '../components/UpcomingShows.js'
import { Songkick_getVenueCalendarAPI, Google_placeIdAPI, Google_photoAPI } from '../models/api'
import {redux_Venues} from '../actions/actions';
import _ from 'lodash';
import {GOOGLE_PLACES_API_KEY} from '../../server/models/api_keys'

export default class VenueDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      upcomingShows: null,
      currVenue: this.props.venues[this.props.params.venueId],
      place: null,
      location: false
    }
  }

  componentDidMount() {
    this._updateVenueObj(this.props.params.venueId)
  }

  _updateVenueObj(venueId) {
      Songkick_getVenueCalendarAPI(venueId)
      .then(gotshows => {
        this.setState({upcomingShows: gotshows.data})
    }
  }

  _displayUpcomingShows() {
    const showObjs = this.state.upcomingShows
    return showObjs.map(function(show, index){
      return (<UpcomingShows show={show} key={show.id} source="VenueDetail"/>)
    })
  }

  render() {
    window.scrollTo(0, 0);

    const params = this.props.params
    const redux_Venue = this.props.venues
    const venue = redux_Venue[params.venueId]
    const venueNameForMap = venue.name.split(' ').join('+')

    // formatting for venue website link
    if (venue.website) {
      let website = venue.website.slice(7)
      if (website.charAt(website.length - 1) === '/') {
        website = website.slice(0, -1)
      }
    }

    return (
      <div>
      <div className="jumbotron venue-detail-jumbotron">
        <div className="container">
          {/* img tag to display photo from state */}
          {/* {this.state.photo ? <img width="200" height="200" src={`data:image/jpg;base64,${this.state.photo}`} />: <div>no state image yet</div>} */}
          <div className="row">
          <h1>{venue.name}</h1>
          <ul className="venue-basic-info">
            {venue.website ? <li><a href={`${venue.website}`} target="_blank">{`${venue.website}`}</a></li> : null}
            {venue.address ? <li><a href={`http://maps.google.com/?q=${venue.address}`} target="_blank">{venue.address}</a></li> : null}
            {venue.phone ? <li>{ `Phone: ${venue.phone}` }</li> : null}
            {venue.capactiy && venue.capacity !== 'N/A' ? <li>{ `Capactiy: ${venue.capactiy}` }</li> : null}
            {venue.ageRestriction && venue.ageRestriction !== 'N/A' ? <li>{ `Age Restriction: ${venue.ageRestriction}` }</li> : null}
          </ul>
          <div className="media-container venue-media">
            {/* Google Places Venue */}
            <iframe
              className=""
              width="600" height="450"
              src={`//www.google.com/maps/embed/v1/place?key=${GOOGLE_PLACES_API_KEY}
              &q=${venueNameForMap},${venue.city}+${venue.state}
              &zoom=17`}>
            </iframe>
            {/* Google Street View Venue */}
            <iframe
              className=""
              width="600" height="450"
              src={`//www.google.com/maps/embed/v1/streetview?key=${GOOGLE_PLACES_API_KEY}
              &location=${venue.geo.lat},${venue.geo.long}`}>
            </iframe>
          </div>
        </div>
      </div>
        </div>
        <div className="container">
          <div className="upcoming-shows-container">
            <h1 className="page-header upcoming-shows-header">Upcoming Shows</h1>
            {this.state.upcomingShows ? <div>{this._displayUpcomingShows()}</div> : 'Grabbing Shows...'}
          </div>
        </div>
      </div>
    )
  }
}
