import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment-timezone';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Modal,
  Table,
} from 'semantic-ui-react';

import icon from 'static/icons/icon.png';

class Show extends Component {
  render() {
    const { rol } = this.props;

    return(
      <div>
        <Header as='h2' icon>
          {rol.name}
        </Header>
        <Divider hidden />
        <Table basic='very' celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Permiso</Table.HeaderCell>
              <Table.HeaderCell>Acciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Array.from(rol.permissions || []).map((permission, id) => {
              return (
                <Table.Row key={id}>
                  <Table.Cell>
                    <Header as='h4' image>
                      <Header.Content>
                        {permission.name}
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      circular
                      size='tiny'
                      color='red'
                      icon='remove'
                      title={`Eliminar permiso: ${permission.name}`}
                      onClick={this.props.deletePermissionAction(rol.name, permission.name)} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <Divider hidden />
        <center>
          <Image size='mini' src={icon} />
        </center>
      </div>
    );
  }
}

export default Show;
