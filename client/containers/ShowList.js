import React, {Component} from "react"
import {connect} from "react-redux"
import Show from "../components/Show"

class ShowList extends Component {

  _createShows() {
    if(this.props.shows[0]) {
      return this.props.shows[0].resultsPage.results.event.map(show => {
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

function mapStateToProps(state) {
  return { shows: state.shows}
}

export default connect(mapStateToProps)(ShowList)
