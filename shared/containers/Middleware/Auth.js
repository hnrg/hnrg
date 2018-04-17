import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { CookiesProvider, withCookies } from 'react-cookie';

import * as actions from '../../actions';

export default function(ComposedComponent) {
  class Authentication extends Component {
    constructor(props) {
      super(props);
      const { fetchUser } = this.props;
      fetchUser();
      this.state = {
        cookieUser: Cookies.get('connectedUser', {path:'/'}),
      };
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/login');
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

  return withCookies(withRouter(connect(mapStateToProps, actions)(Authentication)));
}
