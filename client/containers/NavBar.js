import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getMyInfo, setTokens} from '../actions/actions';
import NavLogin from '../components/NavLogin';
import UserLogin from '../components/UserLogin';
import SongkickSearch from './SongkickSearch';
import {followArtist} from '../models/spotify';


class NavBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      spotifyData: {
        username: '',
        image: ''
      },
    }
  }

  componentDidMount() {
    // grab url, send accessToken/refreshToken to actions
    const url = document.location.href.split("/");
    const self = this;
    if (url[5]) {
      //Spotify call to follow artist followArtist(url[5],'3TNt4aUIxgfy9aoaft5Jj2')
      this.setState({
        loggedIn: true
      });
      this.props.setTokens(url[5], url[6]);
      this.props.getMyInfo().then(data => self._checkData(data.payload))
    }
  }

  _checkData(data) {
    if (data.display_name || data.images[0]) {
      this.setState({
        spotifyData: {
          username: data.display_name,
          image: data.images[0].url
        }
      })
    } else {
      this.setState({
        spotifyData: {
          username: data.id,
          image: "http://assets.audiomack.com/default-artist-image.jpg"
        }
      })
    }
  }

  render() {
    // have NavLinks comes back in after a specified Timeout to prevent pre-load erros
    setTimeout(function() {
      $('li a').css('z-index', 10);
    }, 4500);

    return (
      <div>
        <nav className="navbar navbar-default home-navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <NavLink to="/" className="navbar-brand" onlyActiveOnIndex onClick={ this.props.onLink.bind(this, true) }>Melody Map</NavLink>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li><NavLink to="/artists" activeClassName="active" onClick={ this.props.onLink.bind(this, false) } style={{ zIndex: -10 }}>Artists</NavLink></li>
                <li><NavLink to="/venues" activeClassName="active" onClick={ this.props.onLink.bind(this, false) } style={{ zIndex: -10 }}>Venues</NavLink></li>
              </ul>
              <div className="nav-container">
                <SongkickSearch visibleSearch={ this.props.visibleSearch } />
              {!this.state.loggedIn ? <NavLogin /> : <UserLogin spotifyData={this.state.spotifyData}/>}
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }

}

class NavLink extends Component {
  render() {
    return <Link {...this.props} activeClassName="active"/>
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ getMyInfo, setTokens }, dispatch);
export default connect(null, mapDispatchToProps)(NavBar);
