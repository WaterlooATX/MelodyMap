import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import GenArtist from '../components/GenArtist';
import {redux_Artists} from '../actions/artists';
import SearchBar from '../components/SearchBar';
import SelectedArtist from '../components/SelectedArtist'
import {fetchArtistsAPI} from '../models/api';
import _ from 'lodash';

class Artists extends Component {

  constructor(props){
    super(props);
    this.state={
      artistBlocks: [],
      selectedArtists: null,
    }
  }

  _artistSearch(term){
    fetchArtistsAPI(term).then((artists) => {

      //const arry = []
      console.log(artists)
      this.setState({
        artistBlocks: artists.data
      });
       
      // }
      // return arry
      })
  }

  render(){
    const artistSearch = _.debounce((term) => {this._artistSearch(term)}, 200)
    const Artists = this._createArtists()
      return(
        <div className="container">
          <div className="col col-md-1"></div>
            <div className="col col-md-10">
              <div className="page-header">
                <h1>Artists</h1>
                <SearchBar onSearchTermChange={artistSearch}/>

              </div>
              {!this.state.artistBlocks.length ? 

              <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                {Artists}
                </div>
              </div>
              :
              <div>
              {/*<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">*/}
                  <SelectedArtist artists={this.state.artistBlocks}/>
                {/*</div>
              </div>*/}
              </div>
              }
            </div>
          <div className="col col-md-1"></div>
        </div>
      )
  }

  _createArtists(){
    const artists = this.props.artists
    const mapped = []
    for(let artist in artists) {
      mapped.push(<GenArtist artist={artists[artist]} key={artist} name={artist} selectedArtists={this.state.selectedArtists} artistBlocks={this.state.artistBlocks}/>)
    }
    return mapped
  }
}


const mapStateToProps = (state) => {return {artists: state.artists }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Artists: redux_Artists}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Artists);
