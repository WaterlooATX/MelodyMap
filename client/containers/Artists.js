import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import GenArtist from '../components/GenArtist';
import {redux_Artists} from '../actions/artists';
import SearchBar from '../components/SearchBar';
import SelectedArtist from '../components/SelectedArtist'
import {fetchArtistsAPI} from '../models/api';
import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI} from '../models/api'

import _ from 'lodash';

class Artists extends Component {

  constructor(props){
    super(props);
    this.state={
      artistBlocks: [],
    }
  }

  _artistSearch(term){
    fetchArtistsAPI(term).then((artists) => {
      console.log("artists: ", artists.data)
       artists.data.map((artist, index) => {
          const Artists = artists.data
        Spotify_searchArtistsAPI(artist.displayName).then((spotify)=>{
          Artists[index]["spotify"] = spotify.data;
          spotify.data.map((track,i)=>{
             Spotify_getArtistTopTracksAPI(track.id, "US").then((tracks)=>{
              Artists[index]["tracks"] = tracks.data;
              this.setState({
                artistBlocks: Artists,
              })
             })           
          })
        });
      })

    })
  }

  render(){
    const artistSearch = _.debounce((term) => {this._artistSearch(term)}, 300)
    const Artists = this._createArtists()
      return(
        <div className="container">
          <div className="col col-md-1"></div>
            <div className="page-header">
              <h1>Artists</h1>
              <SearchBar onSearchTermChange={artistSearch}/>
            </div>
            {!this.state.artistBlocks.length ? 
              <div className='container'>
                {Artists}
              </div>
            :
              <div className='container'>
                <SelectedArtist artists={this.state.artistBlocks}/>
              </div>
            }
          <div className="col col-md-1"></div>
        </div>
      )
  }

  _createArtists(){
    const artists = this.props.artists
    const mapped = []
    for(let artist in artists) {
      mapped.push(<GenArtist artist={artists[artist]} key={artist} name={artist} selectedArtists={this.state.selectedArtists} artistBlocks={this.state.artistBlocks}/>)
    }
    return mapped
  }
}


const mapStateToProps = (state) => {return {artists: state.artists }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Artists: redux_Artists}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Artists);
