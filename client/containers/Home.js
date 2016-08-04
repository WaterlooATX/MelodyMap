import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {fetchShows} from '../actions/shows'
import {select_show} from '../actions/select_show'
import {getMyInfo, setTokens} from '../actions/spotify'
import {setLocation} from '../actions/location'
import ShowList from '../components/ShowList'
import DrawMap from '../components/DrawMap'

class Home extends Component {
  render() {
    return (
      <div>
        <div className="col-sm-4 text-left Main">
          <ShowList shows={this.props.shows} location={{long: this.props.location.long , lat:  this.props.location.lat}} />
        </div>
        <div className="col-sm-8 sidenav">
          <DrawMap shows={this.props.shows} location={{long:  this.props.location.long , lat: this.props.location.lat}} selectedShow={this.props.selectedShow} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow, location: state.location}};
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchShows, getMyInfo, setTokens, setLocation}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
