import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {redux_Artists} from '../actions/actions'
import {fetchArtistsAPI, Spotify_searchArtistsAPI} from '../models/api'
import ArtistList from '../components/ArtistList'
import {isReduxLoaded} from '../models/helpers'
import _ from 'lodash'

class Artists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchedArtists: {},
      term: '',
      notFound: false,
      showError: false,
    }
  }

  _artistSearch(term) {
    this.setState({searchedArtists: {}})
    fetchArtistsAPI(term).then(artists => {
      if(artists.data.length){
        this.setState({notFound: false, showError: false})
        var mappedArtists;
        mappedArtists = this._mapData(artists)
        mappedArtists.forEach(artist => this._isInRedux(artist) ? this._getRedux(artist) : this._spotifySearch(artist));
      } else{
         this.setState({notFound: true, showError: true})
      }
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
    event.preventDefault()
    this._artistSearch(this.state.term)
  }

  _onInputChange(term) {
    this.setState({
      term: term
    })
  }

  _errorFade(){
    var This = this;
     setTimeout(function(){
        This.setState({notFound: false, showError: false});
        $('#artist-search-bar').find('input').val('');
      }, 3000)
  }

  _artistList() {
    return isReduxLoaded(this.state.searchedArtists) ? this.state.searchedArtists : this.props.artists
  }

  _artistForm() {
    if(this.state.notFound) {
      return <p className='searchError'>Search Not Found</p>
    } else return (
      <form name='artistForm' id='artist-search-bar' className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
       <input
         className="form-control"
         value={this.state.term}
         placeholder='Search Artists'
         onChange={ event => this._onInputChange(event.target.value) }
       />
     </form>
    )
  }

  render() {
    this.state.showError ? this._errorFade() : null
      return(
        <div>
          <div className="container">
            <div className="row">
                <div className="page-header artists-header">
                    <div className="artist-title">Artists</div>
                    {this._artistForm()}
                </div>
            </div>
            <div className="ArtistList">
              <ArtistList artists={this._artistList()} />
            </div>
            <br/>
          </div>
            <footer className='footer'>
              <div className='container songkickFoot'>
                <h5 className='songkickEndorse'>Brought to you by SongKick and Spotify</h5>
              </div>
            </footer>
        </div>
      )
   }
}

const mapStateToProps = (state) => {return {artists: state.artists }}
const mapDispatchToProps = (dispatch) => bindActionCreators({redux_Artists}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Artists)
