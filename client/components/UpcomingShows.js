import React, {Component} from 'react';
import {Link} from 'react-router';
import moment from 'moment';

export default class UpcomingShows extends Component {

  _createArtistList() {
    var show = this.props.show
    let artists = this.props.show.performance
    let artistArr = artists.map(function(artist){
      return <Link to={`/artist/${artist.displayName}`} className="upcoming-show-link">{artist.displayName}</Link>
    })
    let additionalArtists = artistArr.slice(2).map(function(artist){
      return (<span>, {artist}</span>)
    })

    return (
      <div className='upcoming-show'>
        { artistArr[0] }
        { artistArr[1] ? <span> with {artistArr[1]}</span> : null }
        {additionalArtists}
        {show.start.datetime? <div>{moment(show.start.datetime).format('LLLL')}</div> : <div>{moment(show.start.date).format('LL')}</div>}
        <div>{show.venue.displayName}, {show.location.city}</div>
        {show.status !== 'ok' ? <div><span className="label label-danger">{show.status}</span></div> : null}
      </div>
    )
  }

  render() {
    var artistList = this._createArtistList()

    return (
      <div>
        {artistList}
      </div>
    )
  }
}
