import React, {Component} from "react"
import NavLogin from './NavLogin'

export default class NavBar extends Component {
  render () {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Melody Map</a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Concerts</a></li>
              <li><a href="#">Artist</a></li>
              <li><a href="#">Venues</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {/* <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li> */}
              <NavLogin/>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
