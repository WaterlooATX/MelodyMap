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
      term: ''
    }
  }

  _artistSearch(term) {
    console.log("_artistSearch")
    fetchArtistsAPI(term).then((artists) => {
      artists.data.map((artist,index) => {
        const Artists = artists.data
        Spotify_searchArtistsAPI(artist.displayName).then((spotify) => {
          Artists[index]["spotify"] = spotify.data;
          spotify.data.map((track,i) => {
            Spotify_getArtistTopTracksAPI(track.id, "US").then((tracks) => {
              Artists[index]["tracks"] = tracks.data;
              this.setState({artistBlocks: Artists})
            })
          })
        });
      })
    })
  }

  _handleSubmit(event) {
    console.log("submit")
    event.preventDefault();
    this._artistSearch(this.state.term)
  }
  _onInputChange(term) {
    console.log(term)
    this.setState({term: term})
  }

  render() {
      return(
        <div className="container">
          <div className="col col-md-1"></div>
            <div className="page-header">
              <h1>Artists</h1>
              <div id='artist-search-bar'>
                <input
                  className="form-control"
                  value={ this.state.term }
                  placeholder='Search Venues'
                  onChange={ event => this._onInputChange(event.target.value) }

                  />
              </div>
              {/* <SearchBar onSearchTermChange={this._searchInput.bind(this)} onSubmit={this._handleSubmit}/> */}
            </div>
            <div className='container'>
              {this._SelectedArtistVSArtists()}
            </div>
          <div className="col col-md-1"></div>
        </div>
      )
  }

  _SelectedArtistVSArtists() {
    if(this.state.artistBlocks.length) {
      return <SelectedArtist artists={this.state.artistBlocks}/>
    } else {
      return this._createArtists()
    }
  }

  _createArtists() {
    const artists = this.props.artists
    const mapped = []
    for (let artist in artists) {
      mapped.push(
        <GenArtist
          artist={artists[artist]}
          key={artist}
          name={artist}
          selectedartists={this.state.selectedartists}
          artistblocks={this.state.artistblocks}/>
      )
    }
    return mapped
  }
}


const mapStateToProps = (state) => {return {artists: state.artists }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Artists: redux_Artists}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Artists);
