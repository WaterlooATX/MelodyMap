import React, {Component} from 'react';
import NavBar from './NavBar';


export default class ArtistPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div>
          <h1>Artist Name</h1>
          <h3>
            List information for a given artist here.
            This will include:
          </h3>
          <ul>
            <li>Artist Pictures</li>
            <li>Artist Bio</li>
            <li>Spofity Song Previews (3)</li>
            <li>Upcoming Shows (sortable by both proximity or date)</li>
            <li>etc</li>
          </ul>
        </div>
      </div>
    )
  }
}