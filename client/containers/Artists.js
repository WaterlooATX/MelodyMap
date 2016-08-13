import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {redux_Artists} from '../actions/artists';
import SearchBar from '../components/SearchBar';
import {fetchArtistsAPI} from '../models/api';
import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI} from '../models/api'
import ArtistList from '../components/ArtistList'
import ArtistItem from '../components/ArtistItem'
import _ from 'lodash';

class Artists extends Component {

  constructor(props){
    super(props);
    this.state={
      searchedArtists: {},
      term: ''
    }
  }

  _artistSearch(term) {
    const artistArry = [];
    fetchArtistsAPI(term).then((artists) => {
      const mapped = artists.data.map(artist => {
        return {
          onTourUntil: artist.onTourUntil,
          name: artist.displayName,
          id: artist.id
        }
      })
      mapped.forEach((artist) => {
        // check that aritst isnt is redux
        Spotify_searchArtistsAPI(artist).then((spotify) => {
          if (spotify.data) {
            this.createArtistObject(spotify.data)
          }
        })
      })
    })
  }

  _createArtistObject(artist) {
    const Artists = this.props.artists
    const searchedArtists = this.state.searchedArtists
    spotify.data["onTourUntil"] = artist.onTourUntil
    searchedArtists[spotify.data.name] = spotify.data
    Artists[spotify.data.name] = spotify.data
    this.setState({searchedArtists: searchedArtists})
    redux_Artists(Artist)
  }

  _handleSubmit(event) {
    event.preventDefault();
    this._artistSearch(this.state.term)
  }

  _onInputChange(term) {
    this.setState({term: term})
  }

  _artistList(){
    if(this.state.searchedArtists.length) {
      return this.state.searchedArtists
    } else {
      return this.props.artists
    }
  }

  render() {
      return(
        <div className="container">
          <div className="page-header">
            <h1>Artists</h1>
            <form id='artist-search-bar' className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
              <input
                className="form-control"
                value={ this.state.term }
                placeholder='Search Artists'
                onChange={ event => this._onInputChange(event.target.value) }
              />
            </form>
          </div>
          {/* <ArtistList artistList={this._artistList()} /> */}
        </div>
      )
  }
}


const mapStateToProps = (state) => {return {artists: state.artists }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Artists: redux_Artists}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Artists);
