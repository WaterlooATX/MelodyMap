import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import { fetchShows } from '../actions/shows'

class ShowList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchShows()
    console.log('shows from store', this.props.shows);
  }

  render() {
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchShows}, dispatch)
}

export default connect(null, mapDispatchToProps)(ShowList);
