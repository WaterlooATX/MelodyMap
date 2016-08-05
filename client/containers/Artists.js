import React, {Component} from 'react';
//import NavBar from './NavBar';
//import _ from 'lodash';
//import YTSearch from 'youtube-api-search';
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {selectShow} from '../actions/select_show';
import GenArtist from '../components/GenArtist'



export default class Artists extends Component {

  render(){
    const shows = this.props.shows[0];
    console.log(shows)
    if(shows){
      return(
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          <div className="panel panel-default">
            {this._createArtists(shows)}
          </div>
        </div>
        )
      } else{
          return 
            <div className = "spinner">
              <div> Loading.... </div>
            </div>
          }
  }




  _createArtists(artists){
    return artists.map((artist, i) => {
      console.log(artist)
      return <GenArtist
        displayName={artist.performance[0].displayName}
        id={artist.id}
        key={artist.id}
        artists= {artist.performance}
        />
    })
  }
}




const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow, selectShow: state.selectShow, location: state.location}};
const mapDispatchToProps=(dispatch) => bindActionCreators({selectShow: selectShow}, dispatch)
export default connect(mapStateToProps)(Artists);


