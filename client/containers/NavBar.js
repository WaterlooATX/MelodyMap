import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux';
import { fetchShows } from '../actions/shows';

class NavBar extends Component {
  componentDidMount() {
    this.props.fetchShows()
    console.log('shows from store', this.props.shows);
  }
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
            <a className="navbar-brand" href="#">Logo</a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Artist</a></li>
              <li><a href="#">Venues</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchShows}, dispatch)
}

export default connect(null, mapDispatchToProps)(NavBar);
