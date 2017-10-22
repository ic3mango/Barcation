import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import AppHead from './AppHead';
import BarList from './BarList';
import SearchAndMap from './SearchAndMap';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <AppHead />
        <SearchAndMap bars={this.props.bars} />
        <BarList
          barsToRender={this.props.bars}
          user={this.props.user}
        />
      </div>
    );
  }
}

function mapStateToProps({ user, bars }) {
  return { user, bars };
}

export default connect(mapStateToProps, actions)(App);
