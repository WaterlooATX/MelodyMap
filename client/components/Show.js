import React, {Component} from "react"
import axios from 'axios'

export default class Show extends Component {

  constructor(props) {
    super(props)
    this.state = {
      img: null,
      id: null,
      name: null,
      uri: null,
      popularity: null,
      followers: null,
      genres: null
    }
  }


  componentDidMount() {
    // array of artist that are preforming
    // console.log(this.props.artistsNames)
    this._spotifyInfo(this.props.artistsNames[0].displayName)
  }

  _spotifyInfo(artist){
    // arrayvar: this.state.arrayvar.concat([newelement])
      axios.post('/artistInfo', {name: artist}).then( obj => {
        const artist = obj.data[0]
        // let info = {
        //   id: artist.id,
        //   name: artist.name,
        //   uri: artist.uri,
        //   popularity: artist.popularity,
        //   followers: artist.followers.total,
        //   genres: artist.genres,
        //   img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"
        // }

        if(artist) {
          this.setState({
            id: artist.id,
            name: artist.name,
            uri: artist.uri,
            popularity: artist.popularity,
            followers: artist.followers.total,
            genres: artist.genres,
            img : artist.images.length ? artist.images[1].url : "http://assets.audiomack.com/default-artist-image.jpg"
          })
        } else {
          this.setState({img: "http://assets.audiomack.com/default-artist-image.jpg"})
        }

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
              <p className="show-venue">{props.venue}</p>
              <p className="show-date">{props.startDate}</p>
              <p className="show-location">{props.city}</p>
              <p>id: {this.state.id}</p>
              <p>name: {this.state.name}</p>
              <p>uri: {this.state.uri}</p>
              <p>popularity: {this.state.popularity}</p>
              <p>followers: {this.state.followers}</p>
              <p>genres: {this.state.genres}</p>
            </div>
        </div>
      </div>
    )
  }
}
