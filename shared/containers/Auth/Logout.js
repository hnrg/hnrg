import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class LogoutPage extends Component {
  componentWillMount() {
      this.props.logoutUser();
  }

  render() {
    return (
      <div className="page_body">
        Sorry to see you go!
      </div>
    )
  }
}

export default connect(null, actions)(LogoutPage);
