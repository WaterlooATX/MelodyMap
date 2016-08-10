import React, {Component} from 'react';
import Venues from '../containers/Venues';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
import { Link } from 'react-router';
import { Songkick_getVenueAPI } from '../models/api';
// import {selectShow} from '../actions/select_show';
// import {redux_Artists} from '../actions/artists';

export default class GenVenue extends Component {

  render() {

    // console.log('this.props.venue ' , this.props.venue);
    let venue = this.props.venue

    return (
      <div className="panel-heading" role="tab" id={`heading${venue.id}`}>
          <div>
            <h1>
              <Link className = "genArtist"
                  to={ `/venue/${venue.name}/${venue.id}`}
                  activeClassName='active'>{venue.name}
              </Link>
            </h1>
            <h3>{`The venue's ID is: ${venue.id}`}</h3>
            <h3>{`The venue's description is: ${venue.description}`}</h3>
          </div>
      </div>
    )

  }
}


// export default class GenArtist extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       img: "http://assets.audiomack.com/default-artist-image.jpg",
//       bands: [],
//       clicked: false,
//       previewTrack: [],
//       songPlay: false,
//     }
//   }

//   componentDidMount(){
//     //this._spotifyInfo(this.props.artists)

//   }


//   render(){
//     const props = this.props;
//     const artist = props.artist;
//     const name = props.name;
//     var id;
//     var image;
//     var track;

//     artist.Spotify_getArtistTopTracksAPI ?
//       track = artist.Spotify_getArtistTopTracksAPI[0].preview_url
//     :
//       track = null;
//     artist.Spotify_searchArtistsAPI ?
//       id = props.artist.Spotify_searchArtistsAPI.id
//     :
//       id = "af3753";
//     artist.Spotify_searchArtistsAPI ?
//       image = artist.Spotify_searchArtistsAPI.img
//     :
//       image = this.state.img;
//     return (

//       <div className="panel-heading" role="tab" id={`heading${id}`}>
//           <div>
//             <h3>
//               <img className="genImage" src = {image} alt={id} height='85' width='85'/>


//                 <Link className = "genArtist"
//                     to={ `artist/${name}`}
//                     activeClassName='active'>{name}
//                 </Link>

//                 {track ?
//                         <i className="speaker fa fa-volume-up fa-3x" id="speaker" aria-hidden="true" type="button" onClick={this._toggleSound.bind(this)}>
//                         <audio src={track}>
//                         </audio></i> : null}

//             </h3>
//           </div>
//       </div>

//     )
//   }

//   _toggleSound(event) {
//        var playButton = event.target;
//        var parent = playButton.parentElement;
//        var audioElem = parent.getElementsByTagName('audio')[0];
//        if (this.state.songPlay === false) {
//           playButton.className = "fa fa-pause fa-3x";
//           this.setState({songPlay : true})
//           audioElem.play();
//        } else {
//           this.setState({songPlay : false})
//           playButton.className = "fa fa-volume-up fa-3x";
//           audioElem.pause();
//        }
//     }

//   _checkSelected(propsSelected) {
//     return (propsSelected) ? "active list-group-item" : "list-group-item";
//   }

// }

