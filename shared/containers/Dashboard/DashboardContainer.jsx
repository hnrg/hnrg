import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';

import Sidebar from '../../components/dashboard/Sidebar';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
    };
  }

  render() {
    return (<div>{this.state.user.username}</div>);
  }
}

DashboardContainer.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect()(DashboardContainer);
