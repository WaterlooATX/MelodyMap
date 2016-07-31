import NavBar from '../components/NavBar';
import Main from '../components/Main';
import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {fetchShows} from '../actions/shows'
import {select_show} from '../actions/select_show'
import axios from 'axios'
import ArtistPage from '../components/ArtistPage';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      location: {long: null , lat: null}
    }
  }

  componentDidMount() {
    // get location using ip address
    axios('http://ip-api.com/json')
    .then( geo  => {
      this._setNewCoords(geo);
    });

    // get location using geolocation
    navigator.geolocation.getCurrentPosition(this._setNewCoords.bind(this));
  }

  _setNewCoords(location) {
    if (location.data) this.setState({location: {long: location.data.lon , lat: location.data.lat} });
    else if (location.coords) this.setState({location: {long: location.coords.longitude , lat: location.coords.latitude} });
    this.props.fetchShows(this.state.location);
  }

  render() {
    return (
      <div>
        <NavBar />
        <Main shows={this.props.shows} location={this.state.location} selectedShow={this.props.selectedShow} />
      </div>
    );
  }
}

// hey i want to set this
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchShows}, dispatch)
}
// i want to read this
function mapStateToProps(state) {
  return { shows: state.shows, selectedShow: state.selectedShow}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
