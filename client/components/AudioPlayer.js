import React, {Component} from 'react'
import Speaker from '../containers/Speaker'
import {topTrack} from '../models/helpers'

export default class AudioPlayer extends Component {
  render() {
    return (
      <div className = "audioPlayer-container">
				<div className ="audioPlayer-name list-group">
				Top Tracks By {this.props.artist.name}
				{this._getTopTracks(this.props.artist.topTracks)}
				</div>
			</div>

    )
  }
  _getTopTracks(tracks) {
    if (!tracks) {
      return null;
    } else {
      return tracks.map(track => {
        return (
          <div className="audioPlayer-list-item list-group-item" key={track.id}>{track.name}
          	<div className="audioPlayer-speaker" key={track.id}>
              <Speaker track ={track.preview_url} key={track.id} size = {2}/>
            </div>
        	</div>
        )
      })
    }
  }
}
