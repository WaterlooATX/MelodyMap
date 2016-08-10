import React, {Component} from 'react';
import { Link } from 'react-router';
import {Spotify_searchArtistsAPI} from '../models/api'


export default class SelectedArtist extends Component{

	constructor(props){
		super(props);
		this.state={
			img: "http://assets.audiomack.com/default-artist-image.jpg",
			songPlay: false,
		}
	}

	render(){
		return (
	         <div>
			{this.props.artists.map((artist) =>{
				return (
          			<div key={ artist.id } className="col-md-4 gridding">         				
						<img className="genImage" src = {this._setImage(artist)} height='85' width='85'/>
							<br></br>
						<Link 
							className = "selArtist"
							id="selArtist"
						    to={ `artist/${artist.displayName}`}
						    activeClassName='active'>{artist.displayName}
						</Link>
						{artist.tracks ? this._speaker(artist.tracks) : null}
						{artist.onTourUntil?<p className="tour"> ON TOUR </p> : null}
        			</div>
				)
			})}
			</div>
	)}


	_setImage(artist){
		var Artist = artist.spotify;
		var img = this.state.img;
		if(Artist){
			if(Artist.length >0){
				if(Artist[0].images[0]){
					img = Artist[0].images[0].url
				} 
			} 
		} 
		return(img)
	}

	_speaker(track) {
		if(track.tracks){
			if(track.tracks[0]){
				if(track.tracks[0].preview_url){
					return(
						<i className="speaker fa fa-volume-up fa-2x" id="speaker" aria-hidden="true" type="button" onClick={this._toggleSound.bind(this)}>
						<audio src={track.tracks[0].preview_url}>
						</audio></i>					
					)
				}
			}
				
		}
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
}	



