import NavBar from '../components/NavBar';
import Main from '../components/Main';
import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {fetchShows} from '../actions/shows'
import {fetchGeoLocation} from '../actions/shows'

class App extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchGeoLocation()
    navigator.geolocation.getCurrentPosition((position) => this.props.fetchShows(position));
  }
  render() {
    console.log("this.props.location", this.props.location)
    return (
      <div>
        <NavBar />
        <Main shows={this.props.shows} />
      </div>
    );
  }

}

// hey i want to set this
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchShows,fetchGeoLocation}, dispatch)
}
// i want to read this
function mapStateToProps(state) {
  return { shows: state.shows, location: state.location}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
