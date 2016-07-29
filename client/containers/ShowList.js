import React, {Component} from "react"
import {connect} from "react-redux"


class ShowList extends Component {


  render() {
    console.log('shows from store', this.props.shows);
    return (
      <div className="list-group">
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { shows: state.shows}
}


export default connect(mapStateToProps)(ShowList)
// austinEvents
// .map(show => {
//   return (
//     <div key={show._id} className="list-group-item">
//       <div className="show-name list-group-item-heading"><h4> { show.displayName }</h4></div>
//       <div className="show-venue"><h6> { show.venue.displayName }</h6></div>
//       <div className="show-date"><h6> { show.start.date }</h6></div>
//       <div className="show-location"><h6> { show.location.city }</h6></div>
//     </div>
//   )
// })
