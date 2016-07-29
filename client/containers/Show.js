import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux';
import { fetchShows } from '../actions/shows';
import AustinJSON from '../../songkickEventsAustinJSON';


class Show extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchShows()
  }

  render() {
    return (
      <div className="list-group">
        {

          //this.props.shows
          austinEvents
          .map(show => {
            return (
              <div key={show._id} className="list-group-item">
                <div className="show-name list-group-item-heading"><h4> { show.displayName }</h4></div>
                <div className="show-venue"><h6> { show.venue.displayName }</h6></div>
                <div className="show-date"><h6> { show.start.date }</h6></div>
                <div className="show-location"><h6> { show.location.city }</h6></div>
              </div>
            )
          })

        }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchShows}, dispatch)
}

export default connect(null, mapDispatchToProps)(ShowList);
