import React, {Component} from 'react';
import moment from 'moment';
import {artistInfoAPI, artistTracksAPI} from '../models/api';
import { Link } from 'react-router';

export default class Show extends Component {

  constructor(props) {
    super(props)
    this.state ={
      img: "http://assets.audiomack.com/default-artist-image.jpg",
      bands : [],
      previewTrack: [],
      clicked: false
    }
  }


  componentDidMount() {
    // array of artist that are preforming
    this._spotifyInfo(this.props.artists)
  }

  render() {
    const props = this.props
    return (
      <div>
        <div className="panel-heading" role="tab" id={`heading${props.id}`}>
          <h4 className="panel-title">
            <a
              className={this._checkSelected(props.selected)}
              onClick={this._onClickHandler.bind(this)}
              role="button" data-toggle="collapse"
              data-parent="#accordion"
              href={`#collapse${props.id}`}
              aria-expanded="true"
              aria-controls={`collapse${props.id}`}
            >
              <img src={this.state.img} alt={props.id} height="65" width="65"/>
               <p className="artist">{ props.artists[0].displayName }</p>
               <p className="venue">{ props.venu } - { props.city }</p>
               <p className="date">{ moment(props.startDate, "YYYY-MM-DD").calendar().split(' at')[0] }</p>
            </a>
          </h4>
        </div>
        <div id={`collapse${props.id}`} className="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading${props.id}`}>
            <div className="panel-body">
              <Bands bands={this.state.bands}/>
            </div>
        </div>
      </div>
    )
  }

  _spotifyInfo(artists){
    // arrayvar: this.state.arrayvar.concat([newelement])
    artists.forEach(artist => {
      artistInfoAPI(artist.displayName).then( obj => {
        const artist = obj.data[0]
        if(artist) {
          this.setState({img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"})

          let info = {
            id: artist.id,
            name: artist.name,
            uri: artist.uri,
            popularity: artist.popularity,
            followers: artist.followers.total,
            genres: artist.genres,
            img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"
          }
          this.setState({bands: this.state.bands.concat([info])})
          return artist.id
        }
      })
    })
  }

  _spotifyTracks() {
    const bands = this.state.bands
    console.log(bands)
    if(bands){
      bands.map(artist => {
        artistTracksAPI(artist.id,"US").then(artistTracks => {
          const track = artistTracks.data.tracks[0]
          if(track) {
            let topTrack = {
              preview : track.preview_url ? track.preview_url : "http://i.imgur.com/nszu54A.jpg",
              album: track.album.name,
              trackName: track.name
            }
            this.setState({previewTrack: this.state.previewTrack.concat([topTrack])})
          }
        })
      })
    }
  }

  // Tests selected show in redux state and conditionally sets
  // inline style property for show list item if it is selected show
  _checkSelected(propsSelected) {
    return (propsSelected) ? "active list-group-item" : "list-group-item";
  }

  // Sends the show's id back to the parent (ShowList.js) on click
  _onClickHandler(event) {
    event.preventDefault();
    this.props.sendToState(this.props.id);
    // get tracks only on click
    if(!this.state.clicked) {
      this._spotifyTracks()
      this.setState({clicked: true})
    }
  }
}

class Bands extends Component {

  _createBand() {
    if(this.props.bands) {
      return this.props.bands.map((band,index) => {
        return (
          <Band key ={index} band={band}/>
        )
      })
    }
  }

  render() {
    const bands = this._createBand()
    return (
      <div>
        {bands}
      </div>
    )
  }
}

class Band extends Component {
  render() {
    const band = this.props.band
    return (
      <div>
        <p>id: {band.id}</p>
        <p>name: {band.name}</p>
        <p>uri: {band.uri}</p>
        <p>popularity: {band.popularity}</p>
        <p>followers: {band.followers}</p>
        <p>genres: {band.genres}</p>
        <br/>
      </div>
    )
  }
}
