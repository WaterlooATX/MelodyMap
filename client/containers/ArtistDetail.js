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
      artistUri: null,
      artistImg: null,
      videos: [],
      selectedVideo: null
    }
  }

  componentDidMount() {
    this._spotifyInfo(this.props.params.artistName)
    this.videoSearch(this.props.params.artistName)
    this.filterArtist(this.props.params.artistName)
  }


  render() {
    return (
        <div>
          <div className="container">
            <div className="jumbotron">
                <h1>{`${this.props.params.artistName}`}</h1>
                <iframe src="https://embed.spotify.com/follow/1/?uri=spotify:artist:1vCWHaC5f2uS3yhpwWbIA6&size=basic&theme=light&show-count=0" width="200" height="25" scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
                <img src = {this.state.artistImg}/>
            </div>
          </div> 
          <h3>
            <iframe src="https://embed.spotify.com/?uri=spotify:trackset:TopTracks:5Z7ygHQo02SUrFmcgpwsKW,1x6ACsKV4UdWS2FMuPFUiT,4bi73jCM02fMpkI11Lqmfe" frameBorder="0" allowTransparency="true"></iframe>
          </h3>
        <div>
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList
              onVideoSelect={selectedVideo => this.setState({selectedVideo})}
              videos={this.state.videos} />
        </div>
      </div>
    )
  }




_spotifyInfo(artist){
      Spotify_searchArtistsAPI(artist).then( obj => {
        this.setState({artistUri: obj.data[0].uri})
        this.setState({artistImg: obj.data[0].images[0].url})
        return obj.data[0].id
      })
      .then(id => {
        Spotify_getArtistTopTracksAPI(id,"US").then(tracks =>{
        })
      })
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
      console.log("KEY", artists[key])
      console.log("Artist", artist)
    }
  }
}


const mapStateToProps = (state) => {return {artists: state.artists }};
export default connect(mapStateToProps)(ArtistDetail);

