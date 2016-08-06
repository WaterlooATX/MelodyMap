import React, {Component} from 'react';
import NavBar from './NavBar';
import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI} from '../models/api';

import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'

import VideoList from '../components/VideoList';
import VideoDetail from '../components/VideoDetail';
const API_KEY = "AIzaSyAjnuL1a-NSl5B0Kw44-Sd6tgLhQ96R018"


export default class ArtistDetail extends Component {
    constructor(props){
    super(props);
    this.state = {
      artistUri: null,
      videos: [],
      selectedVideo: null
    }
  }

  componentDidMount() {
    this._spotifyInfo(this.props.params.artistName)
    this.videoSearch(this.props.params.artistName)
  }


  render() {
    return (
      <div>
        <div>
          {/* Display Artist */}
          <h1>
            {`${this.props.params.artistName}`}
            <iframe className = "followButton" src={`https://embed.spotify.com/follow/1/?uri=${this.state.artistUri}&size=detail&theme=light&show-count=0`}width="300" height="56" allowTransparency="true"></iframe>
            <iframe src="https://embed.spotify.com/?uri=spotify:trackset:TopTracks:5Z7ygHQo02SUrFmcgpwsKW,1x6ACsKV4UdWS2FMuPFUiT,4bi73jCM02fMpkI11Lqmfe" frameBorder="0" allowTransparency="true"></iframe>
          </h1>
          <h3>
            {`List information for a ${this.props.params.artistName} here. `}
            This will include:   
          </h3>
          <ul>
            <li>Artist Pictures</li>
            <li>Artist Bio</li>
            <li>Spofity Song Previews (3)</li>
            <li>Upcoming Shows (sortable by both proximity or date)
                This will most likely be the recycled Show/ShowList
                componenets.
            </li>
            <li>etc</li>
          </ul>
        <div>
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList
              onVideoSelect={selectedVideo => this.setState({selectedVideo})}
              videos={this.state.videos} />
        </div>
        </div>
      </div>
    )
  }




_spotifyInfo(artist){
      Spotify_searchArtistsAPI(artist).then( obj => {
        console.log(obj)
        this.setState({artistUri: obj.data[0].uri})
        return obj.data[0].id
      })
      .then(id => {
        Spotify_getArtistTopTracksAPI(id,"US").then(tracks =>{
          console.log("TRACKS",tracks)
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
}