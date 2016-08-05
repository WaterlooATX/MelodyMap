import React, {Component} from 'react'
import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI, getArtistAlbumsAPI, Songkick_getVenueAPI, LastFM_getInfoAPI} from '../models/api';
import {selectShow} from '../actions/select_show'
import { Link } from 'react-router';
import * as Show from './Show';



export default class GenArtist extends Component {
	constructor(props){
		super(props);
		this.state = {
			img: "http://assets.audiomack.com/default-artist-image.jpg",
			bands: [],
		}
	}

	componentDidMount(){
		this._spotifyInfo(this.props.artists)
	}


	render(){
		const props= this.props;
		return (
			<div className="panel-heading" role="tab" id={`heading${props.id}`}>
				<h4 className = 'panel-title'>
					<a
						// className={this._checkSelected(this.props.selected)}
						//onClick={this._onClickHandler.bind(this)}
						role="button" data-toggle="collapse"
						data-parent="#accordion"
						href={`#collapse${props.id}`}
						aria-expanded="true"
						aria-controls={`collapse${props.id}`}

					>
						<img src = {this.state.img} alt={props.id} height='65' width='65'/>
						<p className="artist">{props.displayName}</p>
					</a>
				</h4>

			</div>
		)
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

	  })
		}
	}





}




     