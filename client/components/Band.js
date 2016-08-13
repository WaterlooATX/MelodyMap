import React, {Component} from 'react';
import {getAlbumArt} from '../models/helpers'
import {Link} from 'react-router';

export default class Band extends Component {

  constructor(props) {
    super(props)
    this.state = {
      albumArt: null
    }
  }

  componentDidMount() {
    this._randomAlbumArt()
  }

  _randomAlbumArt() {
    const artists = this.props.artists;
    const name = this.props.name;
    const artist = artists[name];
    let albumArt = getAlbumArt(artist)

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

    const randomBio = "The music sails alive with the compelling combination of rich layers among mixed styles of rhythm that hit the soul. By melding hook-filled melody within hard and heavy beats, has the ability to compact a vast array of influence and experience into a singular song"
    const artists = this.props.artists;
    const name = this.props.name;
    const artist = artists[name];
    const popularity = artist ? artist.popularity : 'none'
    let bio = artist ? checkBio(artist.fullBio) : randomBio

    function checkBio(fullBio) {
      if(fullBio && fullBio.length) {
        return fullBio.slice(0,225).split('/').join(' /').split('%').join('% ').split('<a')[0] + '...'
      } else {
        return randomBio
      }
    }

    let albumArt = getAlbumArt(artist)
    albumArt = this.state.albumArt ? this.state.albumArt : albumArt

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
            <div className="accordion-text">{bio}</div>
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
