import React, {Component} from 'react'


export default class UpcomingShowsDetail extends Component {
  render() {
    return (
      <div className = "audioPlayer-container">
				<div className ="audioPlayer-name list-group">
				    {this._checkShows(this.props.artist.topTracks)}
				</div>
			</div>
    )
  }

  _checkShows(shows) {
    return shows ? this._shows(shows) : null
  }

  _shows(shows) {
    return shows.map(show => <Show show={show} key={show.id}/>)
  }

}

class Show extends Component {
  render() {
    return (
      <div className="audioPlayer-list-item list-group-item">
      </div>
    )
  }
}
