import React, {Component} from 'react';
import NavBar from './NavBar';


export default class Venue extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>List of Venues</h1>
          <h5>
            Default displayed venues could be the venues from the shows that came from the same API call for showlist on the home page.
          </h5>
          <ul>
            <p>We should be able to search for venues</p>
            <p>When something is typed in the search bar, we will search and display from the entire universe of venues via spotify API</p>
            <p>We could display venues similarly to how we display minimized shows in showlist--with minimal info for each venue. This could include:</p>
            <li>Pictures, possibly Google Street View</li>
            <li>Brief description of venue</li>
            <li>Next show (possibly several)</li>
            <li>etc</li>
          </ul>
        </div>
      </div>
    )
  }
}