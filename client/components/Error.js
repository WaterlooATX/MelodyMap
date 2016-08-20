import React from 'react';

const Login = (props) => {
  let { errorMsg } = props.params;
  return (
    <div className="error">
      <h2>
        AN ERROR OCCURED</h2>
      <p>{errorMsg}</p>
    </div>
  );
};

export default Login;
