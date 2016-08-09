import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import { Link } from 'react-router';
import moment from 'moment';
import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI, getArtistAlbumsAPI, Songkick_getVenueAPI, LastFM_getInfoAPI} from '../models/api';
import {selectShow} from '../actions/select_show'
import {redux_Artists} from '../actions/artists'
import {redux_Venues} from '../actions/venues'


class Show extends Component {

  constructor(props) {
    super(props)
    this.state ={
      img: "http://assets.audiomack.com/default-artist-image.jpg",
      bands : [],
      previewTrack: null,
      clicked: false,
      venueInfo: null,
      songPlay: false
    }
  }

  componentDidMount() {
    // array of artist that are preforming
    this._spotifyInfo(this.props.showArtists)
  }

  render() {
    const props = this.props, track = this.state.previewTrack;
    return (
      <div className="panel panel-default">
        <div className="panel-heading" role="tab" id={`heading${props.id}`}>
          <h4 className="panel-title">
            <a
              className={this._checkSelected(props.selected)}
              onClick={this._onClickHandler.bind(this, `heading${props.id}`)}
              role="button" data-toggle="collapse"
              data-parent="#accordion"
              href={`#collapse${props.id}`}
              aria-expanded="true"
              aria-controls={`collapse${props.id}`}
            >
              <img src={this.state.img} alt={props.id} height="65" width="65"/>
              {track ? this._speaker(track) : null}
               <p className="artist">{ props.showArtists[0].displayName }</p>
               <p className="venue">{ props.venue } - { props.city }</p>
               <p className="date">{ moment(props.startDate, "YYYY-MM-DD").calendar().split(' at')[0] }</p>
            </a>
          </h4>
        </div>
        <div id={`collapse${props.id}`} data-parent="#accordion" className="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading${props.id}`}>
            <div className="panel-body">
              <Bands
                venues={ this.props.venues}
                bands={ this.state.bands }
                doorsOpen={ this._doorsOpen() }
                venue={ props.venue }
                venueInfo={ this.state.venueInfo }
                songkick={ props.songkick }
                artists={ this.props.artists }
                onNavigateClick={ this.props.onNavigateClick }
              />
            </div>
        </div>
      </div>
    )
  }

  _speaker(track) {
    return (
      <i className="speaker fa fa-volume-up fa-3x" id="speaker" aria-hidden="true" type="button" onClick={this._toggleSound.bind(this)}>
        <audio src={track}></audio>
      </i>
    )
  }

  _doorsOpen() {
    // doorsOpen variable set to display pretty date with moment.js
    let doorsOpen = new Date(this.props.startDate).toISOString();
    doorsOpen = doorsOpen.split(/[T\.]/);
    doorsOpen[1] = this.props.doorsOpen;
    doorsOpen = moment(doorsOpen[0].concat('T').concat(doorsOpen[1]).concat('.').concat(doorsOpen[2])).calendar();
    return doorsOpen
  }

  _spotifyInfo(showArtists){
    let reduxArtists = this.props.artists
    Songkick_getVenueAPI(this.props.venueID).then(venue => this.setState({venueInfo: venue.data}))
    let count = 0
    let countRedux = 0
    let bandMembers = []
    showArtists.forEach(Artist => {

      bandMembers.push(Artist.displayName)
      count++
       if(count === showArtists.length) {
         this.setState({bands: bandMembers})
       }

       if(!reduxArtists[Artist.displayName]){
        reduxArtists[Artist.displayName] = {}

        Spotify_searchArtistsAPI(Artist.displayName).then( obj => { // async
          const artist = obj.data[0]
          if(artist) {

            // CHANGE only set img for head artist
            this.setState({img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"})
            let Spotify_searchArtistsAPI = {
              spotifyOpen: artist.external_urls.spotify,
              id: artist.id,
              displayName: Artist.displayName,
              name: artist.name,
              uri: artist.uri,
              popularity: artist.popularity,
              followers: artist.followers.total,
              genres: artist.genres,
              img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"
            }

            reduxArtists[Artist.displayName]["Spotify_searchArtistsAPI"] = Spotify_searchArtistsAPI

            let spotify = Spotify_searchArtistsAPI
            getArtistAlbumsAPI(spotify.id)
              .then(albums => {
                reduxArtists[Artist.displayName]["getArtistAlbumsAPI"] = albums.data ? albums.data : null
              })
              .catch(reduxArtists[Artist.displayName]["getArtistAlbumsAPI"] = null)

            LastFM_getInfoAPI(spotify.name)
              .then(info => {
                reduxArtists[Artist.displayName]["LastFM_getInfoAPI"] = info.data.artist ? info.data.artist : null
              })
              .catch(reduxArtists[Artist.displayName]["LastFM_getInfoAPI"] = null)

            Spotify_getArtistTopTracksAPI(spotify.id,"US")
              .then(artistTracks => {

                reduxArtists[Artist.displayName]["Spotify_getArtistTopTracksAPI"] = artistTracks.data.tracks ? artistTracks.data.tracks : null
                if(this.state.bands[0]) {
                  let headliner = this.state.bands[0]
                  let artist = this.props.artists[headliner]
                  if(artist) {
                    this.setState({previewTrack: artist.Spotify_getArtistTopTracksAPI ? (artist.Spotify_getArtistTopTracksAPI[0] ? artist.Spotify_getArtistTopTracksAPI[0].preview_url : null) : null})
                  }
                }
              })
              .catch(reduxArtists[Artist.displayName]["Spotify_getArtistTopTracksAPI"] = null)

          } else {
            reduxArtists[Artist.displayName]["Spotify_searchArtistsAPI"] = null
            LastFM_getInfoAPI(Artist.displayName)
              .then(info => {
                reduxArtists[Artist.displayName]["LastFM_getInfoAPI"] = info.data.artist ? info.data.artist : null
              })
              .catch(reduxArtists[Artist.displayName]["LastFM_getInfoAPI"] = null)
          }
        })
      } else {
        countRedux++
        // artist exists in redux
        let artist = reduxArtists[Artist.displayName]
        if(countRedux === 1) {
          if(artist.Spotify_searchArtistsAPI) {
            this.setState({img : artist.Spotify_searchArtistsAPI.img})
          }
          this.setState({previewTrack: artist.Spotify_getArtistTopTracksAPI ? (artist.Spotify_getArtistTopTracksAPI[0] ? artist.Spotify_getArtistTopTracksAPI[0].preview_url : null) : null})
        }
      }
    })

    // update redux artist
    redux_Artists(reduxArtists)
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


  // Tests selected show in redux state and conditionally sets
  // inline style property for show list item if it is selected show
  _checkSelected(propsSelected) {
    return (propsSelected) ? "active list-group-item" : "list-group-item";
  }

  // Sends the show's id back to the parent (ShowList.js) on click
  _onClickHandler(DOMString, event) {
    event.preventDefault();
    this.props.sendToState(this.props.id);
    // get tracks only on click
    if(!this.state.clicked) {
      this.setState({clicked: true});
    }
    $(`#${DOMString}`)[0].scrollIntoView( true );
  }
}

class Bands extends Component {

  _createBand() {
    const bands = this.props.bands;
    if(bands) {
      return bands
      //.sort((a, b) => b.followers - a.followers)
      .map((artist,index) => {
        return (
          <Band key ={index} artistName={artist} artists={this.props.artists}/>
        )
      })
    }
  }

  _venueLoading() {
    return (
      <a id="rightBtn" href="" className="btn btn-success" target="_blank" role="button">Loading</a>
    )
  }

  _venue() {
    return (
      <a id="rightBtn" href={this.props.songkick.uri} target="_blank" className="btn btn-success" role="button">BUY TICKETS</a>
    )
  }

  _createVenueObj() {
    let reduxVenues = this.props.venues
    // console.log('this.props.venues ' , this.props.venues);
    let venue = this.props.venueInfo

    if(venue) {
      reduxVenues[venue.id] = {
        id: venue.id,
        ageRestriction: this.props.songkick.ageRestriction || "none",
        capacity: venue.capacity || 'N/A',
        street: venue.street,
        geo: {lat: venue.lat, long: venue.lng},
        city: venue.city.displayName,
        state: venue.city.state.displayName,
        website: venue.website,
        name: venue.displayName,
        address: `${venue.street} St, ${venue.city.displayName}, ${venue.city.state.displayName}`
      }
    }
    redux_Venues(reduxVenues)
    return venue
  }

  render() {
    const bands = this._createBand()
    const venue = this._createVenueObj()
    return (
      <div>
        <AccordionTitle
          venue={venue}
          songkick={this.props.songkick}
          doorsOpen={this.props.doorsOpen}
          onNavigateClick={ this.props.onNavigateClick }
        />
        {bands}
        {this.props.venue ? this._venue(): this._venueLoading()}
      </div>
    )
  }

}

class AccordionTitle extends Component {

  render() {
    return this.props.venue ? this._renderVenue() : null
  }

  _renderVenue() {
    return (
      <div className="panel-top">
        <div className="marker" onClick={ this.props.onNavigateClick.bind(this) }>
          <i id="marker" className="fa fa-map-marker fa-4" aria-hidden="true"></i>
        </div>
        <div className="left">
          <div id="venueName">
            {/* Route to VenueDetails page on click of venue */}
            { <Link to={`/venue/${this.props.venue.name}`} activeClassName='active'>{this.props.venue.name}</Link> }
            <div id="venueAdress">
              { this.props.venue.address }
            </div>
              <div id="doorsOpen">
                { !this.props.doorsOpen.includes('Invalid date') ? `Doors open ${this.props.doorsOpen}` : null }
              </div>
          </div>
        </div>
      </div>
    )
  }

}

class Band extends Component {
  constructor(props) {
    super(props)
    this.state = {
       albumArt: null
    }
  }

  componentWillMount() {
    this._randomAlbumArt()
  }

  _randomAlbumArt() {
    const artists = this.props.artists
    const artistName = this.props.artistName;
    const artist = artists[artistName]
    const albumArt =  artist.getArtistAlbumsAPI
    if(albumArt) {
      let num = albumArt.items.length
      this.setState({albumArt: albumArt.items[Math.floor(Math.random() * num)].images[1].url})
    }
  }

  render() {

    const randomBio = "The music sails alive with the compelling combination of rich layers among mixed styles of rhythm that hit the soul. By melding hook-filled melody within hard and heavy beats, has the ability to compact a vast array of influence and experience into a singular song"
    const artists = this.props.artists
    const artistName = this.props.artistName;
    const artist = artists[artistName]
    let albumArt = this.state.albumArt ? this.state.albumArt : artist.getArtistAlbumsAPI ? artist.getArtistAlbumsAPI.items[0].images[1].url : 'http://assets.audiomack.com/default-album-image.jpg'
    const popularity = artist.Spotify_searchArtistsAPI ? artist.Spotify_searchArtistsAPI.popularity : 'N/A'
    const bio = artist.LastFM_getInfoAPI ? artist.LastFM_getInfoAPI.bio.content ? artist.LastFM_getInfoAPI.bio.content.slice(0,225).split('/').join(' /').split('%').join('% ').split('<a')[0] : randomBio : null

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
            <img className="accordion-album-art img-circle" style={Style} src={albumArt} alt={artistName} onMouseOver={this._randomAlbumArt.bind(this)} onTouchStart={this._randomAlbumArt.bind(this)}/>
            <div className="accordion-album-band-name"><b>
              <Link to={`artist/${artistName}`} activeClassName='active'>{artistName}</Link>
            </b></div>
          </div>
          <div className='right popularity'>
            <div className="accordion-text">{bio}</div>
              <div className="text-center">{`Popularity`}</div>
            <div className="progress">
              <div className="progress-bar" role="progressbar" aria-valuenow={popularity} aria-valuemin="0" aria-valuemax="100" style={{width: `${popularity}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow, artists: state.artists, venues: state.venues }};
const mapDispatchToProps = (dispatch) => bindActionCreators({selectShow: selectShow, redux_Artists: redux_Artists, redux_Venues: redux_Venues}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Show);
