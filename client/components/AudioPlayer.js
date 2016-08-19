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
    return tracks.map(track => {
      return (
        <Track
          track={track}
          artist={this.props.artist}
          youtubeSearch={this.props.youtubeSearch}
          key={track.id}
        />
      )
    })
  }

}

class Track extends Component {

  _search(trackName) {
    this.props.youtubeSearch(this.props.artist.name + ' ' + trackName)
  }

  render() {
    const track = this.props.track

    return (
      <a className="audioPlayer-list-item list-group-item" onClick={this._search.bind(this, track.name)}>
        <div className="audioPlayer-trackName">{track.name.slice(0,30)}</div>
        <div className="audioPlayer-speaker" >
          <Speaker track ={track.preview_url} key={track.id} size = {1}/>
        </div>
      </a>
    )
  }
}
