import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import axios from 'axios'
import {fetchShows} from '../actions/shows'
import {select_show} from '../actions/select_show'
import NavBar from '../components/NavBar';
import ShowList from '../components/ShowList';
import DrawMap from './DrawMap';
import {geolocationAPI, ipLocationAPI} from '../models/api'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      location: {long: null , lat: null}
    }
  }

  componentDidMount() {
    // get location using ip address
    ipLocationAPI().then( geo  => this._setNewCoords(geo))

    // get location using geolocation
    geolocationAPI(this._setNewCoords.bind(this))
  }

  _setNewCoords(location) {
    if (location.data) this.setState({location: {long: location.data.lon , lat: location.data.lat} });
    else if (location.coords) this.setState({location: {long: location.coords.longitude , lat: location.coords.latitude} });
    this.props.fetchShows(this.state.location);
  }

  render() {
    return (
      <div>
        <div className="container-fluid text-center">
          <div className="row content">
            <div className="col-sm-8 text-left Main">
            <ShowList shows={this.props.shows} location={this.state.location} />

            </div>
            <div className="col-sm-4 sidenav">
            <DrawMap shows={this.props.shows} location={this.state.location} selectedShow={this.props.selectedShow} />}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow}};
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchShows}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);
