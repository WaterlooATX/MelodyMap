import {Link} from 'react-router'
import React, {Component} from 'react'

export default class DropdownArtistsTitle extends Component {

  render() {
    return this.props.venue ? this._renderVenue() : null
  }

  _doorsOpen() {
    return !this.props.doorsOpen.includes('Invalid date') ? `Doors open ${this.props.doorsOpen}` : null
  }

  _renderVenue() {
    return (
      <div className="panel-top">
        <div className="venue-marker" onClick={ this.props.onNavigateClick.bind(this) }>
          <i id="marker" className="fa fa-map-marker fa-4" aria-hidden="true"/>
        </div>
        <div id="venueName">
          <Link to={`/venue/${this.props.venue.name}/${this.props.venue.id}`} activeClassName='active'>
            {this.props.venue.name}
          </Link>
        </div>
        <div id="doorsOpen">
          {this._doorsOpen()}
        </div>
      </div>
    )
  }
}
