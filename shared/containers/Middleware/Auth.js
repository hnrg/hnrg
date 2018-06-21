import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from 'reducers/actions/auth-actions';

export default function requireAuth(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (this.props.auth.authenticated === null) {
        this.props.actions.authenticate();
      }
    }

    render() {
      return (this.props.auth.authenticated === null || this.props.auth.authenticated) ?
        <ComposedComponent {...this.props} /> :
        <Redirect to={{ pathname: '/login' }} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({ ...authActions }, dispatch),
    };
  }

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(Authentication));
}
