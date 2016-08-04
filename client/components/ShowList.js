import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import Show from "./Show"
import {selectShow} from '../actions/select_show'

export default class ShowList extends Component {

  render() {
    const shows = this.props.shows[0];
    if (shows) {
      return (
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          <div className="panel panel-default">
            {this._createShows(shows)}
          </div>
        </div>
      )
    } else {
      return <div className="spinner">
      <span className="glyphicon glyphicon-cd" aria-hidden="true"></span>
      <h1>&nbsp;&nbsp;Fetching your geolocation...</h1></div>
    }
  }

  // This callback is sent to <Show /> as props to grab show id
  // on click and then use it to update selectedShow on state
  _sendToState(arg) {
    const shows = this.props.shows[0];
    let showWithId = shows.filter((show) => show.id === arg);
    this.props.selectShow(showWithId[0]);
  }

  _createShows(shows) {
    return shows.map((show, i) => { // 50 shows
      return <Show
        songkick={show}
        ageRestriction={show.ageRestriction}
        artists= {show.performance}
        city={show.location.city}
        displayName={show.displayName}
        doorsOpen={show.start.time}
        id={show.id}
        key={show.id}
        selected={(this.props.selectedShow === show) ? true : false}
        sendToState={this._sendToState.bind(this)}
        startDate={show.start.date}
        venue={show.venue.displayName}
        venueID={show.venue.id}
      />
    })
  }
}

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow }};
const mapDispatchToProps = (dispatch) => bindActionCreators({selectShow: selectShow}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ShowList);
