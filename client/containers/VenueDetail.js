import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import { Link } from 'react-router';
import NavBar from './NavBar';

import _ from 'lodash';
// import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI} from '../models/api';
// import VideoList from '../components/VideoList';
// import VideoDetail from '../components/VideoDetail';
// const API_KEY = "AIzaSyAjnuL1a-NSl5B0Kw44-Sd6tgLhQ96R018"
// import YTSearch from 'youtube-api-search';


export default class VenueDetail extends Component {


  componentDidMount() {
    // this.videoSearch(this.props.params.artistName + "music")
    // this.filterArtist(this.props.params.artistName)
  }


  render() {
    let props = this.props
    let venueNameURL = props.params.venueName
    let venueIdURL = props.params.venueId
    let redux_Venue = props.venues
    let venue = redux_Venue[venueIdURL]

    let description = venue.description

    let venueNameForUrl = venue.name.split(' ').join('+')

    return (
        <div>
          <div className="container">
            <div className="jumbotron">

                <h1>{`This name from redux: ${venue.name}`}</h1>
                <h3>{`This ID from redux: ${venue.id}`}</h3>
                <h3>{`This description from redux: ${description}`}</h3>

                <ul>
                  artist genre
                </ul>
                <p>artist bio</p>
            </div>
          </div>
          <div className="media-container">
            // Google Place Venue
            <iframe
              width="600" height="450"
              src={`//www.google.com/maps/embed/v1/place?key=AIzaSyC0pNgm6l6mEWEfBNNyuDAr-wIpoHuHNew
              &q=${venueNameForUrl},${venue.city}+${venue.state}
              &zoom=17`}>
            </iframe>
          </div>
          <div className="container-similar">
            <h3> Similar Artists </h3>
            <p className="text-muted credit">similar artists list</p>
          </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {return {artists: state.artists, shows: state.shows, venues: state.venues}};
export default connect(mapStateToProps)(VenueDetail);



// videoSearch(term){
//   YTSearch({key: API_KEY, term: term}, (videos) => {
//     this.setState({
//         videos: videos,
//         selectedVideo: videos[0]
//     })
//   });
// }

// filterArtist(artist){
//   var artists = this.props.artists
//   var shows = this.props.shows
//     for(var key in artists){
//       this.setState({
//         artistBio: artists[artist].LastFM_getInfoAPI.bio.content,
//         artistName: artists[artist].Spotify_searchArtistsAPI.name,
//         artistImg: artists[artist].Spotify_searchArtistsAPI.img,
//         artistUri: artists[artist].Spotify_searchArtistsAPI.uri,
//         artistGenre: artists[artist].LastFM_getInfoAPI.tags.tag,
//         artistTopTracks: artists[artist].Spotify_getArtistTopTracksAPI,
//         artistSimliar: artists[artist].LastFM_getInfoAPI.similar.artist,
//         artistTour: artists[artist].LastFM_getInfoAPI.ontour
//       })
//     }
//    for(var key in shows){
//    }
//   }

  // onTour(tour){
  //   if(tour === "1"){
  //     return <div className = "text-muted">ON TOUR NOW!</div>
  //   }
  //   else{
  //     return null
  //   }
  // }
  // getGenre(genres){
  //   if(!genres){
  //     return null
  //   }
  //   else{
  //     return genres.map(genre => {
  //       return <li className= "genre-item" key ={genre.url}>{genre.name}</li>
  //     })
  //   }
  // }
  // similarArtists(artists){
  //   if(!artists){
  //     return null
  //   }
  //   else{
  //     return artists.map(artist => {
  //       return artist.image.map(image => {
  //         if(image.size === "large"){
  //           return <div className="similar-artist">
  //             <img className = "img-circle" src = {image["#text"]}/>
  //             <Link className = "genArtist"
  //                       to={ `/artist/${artist.name}`}
  //                       activeClassName='active'>{artist.name}

  //             </Link>
  //           </div>
  //         }
  //        else{
  //         return null;
  //        }
  //       })
  //     })
  //   }
  // }

  // getTopTracks(tracks){
  //     if(!tracks){
  //       return null;
  //     }
  //     else{
  //     return tracks.map(track => {
  //       return track.id
  //     })
  //   }
  // }






// export default class VenueDetail extends Component {
//   render() {
//     return (
//       <div>
//         <div>
//           <h1>
//             {`${this.props.params.venueName}`}
//           </h1>
//           <h3>
//             List information for a given venue here.
//             This will include:
//           </h3>
//           <ul>
//             <li>Venue Pictures</li>
//             <li>Venue Description (if available)</li>
//             <li>Upcoming Shows (sortable by both proximity or date)
//                 This will most likely be the recycled Show/ShowList
//                 componenets.
//             </li>
//             <li>etc</li>
//           </ul>
//         </div>
//       </div>
//     )
//   }
// }