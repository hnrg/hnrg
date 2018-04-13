import React, { Component } from 'react';

class NotFoundContainer extends Component {
  renderContent() {
    return (
      <div>404 Not found</div>
    )
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default NotFoundContainer;
