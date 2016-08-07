import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import SearchBar from '../components/SearchBar';
import {fetchArtistsAPI} from '../models/api';
import _ from 'lodash';


class Venues extends Component {

  componentDidMount() {
    this.props.artists ? console.log("typeof this.props.artists in VENUES: ", this.props.artists) : null;
    this.props.shows ? console.log("typeof this.props.shows in VENUES: ", this.props.shows) : null;
  }

  render() {
    const venueName = this.props.shows[0].venue.displayName
    return (
      <div>
        <div>

          <h1>{this.props.shows ? venueName : 'loading venue name...'}</h1>



        </div>
      </div>
    )
  }

// copied from artists comp, change for venues
  _createVenues() {
    const shows = this.props.shows
    const mapped = []
    for (let show in shows) {
      mapped.push(<GenVenue venue={shows[show].venue} key={show} name={shows[show].venue.displayName}/>)
    }

    return mapped
  }

}

const mapStateToProps = (state) => {return {artists: state.artists, shows: state.shows}};
// const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Artists: redux_Artists}, dispatch);
export default connect(mapStateToProps)(Venues);


// Old notes for venues component
// <h1>List of Venues</h1>
// <h5>
//   Default displayed venues could be the venues from the shows that came from the same API call for showlist on the home page.
// </h5>
// <ul>
//   <p>We should be able to search for venues</p>
//   <p>When something is typed in the search bar, we will search and display from the entire universe of venues via spotify API</p>
//   <p>We could display venues similarly to how we display minimized shows in showlist--with minimal info for each venue. This could include:</p>
//   <li>Pictures, possibly Google Street View</li>
//   <li>Brief description of venue</li>
//   <li>Next show (possibly several)</li>
//   <li>etc</li>
// </ul>


