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
    /*return (<div>
      <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} animation='scale down' width='thin' visible={visible} icon='labeled' vertical="vertical" inverted="inverted">
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
        <Sidebar.Pusher>
          <Segment basic="basic">
            <Header as='h3'>Application Content</Header>
            <Image src='/assets/images/wireframe/paragraph.png'/>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>);*/

    return (<div></div>);
  }
}

export default SidebarLeftScaleDown;
