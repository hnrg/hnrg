import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { CookiesProvider, withCookies } from 'react-cookie';

import * as actions from '../../actions';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.user.username}</p>
      </div>
    );
  }
}

export default withCookies(connect(null, actions)(DashboardContainer));
