import React, {Component} from 'react';
import {Link} from 'react-router';
import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI, getArtistAlbumsAPI, Songkick_getVenueAPI, LastFM_getInfoAPI} from '../models/api';

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
		const tour = artist.onTourUntil
		const name = props.name;
		var image;
		var track;
		artist.topTracks ?  track = artist.topTracks[0] : track =  null

		return (
		  <div className="col-md-4 gridding" id={`heading${name}`}>
		    <div className="artist-label">
		      <Link
		        className="selArtist"
		        id="selArtist"
		        to={`artist/${name}`}
		        activeClassName="active">
	      			<img className="genImage" src={this._setImage(artist)} alt={name} height="105" width="105"/>
		   	 		<br/>
		    		{name}
		      </Link>
		      {track ? this._speaker(track) : null}
		    </div>
		    <p className="tour">ON TOUR</p>
		  </div>
		 )
		}

	

	_setImage(artist){
		if(artist.images){
			if(artist.images[0]) {
				return artist.images[0].url ? artist.images[0].url : "http://assets.audiomack.com/default-artist-image.jpg"
			} else {
				return "http://assets.audiomack.com/default-artist-image.jpg"
			}
		} else {
			return "http://assets.audiomack.com/default-artist-image.jpg"
		}
	}

	_speaker(track) {
		if(track.preview_url){
			return (
			  <i
			    className="speaker fa fa-volume-up fa-2x"
			    id="speaker"
			    aria-hidden="true"
			    type="button"
			    onClick={ this._toggleSound.bind(this) }>
			    <audio src={ track.preview_url }></audio>
			  </i>
			)			
		}
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
