import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeContainer extends Component {
  render() {
    return (
      <div>Wellcome!</div>
    );
  }
}

export default connect()(HomeContainer);
