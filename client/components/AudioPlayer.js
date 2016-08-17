import React, {Component} from 'react'
import Speaker from '../containers/Speaker'
import {topTrack} from '../models/helpers'

export default class AudioPlayer extends Component {
	render(){
		return(
			<div className = "audioPlayer-container">
				<div className ="audioPlayer-name list-group"> 
				Top Tracks By {this.props.artist.name}
				<div>{this._getTopTracks(this.props.artist.topTracks)}</div>
				</div>
			</div>
			
		)
	}
	_getTopTracks(tracks) {
    if (!tracks) {
      return null;
    } else {
      return tracks.map(track => {
      	return <div className= "list-group-item">{track.name}
      	<Speaker track ={track.preview_url} key={track.id}/>
      	</div>
  		})
    }
  }
}