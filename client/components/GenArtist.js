import React, {Component} from 'react';
import { Link } from 'react-router';
import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI, getArtistAlbumsAPI, Songkick_getVenueAPI, LastFM_getInfoAPI} from '../models/api';
import {selectShow} from '../actions/select_show';
import {redux_Artists} from '../actions/artists';



export default class GenArtist extends Component {

	constructor(props){
		super(props);
		this.state = {
			img: "http://assets.audiomack.com/default-artist-image.jpg",
			bands: [],
			clicked: false,
			previewTrack: []
		}
	}

	render(){
		const props = this.props;
		const artist = props.artist;
		const name = props.name;
		var image;
		var track;

		artist.Spotify_getArtistTopTracksAPI ? (artist.Spotify_getArtistTopTracksAPI[0] ? track = artist.Spotify_getArtistTopTracksAPI[0].preview_url : track =  null) : track = null;
		artist.Spotify_searchArtistsAPI ? image = artist.Spotify_searchArtistsAPI.img : image = this.state.img;

		return (
		  <div className="col-md-4 gridding" id={`heading${name}`}>
	      <img className="genImage" src={image} alt={name} height="85" width="85"/>
		    <div className="artist-label">
		      <Link
		        className="selArtist"
		        id="selArtist"
		        to={`artist/${name}`}
		        activeClassName="active">{name}
		      </Link>
		      {track ? this._speaker(track) : null}
		    </div>
		  </div>
		 )
		}

	_speaker(track) {
		return (
		  <i
		    className="speaker fa fa-volume-up fa-2x"
		    id="speaker"
		    aria-hidden="true"
		    type="button"
		    onClick={ this._toggleSound.bind(this) }>
		    <audio src={ track }></audio>
		  </i>
		)
	}

	_toggleSound(event) {
	  let songPlayed = this.props.songPlayed;
    let playButton = event.target;
    let parent = playButton.parentElement;
    let audioElem = parent.getElementsByTagName('audio')[0];
    if (!songPlayed) {
      this.props.songPlayToggle(audioElem, playButton)
      playButton.className = "fa fa-pause fa-2x";
      audioElem.play();
    } else if (songPlayed === audioElem) {
      audioElem.pause();
      playButton.className = "fa fa-volume-up fa-2x";
      this.props.songPlayToggle(false, null)
    } else if (songPlayed !== audioElem) {
      songPlayed.pause()
      this.props.songButton.className = "fa fa-volume-up fa-2x";
      this.props.songPlayToggle(audioElem, playButton);
      playButton.className = "fa fa-pause fa-2x";
      audioElem.play();
    }
	}
}
