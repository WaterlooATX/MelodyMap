import React, {Component} from 'react';
import {Link} from 'react-router';
import {Songkick_getVenueAPI} from '../models/api';
import Venues from '../containers/Venues';

export default class GenVenue extends Component {

  render() {
    let venue = this.props.venue

    return (
      <div className="genvenue-venue" id={`heading${venue.id}`}>
        <h1>
          <Link className = "genvenue-name-link"
              to={ `/venue/${venue.name}/${venue.id}`}
              activeClassName='active'>{venue.name}
          </Link>
        </h1>
          <div>
            <h4>
              <span id="marker"><i className="fa fa-map-marker fa-3" aria-hidden="true"></i></span>
              <a className = "venueAddress"
                   href={`http://maps.google.com/?q=${venue.address}`} target="_blank">{venue.address}
              </a>
            </h4>
          </div>
      </div>
    )
  }

}

