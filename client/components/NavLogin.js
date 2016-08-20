import React from 'react';

const NavLogin = (props) => {
  return (
    <div className="NavLogin">
      <button type="button" className="spotify" onClick={function () { window.location.href = '/login'; }}>
        <i className="fa fa-spotify fa-2x"></i><a className="aLink" href="/login">Login with Spotify</a>
      </button>
    </div>
  );
};

export default NavLogin;
