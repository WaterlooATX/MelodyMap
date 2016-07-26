import * as Auth from '../models/auth';
import React from 'react';


export default class AuthPanel extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      error: null,
    };
  }

  signUp(){
    this.setState({error: null});

    Auth.signUp(this.state.username, this.state.password)
      .then(function(response) {
        console.log("response", response);
        alert('Successfully signed up');
      })
      .catch((response) => {
        console.log("response fail", response);
        this.setState({error: response});
      });
  }

  signIn(){
    this.setState({error: null});

    Auth.signIn(this.state.username, this.state.password)
      .then((response) => {
        this.props.handleLogin(response);
        alert('Successfully signed in');
      })
      .catch((response) => {
        console.log("response fail", response);
        this.setState({error: response});
      });
  }

  handlePasswordInput(e){
    this.setState({password: e.currentTarget.value});
  }

  handleUsernameInput(e){
    this.setState({username: e.currentTarget.value});
  }

  render(){
    return (
      <div className='auth-panel'>

        { this.state.error !== null
          ? <div className='error'> {this.state.error.error + ": " + this.state.error.reason} </div>
          : null
        }

        <form onSubmit={function(e){ e.preventDefault() }}>

          <input
            type="text"
            name="username"
            value={this.state.username}
            onInput={this.handleUsernameInput.bind(this)}
          />

          <input
            type="password"
            name="password"
            value={this.state.password}
            onInput={this.handlePasswordInput.bind(this)}
          />
        </form>

        <button onClick={this.signUp.bind(this)}> Sign Up </button>
        <button onClick={this.signIn.bind(this)}> Sign In </button>
      </div>
    );
  }
}
