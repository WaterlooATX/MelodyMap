import React, {Component} from 'react'



export default class GenArtist extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}


	render(){

		return (
			<div className="panel-heading" role="tab" id={`heading${this.props.id}`}>
				<h4 className = 'panel-title'>
					<a
						// className={this._checkSelected(this.props.selected)}
						//onClick={this._onClickHandler.bind(this)}
						role="button" data-toggle="collapse"
						data-parent="#accordion"
						href={`#collapse${this.props.id}`}
						aria-expanded="true"
						aria-controls={`collapse${this.props.id}`}

					>
						<p className="artist">{this.props.displayName}</p>
					</a>
				</h4>

			</div>
		)
	}
}


     