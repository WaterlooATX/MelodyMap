import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import { Link } from 'react-router';
import NavBar from './NavBar';
import { Songkick_getVenueCalendarAPI } from '../models/api'
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
      upcomingShows: null
    }
  }

  componentDidMount() {
    this._updateVenueObj(this.props.params.venueId)
  }

  _updateVenueObj(venueId) {
    var redux_Venue = this.props.venues
    var venue = redux_Venue[this.props.params.venueId]

    if (!this.props.venues[venueId].upcomingShows) {
      Songkick_getVenueCalendarAPI(venueId).then((gotshows) => {
        redux_Venue[venue.id].upcomingShows = gotshows.data
        redux_Venues(redux_Venue)
        this.setState({upcomingShows: gotshows.data})
      })
    } else {
      this.setState({upcomingShows: redux_Venue[venue.id].upcomingShows})
    }
  }

  _displayUpcomingShows(showObjs) {
    return showObjs.map(function(show, index){
      return (<div key={index}>{show.displayName}</div>)
    })
  }


  render() {
    var props = this.props
    var venueNameURL = props.params.venueName
    var venueIdURL = props.params.venueId

    var redux_Venue = props.venues
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
          <div className="jumbotron">
            <h1>{venue.name}</h1>
            <ul>
              {venue.website ? <li>Website: <a href={`${venue.website}`} target="_blank">{`${website}`}</a></li> : null}
              {venue.address ? <li>{ `Address: ${venue.address}` }</li> : null}
              {venue.phone ? <li>{ `Phone: ${venue.phone}` }</li> : null}
              {venue.capactiy && venue.capacity !== 'N/A' ? <li>{ `Capactiy: ${venue.capactiy}` }</li> : null}
              {venue.ageRestriction && venue.ageRestriction !== 'N/A' ? <li>{ `Age Restriction: ${venue.ageRestriction}` }</li> : null}
            </ul>
            <div>
              <h2>Upcoming Shows:</h2>
              {this.state.upcomingShows ? <h3>{this._displayUpcomingShows(this.state.upcomingShows)}</h3> : 'Generating Shows:'}
            </div>
          </div>
        </div>
        <div className="media-container">
          {/* Google Places Venue */}
          <iframe
            width="600" height="450"
            src={`//www.google.com/maps/embed/v1/place?key=AIzaSyC0pNgm6l6mEWEfBNNyuDAr-wIpoHuHNew
            &q=${venueNameForMap},${venue.city}+${venue.state}
            &zoom=17`}>
          </iframe>
          {/* Google Street View Venue */}
          <iframe
            width="600" height="450"
            src={`//www.google.com/maps/embed/v1/streetview?key=AIzaSyC0pNgm6l6mEWEfBNNyuDAr-wIpoHuHNew
            &location=${venue.geo.lat},${venue.geo.long}`}>
          </iframe>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {return { venues: state.venues }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Venues: redux_Venues}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(VenueDetail);
