import React, {Component} from 'react'
import {Link} from 'react-router';

export default class VenueItem extends Component {

  render() {
    const venue = this.props.venue
    const image = venue.photo ? venue.photo : 'https://ivacationinyourhell.files.wordpress.com/2012/12/night-shift.jpg'
    return (
      <div className="col-md-4 gridding" id={`heading${venue.id}`}>
	        <div className ="artist-label" id='selected'>
		        <Link className = "selArtist"
		           	  id='selArtist'
		              to={ `/venue/${venue.name}/${venue.id}`}
		              activeClassName='active'>
			     	<img
		              className="genImage"
		              src={image}
		              height="105"
		              width="105"
	            	/>
	            	<br/>
		            <div className="venue-item-name">
				        {venue.name}
				    </div>
		        </Link>
	        </div>
        	<div className="genvenue-address">
                <div className = "venueAddressLink"
                   href={`http://maps.google.com/?q=${venue.address}`} target='_blank'>
                   	<div className="mapIcon">
                     	<i id="marker" className="fa fa-map-marker fa-4" aria-hidden="true"></i>
                    </div>
                </div>	            
                <div className='venueStreetAddress'>
                    {venue.city + ', ' + venue.state}
                </div>
            </div>
	  </div>
    )
  }
}
