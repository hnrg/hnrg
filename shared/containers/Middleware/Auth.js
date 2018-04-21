import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from '../../actions/auth-actions';
import * as globalActions from '../../actions/global-actions';
import * as profileActions from '../../actions/profile-actions';

export default function(ComposedComponent) {
  class Authentication extends Component {
    constructor(props) {
      super(props);

      this.props.actions.getProfile(this.props.global.currentUser);
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
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({ ...authActions, ...profileActions, ...globalActions }, dispatch)
    };
  }

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(Authentication));
}
