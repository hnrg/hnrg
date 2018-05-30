import React, {Component} from 'react'
import {
  Dropdown,
  Icon,
  Menu,
} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import TextIcon from 'components/Dashboard/TextIcon';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  changeSize() {
    this.setState({
      smallSidebar: !this.props.smallMenu,
    });
  }

  getMenu() {
    const {activeItem} = this.state;

    return (
      <Menu fixed='left' borderless className={(this.props.smallMenu ? 'small-side' : '') + ' side'} vertical>
        <Menu.Item as={Link} to={'/dashboard'} name='dashboard' active={activeItem === 'dashboard'}>
          <TextIcon hideText={this.props.smallMenu} color='teal' name='home'>
              Dashboard
          </TextIcon>
        </Menu.Item>

        <Menu.Item as={Link} to={'/dashboard/settings'} name='settings'
                   active={activeItem === 'settings'}>
          <TextIcon hideText={this.props.smallMenu} name='setting'>
            Configuración
          </TextIcon>
        </Menu.Item>

        <Menu.Item as={Link} to={'/dashboard/users'} name='users'
                   active={activeItem === 'users'}>
          <TextIcon hideText={this.props.smallMenu} name='users'>
            Usuarios
          </TextIcon>
        </Menu.Item>

        <Menu.Item as={Link} to={'/dashboard/patients'} name='patients'
                   active={activeItem === 'patients'}>
          <TextIcon hideText={this.props.smallMenu} name='users'>
            Pacientes
          </TextIcon>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <div className='parent'>
        <div className={(this.props.smallMenu ? 'small-side ' : '') + 'side'}>
          {this.getMenu()}
        </div>
        <div style={{
          margin: '55px 0 0 0',
          position: 'absolute',
          right: 0,
          padding: '10px',
        }} className={(this.props.smallMenu ? 'small-content ' : '') + 'content'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Sidebar;
