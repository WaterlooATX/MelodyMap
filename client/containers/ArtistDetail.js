import React, {Component} from 'react';
import NavBar from './NavBar';
import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI} from '../models/api';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'

import VideoList from '../components/VideoList';
import VideoDetail from '../components/VideoDetail';
const API_KEY = "AIzaSyAjnuL1a-NSl5B0Kw44-Sd6tgLhQ96R018"


export default class ArtistDetail extends Component {
    constructor(props){
    super(props);
    this.state = {  
      videos: [],
      selectedVideo: null
    }
  }

  componentDidMount() {
    this.videoSearch(this.props.params.artistName + "music")
    this.filterArtist(this.props.params.artistName)
  }


  render() {
    console.log(this.state.artistSimliar)
    return (
        <div>
          <div className="container">
            <div className="jumbotron">
                <img className = "detailImage img-circle" src = {this.state.artistImg}/> 
                <h1>{`${this.props.params.artistName}`}</h1>
                <h3 className = "text-muted">{this.onTour(this.state.artistTour)}</h3>
                <ul>
                {
                  this.getGenre(this.state.artistGenre)
                }
                </ul>
                <iframe src="https://embed.spotify.com/follow/1/?uri=spotify:artist:1vCWHaC5f2uS3yhpwWbIA6&size=basic&theme=light&show-count=0" width="200" height="25" scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
                <p>{this.state.artistBio}</p>
            </div>
          </div> 
        <div >
          <VideoDetail video={this.state.selectedVideo} />
          <iframe src="https://embed.spotify.com/?uri=spotify:trackset:TopTracks:5Z7ygHQo02SUrFmcgpwsKW,1x6ACsKV4UdWS2FMuPFUiT,4bi73jCM02fMpkI11Lqmfe" frameBorder="0" allowTransparency="true"></iframe>
        </div>
        <div id="footer">
          <div className="container">
            <h3> Similar Artists </h3>
            <p className="text-muted credit">{this.similarArtists(this.state.artistSimliar)}</p>
          </div>
        </div>
      </div>
    )
  }



videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
          videos: videos,
          selectedVideo: videos[0]
      })
    });
  }

filterArtist(artist){
  var artists = this.props.artists
    for(var key in artists){
      this.setState({
        artistBio: artists[artist].LastFM_getInfoAPI.bio.content,
        artistName: artists[artist].Spotify_searchArtistsAPI.name,
        artistImg: artists[artist].Spotify_searchArtistsAPI.img, 
        artistUri: artists[artist].Spotify_searchArtistsAPI.uri,
        artistGenre: artists[artist].LastFM_getInfoAPI.tags.tag,
        artistTopTracks: artists[artist].Spotify_getArtistTopTracksAPI,
        artistSimliar: artists[artist].LastFM_getInfoAPI.similar.artist,
        artistTour: artists[artist].LastFM_getInfoAPI.ontour
      })
    }
  }
onTour(tour){
  if(tour === "1"){
    return <div>ON TOUR NOW!</div>
  }
  else{
    return null
  }
}
getGenre(genres){
  if(!genres){
    return null
  }
  else{
    return genres.map(genre => {
      return <li>{genre.name}</li>
    })
  }
}
similarArtists(artists){
  if(!artists){
    return null
  }
  else{
    return artists.map(artist => {
      return <li>{artist.name}</li>
    })
  }
}

}


const mapStateToProps = (state) => {return {artists: state.artists}};
export default connect(mapStateToProps)(ArtistDetail);




// artists[artist].LastFM_getInfoAPI.image || 
