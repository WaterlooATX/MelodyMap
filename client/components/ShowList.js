import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import Show from "./Show"
import {fetchShows} from '../actions/shows'
import {selectShow} from '../actions/select_show'

export default class ShowList extends Component {

  render() {
    return (
      <div className="list-group">
        {this._createShows()}
      </div>
    )
  }

  _createShows() {
    const shows = this.props.shows[0];
    if (shows) {
      return shows.map(show => {
        return <Show
          // Test if show is selected in props and send results is props to <Show />
          selected={(this.props.selectedShow === show) ? true : false}
          key={show.id}
          displayName={show.displayName}
          venu={show.venue.displayName}
          startDate={show.start.date}
          city={show.location.city}
          // update selectedShow in redux state on click
          onClick={() =>  this.props.selectShow(show)}
        />
      })

    } else {
      return <div className="spinner">
      <span className="glyphicon glyphicon-cd" aria-hidden="true"></span>
      <h1>&nbsp;&nbsp;Fetching your geolocation...</h1></div>
    }
  }
}


function mapStateToProps(state) {
  return {selectedShow: state.selectedShow}
}

export default connect(mapStateToProps)(ShowList);


