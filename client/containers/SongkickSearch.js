import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {setLocation, fetchShows} from '../actions/actions';
import {Google_geocoder, Songkick_getShows} from '../models/api';


class SongkickSearch extends Component {

  constructor(props) {
    super(props)

    this.state = {
      startDate: moment(),
      endDate: moment(),
      city: '',
      search: false
    }
  }

  render() {
    return (
      <div className="songkick-search">
      {
        this.props.visibleSearch ?
        this.state.search ?
        <form className="songkick-search">
          <DatePicker
            minDate={moment()}
            todayButton={'Today'}
            selected={ this.state.startDate }
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={ this._onStartChange.bind(this) }
          />
          <DatePicker
            minDate={moment()}
            todayButton={'Today'}
            selected={ this.state.endDate }
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={ this._onEndChange.bind(this) }
          />
          <input
            className="input-city"
            placeholder="City"
            value={ this.state.city }
            onChange={ event => this._onCityChange(event.target.value) }
          />
          <button type="submit" onClick={this._onSubmit.bind(this)}>Search</button>
        </form>
        : <div className="songkick-search">
            <a onClick={ this._onSearchClick.bind(this) }>
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
              Advanced Search
            </a>
          </div>
        : <div className="songkick-search"></div>
      }
      </div>
    )
  }

  _onSearchClick() {
    this.setState({
      search: true
    });
  }

  _onStartChange(startDate) {
    this.setState({
      startDate
    });
  }

  _onEndChange(endDate) {
    this.setState({
      endDate
    });
  }

  _onCityChange(city) {
    this.setState({
      city
    });
  }

  _onSubmit(event) {
    event.preventDefault();
    let startDate = this.state.startDate.toISOString().slice(0, 10);
    let endDate = this.state.endDate.toISOString().slice(0, 10);
    // get coordinate from city name
    if (this.state.city) {
      Google_geocoder(this.state.city).then(resp => {
        console.log('resp from navbar', resp);
        let lat = resp.data.results[0].geometry.location.lat;
        let long = resp.data.results[0].geometry.location.lng;
        this.props.fetchShows({
          long,
          lat,
          startDate,
          endDate
        });
        this.props.setLocation({
          long,
          lat
        });
      })
    } else {
      let lat = this.props.location.lat;
      let long = this.props.location.long;
      this.props.fetchShows({
        long,
        lat,
        startDate,
        endDate
      });
    }
    this.setState({
      search: false
    });
  }

}

const mapStateToProps = (state) => {return { location: state.location }};
const mapDispatchToProps = (dispatch) => bindActionCreators({ setLocation, fetchShows }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SongkickSearch);
