import React, {Component} from 'react';
import Artists from '../containers/Artists';
import SearchBar from './SearchBar';
import {fetchArtistsAPI} from '../models/api';



export default class ArtistHome extends Component {

	componentDidMount(){
	}

	_artistSearch(term){
		fetchArtistsAPI(term).then((data) => {
			console.log("artist Data: ", data)
		})
	}

	render(){
		const artistSearch = _.debounce((term) => {this._artistSearch(term)}, 200)
		return (
			<div>
				<SearchBar onSearchTermChange={_artistSearch}/>
				<Artists/>
			</div>
		)
	}
}