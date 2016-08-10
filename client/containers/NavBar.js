import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {setLocation} from '../actions/location';
import {fetchShows} from '../actions/shows';
import {getMyInfo, setTokens} from '../actions/spotify';
import NavLogin from '../components/NavLogin';
import UserLogin from '../components/UserLogin';
import {followArtist} from '../models/spotify';
import {Google_geocoder, Songkick_getShows} from '../models/api';


class NavBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      spotifyData: { username: '', image: '' },
      startDate: moment(),
      endDate: moment(),
      city: ''
    }
  }

  componentDidMount() {
  // grab url, send accessToken/refreshToken to actions
    const url = document.location.href.split("/")
    const self = this;
    //Spotify call to follow artist followArtist(url[5],'3TNt4aUIxgfy9aoaft5Jj2')
      this.setState({loggedIn: true});
      this.props.setTokens(url[5], url[6]);

      this.props.getMyInfo().then( (data) => {
        {
          data.payload.display_name || data.payload.images[0] ? self.setState({spotifyData: {username: data.payload.display_name, image: data.payload.images[0].url}}) : self.setState({spotifyData: {username: data.payload.id, image: "http://assets.audiomack.com/default-artist-image.jpg"}})
        }
      })
    }
  }

  render () {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <NavLink to="/" className="navbar-brand" onlyActiveOnIndex>Melody Map</NavLink>

            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li><NavLink to="/artists" activeClassName="active">Artists</NavLink></li>
                <li><NavLink to="/venues" activeClassName="active">Venues</NavLink></li>
                {/* <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
                <li><NavLink to="/about" activeClassName="active">About</NavLink></li> */}
              </ul>
                <div className="nav-container">
                <form className="songkick-search">
                <DatePicker
                  minDate={moment()}
                  placeholderText="Click to select a date"
                  todayButton={'Today'}
                  selected={ this.state.startDate }
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={ this._onStartChange.bind(this) }
                />
                <DatePicker
                  minDate={moment()}
                  placeholderText="Click to select a date"
                  todayButton={'Today'}
                  selected={ this.state.endDate }
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={ this._onEndChange.bind(this) }
                />
                <input
                  placeholder="City"
                  value={ this.state.city }
                  onChange={ event => this._onCityChange(event.target.value) }
                />
                <button type="submit" onClick={this._onSubmit.bind(this)}>Search</button>
              </form>
              {!this.state.loggedIn ? <NavLogin /> : <UserLogin spotifyData={this.state.spotifyData}/>}
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }

  _onStartChange(startDate) {
    this.setState({startDate});
  }

  _onEndChange(endDate) {
    this.setState({endDate});
  }

  _onCityChange(city) {
    this.setState({city});
  }

  _onSubmit(event) {
    event.preventDefault();
    let startDate = this.state.startDate.toISOString().slice(0, 10);
    let endDate = this.state.endDate.toISOString().slice(0, 10);
    // get coordinate from city name
    if (this.state.city) {
      Google_geocoder(this.state.city).then(resp => {
        let lat = resp.data.results[0].geometry.location.lat;
        let long = resp.data.results[0].geometry.location.lng;
        this.props.setLocation({long, lat})
        this.props.fetchShows({long, lat, startDate, endDate});
      })
    } else {
      let lat = this.props.location.lat;
      let long = this.props.location.long;
      this.props.fetchShows({long, lat, startDate, endDate});
    }
  }

}

class NavLink extends Component{
  render() {
    return <Link {...this.props} activeClassName="active"/>
  }
}

const mapStateToProps = (state) => {return { location: state.location }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ setLocation, fetchShows, getMyInfo, setTokens }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
