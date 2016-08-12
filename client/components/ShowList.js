import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import Show from "../containers/Show"
import {selectShow} from '../actions/select_show'
import _ from 'lodash'
import {Spotify_searchArtistsAPI} from '../models/api';
import {redux_Artists} from '../actions/artists'

export default class ShowList extends Component {

  constructor(props) {
    super(props)
    this.state ={
      songPlayed: false,
      songButton: null,
    }
  }

  render() {
    const shows = this.props.shows;
    this._addArtistToRedux(shows)
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
            { this._createShows(shows) }
          </div>
        )
      }
    }
  }
  //Move to models
  _addArtistToRedux(shows) {
    let Artist = this.props.artists
    shows.forEach(show => addArtists(show))

    function addArtists(show) {
      let artists = [...show.performance]
      artists = _.uniq(artists.map(artist => {
        return {
          name: artist.artist.displayName,
          id: artist.artist.id
        }
      }))
      artists.forEach(artist => addArtist(artist))
    }

    function addArtist(artist) {
      if (!Artist[artist.name]) getArtistData(artist)
    }

    function getArtistData(artist) {
      Spotify_searchArtistsAPI(artist).then(obj => {
        if (obj.data) {
          Artist[artist.name] = obj.data
          redux_Artists(Artist)
          console.log(Artist)
        }
      }).catch(err => console.log(err))
    }
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
        songPlayed={ this.state.songPlayed }
        songButton={ this.state.songButton }
        songPlayToggle={ this._songPlayToggle.bind(this) }
      />
    })
  }

}

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow, artists: state.artists, location: state.location }};
const mapDispatchToProps = (dispatch) => bindActionCreators({redux_Artists: redux_Artists, selectShow: selectShow }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ShowList);
