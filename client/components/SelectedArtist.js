import React, {Component} from 'react';
import { Link } from 'react-router';
import {Spotify_searchArtistsAPI} from '../models/api'


export default class SelectedArtist extends Component{

	constructor(props){
		super(props);
		this.state={
			songPlay: false
		}
	}

	render() {
		const artists = this._mapArtists();
	  return (
	    <div>
				{artists}
	    </div>
	  )
	}

	_mapArtists() {
		return this.props.artists.map((artist) => {
			return (
				<div key={artist.id} className="col-md-4 gridding">
					<img className="genImage" src={this._setImage(artist)} height="105" width="105"/>
					<br/>
					<div className = "artist-label">
						<Link
							className="selArtist"
							id="selArtist"
							to={`artist/${artist.displayname}`}
							activeClassName="active">
							{artist.displayName}
						</Link>
						{artist.tracks ? this._speaker(artist.tracks) : null}
					</div>
						
						{artist.onTourUntil ? <p className="tour"> ON TOUR</p> : null}
				</div>
			)
		})
	}

	_setImage(artist){
		let Artist = artist.spotify;
		if(Artist){
			if(Artist[0]) {
				return Artist[0].images.length ? Artist[0].images[0].url : "http://assets.audiomack.com/default-artist-image.jpg"
			} else {
				return "http://assets.audiomack.com/default-artist-image.jpg"
			}
		} else {
			return "http://assets.audiomack.com/default-artist-image.jpg"
		}
	}

	_speaker(track) {
		if(track.tracks){
			if(track.tracks[0]){
				if(track.tracks[0].preview_url){
					return (
					  <i
					    className="speaker fa fa-volume-up fa-2x"
					    id="speaker"
					    aria-hidden="true"
					    type="button"
					    onClick={this._toggleSound.bind(this)}>
					    <audio src={track.tracks[0].preview_url}></audio>
					  </i>
					)
				}
			}
		}
	}

	_toggleSound(event) {
			let playButton = event.target;
			let parent = playButton.parentElement;
			let audioElem = parent.getElementsByTagName("audio")[0];
			if (!this.state.songPlay) {
			  playButton.className = "fa fa-pause fa-2x";
			  this.setState({songPlay: true})
			  audioElem.play();
			} else {
			  this.setState({songPlay: false})
			  playButton.className = "fa fa-volume-up fa-2x";
			  audioElem.pause();
			}
		}
}
