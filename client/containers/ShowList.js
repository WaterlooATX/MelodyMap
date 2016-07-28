import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import { fetchShows } from '../actions/shows'

class ShowList extends Component {
  constructor(props) {
    super(props)
  }


  render() {

    //console.log('shows from store', this.props.shows);
    return (
      <div>{this.props.fetchShows()}</div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchShows}, dispatch)
}

export default connect(null, mapDispatchToProps)(ShowList);
