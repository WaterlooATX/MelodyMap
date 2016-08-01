import React from 'react';

export default function NavLogin() {
  return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span className="caret"></span></a>
    <ul id="login-dp" className="dropdown-menu">
      <li>
         <div className="row">
            <div className="col-md-12"> 
              <div className="social-buttons">
                <a href="/login"><i className="fa fa-spotify"></i> Login with Spotify</a>
              </div>
            </div>
         </div>
      </li>
    </ul>
      </li>
  );
}
