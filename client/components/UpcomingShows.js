import React, {Component} from 'react';
import {Link} from 'react-router';
import moment from 'moment';

export default class UpcomingShows extends Component {

  _createArtistList() {
    var show = this.props.show
    let artists = this.props.show.performance
    let artistArr = artists.map(function(artist){
      return <Link to={`/artist/${artist.displayName}`} className="" key={artist.id}> {artist.displayName} </Link>
    })
    let additionalArtists = artistArr.slice(2).map(function(artist){
      return (<span key={artist.id}><a>,</a> {artist}</span>)
    })

//flexbox flex direction right
    return (
      <div className='upcoming-show'>


          <div className='upcoming-show-info'>
            <div className='upcoming-show-artists'>
              <h1>{ artistArr[0] } { artistArr[1] ? <a> with {artistArr[1]}</a> : null } {additionalArtists}</h1>
            </div>

            <div className='upcoming-show-venue-info'>
              <h3><div>{show.venue.displayName}, {show.location.city}</div></h3>
            </div>

            <div className='upcoming-show-date'>
              <h3>{show.start.datetime ?
                <div>{moment(show.start.datetime).format('LLLL')}</div> :
                <div>{moment(show.start.date).format('LL')}</div>}
              </h3>
            </div>
          </div>

          <div className='upcoming-show-buttons'>
            {show.status !== 'ok' ?
              <div><span className="label label-danger upcoming-show-status">{show.status}</span></div> :
              <a href={this.props.show.uri} target="_blank" className="btn btn-success" role="button">BUY TICKETS</a>}
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
