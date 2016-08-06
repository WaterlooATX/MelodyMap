import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import GenArtist from '../components/GenArtist'
import {redux_Artists} from '../actions/artists'

class Artists extends Component {

  render(){
    const Artists = this._createArtists()
      return(
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          <div className="panel panel-default">
          {Artists}
          </div>
        </div>
        )
  }

  _createArtists(){
    const artists = this.props.artists
    const mapped = []
    for(let artist in artists) {
      mapped.push(<GenArtist artist={artists[artist]} key={artist}/>)
    }
    return mapped
    //return _.map(artists, (artist, i) => <GenArtist artist={artist} key={i}/>)
  }
}

const mapStateToProps = (state) => {return {artists: state.artists }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ redux_Artists: redux_Artists}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Artists);
