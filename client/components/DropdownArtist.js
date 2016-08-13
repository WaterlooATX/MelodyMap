import {Link} from 'react-router';
import React, {Component} from 'react';
import {getAlbumArt, getBio} from '../models/helpers'

export default class DropdownArtist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      albumArt: null,
      artist: null
    }
  }

  componentDidMount() {
    this._randomAlbumArt()

    this.setState({artist: this.props.artists[this.props.name]})
  }

  _randomAlbumArt() {
    const artist = this.state.artist
    let albumArt = artist ? artist.albumsImages : null

    if (albumArt && artist) {
      const albumsImages = artist.albumsImages.map(album => {
        return album.images ? album.images[1].url : null
      })

      if (albumsImages) {
        let num = albumsImages.length
        this.setState({
          albumArt: albumsImages[Math.floor(Math.random() * num)]
        })
      }
    }
  }

  render() {
    const artist = this.state.artist
    const popularity = artist ? artist.popularity : 'none'
    const albumArt = this.state.albumArt ? this.state.albumArt : getAlbumArt(artist)

    const Style = {
                    "borderRadius": "500px",
                    "WebkitBoxShadow": "2px 2px 5px 0px rgba(0, 0, 0, 1)",
                    "MozBoxShadow": "2px 2px 5px 0px rgba(0, 0, 0, 1)",
                    "boxShadow": "6px 6px 10px 0px rgba(0, 0, 0, 1)"
                  }
    return (
      <div>
        <div className="accordion-band">
          <div className="band-info">
            <img className="accordion-album-art img-circle" style={Style} src={albumArt} alt={name} onClick={this._randomAlbumArt.bind(this)} onTouchStart={this._randomAlbumArt.bind(this)}/>
            <div className="accordion-album-band-name"><b>
              <Link to={`artist/${name}`} activeClassName='active'>{name}</Link>
            </b></div>
          </div>
          <div className='right popularity'>
            <div className="accordion-text">{getBio(artist)}</div>
              <div className="text-center">{`Popularity`}</div>
            <div className="progress">
              <div className="progress-bar" role="progressbar" aria-valuenow={popularity} aria-valuemin="0" aria-valuemax="100" style={{width: `${popularity}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
