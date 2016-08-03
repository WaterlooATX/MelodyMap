import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {fetchShows} from '../actions/shows'
import {select_show} from '../actions/select_show'
import {getMyInfo, setTokens} from '../actions/spotify'
import ShowList from '../components/ShowList'
import DrawMap from './DrawMap'
import {location} from '../actions/location'

class Home extends Component {
  render() {
    return (
      <div>
        <div className="col-sm-4 text-left Main">
          <ShowList shows={this.props.shows} location={{long: -97.7431 , lat: 30.2672}} />
        </div>
        <div className="col-sm-8 sidenav">
          <DrawMap shows={this.props.shows} location={{long: -97.7431 , lat: 30.2672}} selectedShow={this.props.selectedShow} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow, location: state.location}};

export default connect(null, mapStateToProps)(Home);
