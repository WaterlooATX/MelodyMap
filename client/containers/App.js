import NavBar from '../components/NavBar';
import Main from '../components/Main';
import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {fetchShows} from '../actions/shows'
import {selectShow} from '../actions/select_show'
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      location: {long: -97.7431 , lat: 30.2669444}
    }
  }

  componentDidMount() {
    // get geolocation using ip address
    axios('http://ip-api.com/json').then( geo  => this.setState({location: {long: geo.data.lon , lat: geo.data.lat} }))

    this.props.fetchShows(this.state.location);
  }

  render() {
    navigator.geolocation.getCurrentPosition((geo) => this.setState({location: {long: geo.coords.longitude , lat: geo.coords.latitude} }));
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
