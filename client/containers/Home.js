import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {geolocationAPI, ipLocationAPI, googleapis_geolocation} from '../models/api'
import {getMyInfo, setTokens,selectShow,fetchShows,setLocation} from '../actions/actions'
import ShowList from './ShowList'
import DrawMap from '../components/DrawMap'
import DrawNavigation from '../components/DrawNavigation'


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navigating: false
    };
  }

  componentWillMount() {
    googleapis_geolocation()
      .then(l => this._setNewCoords(l.data.location.lat, l.data.location.lng))
  }

  _setNewCoords(lat, long) {
    this.props.setLocation({
      lat,
      long
    });
    this.props.fetchShows(this.props.location);
  }

  _spinner() {
    return (
      <div className="spinner">
        <span className="glyphicon glyphicon-cd" aria-hidden="true"></span>
        <h1>&nbsp;&nbsp;Fetching your location...</h1>
      </div>
    )
  }

  _displayShowList(shows) {
    if (shows) {
      return <ShowList onNavigateClick={ this._onNavigateClick.bind(this)} shows={ this.props.shows }/>
    } else {
      return this._spinner()
    }
  }

  _displayMap(nav) {
    if (nav) {
      return (
        <DrawNavigation
          location={ this.props.location }
          selectedShow={ this.props.selectedShow }
          onCloseNavigate={ this._onCloseNavigate.bind(this) }
        />
      )
    } else {
      return (
        <DrawMap
          shows={ this.props.shows }
          location={ this.props.location }
          selectedShow={ this.props.selectedShow }
          selectShow={ this.props.selectShow }
          onNavigateClick={ this._onNavigateClick.bind(this) }
          venues = {this.props.venues}
        />
      )
    }
  }

  render() {
    return (
      <div className="container-fluid text-center">
        <div className='row content'>
          <div className="col-sm-4 text-left Main">
            {this._displayShowList(this.props.shows.length)}
          </div>
          <div className="col-sm-8 sidenav">
          {this._displayMap(this.state.navigating)}
          </div>
        </div>
      </div>
    )
  }

  _onNavigateClick() {
    this.setState({
      navigating: true
    });
  }

  _onCloseNavigate() {
    this.setState({
      navigating: false
    });
  }

}

const mapStateToProps = (state) => {return { venues : state.venues, shows: state.shows, selectedShow: state.selectedShow, selectShow: state.selectShow, location: state.location }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchShows, setLocation, selectShow }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
