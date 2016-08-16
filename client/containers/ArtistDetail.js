import React, {Component} from 'react';
import NavBar from './NavBar';
import {Songkick_getArtistCalendarAPI, fetchArtistsAPI, Spotify_searchArtistsAPI} from '../models/api';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import {Link} from 'react-router';
import UpcomingShows from '../components/UpcomingShows'
import {getAlbumArt, topTrack, getBio, getArtistImg} from '../models/helpers'
import VideoDetail from '../components/VideoDetail';
import {redux_Artists} from '../actions/actions';

const API_KEY = "AIzaSyAjnuL1a-NSl5B0Kw44-Sd6tgLhQ96R018"

class ArtistDetail extends Component {

  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      shows : null,
      artist: null
    }
  }

  componentDidMount() {
    this.setState({artist: this._getArtist(this.props.params.artistName)})
  }

  componentWillReceiveProps(){
    this.setState({artist: this._getArtist(this.props.params.artistName)})
  }

  _render(artist){
    return (
      <div>
        <div className="jumbotron">
          <div className="col-sm-offset-2 col-sm-8">
            <img className="detailImage img-circle" src={getArtistImg(artist)}/>
            <div className="artistDetail-title">
              <div className="artistDetail-name">{`${artist.name}`}</div>
              <div className="artistDetail-ontour">{this._onTour(artist.onTour)}</div>
             {this.props.spotifyUser.accessToken ? <div className="artistDetail-followButton"><iframe src={`https://embed.spotify.com/follow/1/?uri=spotify:artist:${artist.id}&size=basic&theme=light&show-count=0`} width="200" height="25" scrolling="no" frameBorder="0" allowTransparency="true"></iframe></div> : null}
            </div>
            <div className="artistDetail-bio">
              {getBio(artist)}
            </div>
          </div>
        </div>
        <div className="col-sm-offset-2 col-sm-8">
          {this._isShow(this.state.shows)}
          <div className="media-container">
            <VideoDetail video={this.state.selectedVideo} />
          </div>
            {this._similarArtists(artist.relatedArtists)}
        </div>
      </div>
    )
  }

  _isShow(show){
    if(show) {
      return (
        <div className = "upcoming-shows">
          <h3>Upcoming Shows</h3>
          <div className="scrollable-menu">
            {this._getShows(this.state.shows)}
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    if(this.state.artist) {
      return this._render(this.state.artist)
    } else {
      return <div>Loading</div>
    }
  }

  _videoSearch(term) {
    YTSearch({
      key: API_KEY,
      term: term
    }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    })
  }

  _onTour(tour){
    if(tour === "1"){
      return "ON TOUR"
    }else{
      return null
    }
  }

  _getGenre(genres){
    if(!genres){
      return null
    }
    else{
      return genres.map(genre => {
        return <li className= "genre-item" key ={genre.url}>{genre.name}</li>
      })
    }
  }

  _similarArtistsImg(img) {
    if(img["#text"] === "") {
      return "http://assets.audiomack.com/default-artist-image.jpg"
    } else {
      return img["#text"]
    }
  }

  _similarArtists(artists) {
      if (!artists) {
          return null
      } else {
        const mapped = artists[0].artist.map(artist => {
          return {name: artist.name, image: this._similarArtistsImg(artist.image[1])}
        })
        return mapped.map(artist => {
          return (
            <div className="similar-artist" key={artist.name}>
                <img className="img-circle" src={artist.image}/>
                <Link
                    className="text-center"
                    to={`/artist/${artist.name}`}
                    activeClassName="active">{artist.name}
                </Link>
            </div>
          )
        })
      }
  }

  _getTopTracks(tracks) {
    if (!tracks) {
      return null;
    } else {
      return tracks.map(track => track.id)
    }
  }

  _getShows(shows) {
      if (!shows) {
          return null;
      } else {
          return shows.map(show => {
              return <UpcomingShows show={show} key={show.id} source="VenueDetail"/>
          })
      }
  }

  _isAristInRedux(name) {
    return this.props.artists[name] ? true : false
  }

  _getArtistCalendar(id) {
    Songkick_getArtistCalendarAPI(id).then(shows => {
      this.setState({shows: shows.data})
    })
  }

  _addArtistToRedux(artist) {
    const artists = this.props.artists
    artists[artist.name] = artist
    this._getArtistCalendar(artists[artist.name].songKickID)
    // update redux state with new artist
    this.setState({artist: artists[artist.name]})
    redux_Artists(artists)
    return artists[artist.name]
  }

  _getArtist(name) {
    this._videoSearch(name)
    // all arist can be redux state, but similar-artist
    if (this._isAristInRedux(name)) {
      this._getArtistCalendar(this.props.artists[name].songKickID)
      return this.props.artists[name]
    } else {
      fetchArtistsAPI(name).then(artist => {
          return artist.data[0].id
        })
        .then(id => {
          Spotify_searchArtistsAPI({
            name: name,
            id: id
          }).then(artistInfo => {
            return this._addArtistToRedux(artistInfo.data)
          })
        })
    }
  }
}
const mapStateToProps = (state) => {return {artists: state.artists, spotifyUser: state.spotifyUser }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Artists: redux_Artists}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail);
