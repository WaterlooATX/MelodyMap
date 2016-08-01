import React, {Component} from "react";
import {Link} from "react-router";
import NavLogin from './NavLogin';

export default class NavBar extends Component {
  render () {
    return (
      <div>
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
                <li><Link to="/" activeClassName="active">Home</Link></li>
                <li><Link to="/about" activeClassName="active">About</Link></li>
                <li><Link to="/concerts" activeClassName="active">Concerts</Link></li>
                <li><Link to="/artist" activeClassName="active">Artist</Link></li>
                <li><Link to="/venue" activeClassName="active">Venue</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {/* <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li> */}
                <NavLogin/>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
