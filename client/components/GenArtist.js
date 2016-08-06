import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
		//this._spotifyInfo(this.props.artists)

	}


	render(){
		const props = this.props
		return (
			<div className="panel-heading" role="tab" id={`heading${props.id}`}>
					<div>
						<h3>
							<img className="genImage" src = {this.state.img} alt={props.id} height='85' width='85'/>
								
								
								<Link className = "genArtist"
								    to={ `artist/${props.displayName}`}
								    activeClassName='active'>{props.displayName}
								</Link>
								
								{this.state.previewTrack[0] ?
				                <i className="fa fa-volume-up  fa-3x" aria-hidden="true" type="button" onClick={this._toggleSound.bind(this)}>
				                <audio src={this.state.previewTrack[0].preview}>
				                </audio></i> : <i className="fa fa-volume-up  fa-3x" aria-hidden="true"></i>}
								
						</h3>
					</div>
			</div>
		)
	}
// _spotifyInfo(showArtists){
//     let reduxArtists = this.props.artists
//     Songkick_getVenueAPI(this.props.venueID).then(venue => this.setState({venueInfo: venue.data}))
//     console.log("first spotifyinfo: ", this.props.artists)
//     showArtists.forEach(Artist => {



//        if(!reduxArtists[Artist.displayName]){
//         reduxArtists[Artist.displayName] = {}
//         console.log("if", Artist)

//         Spotify_searchArtistsAPI(Artist.displayName).then( obj => { // async
//           const artist = obj.data[0]
//           if(artist) {
//           	console.log("_spotifyInfo: ", artist)
//             // CHANGE only set img for head artist
//             this.setState({img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"})
//             let Spotify_searchArtistsAPI = {
//               spotifyOpen: artist.external_urls.spotify,
//               id: artist.id,
//               displayName: Artist.displayName,
//               name: artist.name,
//               uri: artist.uri,
//               popularity: artist.popularity,
//               followers: artist.followers.total,
//               genres: artist.genres,
//               img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"
//             }
//             this.setState({bands: this.state.bands.concat([Spotify_searchArtistsAPI])})
//             //console.log(Artist.displayName,artist.name )
//             reduxArtists[Artist.displayName]["Spotify_searchArtistsAPI"] = Spotify_searchArtistsAPI

//             let spotify = Spotify_searchArtistsAPI
//             getArtistAlbumsAPI(spotify.id)
//             .then(albums => {
//               reduxArtists[Artist.displayName]["getArtistAlbumsAPI"] = albums.data ? albums.data : null
//             })
//             .catch(reduxArtists[Artist.displayName]["getArtistAlbumsAPI"] = null)

//             LastFM_getInfoAPI(spotify.name)
//             .then(info => {
//               reduxArtists[Artist.displayName]["LastFM_getInfoAPI"] = info.data.artist ? info.data.artist : null
//             })
//             .catch(reduxArtists[Artist.displayName]["LastFM_getInfoAPI"] = null)

//             Spotify_getArtistTopTracksAPI(spotify.id,"US")
//             .then(artistTracks => {

//               reduxArtists[Artist.displayName]["Spotify_getArtistTopTracksAPI"] = artistTracks.data.tracks ? artistTracks.data.tracks : null
//             })
//             .catch(reduxArtists[Artist.displayName]["Spotify_getArtistTopTracksAPI"] = null)


//           } else {
//             reduxArtists[Artist.displayName]["Spotify_searchArtistsAPI"] = null
//             LastFM_getInfoAPI(Artist.displayName)
//             .then(info => {
//               reduxArtists[Artist.displayName]["LastFM_getInfoAPI"] = info.data.artist ? info.data.artist : null
//             })
//             .catch(reduxArtists[Artist.displayName]["LastFM_getInfoAPI"] = null)
//           }

//         })
//       }
//     })

//     // update redux artist
//     redux_Artists(reduxArtists)
//   }
	// _spotifyInfo(artists){
	//   artists.forEach(artist => {
	//     Spotify_searchArtistsAPI(artist.displayName).then( obj => {
	//       const artist = obj.data[0]
	//       if(artist) {
	//         // CHANGE only set img for head artist
	//         this.setState({img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"})

	//         let info = {
	//           spotifyOpen: artist.external_urls.spotify,
	//           id: artist.id,
	//           name: artist.name,
	//           uri: artist.uri,
	//           popularity: artist.popularity,
	//           followers: artist.followers.total,
	//           genres: artist.genres,
	//           img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"
	//         }
	//         this.setState({bands: this.state.bands.concat([info])})
	//       }
	//     })
	//   })
	// }

	// _spotifyTracks() {
	//   Songkick_getVenueAPI(this.props.venueID).then(venue => {
	//     this.setState({venueInfo: venue.data})
	//   })

	//   const bands = this.state.bands
	//   // console.log(bands)
	//   if(bands){
	//     bands.map((artist,index) => {

	//       getArtistAlbumsAPI(artist.id).then(albums => {
	//         const albumArt = albums.data.items[0].images[0].url
	//         if(albumArt) {
	//           let bands = this.state.bands;
	//           bands[index].albumArt = albumArt;
	//           this.setState({bands: bands});
	//         }
	//       })

	//       LastFM_getInfoAPI(artist.name).then(info => {
	//         const artistData = info.data.artist
	//         if(artistData) {

	//           let bands = this.state.bands;
	//           bands[index].LastFM_getInfoAPI = artistData;
	//           this.setState({bands: bands});
	//         }
	//       })

	//   	})
	//    }
	// }

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

	_checkSelected(propsSelected) {
	  return (propsSelected) ? "active list-group-item" : "list-group-item";
	}

	// Sends the show's id back to the parent (ShowList.js) on click
// 	_onClickHandler(DOMString, event) {
//     event.preventDefault();
//     this.props.sendToState(this.props.id);
//     // get tracks only on click
//     if(!this.state.clicked) {
//       this.setState({clicked: true});
//     }
//     $(`#${DOMString}`)[0].scrollIntoView( true );
//   }
// }




}

// const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow, artists: state.artists }};
// const mapDispatchToProps = (dispatch) => bindActionCreators({selectShow: selectShow, redux_Artists: redux_Artists}, dispatch);
//export default connect(mapStateToProps, mapDispatchToProps)(GenArtist);

