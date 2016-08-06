import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import { Link } from 'react-router';
import moment from 'moment';
import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI, getArtistAlbumsAPI, Songkick_getVenueAPI, LastFM_getInfoAPI} from '../models/api';
import {selectShow} from '../actions/select_show'
import {redux_Artists} from '../actions/artists'


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
    // console.log(this.props.artistsNames)
    this._spotifyInfo(this.props.showArtists)



  }

  _spotifyInfo(showArtists){
    let reduxArtists = this.props.artists
    Songkick_getVenueAPI(this.props.venueID).then(venue => this.setState({venueInfo: venue.data}))

    showArtists.forEach(Artist => {



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
            this.setState({bands: this.state.bands.concat([Spotify_searchArtistsAPI])})

            //console.log(Artist.displayName,artist.name )
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
                let headliner = this.state.bands[0].displayName
                let artist = this.props.artists[headliner]
                if(artist) {
                  this.setState({previewTrack: artist.Spotify_getArtistTopTracksAPI ? artist.Spotify_getArtistTopTracksAPI[0].preview_url : null})
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
      }
    })

    // update redux artist
    redux_Artists(reduxArtists)
  }

  render() {
    let props = this.props;

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
              {this.state.previewTrack ? <i className="fa fa-volume-up  fa-3x" aria-hidden="true" type="button" onClick={this._toggleSound.bind(this)}> <audio src={this.state.previewTrack}> </audio></i> :  null}
               <p className="artist">{ props.showArtists[0].displayName }</p>
               <p className="venue">{ props.venue } - { props.city }</p>
               <p className="date">{ moment(props.startDate, "YYYY-MM-DD").calendar().split(' at')[0] }</p>
            </a>
          </h4>
        </div>
        <div id={`collapse${props.id}`} data-parent="#accordion" className="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading${props.id}`}>
            <div className="panel-body">
              <Bands bands={this.state.bands} doorsOpen={props.doorsOpen} venue={props.venue} venueInfo={this.state.venueInfo} songkick={props.songkick} artists={this.props.artists}/>
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
      .sort((a, b) => b.followers - a.followers)
      .map((artist,index) => {
        return (
          <Band key ={index} artistName={artist.displayName} artists={this.props.artists}/>
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
        {this.props.venue
          ? <a id="rightBtn" href={this.props.songkick.uri} target="_blank" className="btn btn-success" role="button">BUY TICKETS</a>
          : <a id="rightBtn" href="" className="btn btn-success" target="_blank" role="button">Loading</a>
        }
      </div>
    )
  }
}
class AccordionTitle extends Component {
  render() {
    return (
      <div className="panel-top">
        <div className="marker">
          <i id="marker" className="fa fa-map-marker fa-4" aria-hidden="true"></i>
        </div>
        <div className="left">
          <div id="venueName">
            {/* Route to VenueDetails page on click of venue */}
            {this.props.venue ? <Link to={`/venue/${this.props.venue.name}`} activeClassName='active'>{this.props.venue.name}</Link> : "loading"}
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
    const randomBio = "The music sails alive with the compelling combination of rich layers among mixed styles of rhythm that hit the soul. By melding hook-filled melody within hard and heavy beats, has the ability to compact a vast array of influence and experience into a singular song"
    const artists = this.props.artists
    const artistName = this.props.artistName;
    const artist = artists[artistName]
    const albumArt = artist.getArtistAlbumsAPI ? artist.getArtistAlbumsAPI.items[0].images[1].url : 'http://assets.audiomack.com/default-album-image.jpg'
    const popularity = artist.Spotify_searchArtistsAPI ? artist.Spotify_searchArtistsAPI.popularity : 'N/A'
    const bio = artist.LastFM_getInfoAPI ? artist.LastFM_getInfoAPI.bio.content ? artist.LastFM_getInfoAPI.bio.content.slice(0,225).split('/').join(' /').split('%').join('% '): randomBio : null


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
            <img className="accordion-album-art img-circle" style={Style} src={albumArt} alt={artistName} />
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
const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow, artists: state.artists }};
const mapDispatchToProps = (dispatch) => bindActionCreators({selectShow: selectShow, redux_Artists: redux_Artists}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Show);
