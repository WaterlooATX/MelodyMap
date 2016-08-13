import {Link} from 'react-router';
import React, {Component} from 'react';
import {getAlbumArt, getBio, getRandomAlbumArt} from '../models/helpers'

export default class DropdownArtist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      albumArt: null,
    }
  }

  componentDidMount() {
    this._randomAlbumArt()
  }

  _randomAlbumArt() {
    this.setState({albumArt: getRandomAlbumArt(this.props.artist)})
  }

  render() {
    const artist = this.props.artist
    const popularity = artist ? artist.popularity : 'none'
    const albumArt = this.state.albumArt ? this.state.albumArt : getAlbumArt(artist)

    return (
      <div>
        <div className="accordion-band">
          <div className="band-info">
            <img className="accordion-album-art img-circle"  src={albumArt} alt={name} onClick={this._randomAlbumArt.bind(this)} onTouchStart={this._randomAlbumArt.bind(this)}/>
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
