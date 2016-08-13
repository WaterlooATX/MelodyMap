import React, {Component} from 'react';
import {Link} from 'react-router';

export default class AccordionTitle extends Component {

  render() {
    return this.props.venue ? this._renderVenue() : null
  }

  _renderVenue() {
    return (
      <div className="panel-top">
        <div className="marker" onClick={ this.props.onNavigateClick.bind(this) }>
          <i id="marker" className="fa fa-map-marker fa-4" aria-hidden="true"></i>
        </div>
        <div className="left">
          <div id="venueName">
            {/* Route to VenueDetails page on click of venue */}
            { <Link to={`/venue/${this.props.venue.name}/${this.props.venue.id}`} activeClassName='active'>{this.props.venue.name}</Link> }
            <div id="venueAdress">
              { this.props.venue.address }
            </div>
              <div id="doorsOpen">
                { !this.props.doorsOpen.includes('Invalid date') ? `Doors open ${this.props.doorsOpen}` : null }
              </div>
          </div>
        </div>
      </div>
    )
  }
}
