import React, {Component} from 'react';

export default class SearchBar extends Component {

	constructor(props) {
		super(props);

		this.state = {
			term: '',
		}
	}

	render() {
		return (
			<div className='search-bar'>
				<input
					value = { this.state.term }
					placeholder = 'Search Artist Videos'
					onChange={ event => this.onInputChange(event.target.value) } /> 
			</div>
		)
	}

	onInputChange(term) {
		this.setState({ term })
		this.props.onSearchTermChange(term)
	}

}