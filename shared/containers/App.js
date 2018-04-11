import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import * as Actions from '../actions/Auth';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

import './App.css';
import Home from './Home';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {...this.props})}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(withCookies(App));
