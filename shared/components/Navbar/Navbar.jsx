import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Container,
  Dropdown,
  Header,
  Icon,
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
    const {isLoggedIn, name} = this.props;

    return (
      <div>
        <Container textAlign='center' style={{marginTop: '2em'}}>
          <Header as='h1'>{name}</Header>
        </Container>
        <Visibility onBottomPassed={this.stickTopMenu} onBottomVisible={this.unStickTopMenu} once={false}>
          <Menu borderless fixed={menuFixed ? "top" : undefined} style={menuFixed
            ? fixedMenuStyle
            : menuStyle}>
            <Container>
              <Menu.Item>
                <Image size='mini' src={logo}/>
              </Menu.Item>
              <Menu.Item header>HNRG</Menu.Item>
              {isLoggedIn && <Menu.Item as={Link} to='/dashboard'>Dashboard</Menu.Item>}

              <Menu.Menu position='right'>
                {!isLoggedIn ?
                  <Menu.Item as={Link} to='/login'>Iniciar Sesión</Menu.Item> :
                  <Dropdown trigger={<Icon name='user' />} pointing className='link item'>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to='/profile'>Ver perfil</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Link} to='/logout'>Cerrar sesión</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                }
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>
      </div>
    );
  }
}

export default Navbar;
