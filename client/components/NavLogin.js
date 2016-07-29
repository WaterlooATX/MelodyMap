import React from 'react';

export default function NavLogin() {
  return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span className="caret"></span></a>
    <ul id="login-dp" className="dropdown-menu">
      <li>
         <div className="row">
            <div className="col-md-12">
              Login via
              <div className="social-buttons">
                <a href="#" className="btn btn-fb"><i className="fa fa-facebook"></i> Facebook</a>
                <a href="#" className="btn btn-tw"><i className="fa fa-twitter"></i> Twitter</a>
              </div>
                              or
               <form className="form" role="form" method="post" action="login" accept-charset="UTF-8" id="login-nav">
                  <div className="form-group">
                     <label className="sr-only" for="exampleInputEmail2">Email address</label>
                     <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email address" required/>
                  </div>
                  <div className="form-group">
                     <label className="sr-only" for="exampleInputPassword2">Password</label>
                     <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" required/>
                                           <div className="help-block text-right"><a href="">Forget the password ?</a></div>
                  </div>
                  <div className="form-group">
                     <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                  </div>
                  <div className="checkbox">
                     <label>
                     <input type="checkbox"/> keep me logged-in
                     </label>
                  </div>
               </form>
            </div>
            <div className="bottom text-center">
              New here ? <a href="#"><b>Join Us</b></a>
            </div>
         </div>
      </li>
    </ul>
      </li>
  );
}
