import React, {Component} from 'react';
import moment from 'moment';


export default class UpcomingShowsDetail extends Component {
  render() {
    console.log(this.props.shows)
    return (
      <div className = "UpcomingShowsDetail-container">
		    {this._checkShows(this.props.shows)}
        <div className="UpcomingShowsDetail-bottom-gradient"></div>
			</div>
    )
  }

  _checkShows(shows) {
    return shows ? this._shows(shows) : null
  }

  _shows(shows) {
    return shows.map(show => <Show show={show} key={show.id}/>)
  }

}

class Show extends Component {

  render() {
    const show = this.props.show
    return (
      <div className="UpcomingShowsDetail-list-item list-group-item">
        <div className="UpcomingShowsDetail-date">
          { moment(show.start.date).format('ll').split(',')[0] }
          <i className="fa fa-calendar-o" aria-hidden="true"></i>
        </div>
        <div className="UpcomingShowsDetail-name-location">
          <div className="UpcomingShowsDetail-Name">
            {show.venue.displayName}
          </div>
          <div className="UpcomingShowsDetail-location">{ show.location.city }</div>
        </div>
        <div className="UpcomingShowsDetail-buy">
          <button type="button" className="btn btn-success" aria-label="Right Align" onClick={function() { window.open(show.uri,'_blank'); }}>
            <i className="fa fa-usd" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    )
  }
}
