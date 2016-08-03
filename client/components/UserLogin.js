import React from 'react';


export default class UserLogin extends React.Component {
	render(){
	  return (
	    <div className='profInfo'>
	    <ul>
	    	<img className = 'profPic' src={this.props.spotifyData.image} height='55px' width ='55px' />
	    	<button className='spotify' >
	        	<i className='fa fa-spotify fa-2x'></i><div className='aLink'> {this.props.spotifyData.username.split(' ')[0]}</div>
	      	</button>
	    </ul>
	    </div>
	  );		
	}
}
