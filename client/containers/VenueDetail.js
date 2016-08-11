import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import { Link } from 'react-router';
import {venue_shows} from '../actions/venue_shows';
import NavBar from './NavBar';
import { Songkick_getVenueCalendarAPI } from '../models/api'
import _ from 'lodash';
// import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI} from '../models/api';
// import VideoList from '../components/VideoList';
// import VideoDetail from '../components/VideoDetail';
// const API_KEY = "AIzaSyAjnuL1a-NSl5B0Kw44-Sd6tgLhQ96R018"
// import YTSearch from 'youtube-api-search';

class VenueDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      upcomingShows: null
    }
  }


  componentDidMount() {
    this._getUpcomingShows(this.props.params.venueId);
  }

  _getUpcomingShows(venueId) {
    Songkick_getVenueCalendarAPI(venueId).then((gotshows) => {
      console.log('gotshows.data ' , gotshows.data);
      this.setState({upcomingShows: gotshows.data})
      venue_shows(gotshows.data)
    })
  }


  render() {
    let props = this.props
    let venueNameURL = props.params.venueName
    let venueIdURL = props.params.venueId

    let redux_Venue = props.venues
    let venue = redux_Venue[venueIdURL]

    let venueNameForMap = venue.name.split(' ').join('+')

    if (venue.website) {
      var website = venue.website.slice(7)
      if (website.charAt(website.length - 1) === '/') {
        website = website.slice(0, -1)
      }
    }

    this.state.upcomingShows ? console.log('this.state.upcomingShows ' , this.state.upcomingShows) : console.log('no shows yet');
    this.props.venueShows ? console.log("venueShows in Redux", this.props.venueShows) : console.log('noooooooo');

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

const mapStateToProps = (state) => {return {venues: state.venues, venueShows: state.venueShows}};
const mapDispatchToProps = (dispatch) => bindActionCreators({ venue_shows: venue_shows}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(VenueDetail);
