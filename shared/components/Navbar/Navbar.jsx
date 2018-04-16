import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility
} from 'semantic-ui-react'

class Navbar extends Component {
  render() {
    return (<Segment inverted="inverted" textAlign='center' style={{
        padding: '1em 0em'
      }} vertical="vertical">
      <Container>
        <Menu inverted="inverted" pointing="pointing" secondary="secondary" size='large'>
          <Menu.Item as='a' href="/" active="active">Inicio</Menu.Item>
          <Menu.Item as='a' href="/dashboard">Dashboard</Menu.Item>
          <Menu.Item position='right'>
            <Button as='a' href="/login" inverted="inverted" style={{
                marginLeft: '0.5em'
              }}>Iniciar Sesión</Button>
          </Menu.Item>
        </Menu>
      </Container>
    </Segment>);
  }
}

export default Navbar;