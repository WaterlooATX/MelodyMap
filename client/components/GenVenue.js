import React, {Component} from 'react';
import {Link} from 'react-router';
import {Songkick_getVenueAPI} from '../models/api';
import Venues from '../containers/Venues';

export default class GenVenue extends Component {

  render() {
    let venue = this.props.venue

    return (
      <div className="genvenue-venue list-group-item" id={`heading${venue.id}`}>
        <h1>
          <Link className = "genvenue-name-link"
              to={ `/venue/${venue.name}/${venue.id}`}
              activeClassName='active'>{venue.name}
          </Link>
        </h1>
        <i id="marker" className="fa fa-map-marker fa-4" aria-hidden="true"></i>
        <h4>{venue.address}</h4>
      </div>
    )
  }

}

