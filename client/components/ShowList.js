import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import Show from "./Show"
import {selectShow} from '../actions/select_show'

import _ from 'lodash'

export default class ShowList extends Component {

  render() {
    return (
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        <div className="panel panel-default">
          {this._createShows()}
        </div>
      </div>
    )
  }

  // This callback is sent to <Show /> as props to grab show id
  // on click and then use it to update selectedShow on state
  _sendToState(arg) {
    const shows= this.props.shows[0]
    let showWithId = shows.filter((show) => show.id === arg)
    this.props.selectShow(showWithId[0])
  }

  _createShows() {

    const shows = this.props.shows[0];
    if (shows) {
      return shows.map((show, i) => { // 50 shows
        return <Show
          // Test if show is selected in props and send results is props to <Show />
          selected={(this.props.selectedShow === show) ? true : false}
          key={show.id}
          id={show.id}
          displayName={show.displayName}
          venu={show.venue.displayName}
          startDate={show.start.date}
          city={show.location.city}
          sendToState={this._sendToState.bind(this)}
          artistsNames= {show.performance}
        />
      })

    } else {
      return <div className="spinner">
      <span className="glyphicon glyphicon-cd" aria-hidden="true"></span>
      <h1>&nbsp;&nbsp;Fetching your geolocation...</h1></div>
    }
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({selectShow: selectShow}, dispatch)

function mapStateToProps(state) {
  return {
           shows: state.shows,
           selectedShow: state.selectedShow
         }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowList);
