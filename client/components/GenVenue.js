import React, {Component} from 'react';
import VenueItem from '../components/VenueItem';

export default class GenVenue extends Component {

  _createVenues() {
    const venues = this.props.venues
    const mapped = []
    for (let venueId in venues) {
      if (venues[venueId]) {
        mapped.push(<VenueItem venue={venues[venueId]} key={venueId} />)
      }
    }
    return mapped;
  }

  render() {
    const Venues = this._createVenues()
    return (
      <div>
        {Venues}
      </div>
    )
  }
}
