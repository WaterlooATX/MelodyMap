import React, {Component} from "react"
import {connect} from "react-redux"
import Show from "./Show"

export default class ShowList extends Component {

  _createShows() {
    const shows = this.props.shows[0];
    if(shows) {
      return shows.map(show => {
        return <Show
                key={show.id}
                displayName={show.displayName}
                venu={show.venue.displayName}
                startDate={show.start.date}
                city={show.location.city}
                />
      })

    } else {
      return <div className="spinner">
      <span className="glyphicon glyphicon-cd" aria-hidden="true"></span>
      <h1>&nbsp;&nbsp;Fetching your geolocation...</h1></div>
    }
  }

  render() {
    return (
      <div className="list-group">
        {this._createShows()}
      </div>
    )
  }
}
