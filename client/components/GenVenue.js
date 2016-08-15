import React, {Component} from 'react';
import {Link} from 'react-router';
import {Songkick_getVenueAPI} from '../models/api';
import Venues from '../containers/Venues';

export default class GenVenue extends Component {
  constructor(props){
    super(props)
    this.state={
      location: false,
    }
  }

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
        <h4><a className = "venueAddress" 
               onClick={this._confirmPageLeave.bind(this,null)} 
               href={this.state.location ? `http://maps.google.com/?q=${venue.address}` : null}>{venue.address}
              <i id="marker" className="fa fa-map-marker fa-4" aria-hidden="true"></i>
            </a>
        </h4>
      </div>
    )
  }


  _confirmPageLeave(){
    confirm("Are you sure you want to leave this site and head to Google Maps?") ? this.setState({location: true}) : null
  }

}

