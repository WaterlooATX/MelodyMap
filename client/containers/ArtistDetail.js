import React, {Component} from 'react';
import NavBar from './NavBar';
import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI} from '../models/api';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import { Link } from 'react-router';

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
    return (
        <div>
          <div className="container">
            <div className="jumbotron">
                <img className = "detailImage img-circle" src = {this.state.artistImg}/>
                <h1>{`${this.props.params.artistName}`}</h1>
                <h3>{this.onTour(this.state.artistTour)}</h3>
                <ul>
                {this.getGenre(this.state.artistGenre)}
                </ul>
                <iframe src={`https://embed.spotify.com/follow/1/?uri=spotify:artist:${this.state.artistID}&size=basic&theme=light&show-count=0`} width="200" height="25" scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
                <p>{this.state.artistBio}</p>
            </div>
          </div>
        <div className="media-container">
          <VideoDetail video={this.state.selectedVideo} />
          <iframe src={`https://embed.spotify.com/?uri=spotify:trackset:TopTracks:${this.getTopTracks(this.state.artistTopTracks)}`} width="370px" height= "510px" frameBorder="0" allowTransparency="true"></iframe>
        </div>
          <div className="container-similar">
            <h3> Similar Artists </h3>
            <p className="text-muted credit">{this.similarArtists(this.state.artistSimliar)}</p>
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
    })
  }

filterArtist(artist){
  var artists = this.props.artists
  var shows = this.props.shows
    for(var key in artists){
      this.setState({
        artistBio: artists[artist].LastFM_getInfoAPI.bio.content,
        artistName: artists[artist].Spotify_searchArtistsAPI.name,
        artistImg: artists[artist].Spotify_searchArtistsAPI.img,
        artistID: artists[artist].Spotify_searchArtistsAPI.id,
        artistGenre: artists[artist].LastFM_getInfoAPI.tags.tag,
        artistTopTracks: artists[artist].Spotify_getArtistTopTracksAPI,
        artistSimliar: artists[artist].LastFM_getInfoAPI.similar.artist,
        artistTour: artists[artist].LastFM_getInfoAPI.ontour
      })
    }
   for(var key in shows){
   }
  }

  onTour(tour){
    if(tour === "1"){
      return <div className = "text-muted">ON TOUR NOW!</div>
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
        return <li className= "genre-item" key ={genre.url}>{genre.name}</li>
      })
    }
  }
  similarArtists(artists){
    if(!artists){
      return null
    }
    else{
      return artists.map(artist => {
        return artist.image.map(image => {
          if(image.size === "large"){
            return <div className="similar-artist">
              <img className = "img-circle" src = {image["#text"]}/>
              <Link className = "genArtist"
                        to={ `/artist/${artist.name}`}
                        activeClassName='active'>{artist.name}

              </Link>
            </div>
          }
         else{
          return null;
         }
        })
      })
    }
  }

  getTopTracks(tracks){
      if(!tracks){
        return null;
      }
      else{
      return tracks.map(track => {
        return track.id
      })
    }
  }


}


const mapStateToProps = (state) => {return {artists: state.artists, shows: state.shows}};
export default connect(mapStateToProps)(ArtistDetail);

