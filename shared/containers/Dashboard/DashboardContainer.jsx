import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    const {cookies} = this.props;
    this.state = {
      user: cookies.get('connectedUser'),
    };
  }

  render() {
    return (
      <div>
        {this.state.user}
      </div>
    );
  }
}

export default connect(null, actions)(DashboardContainer);
