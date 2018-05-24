import _ from 'lodash';
import React, {Component} from 'react';
import {
  Container,
  Header,
  Image,
  Menu,
  Visibility
} from 'semantic-ui-react';

import {
  menuStyle,
  fixedMenuStyle,
} from './styles';

import logo from 'static/icons/icon.png';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.stickTopMenu = this.stickTopMenu.bind(this);
    this.unStickTopMenu = this.unStickTopMenu.bind(this);

    this.state = {
      menuFixed: false,
      overlayFixed: false
    };
  }

  stickTopMenu() {
    return this.setState({menuFixed: true});
  }

  unStickTopMenu() {
    return this.setState({menuFixed: false});
  }

  render() {
    const {menuFixed, overlayFixed, overlayRect} = this.state;
    const {name} = this.props;

    return (
      <div>
        <Container text style={{marginTop: '2em'}}>
          <Header as='h1'>{name}</Header>
        </Container>
        <Visibility onBottomPassed={this.stickTopMenu} onBottomVisible={this.unStickTopMenu} once={false}>
          <Menu borderless fixed={menuFixed && "top"} style={menuFixed
            ? fixedMenuStyle
            : menuStyle}>
            <Container text>
              <Menu.Item>
                <Image size='mini' src={logo}/>
              </Menu.Item>
              <Menu.Item header>HNRG</Menu.Item>
              <Menu.Item as='a' href='/'>Inicio</Menu.Item>

              <Menu.Menu position='right'>
                <Menu.Item as='a' href='/login'>Iniciar Sesión</Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>
      </div>
    );
  }
}

export default Navbar;
