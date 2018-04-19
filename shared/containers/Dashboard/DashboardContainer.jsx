import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';

import Sidebar from '../../components/dashboard/Sidebar';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div></div>);
  }
}

DashboardContainer.propTypes = {
};

export default connect()(DashboardContainer);
