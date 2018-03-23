import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../../components/Footer';

class HomeContainer extends Component {
  render() {
    return (
      <div>
        <h3>Welcome!</h3>
        <Footer />
      </div>
    );
  }
}

export default connect()(HomeContainer);
