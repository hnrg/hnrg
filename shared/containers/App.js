import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
/* import * as Actions from '../actions/auth-actions'; */

import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(App);
