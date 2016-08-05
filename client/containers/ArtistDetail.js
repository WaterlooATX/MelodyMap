import React, {Component} from 'react';
import NavBar from './NavBar';


export default class ArtistDetail extends Component {

  // componentDidMount() {
  //   const query = this.props.location.query;
  // }

  render() {
    return (
      <div>
        <div>
          {/* Display Artist */}
          <h1>
            {`${this.props.location.query.artist}
            with spotify artist id of`}
          </h1>
          <h3>
            {`List information for a ${this.props.location.query.artist} here. `}
            This will include:
          </h3>
          <ul>
            <li>Artist Pictures</li>
            <li>Artist Bio</li>
            <li>Spofity Song Previews (3)</li>
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