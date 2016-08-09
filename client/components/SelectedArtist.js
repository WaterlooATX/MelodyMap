import React, {Component} from 'react';
import { Link } from 'react-router';
import {Spotify_searchArtistsAPI} from '../models/api'


export default class SelectedArtist extends Component{

	constructor(props){
		super(props);
		this.state={
			img: "http://assets.audiomack.com/default-artist-image.jpg",
		}
	}

	componentDidMount(){
		console.log("Images: ", this.props.artists)
	}

	render(){
		var track;
		return (
	         <div>
			{this.props.artists.map((artist) =>{
				//var image = artist.spotify[0];
				return (
          			<div key={ artist.id } className="panel-heading" role="tab" id={`heading${artist.id}`}>
          				<h3>
							<img className="genImage" src = {this._setImage(artist)} height='85' width='85'/>

							<Link className = "genArtist"
							    to={ `artist/${artist.displayName}`}
							    activeClassName='active'>{artist.displayName}
							</Link>

						</h3>
					
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
				return (
					<i className="speaker fa fa-volume-up fa-3x" id="speaker" aria-hidden="true" type="button" onClick={this._toggleSound.bind(this)}>
					<audio src={track}>
					</audio></i>
				)
			}

			_toggleSound(event) {
		       var playButton = event.target;
		       var parent = playButton.parentElement;
		       var audioElem = parent.getElementsByTagName('audio')[0];
		       if (this.state.songPlay === false) {
		          playButton.className = "fa fa-pause fa-3x";
		          this.setState({songPlay : true})

				}
			}
}	



