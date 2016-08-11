import React, {Component} from 'react';
import {Link} from 'react-router';
import {Songkick_getVenueAPI} from '../models/api';
import Venues from '../containers/Venues';

export default class GenVenue extends Component {

  render() {
    let venue = this.props.venue

    return (
      <div className="panel-heading" role="tab" id={`heading${venue.id}`}>
          <div>
            <h1>
              <Link className = "genArtist"
                  to={ `/venue/${venue.name}/${venue.id}`}
                  activeClassName='active'>{venue.name}
              </Link>
            </h1>
            <h4>{'Upcoming Shows: Show them around here'}</h4>
          </div>
      </div>
    )
  }

}

