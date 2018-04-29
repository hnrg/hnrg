import React, { Component } from 'react';
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Icon,
  Header
} from 'semantic-ui-react';

class SidebarLeftScaleDown extends Component {
  constructor(props) {
    super(props);

    this.toggleVisibility = this.toggleVisibility.bind(this);

    this.state = {
      visible: false
    };
  }

  toggleVisibility() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const {visible} = this.state;
    return (<div>
      <Sidebar
        as={Menu}
        animation='scale down'
        width='thin'
        visible={visible}
        icon='labeled'
        vertical
        inverted
      >
        <Menu.Item name='home'>
          <Icon name='home'/>
          Home
        </Menu.Item>
        <Menu.Item name='gamepad'>
          <Icon name='gamepad'/>
          Games
        </Menu.Item>
        <Menu.Item name='camera'>
          <Icon name='camera'/>
          Channels
        </Menu.Item>
      </Sidebar>
      <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
    </div>);
  }
}

export default SidebarLeftScaleDown;
