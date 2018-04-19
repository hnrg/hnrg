import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class LogoutContainer extends Component {
  componentWillMount() {
    this.props.actions.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h3>Bye!</h3>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    auth: {
      isFetching: state.auth.isFetching,
      isValid: state.auth.isValid
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutContainer);
