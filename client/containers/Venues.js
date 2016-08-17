import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {redux_Venues} from '../actions/actions'
import {fetchVenuesAPI, Songkick_getVenueAPI} from '../models/api'
import GenVenue from '../components/GenVenue'
import _ from 'lodash';
import {isReduxLoaded} from '../models/helpers';


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
    var mappedVenues = []
    this.setState({searchedVenues: {}})
    fetchVenuesAPI(term).then(venues => {
      if(venues.data.length){
         this.setState({notFound: false, showError: false})
          venues.data.forEach((venue) =>{
            mappedVenues.push(venue)             
          })    
        mappedVenues.forEach(venue => this._isInRedux(venue) ? this._getRedux(venue) : this._songkickSearch(venue));        
       } else{       
          this.setState({notFound: true, showError: true})
       }
    })
  }

  _songkickSearch(venue){
    Songkick_getVenueAPI(venue.id).then(venues=>{
      this._addRedux(venues.data)
    })
  }


  _isInRedux(venue) {
    if (this.props.venues && !this.props.venues[venue.id]) {
      return false
    } else {
      return true
    }
  }

  _getRedux(venue) {
    const searchedVenues = this.state.searchedVenues
    searchedVenues[venue.id] = this.props.venues[venue.id]
    this.setState({
      searchedVenues: searchedVenues
    })
  }

  _addRedux(venue) {
    const Venues = this.props.venues
    const searchedVenues = this.state.searchedVenues
    searchedVenues[venue.id] = venue
    Venues[venue.id] = venue
    this.setState({
      searchedVenues: searchedVenues
    })
    redux_Venues(Venues)
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

  _venueList(){
    return isReduxLoaded(this.state.searchedVenues) ? this.state.searchedVenues : this.props.venues
  }

  render() {
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
              <GenVenue venues={this._venueList()} />
            </div>
          </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {return {shows: state.shows, venues: state.venues}};
const mapDispatchToProps = (dispatch) => bindActionCreators({redux_Venues: redux_Venues}, dispatch);
export default connect(mapStateToProps)(Venues);
