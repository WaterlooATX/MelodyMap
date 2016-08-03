import React from 'react';


export default class UserLogin extends React.Component {
	render(){
	  return (
	    <div className='profInfo'>
	    <ul>
	    	<img className = 'profPic' src={this.props.spotifyData.image} height='55px' width ='55px' border-radius='100%' />
	    	<button className='spotify' >
	        	Welcome {this.props.spotifyData.username}
	      	</button>
	    </ul>
	    </div>
	  );		
	}
}