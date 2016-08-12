import React, {Component} from "react"
import NavBar from "../containers/NavBar"

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleSearch: true
    }
  }

  _onLink(bool) {
    this.setState({ visibleSearch: bool });
  }

  render() {
    return (
      <div>
        <NavBar
          onLink={ this._onLink.bind(this) }
          visibleSearch={ this.state.visibleSearch }
        />
        <div className="temp">
          {this.props.children}
        </div>
      </div>
    )
  }

}