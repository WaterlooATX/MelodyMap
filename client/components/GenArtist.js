import React, {Component} from 'react'
import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI, getArtistAlbumsAPI, Songkick_getVenueAPI, LastFM_getInfoAPI} from '../models/api';
import {selectShow} from '../actions/select_show'
import { Link } from 'react-router';
import * as Show from '../containers/Show';



export default class GenArtist extends Component {
	constructor(props){
		super(props);
		this.state = {
			img: "http://assets.audiomack.com/default-artist-image.jpg",
			bands: [],
			clicked: false
		}
	}

	componentDidMount(){
		this._spotifyInfo(this.props.artists)

	}


	render(){
		const props=this.props;
		const artists = this.props.artists
    	const artistName = this.props.artistName;
    	const artist = artists[artistName]
    	const popularity = artist.Spotify_searchArtistsAPI ? artist.Spotify_searchArtistsAPI.popularity : 'N/A'

		return (
			<div className="panel-heading" role="tab" id={`heading${props.id}`}>
		{console.log("Bands: ", this.state.bands)}
					<div>
						<h3>
							<img className="genImage" src = {this.state.img} alt={props.id} height='85' width='85'/>
								
								<Link className = "genArtist"
								    to={ `artist/${props.displayName}`}
								    activeClassName='active'>{props.displayName}
								</Link>
							<div className='right popularity'>
				           
				            	<div className="text-center">{`Popularity`}</div>
				            	<div className="progress">
				              		<div className="progress-bar" role="progressbar" aria-valuenow={popularity} aria-valuemin="0" aria-valuemax="100" style={{width: `${popularity}%`}}></div>
				          		</div>
				          	</div>
						</h3>
					</div>
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

	_checkSelected(propsSelected) {
	  return (propsSelected) ? "active list-group-item" : "list-group-item";
	}

	// Sends the show's id back to the parent (ShowList.js) on click
	_onClickHandler(event) {
	  event.preventDefault();
	  this.props.sendToState(this.props.id);
	  // get tracks only on click
	  if(!this.state.clicked) {
	    //this._spotifyTracks();
	    this.setState({clicked: true});
	  }
	}




}
