import {Link} from 'react-router';
import React, {Component} from 'react';
import {getAlbumArt, getBio, getRandomAlbumArt, topTrack} from '../models/helpers'
import {Speaker} from './Speaker'

export default class DropdownArtist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      albumArt: null,
    }
  }

  componentDidMount() {
    this._randomAlbumArt()
  }

  _randomAlbumArt() {
    this.setState({albumArt: getRandomAlbumArt(this.props.artist)})
  }

  _toggleSound(event) {
    let songPlayed = this.props.songPlayed;
    let playButton = event.target;
    let parent = playButton.parentElement;
    let audioElem = parent.getElementsByTagName('audio')[0];
    if (!songPlayed) {
      this.props.songPlayToggle(audioElem, playButton)
      playButton.className = "fa fa-pause fa-3x";
      audioElem.play();
    } else if (songPlayed === audioElem) {
      audioElem.pause();
      playButton.className = "fa fa-volume-up fa-3x";
      this.props.songPlayToggle(false, null)
    } else if (songPlayed !== audioElem) {
      songPlayed.pause()
      this.props.songButton.className = "fa fa-volume-up fa-3x";
      this.props.songPlayToggle(audioElem, playButton);
      playButton.className = "fa fa-pause fa-3x";
      audioElem.play();
    }
  }

  render() {
    const artist = this.props.artist
    const name = artist ? artist.name : null
    const popularity = artist ? artist.popularity : 'none'
    const albumArt = this.state.albumArt ? this.state.albumArt : getAlbumArt(artist)

    return (
      <div>
        <div className="accordion-band">
          <div className="band-info">
            <img
              className="accordion-album-art img-circle"
              src={albumArt}
              alt={name}
              onClick={this._randomAlbumArt.bind(this)}
              onTouchStart={this._randomAlbumArt.bind(this)}
            />
            {/* <div className="accordion-album-band-name">
              <b>

              </b>
            </div> */}
          </div>
          <div className='right popularity'>
            <div className="text-center" style={{fontSize: "20px"}}>
              <Link to={`artist/${name}`} activeClassName='active'><b>{name}</b></Link>
              {Speaker.call(this, topTrack(artist), this._toggleSound.bind(this), 3)}
            </div>
            <div className="text-center">{`Popularity`}</div>
            <div className="progress" style={{marginBottom: "5px"}}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow={popularity}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{width: `${popularity}%`}}>
              </div>
            </div>
            <div className="accordion-text">{getBio(artist)}</div>
          </div>
        </div>
      </div>
    )
  }
}
