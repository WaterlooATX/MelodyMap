import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import SearchBar from '../components/SearchBar'
import GenVenue from '../components/GenVenue'
import _ from 'lodash';


class Venues extends Component {

  // componentDidMount() {
  //   this.props.venues ? console.log("this.props.venues in VENUES: ", this.props.venues) : console.log('null ' , null);
  //   this.props.shows ? console.log("this.props.shows in VENUES: ", this.props.shows) : null;
  // }


  render() {
    const Venues = this._createVenues();
    return (
      <div className="container">
        <div className="col col-md-1"></div>
          <div className="col col-md-10">
            <div className="page-header">
              <h1>Venues</h1>
              <SearchBar />
            </div>
              <div className="">
              {Venues}
              </div>
          </div>
        <div className="col col-md-1"></div>
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
