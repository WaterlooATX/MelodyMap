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
      searchedArtists: [],
      term: '',
      songPlayed: false,
      songButton: null
    }
  }

  _artistSearch(term) {
    const artistArry = [];
    fetchArtistsAPI(term).then((artists) => {
     const mapped = artists.data.map((artist,index) => {
        return {onTourUntil: artist.onTourUntil, name: artist.displayName, id: artist.id}
       })
     mapped.forEach((artist)=>{
       // check that aritst isnt is redux

         Spotify_searchArtistsAPI(artist).then((spotify)=>{
           if(spotify.data){
             spotify.data["onTourUntil"] = artist.onTourUntil
             artistArry.push(spotify.data)
             this._addArtistToRedux(spotify.data)
             this.setState({searchedArtists: artistArry})
           }
         })
     })
    })
  }

  _addArtistToRedux(artist) {
    // this.props.artist[artist.name] = artist
    // redux_Artists(Artist)
  }

  _handleSubmit(event) {
    event.preventDefault();
    this._artistSearch(this.state.term)
  }

  _onInputChange(term) {
    this.setState({term: term})
  }

  _artistList(){

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
          <ArtistList artistList={this._artistList()} />
          {this._SelectedArtistVSArtists()}
        </div>
      )
  }

}

class ArtistList extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }

  render() {
    return (

    )
  }

  _songPlayToggle(songPlayed, songButton) {
    this.setState({ songPlayed, songButton })
  }

  _createArtists() {
    const artists = this.props.artists
    for(let artist in artists){

      // fetchArtistsAPI(artist).then((Artist)=>{
      //   // console.log(Artist)
      //   artists[artist]['onTourUntil'] = Artist.data[0].onTourUntil
      // })
    }
    //console.log("Artists: ", artists)
    const mapped = []
    for (let artist in artists) {
      mapped.push(
        <GenArtist
          artist={artists[artist]}
          key={artist}
          name={artist}
          selectedartists={this.state.selectedartists}
          artistBlocks={this.state.artistBlocks}
          songPlayed={ this.state.songPlayed }
          songButton={ this.state.songButton }
          songPlayToggle={ this._songPlayToggle.bind(this) }
        />
      )
    }
    return mapped
  }
}

class ArtistItem extends Component {
  render() {
    return (

    )
  }
}

const mapStateToProps = (state) => {return {artists: state.artists }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Artists: redux_Artists}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Artists);
