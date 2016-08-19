import React, {Component} from 'react'
import {Link} from 'react-router';

export default class VenueItem extends Component {
  constructor(props) {
    super(props);
    this.state={
    	image: 'https://ivacationinyourhell.files.wordpress.com/2012/12/night-shift.jpg',
    }
  }


  render() {
    const venue = this.props.venue
    return (
      <div className="col-md-4 gridding" id={`heading${venue.id}`}>
	        <div className ="artist-label" id='selected'>	     
		        <Link className = "selArtist"
		           		 id='selArtist'
		              	 to={ `/venue/${venue.name}/${venue.id}`}
		              	 activeClassName='active'>
		          
				     	<img
			              className="genImage"
			              src={this.state.image}
			              //onMouseOver={this._randomAlbumArt.bind(this)}
			              height="105"
			              width="105"
		            	/>
            	<br/>
	            	<div className="artist-tem-name">
	            		{venue.name}
	            	</div>
		        </Link>
	        </div>
	        <div className="genvenue-address">
	          <h4>
	            <a className = "venueAddress"
	               href={`http://maps.google.com/?q=${venue.address}`} target='_blank'>
	                 <i id="marker" className="fa fa-map-marker fa-4" aria-hidden="true"></i>
	                 {venue.address}
	            </a>
	          </h4>
	        </div>
	  </div>
    )
  }
}
