import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import * as actions from '../../actions/Auth';

class LogoutContainer extends Component {
  componentWillMount() {
    var { logoutUser, history } = this.props;
    logoutUser();
    history.push('/');
  }

  render() {
    return (
      <div>
        <h3>Bye!</h3>
      </div>
    );
  }
}

LogoutContainer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
}

export default connect(null, actions)(LogoutContainer);
