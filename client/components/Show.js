import React, {Component} from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI, getArtistAlbumsAPI, Songkick_getVenueAPI, LastFM_getInfoAPI} from '../models/api';
import {selectShow} from '../actions/select_show'


export default class Show extends Component {

  constructor(props) {
    super(props)
    this.state ={
      img: "http://assets.audiomack.com/default-artist-image.jpg",
      bands : [],
      previewTrack: [],
      clicked: false,
      venueInfo: null,
      songPlay: false
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
                <i className="fa fa-volume-up  fa-3x" aria-hidden="true" type="button" onClick={this._toggleSound.bind(this)}>
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
              <Bands bands={this.state.bands} doorsOpen={props.doorsOpen} venue={props.venue} venueInfo={this.state.venueInfo} songkick={props.songkick}/>
            </div>
        </div>
      </div>
    )
  }

  _toggleSound(event) {
       var playButton = event.target;
       var parent = playButton.parentElement;
       var audioElem = parent.getElementsByTagName('audio')[0];
       if (this.state.songPlay === false) {
          playButton.className = "fa fa-pause fa-3x";
          this.setState({songPlay : true})
          audioElem.play();
       } else {
          this.setState({songPlay : false})
          playButton.className = "fa fa-volume-up fa-3x";
          audioElem.pause();
       }
    }

  _spotifyInfo(artists){
    artists.forEach(artist => {
      Spotify_searchArtistsAPI(artist.displayName).then( obj => {
        const artist = obj.data[0]
        if(artist) {
          // CHANGE only set img for head artist
          this.setState({img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"})

          let info = {
            spotifyOpen: artist.external_urls.spotify,
            id: artist.id,
            name: artist.name,
            uri: artist.uri,
            popularity: artist.popularity,
            followers: artist.followers.total,
            genres: artist.genres,
            img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"
          }
          this.setState({bands: this.state.bands.concat([info])})
        }
      })
    })
  }

  _spotifyTracks() {
    Songkick_getVenueAPI(this.props.venueID).then(venue => {
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

        LastFM_getInfoAPI(artist.name).then(info => {
          const artistData = info.data.artist
          if(artistData) {

            let bands = this.state.bands;
            bands[index].LastFM_getInfoAPI = artistData;
            this.setState({bands: bands});
          }
        })

        Spotify_getArtistTopTracksAPI(artist.id,"US").then(artistTracks => {
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
          <Band key ={index} band={band}/>
        )
      })
    }
  }

  render() {
    const bands = this._createBand()
    // create VENUE obj
    var VENUE = this.props.venueInfo
    if(VENUE) {
      const temp = {
        id: this.props.songkick.venue.id,
        ageRestriction: this.props.songkick.ageRestriction || "none",
        capacity: VENUE.capacity || 'N/A',
        street: VENUE.street,
        geo: {lat: VENUE.lat, long: VENUE.lng},
        city: VENUE.city.displayName,
        state: VENUE.city.state.displayName,
        website: VENUE.website,
        name: VENUE.displayName,
        address: `${VENUE.street} St, ${VENUE.city.displayName},${VENUE.city.state.displayName}`
      }
      VENUE = temp
    }



    return (
      <div>
        <AccordionTitle venue={VENUE} songkick={this.props.songkick} doorsOpen={this.props.doorsOpen}/>
        {bands}
      </div>
    )
  }
}
class AccordionTitle extends Component {
  render() {
    return (
      <div className="panel-top">
        <button id="rightBtn" type="button" className="btn btn-success">BUY TICKETS</button>
        <div className="marker">
          <i id="marker" className="fa fa-map-marker fa-4" aria-hidden="true"></i>
        </div>
        <div className="left">
          <div id="venueName">
            {/* Route to VenueDetails page on click of venue */}
            {this.props.venue
              ? <Link
                  to={`/venue/${this.props.venue.name}`}
                  activeClassName='active'>
                  {this.props.venue.name}
                </Link>
              : "loading"
            }
          </div>
          <div id="venueAdress">
            {this.props.venue ? this.props.venue.address : "loading"}
          </div>
        </div>
        <div className="right">
          <div id="doorsOpen">
          {`Doors open at ${this.props.doorsOpen}`}
          </div>
        </div>
      </div>
    )
  }
}

class Band extends Component {
  render() {
    const band = this.props.band;
    const Style = {
                    "borderRadius": "500px",
                    "WebkitBoxShadow": "2px 2px 5px 0px rgba(0, 0, 0, 1)",
                    "MozBoxShadow": "2px 2px 5px 0px rgba(0, 0, 0, 1)",
                    "boxShadow": "6px 6px 10px 0px rgba(0, 0, 0, 1)"
                  }
    return (
      <div>
        <div className="accordion-band">
          <div className="band-info">
            <img className="accordion-album-art img-circle" style={Style} src={band.albumArt || 'http://assets.audiomack.com/default-album-image.jpg'} alt={band.id} />
            <div className="accordion-album-band-name"><b>
              <Link
                to={`artist/${band.name}`}
                activeClassName='active'>{band.name}
              </Link>
            </b></div>
          </div>
          <div className='right popularity'>
            <div className="accordion-text">{band.LastFM_getInfoAPI ? band.LastFM_getInfoAPI.bio.content ? band.LastFM_getInfoAPI.bio.content .slice(0,225).split('/').join(' /').split('%').join('% '): "No Bio" : null}</div>
              <div className="text-center">{`Popularity ${band.popularity}`}</div>
            <div className="progress">
              <div className="progress-bar" role="progressbar" aria-valuenow={band.popularity} aria-valuemin="0" aria-valuemax="100" style={{width: `${band.popularity}%`}}></div>
            </div>
          </div>
        </div>
          <div id="accordion-album-band-name">
            <strong>
              <Link
                to={{ pathname: "/artist", query: {artist: band.name}}}
                activeClassName='active'>{band.name}
            </Link>
          </strong>
          </div>
      </div>
    )
  }
}
