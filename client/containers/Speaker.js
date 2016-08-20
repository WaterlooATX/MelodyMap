import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSpeaker } from '../actions/actions';

class Speaker extends Component {

  render() {
    if (this.props.track) {
      return (
        <i
          className={`speaker fa fa-volume-up fa-${this.props.size}x`}
          id="speaker"
          aria-hidden="true"
          type="button"
          onClick={this._toggleSound.bind(this)}
        >
          <audio src={this.props.track}></audio>
        </i>
      );
    } else {
      return null;
    }
  }

  _songPlayToggle(songPlayed, songButton) {
    this.props.setSpeaker({
      songPlayed,
      songButton,
    });
  }

  _toggleSound(event) {
    const songPlayed = this.props.speaker.songPlayed;
    const playButton = event.target;
    const parent = playButton.parentElement;
    const audioElem = parent.getElementsByTagName('audio')[0];
    if (!songPlayed) {
      this._songPlayToggle(audioElem, playButton);
      playButton.className = `fa fa-pause fa-${this.props.size}x`;
      audioElem.play();
    } else if (songPlayed === audioElem) {
      audioElem.pause();
      playButton.className = `fa fa-volume-up fa-${this.props.size}x`;
      this._songPlayToggle(false, null);
    } else if (songPlayed !== audioElem) {
      songPlayed.pause();
      this.props.speaker.songButton.className = `fa fa-volume-up fa-${this.props.size}x`;
      this._songPlayToggle(audioElem, playButton);
      playButton.className = `fa fa-pause fa-${this.props.size}x`;
      audioElem.play();
    }
  }
}

const mapStateToProps = (state) => { return { speaker: state.speaker }; };
const mapDispatchToProps = (dispatch) => bindActionCreators({ setSpeaker }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Speaker);
