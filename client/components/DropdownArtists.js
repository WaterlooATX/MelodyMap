import React, {Component} from 'react'
import DropdownArtistTitle from './DropdownArtistTitle'
import DropdownArtist from './DropdownArtist'

export default class DropdownArtists extends Component {

  _createBand() {
    const bands = this.props.bands;
    if(bands) {
      return bands
      //.sort((a, b) => b.followers - a.followers)
      .map((artist,index) => {
        return (
          <DropdownArtist key ={index} name={artist} artists={this.props.artists}/>
        )
      })
    }
  }

  _venueLoading() {
    return (
      <a id="rightBtn" href="" className="btn btn-success" target="_blank" role="button">Loading</a>
    )
  }

  _venue() {
    return (
      <a id="rightBtn" href={this.props.songkick.uri} target="_blank" className="btn btn-success" role="button">BUY TICKETS</a>
    )
  }

  _createVenueObj() {
    let reduxVenues = this.props.venues
    let venueID = this.props.venueID
    let venue = this.props.venueInfo

    if (!reduxVenues[venueID]) {

      if(venue) {
        // Build venue entry in redux state
        reduxVenues[venueID] = {
          id: venue.id,
          ageRestriction: this.props.songkick.ageRestriction || 'N/A',
          capacity: venue.capacity || 'N/A',
          street: venue.street,
          geo: {lat: venue.lat, long: venue.lng},
          city: venue.city.displayName,
          state: venue.city.state.displayName,
          website: venue.website,
          name: venue.displayName,
          address: `${venue.street} St, ${venue.city.displayName}, ${venue.city.state.displayName}`,
          phone: venue.phone,
          upcomingShows: null
        }
        // add to redux venues
        //redux_Venues(reduxVenues)
        return reduxVenues[venueID]
      }
    } else {
      return reduxVenues[venueID];
    }
  }

  render() {
    const bands = this._createBand()
    const venue = this._createVenueObj()
    return (
      <div>
        <DropdownArtistTitle
          venue={ venue }
          songkick={ this.props.songkick }
          doorsOpen={ this.props.doorsOpen }
          onNavigateClick={ this.props.onNavigateClick }
        />
        { this.props.artists ? bands : null }
        {this.props.venue ? this._venue(): this._venueLoading()}
      </div>
    )
  }

}
