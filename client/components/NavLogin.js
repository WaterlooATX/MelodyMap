import React from 'react';


export default function NavLogin() {
  return (
    <div>
      <button type='button' className='spotify'>
        <i className='fa fa-spotify fa-2x'></i><a className='aLink' href="/login">Login with Spotify</a>
      </button>
    </div>
  );
}

