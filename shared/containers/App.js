import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

import authActions from '../actions/Auth';
import DevTools from '../components/DevTools';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {...this.props})}
        {process.env.NODE_ENV === "development" && <DevTools />}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withCookies(connect(authActions)(App));
