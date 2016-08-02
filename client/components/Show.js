import React, {Component} from "react"
import {artistInfoAPI} from "../models/api"

export default class Show extends Component {

  constructor(props) {
    super(props)
    this.state ={
      img: "http://assets.audiomack.com/default-artist-image.jpg",
      bands : []
    }
  }


  componentDidMount() {
    // array of artist that are preforming
    // console.log(this.props.artistsNames)
    this._spotifyInfo(this.props.artists)
  }

  _spotifyInfo(artists){
    // arrayvar: this.state.arrayvar.concat([newelement])
      artists.forEach(artist => {
        artistInfoAPI(artist.displayName).then( obj => {
          const artist = obj.data[0]
          if(artist) {
            this.setState({img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"})

            let info = {
              id: artist.id,
              name: artist.name,
              uri: artist.uri,
              popularity: artist.popularity,
              followers: artist.followers.total,
              genres: artist.genres,
              img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"
            }
            this.setState({bands: this.state.bands.concat([info])})
          }
        })
      })

  }

  // Tests selected show in redux state and conditionally sets
  // inline style property for show list item if it is selected show
  _checkSelected(propsSelected) {
    return (propsSelected) ? "active list-group-item" : "list-group-item";
  }

  // Sends the show's id back to the parent (ShowList.js) on click
  _onClickHandler(event) {
    event.preventDefault()
    this.props.sendToState(this.props.id)
  }
  render() {
    const props = this.props
    return (
      <div>
        <div className="panel-heading" role="tab" id={`heading${props.id}`}>
          <h4 className="panel-title">
            <a
              className={this._checkSelected(props.selected)}
              onClick={this._onClickHandler.bind(this)}
              role="button" data-toggle="collapse"
              data-parent="#accordion"
              href={`#collapse${props.id}`}
              aria-expanded="true"
              aria-controls={`collapse${props.id}`}
            >
              <img src={this.state.img} alt={props.id} height="65" width="65"/>
               {props.displayName}
            </a>
          </h4>
        </div>
        <div id={`collapse${props.id}`} className="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading${props.id}`}>
            <div className="panel-body">
              <Bands bands={this.state.bands}/>
            </div>
        </div>
      </div>
    )
  }
}
class Bands extends Component {
  _createBand() {
    if(this.props.bands) {
      return this.props.bands.map((band,index) => {
        return (
          <Band key ={index} band={band}/>
        )
      })
    }
  }

  render() {
    const bands = this._createBand()
    return (
      <div>
        {bands}
      </div>
    )
  }
}

class Band extends Component {
  render() {
    const band = this.props.band
    return (
      <div>
        <p>id: {band.id}</p>
        <p>name: {band.name}</p>
        <p>uri: {band.uri}</p>
        <p>popularity: {band.popularity}</p>
        <p>followers: {band.followers}</p>
        <p>genres: {band.genres}</p>
        <br/>
      </div>
    )
  }
}
