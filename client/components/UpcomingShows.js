import React, {Component} from 'react';
import {Link} from 'react-router';
import moment from 'moment';

export default class UpcomingShows extends Component {

  componentWillMount() {
  }

  _createArtistList() {
    var show = this.props.show
    let artists = this.props.show.performance
    let artistArr = artists.map(function(artist){
      return <Link to={`/artist/${artist.displayName}`} className="upcoming-show-link">{artist.displayName}</Link>
    })
    let additionalArtists = artistArr.slice(2).map(function(artist){
      return (<span>, {artist}</span>)
    })

    // let othersArr = [];

    // if (artistArr.length > 2) {
    //   for (let i = 2; i < artistArr.length; i++) {
    //     othersArr.push(<span>, {artistArr[i]}</span>);
    //   }
    // }

    return (
      <div className='upcoming-show'>
        { artistArr[0] }
        { artistArr[1] ? <span> with {artistArr[1]}</span> : null }
        {additionalArtists}
        {show.start.datetime? <div>{moment(show.start.datetime).calendar()}</div> : <div>{momemt(show.start.date).calendar()}</div>}
        <div>{show.venue.displayName}, {show.location.city}</div>
        {show.status !== 'ok' ? <div>show.status</div> : null}
      </div>
    )


    // if (artistArr.length >= 1) {
    //   var artistString = `${<Link to={`/artist/${artistArr[0]}`} activeClassName='active'>{artistArr[0]}</Link>}`
    //   if (artistArr.length >= 2) {
    //     artistString += ` with ${<Link to={`/artist/${artistArr[1]}`} activeClassName='active'>{artistArr[1]}</Link>}`
    //     if (artistArr.length >= 3) {
    //       var additionalArtists = artistArr.slice(2)
    //       additionalArtists.forEach(function(artist) {
    //         artistString += `, ${<Link to={`/artist/${artist}`} activeClassName='active'>{artist}</Link>}`
    //       })
    //     }
    //   }
  }

  render() {
    // var show = this.props.show
    // var source = this.props.source
    // var artists = this.props.show.performance

    var artistList = this._createArtistList()
    console.log('artistList ' , artistList);

    return (
      <div>{artistList}</div>
    )
  }

}

          // <div>
          //   <h1>
          //     <Link className = "genArtist"
          //         to={ `/venue/${venue.name}/${venue.id}`}
          //         activeClassName='active'>{venue.name}
          //     </Link>
          //   </h1>
          //   <h4>{'Upcoming Shows: Show them around here'}</h4>
          // </div>