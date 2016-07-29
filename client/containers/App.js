import NavBar from '../components/NavBar';
import Main from '../components/Main';
import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {fetchShows} from '../actions/shows'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      location: {long: "-97.7431" , lat: "30.2669444"}
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((geo) => this.setState({location: {long: geo.coords.longitude , lat: geo.coords.latitude} }));
    this.props.fetchShows(this.state.location);
  }

  render() {
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
  return bindActionCreators({fetchShows}, dispatch)
}
// i want to read this
function mapStateToProps(state) {
  return { shows: state.shows }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
