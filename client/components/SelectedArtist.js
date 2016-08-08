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
		console.log("selectedArtist: ", this.props.artists);
	}
	render(){
		return (
			<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
					{this.props.artists.map((artist) =>{
                  		return (
                  			<div key={ artist.id } className="panel-heading" role="tab" id={`heading${artist.id}`}>
                  				<h3>
									 <img className="genImage" src = {this.state.img} height='85' width='85'/>

									<Link className = "genArtist"
									    to={ `artist/${artist.displayName}`}
									    activeClassName='active'>{artist.displayName}
									</Link>
								</h3>

                			</div>
                		)
					})}
                </div>
              </div>
		)
	}

}


