import React, { Component } from 'react';
import DropdownArtistTitle from './DropdownArtistTitle';
import DropdownArtist from './DropdownArtist';
import { isReduxLoaded } from '../models/helpers';

export default class DropdownArtists extends Component {

  _createBand() {
    const bands = this.props.bands;
    if (isReduxLoaded(this.props.artists) && bands) {
      return this._mappedArtists(bands);
    }
  }

  _mappedArtists(bands) {
    const artist = bands.filter(name => this.props.artists[name]);
    return artist.map((name, index) => {
      return (
        <DropdownArtist
          key={index}
          artist={this.props.artists[name]}
        />
      );
    });
  }

  _venueLoading() {
    return (
      <a
        id="rightBtn"
        href=""
        className="btn btn-success"
        target="_blank"
        role="button"
      >Loading
      </a>
    );
  }

  _venue() {
    return (
      <a
        id="rightBtn"
        href={this.props.songkick.uri}
        target="_blank"
        className="btn btn-success"
        role="button"
      >BUY TICKETS
      </a>
    );
  }

  render() {
    const bands = this._createBand();
    return (
      <div>
        <DropdownArtistTitle
          venue={this.props.venue}
          songkick={this.props.songkick}
          doorsOpen={this.props.doorsOpen}
          onNavigateClick={this.props.onNavigateClick}
        />
        { this.props.artists ? bands : null }
        {this.props.venue ? this._venue() : this._venueLoading()}
      </div>
    );
  }
}
