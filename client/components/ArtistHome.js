import React, {Component} from 'react';
import Artists from '../containers/Artists';
import SearchBar from './SearchBar';
import {fetchArtistsAPI} from '../models/api';



export default class ArtistHome extends Component {

	componentDidMount(){
		fetchArtistsAPI().then((data) => {
			console.log("artist Data: ", data)
		})
	}
	render(){
		return (
			<div>
				<SearchBar/>
				<Artists/>
			</div>
		)
	}
}