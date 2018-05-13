import React, {Component} from 'react';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility
} from 'semantic-ui-react';

class ContentCard extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }
  render() {
    return (
        <Container>
          <h1>{this.state.title}</h1>
          <p>{this.state.text}</p>
        </Container>
        );
  }
}

export default ContentCard;
