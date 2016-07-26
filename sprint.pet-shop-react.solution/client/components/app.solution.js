import React from 'react';

import PetShopWindow from './PetShopWindow';
import AuthPanel from './AuthPanel';

export default class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      user: JSON.parse(localStorage.user || null),
      apiToken: localStorage.apiToken
    };
  }

  handleLogin({user, apiToken}){
    this.setState({
      user: user,
      apiToken: apiToken
    });
  }

  render(){
    return (
      <div>
        { this.state.user
         ? <h3> Welcome, {this.state.user.username} </h3>
         : <AuthPanel handleLogin={this.handleLogin.bind(this)}/>
        }
        <PetShopWindow user={this.state.user}/>
      </div>
    );
  }
}
