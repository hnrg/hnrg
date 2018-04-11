import React, { Component } from 'react';

export default class NotFoundPage extends Component {
  renderContent() {
    return (
      <div>404 Not found</div>
    )
  }

  render() {
    return (
      <div className="page_body">
        {this.renderContent()}
      </div>
    );
  }
}
