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
		console.log("Images: ", this.props.images)
	}

	// _getArtistImage(artist){
	// 	Spotify_searchArtistsAPI(artist).then((spotify) =>{
	// 		//console.log(spotify)
	// 		if(spotify.data[0]){
	// 			if(spotify.data[0].images[0]){
	// 				let image = spotify.data[0].images[0].url
	// 			}
	// 		} else{
	// 				let image = this.state.img			
	// 		}
	// 	})
	// }

	render(){
		// let image;
		var track;
		return (
	         <div>
			{this.props.artists.map((artist) =>{
				//this.props.images.map((spotify)=>{
					//console.log("selected artist", spotify.images[0])
				return (
          			<div key={ artist.id } className="panel-heading" role="tab" id={`heading${artist.id}`}>
          				<h3>
							<img className="genImage" src = {this.state.img} height='85' width='85'/>

							<Link className = "genArtist"
							    to={ `artist/${artist.displayName}`}
							    activeClassName='active'>{artist.displayName}
							</Link>

							{/*track ? this._speaker(track) : null*/}

						</h3>
        			</div>
		)
					
				//})
					})}
			</div>
	)}


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



