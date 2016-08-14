import React, {Component} from 'react'
import {Link} from 'react-router';
import {Speaker} from './Speaker'
import {getAlbumArt, getRandomAlbumArt, topTrack} from '../models/helpers'

export default class ArtistItem extends Component {
  constructor(props){
		super(props);
		this.state={
			songPlay: false,
			albumArt: null
		}
	}

	componentDidMount(){
		this._randomAlbumArt()
	}

  render() {
    const artist = this.props.artist
    const albumArt = this.state.albumArt ? this.state.albumArt : getAlbumArt(artist)
	  return (
      <div key={artist.id} className="col-md-4 gridding">
        <div className = "artist-label" id="selected">
          <Link
            className="selArtist"
            id="selArtist"
            to={`artist/${artist.name}`}
            activeClassName="active">
            <img
              className="genImage"
              src={albumArt}
              onMouseOver={this._randomAlbumArt.bind(this)}
              height="105"
              width="105"
            />
            <br/>
            {artist.name}
          </Link>
          {Speaker.call(this, topTrack(artist), this._toggleSound.bind(this), 2)}
        </div>
          {artist.onTour == "1" || artist.onTourUntil ? <p className=" tour">ON TOUR</p> : null}
      </div>
	  )
	}

  _randomAlbumArt() {
    this.setState({albumArt: getRandomAlbumArt(this.props.artist)})
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
