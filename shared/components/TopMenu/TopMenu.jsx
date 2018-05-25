import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {
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

        <Menu.Item
          className="no-border"
          onClick={this.props.toggleSideMenu}
        >
          <Icon name="bars" />
        </Menu.Item>

        <Menu.Item className="no-border drop-left-padding">
          <Input
            className="icon"
            icon="search"
            placeholder="Search..."
          />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item className="no-border" position="right">
            <div className="display-inline">
              <Image
                circular
                size={"mini"}
                src="https://react.semantic-ui.com/assets/images/avatar/small/nan.jpg"
              />
            </div>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default TopMenu;
