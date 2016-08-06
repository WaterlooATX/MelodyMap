import React, {Component} from 'react';
import Artists from '../containers/Artists';
import SearchBar from './SearchBar';



export default class ArtistHome extends Component {
	render(){
		return (
			<div>
				<SearchBar/>
				<Artists/>
			</div>
		)
	}
}