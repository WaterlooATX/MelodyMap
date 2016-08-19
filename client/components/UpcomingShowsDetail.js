import React, {Component} from 'react'


export default class UpcomingShowsDetail extends Component {
  render() {
    console.log(this.props.shows)
    return (
      <div className = "UpcomingShowsDetail-container">
				    {this._checkShows(this.props.shows)}
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
    const show = this.props.show
    return (
      <div className="UpcomingShowsDetail-list-item list-group-item">
        {show.venue.displayName}
      </div>
    )
  }
}
