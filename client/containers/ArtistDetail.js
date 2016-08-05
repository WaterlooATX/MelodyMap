import React, {Component} from 'react';
import NavBar from './NavBar';
import {Spotify_searchArtistsAPI, Spotify_getArtistTopTracksAPI, getArtistAlbumsAPI, Songkick_getVenueAPI, LastFM_getInfoAPI} from '../models/api';


export default class ArtistDetail extends Component {
    constructor(props){
    super(props);
    this.state = {
      artistUri: null
    }
  }

  componentDidMount() {
    this._spotifyInfo(this.props.params.artistName)
  }

  render() {
    console.log("STATE", this.state.artistUri)
    return (
      <div>
        <div>
          {/* Display Artist */}
          <h1>
            {`${this.props.params.artistName}`}
          </h1>
          <h3>
            {`List information for a ${this.props.params.artistName} here. `}
            This will include:   <iframe src={`https://embed.spotify.com/follow/1/?uri=${this.state.artistUri}&size=detail&theme=light&show-count=0`}></iframe>
          </h3>
          <ul>
            <li>Artist Pictures</li>
            <li>Artist Bio</li>
            <li>Spofity Song Previews (3)</li>
            <li>Upcoming Shows (sortable by both proximity or date)
                This will most likely be the recycled Show/ShowList
                componenets.
            </li>
            <li>etc</li>
          </ul>
        </div>
      </div>
    )
  }




_spotifyInfo(artist){
      Spotify_searchArtistsAPI(artist).then( obj => {
        this.setState({artistUri: obj.data[0].uri})
      })
  }
}

// import React, {Component} from 'react';
// import NavBar from './NavBar';
// import React, {Component} from 'react';
// import NavBar from './NavBar';
// import _ from 'lodash';
// import YTSearch from 'youtube-api-search';
// import {connect} from "react-redux"
// import {bindActionCreators} from 'redux'

// import SearchBar from '../components/SearchBar';
// import VideoList from '../components/VideoList';
// import VideoDetail from '../components/VideoDetail';



// export default class ArtistDetail extends Component {

//   // componentDidMount() {
//   //   const query = this.props.location.query;
//   // }

//   render() {
//     return (
//       <div>
//         <div>
//           {/* Display Artist */}
//           <h1>
//             {`${this.props.location.query.artist}
//             with spotify artist id of
//             ${this.props.location.query.spArtistId}`}
//           </h1>
//           <h3>
//             {`List information for a ${this.props.location.query.artist} here. `}
//             This will include:
//           </h3>
//           <ul>
//             <li>Artist Pictures</li>
//             <li>Artist Bio</li>
//             <li>Spofity Song Previews (3)</li>
//             <li>Upcoming Shows (sortable by both proximity or date)
//                 This will most likely be the recycled Show/ShowList
//                 componenets.
//             </li>
//             <li>etc</li>
//           </ul>
//         </div>
//       </div>
//     )
//   }
// }



// // const API_KEY = "AIzaSyAjnuL1a-NSl5B0Kw44-Sd6tgLhQ96R018"

// // export default class Artists extends Component {

// //   constructor(props){
// //     super(props);

// //     this.state = {
// //       videos: [],
// //       selectedVideo: null,
// //     }
// //     this.videoSearch('kygo')
// //   }

// //   videoSearch(term){
// //     YTSearch({key: API_KEY, term: term}, (videos) => {
// //       this.setState({
// //           videos: videos,
// //           selectedVideo: videos[0]
// //       })
// //     });
// //   }

// //   render() {
// //     const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)
// //     return (

// //       <div>
// //         <div>
// //           <h1>List of Artists</h1>
// //           <h5>
// //             Default displayed artists could be the artists from the shows that came from the same API call for showlist on the home page.
// //             <iframe src="https://embed.spotify.com/follow/1/?uri=spotify:artist:23fqKkggKUBHNkbKtXEls4&size=detail&theme=light&show-count=0" width="300" height="56" scrolling="no"></iframe>
// //           </h5>
// //           <ul>
// //             <p>We should be able to search for artists</p>
// //             <p>When something is typed in the search bar, we will search and display from the entire universe of artists via spotify API</p>
// //             <p>We could display artists similarly to how we display minimized shows in showlist--with minimal info for each artist. This
// //               could include:
// //             </p>
// //             <li>Artist Pictures</li>
// //             <li>Spofity Song Preview (1)</li>
// //             <li>Upcoming show</li>
// //             <li>Brief intro or bio</li>
// //             <li>etc</li>
// //           </ul>
// //         <div>
// //           <SearchBar onSearchTermChange={videoSearch}/>
// //           <VideoDetail video={this.state.selectedVideo} />
// //           <VideoList
// //               onVideoSelect={selectedVideo => this.setState({selectedVideo})}
// //               videos={this.state.videos} />
// //         </div>
// //         </div>
// //       </div>
// //     )
// //   }
// // }