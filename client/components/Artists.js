import React, {Component} from 'react';
import NavBar from './NavBar';


export default class Artists extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>List of Artists</h1>
          <h5>
            Default displayed artists could be the artists from the shows that came from the same API call for showlist on the home page.
          </h5>
          <ul>
            <p>We should be able to search for artists</p>
            <p>When something is typed in the search bar, we will search and display from the entire universe of artists via spotify API</p>
            <p>We could display artists similarly to how we display minimized shows in showlist--with minimal info for each artist. This could include:</p>
            <li>Artist Pictures</li>
            <li>Spofity Song Preview (1)</li>
            <li>Upcoming show</li>
            <li>Brief intro or bio</li>
            <li>etc</li>
          </ul>
        </div>
      </div>
    )
  }
}