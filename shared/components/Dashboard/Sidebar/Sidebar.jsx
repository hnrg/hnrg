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
      <Menu fixed='left' borderless className={'dashboard side' + (this.props.smallMenu ? ' small-side ' : '')} vertical>
        <Menu.Item as={Link} to={'/dashboard'} name='dashboard' active={activeItem === 'dashboard'}>
          <TextIcon hideText={this.props.smallMenu} color={ activeItem == 'dashboard' ? 'teal' : undefined } name='home'>
              Dashboard
          </TextIcon>
        </Menu.Item>

        <Menu.Item as={Link} to={'/dashboard/settings'} name='settings'
                   active={activeItem === 'settings'}>
          <TextIcon hideText={this.props.smallMenu} color={ activeItem == 'settings' ? 'grey' : undefined } name='setting'>
            Configuración
          </TextIcon>
        </Menu.Item>

        <Menu.Item as={Link} to={'/dashboard/users'} name='users'
                   active={activeItem === 'users'}>
          <TextIcon hideText={this.props.smallMenu} color={ activeItem == 'users' ? 'blue' : undefined } name='users'>
            Usuarios
          </TextIcon>
        </Menu.Item>

        <Menu.Item as={Link} to={'/dashboard/patients'} name='patients'
                   active={activeItem === 'patients'}>
          <TextIcon hideText={this.props.smallMenu} color={ activeItem == 'patients' ? 'red'  : undefined } name='heartbeat'>
            Pacientes
          </TextIcon>
        </Menu.Item>

        <Menu.Item as={Link} to={'/dashboard/demographic-data'} name='demographic-data'
                   active={activeItem === 'demographic-data'}>
          <TextIcon hideText={this.props.smallMenu} color={activeItem == 'demographic-data' ? 'orange' : undefined } name='map marker alternate'>
            Datos demográficos
          </TextIcon>
        </Menu.Item>

        <Menu.Item as={Link} to={'/dashboard/roles'} name='roles'
                   active={activeItem === 'roles'}>
          <TextIcon hideText={this.props.smallMenu} color={activeItem == 'roles' ? 'yellow' : undefined } name='certificate'>
            Roles
          </TextIcon>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <div className='dashboard parent'>
        <div className={'dashboard side' + (this.props.smallMenu ? ' small-side ' : '')}>
          {this.getMenu()}
        </div>
        <div className={'dashboard content' + (this.props.smallMenu ? ' small-content ' : '')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Sidebar;
