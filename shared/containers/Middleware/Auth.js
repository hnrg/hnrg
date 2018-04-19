import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CookiesProvider, withCookies } from 'react-cookie';

import * as actions from '../../actions';

export default function(ComposedComponent) {
  class Authentication extends Component {
    constructor (props) {
      super(props);

      this.props.actions.getProfile(this.props.global.currentUser);
      this.state = {
        user: {
          username: '',
          email: ''
        }
      };
    }

    render() {
      return <ComposedComponent { ...this.props } />
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth,
      profile: state.profile,
      global: {
        currentUser: state.global.currentUser,
        currentState: state.global.currentState,
        showState: state.global.showState
      }
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({ ...actions }, dispatch)
    }
  }

  return withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(Authentication)));
}
