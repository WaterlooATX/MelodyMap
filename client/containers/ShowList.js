import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {selectShow, redux_Artists} from '../actions/actions';
import {Spotify_searchArtistsAPI} from '../models/api';
import Show from "./Show";
import {addArtistToRedux} from '../models/helpers'

export default class ShowList extends Component {

  render() {
    const shows = this.props.shows;
    if (shows.length > 0) {
      if (typeof shows === "string") {
        return (
          <div className="show-error">{shows}</div>
        )
      } else {
        addArtistToRedux(shows, this.props.artists, Spotify_searchArtistsAPI, redux_Artists)
        return (
          <div
            className="panel-group"
            id="accordion"
            role="tablist"
            aria-multiselectable="true">
            { this._createShows(shows) }
          </div>
        )
      }
    }
  }

  // This callback is sent to <Show /> as props to grab show id
  // on click and then use it to update selectedShow on state
  _sendToState(arg) {
    const shows = this.props.shows;
    let showWithId = shows.filter((show) => show.id === arg);
    this.props.selectShow(showWithId[0]);
  }

  _sortShowsByPopularity(shows) {
    return shows.sort((a,b) => b.popularity - a.popularity)
  }

  _createShows(shows) {
    const sorted = this._sortShowsByPopularity(shows)
    return sorted.map(show => {
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
      />
    })
  }
}

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow, artists: state.artists, location: state.location }};
const mapDispatchToProps = (dispatch) => bindActionCreators({redux_Artists: redux_Artists, selectShow: selectShow }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ShowList);
