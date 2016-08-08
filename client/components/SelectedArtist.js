import React, {Component} from 'react';
import { Link } from 'react-router';


export default class SelectedArtist extends Component{

	constructor(props){
		super(props);
		this.state={
			img: "http://assets.audiomack.com/default-artist-image.jpg",

		}
	}

	componentDidMount(){
		console.log("selectedArtist: ", this.props.artists)
	}
	render(){
		return (
			<div>
				{this.props.artists.map((artist) =>{
						<div>
							{/*<h3>*/}
								<img className="genImage" src = {this.state.img} height='85' width='85'/>


								<Link className = "genArtist"
								    to={ `artist/${artist.displayName}`}
								    activeClassName='active'>{artist.displayName}
								</Link>

							{/*</h3>*/}
						</div>
								})}
			</div>
		)
	}
 
		//return <ul>{artistItems}</ul>
	
	/*render(){
		if(!this.props.artists){
			return(<div> Loading...</div>)
		}
		return(
			<div>
				{<div>
					{console.log("selectedArtist: ",this.props.artists)}
				</div>}
				<div>
					{this.props.artists.map((artist) => {
						<p> artist.displayName </p>})
					}
				</div>
			</div>
		)
		
	}*/

}


