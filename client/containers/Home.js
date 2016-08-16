import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {geolocationAPI, ipLocationAPI} from '../models/api'
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
    ipLocationAPI().then(location => this._setNewCoords.call(this, location, 'ip'))
    geolocationAPI(location => this._setNewCoords.call(this, location, 'geo'))
  }

  _setNewCoords(location, type) {
    if (location.data) {
      var { long, lat } = { long: location.data.lon , lat: location.data.lat };
    } else if (location.coords) {
      var { long, lat } = { long: location.coords.longitude, lat: location.coords.latitude };
    }

    this.props.setLocation({ long, lat });
    if (type !== 'geo') this.props.fetchShows(this.props.location);
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
    if(shows) {
      return <ShowList onNavigateClick={ this._onNavigateClick.bind(this)} shows={ this.props.shows }/>
    } else {
      return this._spinner()
    }
  }

  _displayMap(nav) {
    if(nav) {
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
    this.setState({ navigating: true });
  }

  _onCloseNavigate() {
    this.setState({ navigating: false });
  }

}

const mapStateToProps = (state) => {return { venues : state.venues, shows: state.shows, selectedShow: state.selectedShow, selectShow: state.selectShow, location: state.location }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchShows, setLocation, selectShow }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
