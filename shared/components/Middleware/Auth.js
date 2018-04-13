import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

export default function(role, ComposedComponent) {
  class Authentication extends Component {
    constructor(props) {
      super(props);
      const { cookies } = this.props;

      this.state = {
        cookieUser: cookies.get('user'),
      };
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }

      if (this.state.cookieUser) {
        this.props.history.push('/dashboard');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/login');
      }

      if (this.state.cookieUser) {
        this.props.history.push('/dashboard');
      }
    }

    render() {
      return <ComposedComponent { ...this.props } />
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
    };
  }

  return withCookies(withRouter(connect(mapStateToProps)(Authentication)));
}
