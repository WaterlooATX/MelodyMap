import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {fetchShows} from '../actions/shows'
import {select_show} from '../actions/select_show'
import {geolocationAPI, ipLocationAPI} from '../models/api'
import {getMyInfo, setTokens} from '../actions/spotify'
import {setLocation} from '../actions/location'
import NavBar from '../components/NavBar'


class App extends Component {

  componentDidMount() {
    ipLocationAPI().then(this._setNewCoords.bind(this))
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
    if (location.data) this.props.setLocation({long: location.data.lon , lat: location.data.lat})
    else if (location.coords) this.props.setLocation({long: location.coords.longitude , lat: location.coords.latitude})
    this.props.fetchShows(this.props.location);
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


const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow, location: state.location}};
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchShows, getMyInfo, setTokens, setLocation}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);
