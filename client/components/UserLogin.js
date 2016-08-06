import React from 'react';

const UserLogin = (props) => {
  return (
    <div className='profInfo'>
      <img className = 'profPic' src={props.spotifyData.image} height='55px' width ='55px' />
      <button className='spotify' >
        <i className='fa fa-spotify fa-2x'></i><div className='aLink'> { props.spotifyData.username.split(' ')[0] } </div>
      </button>
    </div>
  );    
}

export default UserLogin;
