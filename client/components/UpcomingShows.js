import React, {Component} from 'react';
import {Link} from 'react-router';
import moment from 'moment';

export default class UpcomingShows extends Component {

  _createArtistList() {
    var show = this.props.show
    let artists = this.props.show.performance
    let artistArr = artists.map(function(artist){
      return <Link to={`/artist/${artist.displayName}`} className="upcoming-show-artists">{artist.displayName}</Link>
    })
    let additionalArtists = artistArr.slice(2).map(function(artist){
      return (<span>, {artist}</span>)
    })

    return (
      <div className='upcoming-show'>
          <div className='upcoming-show-buttons'>
            {show.status !== 'ok'
              ? <div><span className="label label-danger upcoming-show-status">{show.status}</span></div>
              : <a href={this.props.show.uri} target="_blank" className="btn btn-success" role="button">BUY TICKETS</a>}
          </div>
          <div className='upcoming-show-info'>
            <div className='upcoming-show-artists'>{ artistArr[0] } { artistArr[1] ? <span> with {artistArr[1]}</span> : null } {additionalArtists}</div>
            {show.start.datetime ? <div>{moment(show.start.datetime).format('LLLL')}</div> : <div>{moment(show.start.date).format('LL')}</div>}
            <div>{show.venue.displayName}, {show.location.city}</div>
          </div>

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
