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
			previewTrack: [],
			songPlay: false,
		}
	}

	componentDidMount(){
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

			<div className="panel-heading" role="tab" id={`heading${name}`}>
					<div>
						<h3>
							<img className="genImage" src = {image} alt={name} height='85' width='85'/>


								<Link className = "genArtist"
								    to={ `artist/${name}`}
								    activeClassName='active'>{name}
								</Link>

								{track ? this._speaker(track) : null}

						</h3>
					</div>
			</div>

		)
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
          audioElem.play();
       } else {
          this.setState({songPlay : false})
          playButton.className = "fa fa-volume-up fa-3x";
          audioElem.pause();
       }
    }

}
