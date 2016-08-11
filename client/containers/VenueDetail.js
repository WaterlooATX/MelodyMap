import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import { Link } from 'react-router';
import NavBar from './NavBar';
import { Songkick_getVenueCalendarAPI } from '../models/api'
import {redux_Venues} from '../actions/venues';
import _ from 'lodash';

// make sure that upcoming show data does not persist for too long in server

// check if venue.upcomingShows === null
  // if it is, make API call
    // .then call and set to state
  // else, read from state

class VenueDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // upcomingShows: null
    }
  }


  componentDidMount() {
  }

  _getUpcomingShows(venueId) {
    Songkick_getVenueCalendarAPI(venueId).then((gotshows) => {
      // this.setState({upcomingShows: gotshows.data})
      this.props.venues[this.props.params.venueId].upcomingShows = gotshows;
      redux_Venues(this.props.venues)
    })
  }

  _updateVenueObj(venueId) {
    if (!this.props.venues[this.props.params.venueId].upcomingShows) {
      Songkick_getVenueCalendarAPI(venueId).then((gotshows) => {
      // this.setState({upcomingShows: gotshows.data})
        this.props.venues[this.props.params.venueId].upcomingShows = gotshows.data;
        redux_Venues(this.props.venues)
      console.log('this.props.venues ' , this.props.venues);
      console.log('this.props.venues[this.props.params.venueId].upcomingShows ' , this.props.venues[this.props.params.venueId].upcomingShows);
      })
    }
    // else {
    //   this.setState({upcomingShows: venue.upcomingShows})
    // }
    // return this.state.upcomingShows;
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


    this._updateVenueObj(venue.id);


    // this.props.venueShows ? console.log("venueShows in Redux", this.props.venueShows) : console.log('noooooooo');
    // this.state.upcomingShows ? console.log('this.state.upcomingShows ' , this.state.upcomingShows) : console.log('no shows yet');
    venue.upcomingShows ? console.log('redux upcoming venues' , venue.upcomingShows): console.log('null')

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
            <h3>Upcoming Shows:
            </h3>
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
