import React, {Component} from "react"

export default class Show extends Component {

  constructor(props) {
    super(props)
    this.state = {
      img: null
    }
  }

  componentDidMount() {
      this.props.spotifyInfo.then( img => this.setState({img : img.data[0].images[1].url}))
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
              <img src={this.state.img} alt={props.id} height="42" width="42"/>
              {props.displayName}
            </a>
          </h4>
        </div>
        <div id={`collapse${props.id}`} className="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading${props.id}`}>
            <div className="panel-body">
              <p className="show-venue">{props.venue}</p>
              <p className="show-date">{props.startDate}</p>
              <p className="show-location">{props.city}</p>
            </div>
        </div>
      </div>
    )
  }
}
