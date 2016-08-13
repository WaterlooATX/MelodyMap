import React, {Component} from 'react'

class ArtistList extends Component {
  constructor(props){
    super(props);
    this.state={
      songPlayed: false,
      songButton: null
    }
  }

  render() {
    const Artists = this._createArtists()
    return (
      {Artists}
    )
  }

  _songPlayToggle(songPlayed, songButton) {
    this.setState({ songPlayed, songButton })
  }

  _createArtists() {
    const artists = this.props.artists
    for(let artist in artists){

      // fetchArtistsAPI(artist).then((Artist)=>{
      //   // console.log(Artist)
      //   artists[artist]['onTourUntil'] = Artist.data[0].onTourUntil
      // })
    }
    //console.log("Artists: ", artists)
    const mapped = []
    for (let artist in artists) {
      mapped.push(
        <ArtistItem
          artist={artists[artist]}
          key={artist}
          name={artist}
          songPlayed={ this.state.songPlayed }
          songButton={ this.state.songButton }
          songPlayToggle={ this._songPlayToggle.bind(this) }
        />
      )
    }
    return mapped
  }
}
