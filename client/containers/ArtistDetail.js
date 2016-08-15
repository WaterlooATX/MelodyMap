import React, {Component} from 'react';
import NavBar from './NavBar';
import {Songkick_getArtistCalendarAPI, Songkick_getSimilarArtistsAPI, fetchArtistsAPI, Spotify_searchArtistsAPI} from '../models/api';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import {Link} from 'react-router';
import {getAlbumArt, topTrack, getBio} from '../models/helpers'

import VideoList from '../components/VideoList';
import VideoDetail from '../components/VideoDetail';
const API_KEY = "AIzaSyAjnuL1a-NSl5B0Kw44-Sd6tgLhQ96R018"


export default class ArtistDetail extends Component {

  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      bio: '',
      artistBlocks: []
    }
  }
  componentDidMount() {
    this._videoSearch(this.props.params.artistName)
    this._getArtist(this.props.params.artistName)
  }

  componentWillReceiveProps() {
    this._videoSearch(this.props.params.artistName)
  }


  render() {
    return (
        <div>
          <div className="container">
            <div className="jumbotron">
                <img className = "detailImage img-circle" src = {this.state.artistImg}/>
                <h1>{`${this.props.params.artistName}`}</h1>
                <h3>{this._onTour(this.state.artistTour)}</h3>
                <ul>
                {this._getGenre(this.state.artistGenre)}
                </ul>
                <iframe src={`https://embed.spotify.com/follow/1/?uri=spotify:artist:${this.state.artistID}&size=basic&theme=light&show-count=0`} width="200" height="25" scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
                {this.state.artistBio !== "" ? <div>{this.state.artistBio}  <div id="bio" className="collapse">{this.state.bio}</div></div> :
                <p> The music sails alive with the compelling combination of rich
                layers among mixed styles of rhythm that hit the soul.
                By melding hook-filled melody within hard and heavy beats,
                has the ability to compact a vast array of influence and experience
                into a singular song</p>}
                <button type="button" className="btn btn-info" data-toggle="collapse" data-target="#bio">Show More</button>
            </div>
          </div>
        {this.state.artistShows ? <div className = "upcoming-shows"> <h3>Upcoming Shows</h3>
        <div className="scrollable-menu">{this._getShows(this.state.artistShows)} </div></div>: null}
        <div className="media-container">
          <VideoDetail video={this.state.selectedVideo} />
          <iframe src={`https://embed.spotify.com/?uri=spotify:trackset:TopTracks:${this._getTopTracks(this.state.artistTopTracks)}`} width="370px" height= "510px" frameBorder="0" allowTransparency="true"></iframe>
        </div>
          <div className="container-similar">
            <p className="text-muted credit">{this._similarArtists(this.state.artistSimilar)}</p>
          </div>
      </div>
    )
  }



_videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
          videos: videos,
          selectedVideo: videos[0]
      })
    })
  }

  _onTour(tour){
    if(tour === "1"){
      return <div className = "text-muted">ON TOUR NOW!</div>
    }
    else{
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

  _similarArtists(artists){
    if(!artists){
      return null
    }
    else{
      return artists.map(artist => {
        return artist.image.map(image => {
          if(image.size === "large"){
            if(image["#text"] === ""){
              return <div className='similar-artist'>
                <img className ="img-circle" src = "http://assets.audiomack.com/default-artist-image.jpg" />
                <Link className ="genArtist"
                        to={ `/artist/${artist.name}`}
                                activeClassName='active'>{artist.name}

                </Link>
                </div>
            }
            else{
            return <div className="similar-artist">
              <img className = "img-circle" src = {image["#text"]}/>
              <Link className = "genArtist"
                        to={ `/artist/${artist.name}`}
                        activeClassName='active'>{artist.name}

              </Link>
            </div>
          }
          }
         else{
          return null;
         }
        })
      })
    }
  }

  _getTopTracks(tracks){
      if(!tracks){
        return null;
      }
      else{
      return tracks.map(track => {
        return track.id
      })
    }
  }

  _getShows(shows){
    if(!shows){
      return null;
    }
    else{
      return shows.map(show => {
        return <div className="list-group">
          <div className = "list-group-item" key ={show.id}>
          <p>{show.displayName}</p>
          <p>{show.location.city}</p>
          </div>
          <div></div>
        </div>
      })
    }
  }

  _getArtist(artist){
    let artistsArr = []
      fetchArtistsAPI(artist).then(data => {
        var mapped = data.data.map(artistData => {
        return { name:artistData.displayName, id:artistData.id }
        })
      mapped.forEach((artist)=>{
      Spotify_searchArtistsAPI(artist).then((spotify)=>{
        if(spotify.data){
          this.setState({
        artistBio: getBio(spotify.data.fullBio),
        artistName: spotify.data.name,
        artistImg: spotify.data.img,
        artistID: spotify.data.id,
        artistGenre: spotify.data.genre,
        artistTopTracks: spotify.data.topTracks,
        artistTour: spotify.data.onTour,
        artistSimilar: spotify.data.relatedArtists[0].artist
      })

          artistsArr.push(spotify.data)
          this.setState({artistBlocks: artistsArr})
        }
      })
     })
    })
  }

}

const mapStateToProps = (state) => {return {artists: state.artists}};
export default connect(mapStateToProps)(ArtistDetail);
