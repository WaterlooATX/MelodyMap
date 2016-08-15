import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import {Link} from 'react-router';
import NavBar from './NavBar';
import UpcomingShows from '../components/UpcomingShows.js'
import { Songkick_getVenueCalendarAPI, Google_placeIdAPI, Google_photoAPI } from '../models/api'
import {redux_Venues} from '../actions/actions';
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
      placeIdObj: null,
      placeId: null,
      photoReference: null,
      photo: null,
      location: false
    }
  }

  componentDidMount() {
    this._updateVenueObj(this.props.params.venueId)
    this._getPlaceInfo(this.state.currVenue.name, this.state.currVenue.geo.lat, this.state.currVenue.geo.long)
  }

  _updateVenueObj(venueId) {
    let redux_Venue = this.props.venues
    let venue = redux_Venue[this.props.params.venueId]

    if (!this.props.venues[venueId].upcomingShows.length) {
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
      return (<UpcomingShows show={show} key={show.id} source="VenueDetail"/>)
    })
  }

  // to encode photo data to base64
  // _base64_encode (stringToEncode) {
  //   if (typeof window !== 'undefined') {
  //     if (typeof window.btoa !== 'undefined') {
  //       return window.btoa(escape(encodeURIComponent(stringToEncode)))
  //     }
  //   } else {
  //     return new Buffer(stringToEncode).toString('base64')
  //   }

  //   var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  //   var o1
  //   var o2
  //   var o3
  //   var h1
  //   var h2
  //   var h3
  //   var h4
  //   var bits
  //   var i = 0
  //   var ac = 0
  //   var enc = ''
  //   var tmpArr = []

  //   if (!stringToEncode) {
  //     return stringToEncode
  //   }

  //   stringToEncode = unescape(encodeURIComponent(stringToEncode))

  //   do {
  //     // pack three octets into four hexets
  //     o1 = stringToEncode.charCodeAt(i++)
  //     o2 = stringToEncode.charCodeAt(i++)
  //     o3 = stringToEncode.charCodeAt(i++)

  //     bits = o1 << 16 | o2 << 8 | o3

  //     h1 = bits >> 18 & 0x3f
  //     h2 = bits >> 12 & 0x3f
  //     h3 = bits >> 6 & 0x3f
  //     h4 = bits & 0x3f

  //     // use hexets to index into b64, and append result to encoded string
  //     tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
  //   } while (i < stringToEncode.length)

  //   enc = tmpArr.join('')

  //   var r = stringToEncode.length % 3

  //   return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3)
  // }



  _getPlaceInfo(name, lat, long) {
    let formattedName = name.split(' ').join('%20')
    Google_placeIdAPI(formattedName, lat, long)
      .then((resp) => {
        if (resp.data[0] && resp.data[0].id) {
          this.setState({
            placeIdObj: resp.data[0],
            placeId: resp.data[0].id,
            photoReference: resp.data[0].photos[0].photo_reference || null
          })
          // this._getPlacePhoto(this._base64_encode(this.state.photoReference))
        }
      })
  }

  _getPlacePhoto(photoReference) {
    Google_photoAPI(photoReference)
      .then((resp) => {
        this.setState({
          photo: resp.data
        })
      })
  }

  _confirmPageLeave(){
    confirm("Are you sure you want to leave this site and head to Google Maps?") ? this.setState({location: true}) : null
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
        <div className="container">
          {/* img tag to display photo from state */}
          {/* {this.state.photo ? <img width="200" height="200" src={`data:image/jpg;base64,${this.state.photo}`} />: <div>no state image yet</div>} */}
          <div className="jumbotron venue-detail-jumbotron">
            <h1>{venue.name}</h1>
            <ul className="venue-basic-info">
              {venue.website ? <li><a href={`${venue.website}`} target="_blank">{`${venue.website}`}</a></li> : null}
              {venue.address ? <li><a onClick={this._confirmPageLeave.bind(this,null)} href={this.state.location ? `http://maps.google.com/?q=${venue.address}` : null}>{venue.address}</a></li> : null}
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
const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Venues }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(VenueDetail);
