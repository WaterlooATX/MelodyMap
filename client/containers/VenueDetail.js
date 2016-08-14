import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import {Link} from 'react-router';
import NavBar from './NavBar';
import UpcomingShows from '../components/UpcomingShows.js'
import { Songkick_getVenueCalendarAPI, Google_placeIdAPI } from '../models/api'
import {redux_Venues} from '../actions/venues';
import _ from 'lodash';

// cron-job: make sure that upcoming show data does not persist for too long in db

// look for it in redux state
  // if it doesn't have it, put it in redux state
  // get it off redux state

class VenueDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      upcomingShows: null,
      currVenue: this.props.venues[this.props.params.venueId],
      placeId: null
    }
  }

  componentWillMount() {
    this._updateVenueObj(this.props.params.venueId)
    this._getPlaceInfo(this.state.currVenue.name, this.state.currVenue.geo.lat, this.state.currVenue.geo.long)
    console.log('this.state.currVenue.name, this.state.currVenue.geo.lat, this.state.currVenue.geo.long ' , this.state.currVenue.name, this.state.currVenue.geo.lat, this.state.currVenue.geo.long);
  }

  _updateVenueObj(venueId) {
    var redux_Venue = this.props.venues
    var venue = redux_Venue[this.props.params.venueId]

    if (!this.props.venues[venueId].upcomingShows) {
      Songkick_getVenueCalendarAPI(venueId).then((gotshows) => {
        redux_Venue[venue.id].upcomingShows = gotshows.data
        this.setState({upcomingShows: gotshows.data})
        redux_Venues(redux_Venue)
      })
    } else {
      this.setState({upcomingShows: redux_Venue[venue.id].upcomingShows})
    }
  }

  _displayUpcomingShows() {
    const showObjs = this.state.upcomingShows
    return showObjs.map(function(show, index){
    // console.log('show ' , show);
      return (<UpcomingShows show={show} key={show.id} source="VenueDetail"/>)
    })
  }


  _formatWebsite() {
    // replace website formatting below here
  }

  _formatVenueName(name) {
    return name.split(' ').join('%20')
  }

    // use google place search
    // google place detail
    // Place Photo Requests

  _getPlaceInfo(name, lat, long) {
    let formattedName = this._formatVenueName(name)
    Google_placeIdAPI(formattedName, lat, long)
      .then((resp) => {
        console.log(resp.data)
    })
  }



  render() {
    // var props = this.props
    var venueNameURL = this.props.params.venueName
    var venueIdURL = this.props.params.venueId

    var redux_Venue = this.props.venues
    var venue = redux_Venue[venueIdURL]

    var venueNameForMap = venue.name.split(' ').join('+')

    // formatting for venue website link
    if (venue.website) {
      var website = venue.website.slice(7)
      if (website.charAt(website.length - 1) === '/') {
        website = website.slice(0, -1)
      }
    }

    return (
      <div>
        <div className="container">
          <div className="jumbotron venue-detail-jumbotron">
            <h1>{venue.name}</h1>
            <ul className="venue-basic-info">
              {venue.website ? <li>Website: <a href={`${venue.website}`} target="_blank">{`${website}`}</a></li> : null}
              {venue.address ? <li>{ `Address: ${venue.address}` }</li> : null}
              {venue.phone ? <li>{ `Phone: ${venue.phone}` }</li> : null}
              {venue.capactiy && venue.capacity !== 'N/A' ? <li>{ `Capactiy: ${venue.capactiy}` }</li> : null}
              {venue.ageRestriction && venue.ageRestriction !== 'N/A' ? <li>{ `Age Restriction: ${venue.ageRestriction}` }</li> : null}
            </ul>
            <div className="media-container venue-media">
              {/* Google Places Venue */}
              <iframe
                className=""
                width="600" height="450"
                src={`//www.google.com/maps/embed/v1/place?key=AIzaSyC0pNgm6l6mEWEfBNNyuDAr-wIpoHuHNew
                &q=${venueNameForMap},${venue.city}+${venue.state}
                &zoom=17`}>
              </iframe>
              {/* Google Street View Venue */}
              <iframe
                className=""
                width="600" height="450"
                src={`//www.google.com/maps/embed/v1/streetview?key=AIzaSyC0pNgm6l6mEWEfBNNyuDAr-wIpoHuHNew
                &location=${venue.geo.lat},${venue.geo.long}`}>
              </iframe>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="upcoming-shows-container">
                <h2>Upcoming Shows:</h2>
                {this.state.upcomingShows ? <div>{this._displayUpcomingShows()}</div> : 'Grabbing Shows...'}
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {return { venues: state.venues }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Venues: redux_Venues}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(VenueDetail);
