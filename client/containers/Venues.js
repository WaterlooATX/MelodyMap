import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import SearchBar from '../components/SearchBar'
import GenVenue from '../components/GenVenue'
import _ from 'lodash';

class Venues extends Component {

  render() {
    const Venues = this._createVenues();
    return (
      <div className="container">
          <div className="col col-md-10">
            <div className="page-header venues-header">
              <h1>Venues</h1>
              <SearchBar />
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
