import React, {Component} from "react"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {fetchShows} from '../actions/shows'
import {select_show} from '../actions/select_show'
import {getMyInfo, setTokens} from '../actions/spotify'
import ShowList from './ShowList'
import DrawMap from '../containers/DrawMap'

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

const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow}};
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchShows, getMyInfo, setTokens}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
