import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {geolocationAPI, ipLocationAPI} from '../models/api'
import {fetchShows} from '../actions/shows'
import {setLocation} from '../actions/location'
import {select_show} from '../actions/select_show'
import {getMyInfo, setTokens} from '../actions/spotify'
import ShowList from '../components/ShowList'
import DrawMap from '../components/DrawMap'

class Home extends Component {

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
            <ShowList shows={ this.props.shows } location={{ long: this.props.location.long , lat:  this.props.location.lat }} />
          </div>
          <div className="col-sm-8 sidenav">
            <DrawMap shows={ this.props.shows } location={{ long:  this.props.location.long , lat: this.props.location.lat }} selectedShow={this.props.selectedShow} />
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow, location: state.location}};
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchShows, setLocation}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
