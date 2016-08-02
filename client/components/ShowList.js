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
        // Test if show is selected in props and send results is props to <Show />
        selected={(this.props.selectedShow === show) ? true : false}
        key={show.id}
        id={show.id}
        displayName={show.displayName}
        venue={show.venue.displayName}
        startDate={show.start.date}
        city={show.location.city}
        sendToState={this._sendToState.bind(this)}
        artists= {show.performance}
      />
    })
  }
}

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow }};
const mapDispatchToProps = (dispatch) => bindActionCreators({selectShow: selectShow}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ShowList);