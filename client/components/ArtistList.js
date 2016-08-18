import React, {Component} from 'react'
import ArtistItem from '../components/ArtistItem'

export default class ArtistList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songPlayed: false,
      songButton: null
    }
  }

  _songPlayToggle(songPlayed, songButton) {
    this.setState({
      songPlayed,
      songButton
    })
  }

  _createArtists() {
    const artists = this.props.artists
    const sorted = this._sortArtistsByPopularity(artists);
    return sorted.map(artist =>
      <ArtistItem
        artist={artist}
        key={artist.id}
        name={artist.name}
        songPlayed={ this.state.songPlayed }
        songButton={ this.state.songButton }
        songPlayToggle={ this._songPlayToggle.bind(this) }
      />
    )
  }

  _sortArtistsByPopularity(artists) {
    let sorted = [];
    for (let artist in artists) sorted.push(artists[artist]);
    return sorted.sort((a, b) => b.popularity - a.popularity);
  }

  render() {
    const Artists = this._createArtists()
    return (
      <div>
          {Artists}
        </div>
    )
  }
}
