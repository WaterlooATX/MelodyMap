import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {redux_Artists} from '../actions/actions';
import {fetchArtistsAPI, Spotify_searchArtistsAPI} from '../models/api'
import ArtistList from '../components/ArtistList'
import {isReduxLoaded} from '../models/helpers'
import _ from 'lodash';

class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedArtists: {},
      term: ''
    }
  }

  _artistSearch(term) {
    this.setState({searchedArtists: {}})
    fetchArtistsAPI(term).then(artists => {
      const mappedArtists = this._mapData(artists)
      mappedArtists.forEach(artist => this._isInRedux(artist) ? this._getRedux(artist) : this._spotifySearch(artist))
    })
  }

  _spotifySearch(artist) {
    Spotify_searchArtistsAPI(artist).then(spotify => {
      if (spotify.data) {
        this._addRedux(spotify.data, artist)
      }
    })
  }

  _isInRedux(artist) {
    if (this.props.artists && !this.props.artists[artist.name]) {
      return false
    } else {
      return true
    }
  }

  _mapData(artists) {
    return artists.data.map(artist => {
      return {
        onTourUntil: artist.onTourUntil,
        name: artist.displayName,
        id: artist.id
      }
    })
  }

  _getRedux(artist) {
    const searchedArtists = this.state.searchedArtists
    searchedArtists[artist.name] = this.props.artists[artist.name]
    this.setState({
      searchedArtists: searchedArtists
    })
  }

  _addRedux(spotify, artist) {
    const Artists = this.props.artists
    const searchedArtists = this.state.searchedArtists
    spotify["onTourUntil"] = artist.onTourUntil
    searchedArtists[spotify.name] = spotify
    Artists[spotify.name] = spotify
    this.setState({
      searchedArtists: searchedArtists
    })
    redux_Artists(Artists)
  }

  _handleSubmit(event) {
    event.preventDefault();
    this._artistSearch(this.state.term)
  }

  _onInputChange(term) {
    this.setState({
      term: term
    })
  }

  _artistList() {
    return isReduxLoaded(this.state.searchedArtists) ? this.state.searchedArtists : this.props.artists
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
          <ArtistList artists={this._artistList()} />
        </div>
      )
   }
}

const mapStateToProps = (state) => {return {artists: state.artists }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Artists: redux_Artists}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Artists);
