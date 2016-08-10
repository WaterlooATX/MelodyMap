import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import Show from "../containers/Show"
import {selectShow} from '../actions/select_show'

export default class ShowList extends Component {

  constructor(props) {
    super(props)
    this.state ={
      songPlayed: false,
      songButton: null
    }
  }

  render() {
    const shows = this.props.shows;
    if (shows.length > 0) {
      if (typeof shows === "string") {
        return (
          <div className="show-error">{shows}</div>
        )
      } else {
        return (
          <div
            className="panel-group"
            id="accordion"
            role="tablist"
            aria-multiselectable="true">
            {this._createShows(shows)}
          </div>
        )
      }
    } else {
      return this._spinner()
    }
  }

  _spinner() {
    return (
      <div className="spinner">
        <span className="glyphicon glyphicon-cd" aria-hidden="true"></span>
        <h1>&nbsp;&nbsp;Fetching your location...</h1>
      </div>
    )
  }

  // This callback is sent to <Show /> as props to grab show id
  // on click and then use it to update selectedShow on state
  _sendToState(arg) {
    const shows = this.props.shows;
    let showWithId = shows.filter((show) => show.id === arg);
    this.props.selectShow(showWithId[0]);
  }

  _songPlayToggle(songPlay, songButton){
    this.setState({ songPlay, songButton })
  }

  _createShows(shows) {
    return shows.map(show => {
      return <Show
        songkick={ show }
        ageRestriction={ show.ageRestriction }
        showArtists= { show.performance }
        city={ show.location.city }
        displayName={ show.displayName }
        doorsOpen={ show.start.time || 'N/A' }
        id={ show.id }
        key={ show.id }
        selected={ (this.props.selectedShow === show) ? true : false }
        sendToState={ this._sendToState.bind(this) }
        startDate={ show.start.date }
        venue={ show.venue.displayName }
        venueID={ show.venue.id }
        onNavigateClick={ this.props.onNavigateClick.bind(this) }
        songPlay={ this.state.songPlay }
        songButton={ this.state.songButton }
        songPlayToggle={ this._songPlayToggle.bind(this) }
      />
    })
  }
}

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow, location: state.location }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ selectShow: selectShow }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ShowList);
