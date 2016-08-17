import React, {Component} from 'react'
import Speaker from '../containers/Speaker'
import {topTrack} from '../models/helpers'

export default class AudioPlayer extends Component {
	render(){
		return(
			<div className = "audioPlayer-container">
				<div className ="audioPlayer-name"> 
				{this.props.artist.name} 
				</div>
				<div>{this._getTopTracks(this.props.artist.topTracks)}</div>
			</div>
			
		)
	}
	_getTopTracks(tracks) {
    if (!tracks) {
      return null;
    } else {
    	console.log("tracks",tracks)
      return tracks.map(track => {
      	<div>{track.name}</div>
      	<Speaker track ={track.preview_url}/>
  		}
    }
  }
}
<Speaker track={topTrack(artist)} size={2}/>