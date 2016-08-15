import React, {Component} from 'react';
import {Link} from 'react-router';
import {Songkick_getVenueAPI} from '../models/api';
import Venues from '../containers/Venues';

export default class GenVenue extends Component {

  render() {
    let venue = this.props.venue

    return (
      <div className="genvenue-venue" id={`heading${venue.id}`}>
        <h1>
          <Link className = "genvenue-name-link"
              to={ `/venue/${venue.name}/${venue.id}`}
              activeClassName='active'>{venue.name}
          </Link>
        </h1>
        <h4>
          <a className = "venueAddress"
             href={`http://maps.google.com/?q=${venue.address}`} target='_blank'>{venue.address}
             <i id="marker" className="fa fa-map-marker fa-4" aria-hidden="true"></i>
          </a>
        </h4>
      </div>
    )
  }

}



// export default class GenVenue extends Component {

//   render() {
//     let venue = this.props.venue

//     return (
//       <div className="genvenue-venue" id={`heading${venue.id}`}>
//         <h1>
//           <Link className = "genvenue-name-link"
//               to={ `/venue/${venue.name}/${venue.id}`}
//               activeClassName='active'>{venue.name}
//           </Link>
//         </h1>
//         <h4>{venue.address}</h4>
//       </div>
//     )
//   }

// }

