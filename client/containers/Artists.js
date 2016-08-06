import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import GenArtist from '../components/GenArtist';
import {redux_Artists} from '../actions/artists';
import SearchBar from '../components/SearchBar';
import {fetchArtistsAPI} from '../models/api';
import _ from 'lodash'



class Artists extends Component {


  _artistSearch(term){
    fetchArtistsAPI(term).then((data) => {
      console.log("artist Data: ", data)
    })
  }

  render(){
    const artistSearch = _.debounce((term) => {this._artistSearch(term)}, 200)
    const Artists = this._createArtists()


      return(
        <div>
          <SearchBar onSearchTermChange={artistSearch}/>
          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <div className="panel panel-default">
            {Artists}
            </div>
          </div>
        </div>
        )


  }
  _createArtists(){
    const artists = this.props.artists
    const mapped = []
    for(let artist in artists) {
      mapped.push(<GenArtist artist={artists[artist]} key={artist} name={artist}/>)
    }
    return mapped
    // return _.map(artists, (artist, i) => <GenArtist artist={artist} key={i}/>)
  }
}


const mapStateToProps = (state) => {return {artists: state.artists }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Artists: redux_Artists}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Artists);
