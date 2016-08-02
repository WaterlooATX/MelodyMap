import React, {Component} from "react";
import {Link} from "react-router";
import NavLogin from './NavLogin';

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
              <Link to="/" className="navbar-brand" activeClassName="active">Melody Map</Link>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li><Link to="/artists" activeClassName="active">Artists</Link></li>
                <li><Link to="/venues" activeClassName="active">Venues</Link></li>
                <li><Link to="/contact" activeClassName="active">Contact</Link></li>
                <li><Link to="/about" activeClassName="active">About</Link></li>
              </ul>
              <ul>
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
