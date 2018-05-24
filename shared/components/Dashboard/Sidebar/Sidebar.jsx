import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import TextIcon from 'components/Dashboard/TextIcon';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'dashboard',
    };
  }

  handleItemClick(e, {name}) {
    this.setState({
      activeItem: name
    });
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
        <Menu.Item as={Link} to={'/dashboard'} name='dashboard' active={activeItem === 'dashboard'}
                   onClick={this.handleItemClick}>
          <TextIcon hideText={this.props.smallMenu} color='teal' name='home'>
              Dashboard
          </TextIcon>
        </Menu.Item>

        <Menu.Item as={Link} to={'/dashboard/appointments'} name='appointments'
                   active={activeItem === 'appointments'}
                   onClick={this.handleItemClick}>
          <TextIcon hideText={this.props.smallMenu} name='calendar'>
            Appointments
          </TextIcon>
        </Menu.Item>

        <Menu.Item
          as={Link} to={'/dashboard/userManagement'}
          name='userManagement'
          active={activeItem === 'userManagement'}
          onClick={this.handleItemClick}
          >
          <TextIcon hideText={this.props.smallMenu} name='users'>
            Patients
          </TextIcon>
        </Menu.Item>

        <Menu.Item as={Link} to={'/dashboard/counter'} name='counter' active={activeItem === 'counter'}
                   onClick={this.handleItemClick}>
          <TextIcon hideText={this.props.smallMenu} name='time'>
              Counter
          </TextIcon>
        </Menu.Item>

        <Menu.Item as={Link} to={'/dashboard/layout'} name='layout' active={activeItem === 'layout'}
                   onClick={this.handleItemClick}>
          <TextIcon hideText={this.props.smallMenu} name='calendar'>
            Layout
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
        <div className={(this.props.smallMenu ? 'small-content ' : '') + 'content'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Sidebar;
