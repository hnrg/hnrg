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
  Visibility,
  Item
} from 'semantic-ui-react';

class ContentCard extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }
  render() {
    return (
        <Container textAlign='center'>
        <Segment>
          <Header as='h1'>{this.state.title}</Header>
          <Header as='h3' color={this.state.color}>{this.state.subtitle}</Header>
          <Item.Group>
            <Item>
              <Item.Image src='https://grupo5.proyecto2017.linti.unlp.edu.ar/web/assets/images/home/hospital.jpg' size='medium' />
              <Item.Content verticalAlign='middle'>
                <Item.Description>{this.state.text}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        </Container>
        );
  }
}

export default ContentCard;
