import React, {Component} from "react";
import {Link} from "react-router";
import NavLogin from './NavLogin';
import {getMyInfo, setTokens} from '../actions/spotify'
import App from '../containers/App';




export default class NavBar extends Component {
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
              {!this.props.loggedIn ?        
                <NavLogin/>
                :
                console.log("logged in!", this.props.spotifyData)
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


