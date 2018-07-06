import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment-timezone';
import dateToString from 'helpers/date';
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  List,
  Menu,
  Modal,
  Tab,
} from 'semantic-ui-react';

import icon from 'static/icons/icon.png';

const options = (roles) => {
  return roles.map(rol => {
    return {
      key: rol,
      value: rol,
      text: rol,
    };
  });
};

class Show extends Component {
  handleChange(e, {name, value}) {
    this.props.onFormFieldChange(name, value);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { user, fields } = this.props;

    this.props.updateUser(
      user.username,
      fields.username,
      fields.email,
      fields.firstName,
      fields.lastName,
      fields.password,
      fields.roles,
      null
    );
  }

  editRoles() {
    const { fields, isValid, isFetching, roles } = this.props;

    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Group>
          <Form.Select
            label={fields.rolesErrorMsg || 'Permisos'}
            name='roles'
            placeholder='Permisos'
            width={16}
            multiple
            onChange={this.handleChange.bind(this)}
            value={fields.roles}
            options={options(roles)}
            error={fields.rolesHasError} />
        </Form.Group>
        <Button disabled={!isValid || isFetching} color='teal' fluid size='large'>
          <Icon name='save' size='small' />
          Guardar
        </Button>
      </Form>
    );
  }

  getRoles() {
    const { user } = this.props;

    return(
      <List divided verticalAlign='middle'>
        {user.roles && user.roles.map((rol, id) => (
          <List.Item key={id}>
            <List.Content floated='right'>
              <Label color='blue' as={Link} to={`/dashboard/roles/${rol.name}`}>Ver {rol.name}</Label>
            </List.Content>
            <List.Content>
              <List.Header>{rol.name} - {rol.permissions.length}</List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }

  render() {
    const { user, rolesEditShow } = this.props;

    return(
      <center>
        <Header as='h2' icon>
          {user.firstName} {user.lastName}
          <Header.Subheader>
            {user.username}
          </Header.Subheader>
        </Header>
        <Divider hidden />
        <Grid>
          <Grid.Row>
            <Grid.Column style={{padding: '0 0 15px 0'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
              <Header as='h4' content='Nombre de Usuario'/>
              {user.username}
            </Grid.Column>
            <Grid.Column style={{padding: '0 0 15px 0'}} computer={6} largeScreen={6} tablet={16} mobile={16}>
              <Header as='h4' content='Email'/>
              {user.email}
            </Grid.Column>
            <Grid.Column style={{padding: '0 0 15px 0'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
              <Header as='h4' content='Fecha de Ingreso'/>
              {dateToString(user.createdAt, 'LLLL')}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />
        {user.active && <Modal
          size='tiny'
          dimmer='blurring'
          trigger={<Button circular color='blue' icon='certificate' title={`Ver roles de ${user.username}`} />}>
          <Modal.Content>
            {rolesEditShow ?
              <Tab
                menu={{ secondary: true }}
                panes={[
                  { menuItem: (
                      <Menu.Item key='roles'>
                        Roles <Label>{user.roles && user.roles.length}</Label>
                      </Menu.Item>
                    ),
                    render: () => <Tab.Pane attached={false}>{this.getRoles()}</Tab.Pane>
                  },
                  { menuItem: (
                      <Menu.Item key='roles-edit'>
                        Editar
                      </Menu.Item>
                    ),
                    render: () => <Tab.Pane attached={false}>{this.editRoles()}</Tab.Pane>
                  },
                ]} /> :
                <Tab
                  menu={{ secondary: true }}
                  panes={[
                    { menuItem: (
                        <Menu.Item key='roles'>
                          Roles <Label>{user.roles && user.roles.length}</Label>
                        </Menu.Item>
                      ),
                      render: () => <Tab.Pane attached={false}>{this.getRoles()}</Tab.Pane>
                    }
                  ]} />
              }
          </Modal.Content>
        </Modal>}
        <Divider hidden />
        <Image size='mini' src={icon} />
      </center>
    );
  }
}

export default Show;
