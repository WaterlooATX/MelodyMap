import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {fetchVenuesAPI} from '../models/api'
import GenVenue from '../components/GenVenue'
import _ from 'lodash';

class Venues extends Component {

  constructor(props){
    super(props);
    this.state={
      term: '',
      notFound: false,
      showError: false,
      searchedVenues: {},
    }
  }


  _venueSearch(term) {    
    this.setState({searchedVenues: {}})
    fetchVenuesAPI(term).then(venues => {
      console.log(venues)
      if(venues.data.length){
         this.setState({notFound: false, showError: false})
      //   var mappedVenues;
      //   mappedVenues = this._mapData(venues)
      //   mappedVenues.forEach(venue => this._isInRedux(venue) ? this._getRedux(venue) : this._spotifySearch(artist));        
       } else{       
          this.setState({notFound: true, showError: true})
       }
    })
  }

  _isInRedux(venue) {
    if (this.props.venues && !this.props.venues[venue.name]) {
      return false
    } else {
      return true
    }
  }


  _mapData(venues) {
    return venues.data.map(venue => {
      return {
        address: venue.street,
        name: venue.displayName,
        city: venue.city.displayName,
        id: venue.id
      }
    })
  }

  _getRedux(venue) {
    const searchedVenues = this.state.searchedVenues
    searchedVenues[venue.name] = this.props.venues[venue.name]
    this.setState({
      searchedVenues: searchedVenues
    })
  }

  _addRedux(spotify, venue) {
    const Venues = this.props.venues
    const searchedVenues = this.state.searchedVenues
    this.setState({
      searchedVenues: searchedVenues
    })
    //redux_Artists(Artists)
  }

  _handleSubmit(event) {
      event.preventDefault()
      this._venueSearch(this.state.term)
  }

  _onInputChange(term) {
    this.setState({
      term: term
    })
  }

  render() {
    const Venues = this._createVenues();
    return (
      <div className="container">
          <div className="col col-md-10">
            <div className="page-header venues-header">
              <h1>Venues</h1>
              <form name='venueForm' id='venue-search-bar' className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
                <input
                  className="form-control"
                  value={this.state.term}
                  placeholder='Search Venues'
                  onChange={ event => this._onInputChange(event.target.value) }
                />
              </form>  
            </div>
            <div className="Venues-list">
              {Venues}
            </div>
          </div>
      </div>
    )
  }

  _createVenues() {
    const venues = this.props.venues
    const mapped = []
    for (let venueId in venues) {
      mapped.push(<GenVenue venue={venues[venueId]} key={venueId} />)
    }
    return mapped;
  }

}

const mapStateToProps = (state) => {return {shows: state.shows, venues: state.venues}};
// const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Artists: redux_Artists}, dispatch);
export default connect(mapStateToProps)(Venues);
