import React, {Component} from 'react';
import NavBar from './NavBar';


export default class VenueDetail extends Component {
  render() {
    return (
      <div>
        <div>
          {console.log(this.props)}
          <h1>{`${this.props.location.query.venue}`}</h1>
          <h3>
            List information for a given venue here.
            This will include:
          </h3>
          <ul>
            <li>Venue Pictures</li>
            <li>Venue Description (if available)</li>
            <li>Upcoming Shows (sortable by both proximity or date)
                This will most likely be the recycled Show/ShowList
                componenets.
            </li>
            <li>etc</li>
          </ul>
        </div>
      </div>
    )
  }
}