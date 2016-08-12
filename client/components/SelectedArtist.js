import React, {Component} from 'react';
import {Link} from 'react-router';
import {Spotify_searchArtistsAPI} from '../models/api'


export default class SelectedArtist extends Component{

	constructor(props){
		super(props);
		this.state={
			songPlay: false,
			albumArt: null
		}
	}
	componentDidMount(){
		console.log(this.props.artists)
		//this._randomAlbumArt()
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
					<div className = "artist-label" id="selected">
						<Link
							className="selArtist"
							id="selArtist"
							to={`artist/${artist.name}`}
							activeClassName="active">
					<img className="genImage" src={this._setImage(artist)} onMouseOver={this._randomAlbumArt.bind(this,artist)} height="105" width="105"/>
					<br/>
							{artist.name}
						</Link>
						{artist.topTracks ? this._speaker(artist.topTracks) : null}
					</div>
						{artist.onTour == "1" || artist.onTourUntil ? <p className=" tour">ON TOUR</p> : null}
				</div>
			)
		})
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

	_randomAlbumArt(artist) {
		console.log(artist)
    // let artists = this.props.artists
     let albumArt = artist.albumImages ? artist.albumsImages : null

     if (albumArt) {
      const albumsImages = artist.albumsImages.map(album => {
        return album.images ? album.images[1].url : null
      })

      if (albumsImages) {
        let num = albumsImages.length
        this.setState({
          albumArt: albumsImages[Math.floor(Math.random() * num)]
        })
      }
    }
  }

	_speaker(track) {

			if(track[0]){
				if(track[0].preview_url){
					return (
					  <i
					    className="speaker fa fa-volume-up fa-2x"
					    id="selSpeaker"
					    aria-hidden="true"
					    type="button"
					    onClick={this._toggleSound.bind(this)}>
					    <audio src={track[0].preview_url}></audio>
					  </i>
					)
				}
			}
	}

	_toggleSound(event) {
			let songPlayed = this.props.songPlayed;
			let playButton = event.target;
			let parent = playButton.parentElement;
			let audioElem = parent.getElementsByTagName("audio")[0];
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
