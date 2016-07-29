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
      return <h1>loading</h1>
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
