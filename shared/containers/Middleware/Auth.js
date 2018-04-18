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

      const connectedUser = new Object(Cookies.getJSON('connectedUser'));

      this.state = {
        connectedUser: connectedUser,
      };

      this.refreshUser = this.refreshUser.bind(this);
    }

    refreshUser() {
      const { fetchUser } = this.props;
      fetchUser();

      const connectedUser = new Object(Cookies.getJSON('connectedUser'));

      this.setState({
        connectedUser: connectedUser,
      });
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        return this.props.history.push('/login');
      }

      this.refreshUser();
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        return this.props.history.push('/login');
      }

      this.refreshUser();
    }

    render() {
      return <ComposedComponent { ...this.props } user={this.state.connectedUser} />
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
    };
  }

  return withCookies(withRouter(connect(mapStateToProps, actions)(Authentication)));
}
