import React, {Component} from 'react';

export default class Speaker extends Component {
  constructor(props) {
    super(props)
    this.state ={
      songPlayed: false,
      songButton: null
    }
  }

  render() {
    if(this.props.track) {
      return (
        <i
          className={`speaker fa fa-volume-up fa-${this.props.size}x`}
          id="speaker"
          aria-hidden="true"
          type="button"
          onClick={this._toggleSound.bind(this)}>
          <audio src={ this.props.track }></audio>
        </i>
      )
    } else {
      return null
    }
  }

  _songPlayToggle(songPlayed, songButton) {
    this.setState({ songPlayed, songButton })
  }

  _toggleSound(event) {
    let songPlayed = this.state.songPlayed;
    let playButton = event.target;
    let parent = playButton.parentElement;
    let audioElem = parent.getElementsByTagName('audio')[0];
    if (!songPlayed) {
      this._songPlayToggle(audioElem, playButton)
      playButton.className = `fa fa-pause fa-${this.props.size}x`;
      audioElem.play();
    } else if (songPlayed === audioElem) {
      audioElem.pause();
      playButton.className = `fa fa-volume-up fa-${this.props.size}x`;
      this._songPlayToggle(false, null)
    } else if (songPlayed !== audioElem) {
      songPlayed.pause()
      this.state.songButton.className = `fa fa-volume-up fa-${this.props.size}x`;
      this._songPlayToggle(audioElem, playButton);
      playButton.className = `fa fa-pause fa-${this.props.size}x`;
      audioElem.play();
    }
  }
}
