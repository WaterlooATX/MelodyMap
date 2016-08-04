import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {fetchShows} from '../actions/shows'
import {select_show} from '../actions/select_show'
import {geolocationAPI, ipLocationAPI} from '../models/api'
import {getMyInfo, setTokens} from '../actions/spotify'
import {setLocation} from '../actions/location'
import NavBar from '../containers/NavBar'


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      spotifyData: {username: '', image: ''},
    }

  }

  componentDidMount() {

    ipLocationAPI().then(this._setNewCoords.bind(this))
    geolocationAPI(this._setNewCoords.bind(this))
    // grab url, send accessToken/refreshToken to actions

    const url = document.location.href.split('/')
    const self = this;
    if(url[5]){
      this.setState({loggedIn: true});
      this.props.setTokens(url[5], url[6]);

      this.props.getMyInfo().then(function(data){
        {data.payload.display_name || data.payload.images[0] ?
          self.setState({spotifyData: {username: data.payload.display_name, image: data.payload.images[0].url}})
          :
          self.setState({spotifyData: {username: data.payload.id, image: 'http://assets.audiomack.com/default-artist-image.jpg'}})
        }
      })
    }
  }


  _setNewCoords(location) {
    if (location.data) this.props.setLocation({long: location.data.lon , lat: location.data.lat})
    else if (location.coords) this.props.setLocation({long: location.coords.longitude , lat: location.coords.latitude})
    this.props.fetchShows(this.props.location);
  }

  render() {
    {console.log('this.props ' , this.props)}
    return (
      <div>
        <NavBar loggedIn={this.state.loggedIn} spotifyData={this.state.spotifyData}/>
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
