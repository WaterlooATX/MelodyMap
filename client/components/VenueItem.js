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
			              //onMouseOver={this._randomAlbumArt.bind(this)}
			              height="105"
			              width="105"
		            	/>
            	<br/>
                <a className = "venueAddress"
                   href={`http://maps.google.com/?q=${venue.address}`} target='_blank'>
                     <i id="marker" className="fa fa-map-marker fa-4" aria-hidden="true"></i>
                </a>
	            	<div className="artist-tem-name">
	            		{venue.name}
	            	</div>
		        </Link>
	        </div>
	  </div>
    )
  }
}
