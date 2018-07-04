import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from 'reducers/actions/auth-actions';
import * as globalActions from 'reducers/actions/global-actions';

class LogoutContainer extends Component {
  constructor(props) {
    super(props);

    this.props.actions.logout();
  }

  render() {
    return (
      <div>
        <h3>Cargando...</h3>
        {!this.props.auth.isFetching && <Redirect to={{ pathname: '/login' }} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: {
      isFetching: state.auth.isFetching,
      isValid: state.auth.isValid
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutContainer);
