import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import GenArtist from '../components/GenArtist'
import {selectShow} from '../actions/select_show';



export default class Artists extends Component {

  render(){
    const shows = this.props.shows[0];
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


_sendToState(arg) {
    const shows = this.props.shows[0];
    let showWithId = shows.filter((show) => show.id === arg);
    this.props.selectShow(showWithId);
  }

  _createArtists(artists){
    return artists.map((artist, i) => {
      return <GenArtist
        displayName={artist.performance[0].displayName}
        id={artist.id}
        key={artist.id}
        artists= {artist.performance}
        selected={(this.props.selectedShow === artist) ? true : false}
        sendToState={this._sendToState.bind(this)}
        />
    })
  }
}




const mapStateToProps = (state) => {return { shows: state.shows, selectedShow: state.selectedShow}};
const mapDispatchToProps= (dispatch) => bindActionCreators({selectShow: selectShow}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Artists);
