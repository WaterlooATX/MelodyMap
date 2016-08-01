import React from 'react';


export default class Login extends React.Component{
	render(){
			var {errorMsg}=this.props.params;
		return(
			<div className="error">
				<h2> AN ERROR OCCURED</h2>
				<p>{errorMsg}</p>
			</div>
		)
	}
};