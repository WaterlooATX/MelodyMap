import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {Link} from 'react-router';
import moment from 'moment';
import {Spotify_searchArtistsAPI, Songkick_getVenueAPI} from '../models/api';
import {redux_Artists, redux_Venues, selectShow} from '../actions/actions'
import Speaker from './Speaker'
import {topTrack, toggleSound} from '../models/helpers'
import DropdownArtists from '../components/DropdownArtists'


class Show extends Component {

  constructor(props) {
    super(props)
    this.state ={
      bands : [],
      clicked: false,
      venueInfo: null
    }
  }

  componentWillMount() {
    this._getVenue(this.props.venueID)
    this._setArtistInfo(this.props.showArtists)
  }


  render() {
    const props = this.props;
    const thisArtist = props.artists[props.showArtists[0].displayName];
    const img = thisArtist ? thisArtist.img ? thisArtist.img : "http://assets.audiomack.com/default-artist-image.jpg" : "http://assets.audiomack.com/default-artist-image.jpg";
    return (
      <div className="panel panel-default">
        <div className="panel-heading show-panel-heading" role="tab" id={`heading${props.id}`}>
          <h4 className={ this._checkSelected(props.selected) }>
            <a
              onClick={this._onClickHandler.bind(this, `heading${props.id}`)}
              role="button" data-toggle="collapse"
              data-parent="#accordion"
              href={`#collapse${props.id}`}
              aria-expanded="true"
              aria-controls={`collapse${props.id}`}
            >
              <img src={ img } alt={props.id} height="65" width="65"/>
               <p className="artist">{ props.showArtists[0].displayName }</p>
               <p className="venue">{ props.venue } - { props.city }</p>
               <p className="date">{ moment(props.startDate, "YYYY-MM-DD").calendar().split(' at')[0] }</p>
            </a>
            <Speaker track={topTrack(thisArtist)} size={3}/>
          </h4>
        </div>
        <div id={`collapse${props.id}`} data-parent="#accordion" className="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading${props.id}`}>
            <div className="panel-body">
              <DropdownArtists
                bands={ this.state.bands }
                doorsOpen={ this._doorsOpen() }
                venue={ this.state.venueInfo }
                songkick={ props.songkick }
                artists={ this.props.artists }
                onNavigateClick={ this.props.onNavigateClick }
              />
            </div>
        </div>
      </div>
    )
  }

  _getVenue(id) {
    if(this.props.venues[id]) {
      this.setState({venueInfo: this.props.venues[id]})
    } else {
      Songkick_getVenueAPI(id).then(venue => this._addVenueRedux(venue.data))
    }
  }

  _addVenueRedux(venue) {
    const reduxVenues = this.props.venues
    // Build venue entry in redux state
    reduxVenues[venue.id] = venue
    // add to redux venues
    redux_Venues(reduxVenues)
    this.setState({venueInfo: venue})
  }


  _doorsOpen() {
    // doorsOpen variable set to display pretty date with moment.js
    let doorsOpen = new Date(this.props.startDate).toISOString();
    doorsOpen = doorsOpen.split(/[T\.]/);
    doorsOpen[1] = this.props.doorsOpen;
    doorsOpen = moment(doorsOpen[0].concat('T').concat(doorsOpen[1]).concat('.').concat(doorsOpen[2])).calendar();
    return doorsOpen
  }

  _setArtistInfo(showArtists) {
    let count = 0
    let bandMembers = []
    showArtists.forEach(Artist => {
      // add bandMembers names to array
      bandMembers.push(Artist.displayName)
      count++
       if(count === showArtists.length) {
         this.setState({bands: bandMembers})
       }
    })
  }

  // Tests selected show in redux state and conditionally sets
  // inline style property for show list item if it is selected show
  _checkSelected(propsSelected) {
    return (propsSelected) ? "active panel-title list-group-item" : "panel-title list-group-item";
  }

  // Sends the show's id back to the parent (ShowList.js) on click
  _onClickHandler(DOMString, event) {
    event.preventDefault();
    this.props.sendToState(this.props.id);
    // get tracks only on click
    if(!this.state.clicked) {
      this.setState({clicked: true});
    }
    setTimeout(function(){
      $('.Main').scrollTo(`#${DOMString}`, 250);
    }, 400);
  }

}

const mapStateToProps = (state) => {return { shows: state.shows, artists: state.artists, venues: state.venues }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ selectShow, redux_Venues }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Show);
