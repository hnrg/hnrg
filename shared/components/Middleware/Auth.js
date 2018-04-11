import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

export default function(role, ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      const { cookies } = this.props;
      this.state = {
        cookieUser: cookies.get('user'),
      };

      if (!this.props.authenticated) {
        this.context.router.push('/login');
      }

      if (this.state.cookieUser) {
        this.context.router.push('/dashboard');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/login');
      }

      if (this.state.cookieUser) {
        this.context.router.push('/dashboard');
      }
    }

    render() {
      return <ComposedComponent { ...this.props } />
    }
  }

  Authentication.propTypes = {
    router: PropTypes.object,
  };

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    };
  }

  return connect(mapStateToProps)(withCookies(Authentication));
}
