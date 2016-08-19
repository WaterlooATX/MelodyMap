import React, {Component} from 'react'
import Speaker from '../containers/Speaker'
import {topTrack} from '../models/helpers'

export default class AudioPlayer extends Component {
  render() {
    return (
      <div className = "audioPlayer-container">
				<div className ="audioPlayer-name list-group">
				    {this._checkTracks(this.props.artist.topTracks)}
				</div>
			</div>
    )
  }

  _checkTracks(tracks) {
    return tracks ? this._tracks(tracks) : null
  }

  _tracks(tracks) {
    return tracks.map(track => <Tracks track={track} key={track.id}/>)
  }

}

class Tracks extends Component {
  render() {
    const track = this.props.track
    return (
      <div className="audioPlayer-list-item list-group-item">
        <div className="audioPlayer-trackName">{track.name.slice(0,30)}</div>
        <div className="audioPlayer-speaker">
          <Speaker track ={track.preview_url} key={track.id} size = {1}/>
        </div>
      </div>
    )
  }
}
