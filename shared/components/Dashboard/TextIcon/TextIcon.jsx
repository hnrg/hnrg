import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon} from "semantic-ui-react";

const style = {
  alignSelf: 'center',
  paddingLeft: '4px'
};

class TextIcon extends Component {
  render() {
    return(
      <div style={{whiteSpace: 'nowrap', display: 'inline-flex'}}>
        <Icon
          size='large'
          color={this.props.color}
          name={this.props.name} />
        <div style={this.style} hidden={this.props.hideText}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

TextIcon.propTypes = {
  name: PropTypes.string.isRequired,
  hideText: PropTypes.bool.isRequired,
  color: PropTypes.string,
};

export default TextIcon;
