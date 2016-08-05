import React, {Component} from "react";
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {Link} from "react-router";
import {getMyInfo, setTokens} from '../actions/spotify'
import NavLogin from '../components/NavLogin';
import UserLogin from '../components/UserLogin';
import {followArtist} from '../models/spotify'


export default class NavBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      spotifyData: {username: '', image: ''}
    }
  }

  componentDidMount() {
    // grab url, send accessToken/refreshToken to actions
    const url = document.location.href.split('/')
    const self = this;
    if(url[5]){
      //Spotify call to follow artist
      // followArtist(url[5],'3TNt4aUIxgfy9aoaft5Jj2')
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
              <ul>
              {!this.state.loggedIn ?
                <NavLogin/>
                :
                <UserLogin spotifyData={this.state.spotifyData}/>
              }
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }

}

class NavLink extends Component{
  render() {
    return <Link {...this.props} activeClassName="active"/>
  }
}

const mapStateToProps = (state) => {return { }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ getMyInfo, setTokens}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
