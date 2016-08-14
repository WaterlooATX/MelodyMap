import React, {Component} from 'react'
import {Link} from 'react-router';
import Speaker from './Speaker'
import {getAlbumArt, getRandomAlbumArt, topTrack} from '../models/helpers'

export default class ArtistItem extends Component {
  constructor(props){
		super(props);
		this.state={
			albumArt: null
		}
	}

	componentDidMount(){
		this._randomAlbumArt()
	}

  render() {
    const artist = this.props.artist
    const albumArt = this.state.albumArt ? this.state.albumArt : getAlbumArt(artist)
	  return (
      <div key={artist.id} className="col-md-4 gridding">
        <div className = "artist-label" id="selected">
          <Link
            className="selArtist"
            id="selArtist"
            to={`artist/${artist.name}`}
            activeClassName="active">
            <img
              className="genImage"
              src={albumArt}
              onMouseOver={this._randomAlbumArt.bind(this)}
              height="105"
              width="105"
            />
            <br/>
            {artist.name}
          </Link>
          <Speaker track={topTrack(artist)} size={2}/>
        </div>
          {artist.onTour == "1" || artist.onTourUntil ? <p className=" tour">ON TOUR</p> : null}
      </div>
	  )
	}

  _randomAlbumArt() {
    this.setState({albumArt: getRandomAlbumArt(this.props.artist)})
  }
}
