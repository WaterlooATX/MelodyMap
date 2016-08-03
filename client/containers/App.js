import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {fetchShows} from '../actions/shows'
import {select_show} from '../actions/select_show'
import {geolocationAPI, ipLocationAPI} from '../models/api'
import {getMyInfo, setTokens} from '../actions/spotify'
import NavBar from '../components/NavBar'


class App extends Component {

  constructor() {
    super()
    this.state = {
      location: {long: null , lat: null}
    }
  }

  componentDidMount() {
    // get location using ip address

    ipLocationAPI().then( geo  => this._setNewCoords(geo))

    // get location using geolocation
    geolocationAPI(this._setNewCoords.bind(this))
    const {dispatch, params} = this.props;
    const url = document.location.href.split('/')
    const {accessToken, refreshToken} = params;
    if(url[5]){
      this.props.setTokens(url[5], url[6]);
      this.props.getMyInfo()
    }
  }


  _setNewCoords(location) {
    if (location.data) this.setState({location: {long: location.data.lon , lat: location.data.lat} });
    else if (location.coords) this.setState({location: {long: location.coords.longitude , lat: location.coords.latitude} });
    this.props.fetchShows(this.state.location);
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="container-fluid text-center">
          <div className="row content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow}};
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchShows, getMyInfo, setTokens}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);
