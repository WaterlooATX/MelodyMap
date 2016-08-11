import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import Show from "../containers/Show"
import {selectShow} from '../actions/select_show'
import _ from 'lodash'
import {Spotify_searchArtistsAPI} from '../models/api';

export default class ShowList extends Component {

  constructor(props) {
    super(props)
    this.state ={
      songPlayed: false,
      songButton: null,
      artistsData: []
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

  _songPlayToggle(songPlayed, songButton) {
    this.setState({ songPlayed, songButton })
  }

  _createShows(shows) {
    // create array of all artist names playing in local shows
    let artistsArr = []
    shows.forEach(show => artistsArr.push(...show.performance))
    artistsArr = _.uniq(artistsArr.map(artist => {
      return {name: artist.artist.displayName}
    }))

    // get show Artists from DB or API
    let artistsData = []
    artistsArr.forEach(name => {
      Spotify_searchArtistsAPI(name).then( obj => {
        if(obj.data) {
            artistsData.push(obj.data)
            this.setState({artistsData: artistsData})
        }
      }).catch(err => console.log(err))
    })


    return shows.map(show => {
      return <Show
        artistsData={this.state.artistsData}
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
        songPlayed={ this.state.songPlayed }
        songButton={ this.state.songButton }
        songPlayToggle={ this._songPlayToggle.bind(this) }
      />
    })
  }
}

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow, location: state.location }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ selectShow: selectShow }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ShowList);
