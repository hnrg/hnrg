import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {
  Dropdown,
  Icon,
  Image,
  Input,
  Label,
  Menu,
} from 'semantic-ui-react'

import logo from 'static/icons/logo.png';

class TopMenu extends Component {
  render() {
    return (
      <Menu fixed="top" className="top-menu">
        <Menu.Item as={Link} to='/' className="logo-space-menu-item">
          <div className="display-inline logo-space">
            <Image src={logo} />
          </div>
        </Menu.Item>

        {this.props.toggleSideMenu && <Menu.Item
          className="no-border"
          onClick={this.props.toggleSideMenu}
        >
          <Icon name="bars" />
        </Menu.Item>}

        {/*<Menu.Item className="no-border drop-left-padding">
          <Input
            className="icon"
            icon="search"
            placeholder="Search..."
          />
        </Menu.Item>*/}

        <Menu.Menu position="right">
          <Menu.Item className="no-border" position="right">
            <Dropdown trigger={<Icon name='user' />} pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Item as='a' href='/profile'>Ver perfil</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as='a' href='/logout'>Cerrar sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default TopMenu;
