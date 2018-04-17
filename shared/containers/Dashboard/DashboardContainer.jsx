import React, { Component } from 'react';
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
    return (
      <Sidebar />
    );
  }
}

export default connect()(DashboardContainer);
