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

// cron-job: make sure that upcoming show data does not persist for too long in db

class VenueDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      upcomingShows: null,
      currVenue: this.props.venues[this.props.params.venueId],
      place: null,
      photo: null,
      location: false
    }
  }

  componentDidMount() {
    this._updateVenueObj(this.props.params.venueId)
  }

  _updateVenueObj(venueId) {
    let redux_Venue = this.props.venues
    let venue = redux_Venue[this.props.params.venueId]

    if (!this.props.venues[venueId].upcomingShows.length) {
      Songkick_getVenueCalendarAPI(venueId).then((gotshows) => {
        redux_Venue[venue.id].upcomingShows = gotshows.data
        this.setState({
          upcomingShows: gotshows.data
        })
        redux_Venues(redux_Venue)
      })
    } else {
      this.setState({
        upcomingShows: redux_Venue[venue.id].upcomingShows
      })
    }
  }

  _displayUpcomingShows() {
    const showObjs = this.state.upcomingShows
    return showObjs.map(function(show, index) {
      return (<UpcomingShows show={show} key={show.id} source="VenueDetail"/>)
    })
  }

  render() {
    window.scrollTo(0, 0);

    const params = this.props.params
    const redux_Venue = this.props.venues
    const venue = redux_Venue[params.venueId]
    const venueNameForMap = venue.name.split(' ').join('+')
    // const state = this.state
    // console.log(venue.website)
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

          <div className="col-sm-offset-2 col-sm-8">
            {venue.photo ? <img className="detailImage img-circle" src={venue.photo} /> : null}
            <div className="display-title">
              <div className="display-title-name">{venue.name}</div>
            </div>
            <ul className="venue-basic-info">
              {venue.website ? <li><a href={`${venue.website}`} target="_blank">{`${venue.website}`}</a></li> : null}
              {venue.address ? <li><a href={`http://maps.google.com/?q=${venue.address}`} target="_blank">{venue.address}</a></li> : null}
              {venue.phone ? <li>{ `Phone: ${venue.phone}` }</li> : null}
              {venue.price ? <li>{ `Price: ${venue.price}` }</li> : null}
              {venue.rating ? <li>{ `Rating: ${venue.rating}` }</li> : null}
              {venue.capactiy && venue.capacity !== 'N/A' ? <li>{ `Capactiy: ${venue.capactiy}` }</li> : null}
              {venue.ageRestriction && venue.ageRestriction !== 'N/A' ? <li>{ `Age Restriction: ${venue.ageRestriction}` }</li> : null}
            </ul>
          </div>

        </div>

        <div className="container-fluid">
          <div className="row venue-detail-row">


            <div className="col-md-6">
              {/* Google Places Venue */}
              <iframe
                className="iframe-google"
                src={`//www.google.com/maps/embed/v1/place?key=${GOOGLE_PLACES_API_KEY}
                &q=${venueNameForMap},${venue.city}+${venue.state}&zoom=17`}>
              </iframe>
              {/* Google Street View Venue */}
              <iframe
                className="iframe-google"
                src={`//www.google.com/maps/embed/v1/streetview?key=${GOOGLE_PLACES_API_KEY}
                &location=${venue.geo.lat},${venue.geo.long}`}>
              </iframe>
            </div>


            <div className="col-md-6 upcoming-shows-container">
              <h1 className="page-header">Upcoming Shows</h1>
              {this.state.upcomingShows ? <div>{this._displayUpcomingShows()}</div> : 'Grabbing Shows...'}
            </div>



          </div>
        </div>
      </div>
    )
  }

}
const mapStateToProps = (state) => {return { venues: state.venues }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Venues }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(VenueDetail);
