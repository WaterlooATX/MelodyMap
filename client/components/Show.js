import React, {Component} from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import {artistInfoAPI, artistTracksAPI, getArtistAlbumsAPI, getVenueAPI} from '../models/api';
import {selectShow} from '../actions/select_show'

export default class Show extends Component {

  constructor(props) {
    super(props)
    this.state ={
      img: "http://assets.audiomack.com/default-artist-image.jpg",
      bands : [],
      previewTrack: [],
      clicked: false,
      venueInfo: null
    }
  }

  componentDidMount() {
    // array of artist that are preforming
    // console.log(this.props.artistsNames)
    this._spotifyInfo(this.props.artists)

  }

  render() {
    const props = this.props;
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


               {this.state.previewTrack[0] ?
                <i className="fa fa-volume-up  fa-3x" aria-hidden="true" type="button" onClick={this._toggleSound}>
                <audio src={this.state.previewTrack[0].preview}>
                </audio></i> : <i className="fa fa-volume-up  fa-3x" aria-hidden="true"></i>}
               <p className="artist">{ props.artists[0].displayName }</p>
               <p className="venue">{ props.venue } - { props.city }</p>
               <p className="date">{ moment(props.startDate, "YYYY-MM-DD").calendar().split(' at')[0] }</p>
            </a>
          </h4>
        </div>
        <div id={`collapse${props.id}`} className="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading${props.id}`}>
            <div className="panel-body">
              <Bands bands={this.state.bands} venue={props.venue} venueInfo={this.state.venueInfo}/>
            </div>
        </div>
      </div>
    )
  }

  _toggleSound(event) {
       var playButton = event.target;
       var parent = playButton.parentElement;
       var audioElem = parent.getElementsByTagName('audio')[0];
       if (audioElem.paused) {
          playButton.className = "fa fa-pause fa-3x";
          audioElem.play();
       } else {
          playButton.className = "fa fa-volume-up fa-3x";
          audioElem.pause();
       }
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
    getVenueAPI("17522").then(venue => {
      this.setState({venueInfo: venue.data})
    })

    const bands = this.state.bands
    // console.log(bands)
    if(bands){
      bands.map((artist,index) => {
        getArtistAlbumsAPI(artist.id).then(albums => {
          const albumArt = albums.data.items[0].images[0].url
          if(albumArt) {
            let bands = this.state.bands;
            bands[index].albumArt = albumArt;
            this.setState({bands: bands});
          }
        })

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
      this._spotifyTracks();
      this.setState({clicked: true});
    }
  }
}

class Bands extends Component {

  _createBand() {
    const bands = this.props.bands;
    if(bands) {
      return bands
      .sort((a, b) => b.followers - a.followers)
      .map((band,index) => {
        return (
          <Band key ={index} band={band} venue={this.props.venue}/>
        )
      })
    }
  }

  render() {
    const bands = this._createBand()
    return (
      <div>
        <div className="accordion-venue">@{ this.props.venue }</div>
        {bands}
      </div>
    )
  }
}

class Band extends Component {
  render() {
    const band = this.props.band;
    // console.log('this.props.band.name' , band.name);

    return (
      <div className="accordion-band">
        {/*
        <Link
          to={{
            pathname: "/artist",
            query: {
              artist: band.name,
              spArtistId: band.id
            }
          }}
          activeClassName='active'>{band.name}
        </Link>
         Routes to VenueDetail for clicked venue 

        <div></div>


        <Link
          to={{
            pathname: "/venue",
            query: {
              venue: this.props.venue
            }
          }}
          activeClassName='active'>{this.props.venue}
        </Link>
        */}
        <img className="accordion-album-art" src={band.albumArt || 'http://assets.audiomack.com/default-album-image.jpg'} alt={band.id} height="200" width="200" />
        {/*<p>id: {band.id}</p>
        <p>uri: {band.uri}</p>

        <br></br>
        <br></br>        

        <p>popularity: {band.popularity}</p>
        <p>followers: {band.followers}</p>
        <p>genres: {band.genres}</p>*/}
        <div className="accordion-artist">{ band.name }</div>
      </div>
    )
  }
}