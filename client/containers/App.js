import NavBar from '../components/NavBar';
import Main from '../components/Main';
import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {fetchShows} from '../actions/shows'



var called = false
function App(props) {

  const getLocationFetchShows = () =>  {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => props.fetchShows(position));
      } else {
        console.log("Geolocation is not supported by this browser.")
      }
  }

  // only call once
  if(!called) {
    getLocationFetchShows()
    called = true
  }

  return (
    <div>
      <NavBar />
      <Main shows={props.shows} />
    </div>
  );
}

// hey i want to set this
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchShows}, dispatch)
}
// i want to read this
function mapStateToProps(state) {
  return { shows: state.shows}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
