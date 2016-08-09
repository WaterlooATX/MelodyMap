import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {geolocationAPI, ipLocationAPI} from '../models/api'
import {fetchShows} from '../actions/shows'
import {setLocation} from '../actions/location'
import {selectShow} from '../actions/select_show'
import {getMyInfo, setTokens} from '../actions/spotify'
import ShowList from '../components/ShowList'
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
    ipLocationAPI().then(this._setNewCoords.bind(this))
    geolocationAPI(this._setNewCoords.bind(this))
  }

  _setNewCoords(location) {
    if (location.data) this.props.setLocation({ long: location.data.lon , lat: location.data.lat })
    else if (location.coords) this.props.setLocation({ long: location.coords.longitude , lat: location.coords.latitude })
    this.props.fetchShows(this.props.location);
  }

  render() {
    return (
      <div className="container-fluid text-center">
        <div className='row content'>
          <div className="col-sm-4 text-left Main">
            <ShowList onNavigateClick={ this._onNavigateClick.bind(this) } />
          </div>
          <div className="col-sm-8 sidenav">
            {
              this.state.navigating ?
              <DrawNavigation
                location={ this.props.location }
                selectedShow={ this.props.selectedShow }
                onCloseNavigate={ this._onCloseNavigate.bind(this) }
              /> :
              <DrawMap
                shows={ this.props.shows }
                location={ this.props.location }
                selectedShow={ this.props.selectedShow }
                selectShow={ this.props.selectShow }
                onNavigateClick={ this._onNavigateClick.bind(this) }
              />
            }
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

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow, selectShow: state.selectShow, location: state.location }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchShows, setLocation, selectShow }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
