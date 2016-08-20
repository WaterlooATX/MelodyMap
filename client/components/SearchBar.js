import React, { Component } from 'react';

export default class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };
  }

  render() {
    return (
      <div id="artist-search-bar">
				<input
  className="form-control"
  value={this.state.term}
  placeholder="Search"
  onChange={event => this.onInputChange(event.target.value)}
    />
			</div>
    );
  }

  onInputChange(term) {
    this.setState({
      term,
    });
    this.props.onSearchTermChange(term);
  }

}
