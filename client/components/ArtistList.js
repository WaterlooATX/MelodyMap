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
    const mapped = []
    for (let artist in artists) {
      mapped.push(
        <ArtistItem
          artist={artists[artist]}
          key={artists[artist].id}
          name={artists[artist].name}
          songPlayed={ this.state.songPlayed }
          songButton={ this.state.songButton }
          songPlayToggle={ this._songPlayToggle.bind(this) }
        />
      )
    }
    return mapped
  }

  render() {
    const Artists = this._createArtists()
    return (
      <div>
        <div>
          {Artists}
        </div>
      </div>

    )
  }
}
