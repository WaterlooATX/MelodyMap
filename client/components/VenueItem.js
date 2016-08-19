import React, {Component} from 'react'
import {Link} from 'react-router';

export default class VenueItem extends Component {

  render() {
    const venue = this.props.venue
    const image = venue.photo ? venue.photo : "/assets/venue-image.jpg"
    return (
      <div className="col-md-4 gridding" id={`heading${venue.id}`}>
        <div className = "venue-label" id="selected">
        <Link
          className="venueLink"
          id="venueLink"
          to={`/venue/${venue.name}/${venue.id}`}
          activeClassName="active">
          <img className="genImage" src={image} height="105" width="105"/>
          <div className="venueNameAndMaker">
            <div className="text-center venueName">
              {venue.name}
            </div>
          </div>
        </Link>
      </div>
        <p className="text-center venueStreetAddress">{venue.city + ", " + venue.state}</p>
      </div>
    )
  }
}
