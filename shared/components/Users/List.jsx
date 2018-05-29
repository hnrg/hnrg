import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Form, Header, Segment, Table } from 'semantic-ui-react';

const UsersList = (props) => (
  <Segment>
    <Header as='h2' content='Listado de Usuarios' />
    <Form onSubmit={props.handleSubmit}>
      <Form.Group>
        <Form.Input placeholder='Nombre de usuario' name='name' value={''} onChange={props.onFormFieldChange} />
        <Form.Input placeholder='Email' name='email' value={''} onChange={props.onFormFieldChange} />
        <Form.Button color='blue' icon='search' content='Buscar' />
      </Form.Group>
    </Form>
    <Table padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Nombre de usuario</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Nombre y Apellido</Table.HeaderCell>
          <Table.HeaderCell>Opciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.users && props.users.map((user, id) => (
          <Table.Row key={id}>
            <Table.Cell>
              <Header as='h5' content={<Link to={`/dashboard/users/${user.username}`}>{user.username}</Link>} />
            </Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
            <Table.Cell>
              <Button circular size='tiny' color='teal' as={Link} to={`/dashboard/users/${user.username}`} icon='user' title={`Ver ${user.username}`} />
              <Button circular size='tiny' color='red' icon='remove user' title={`Eliminar ${user.username}`} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Segment>
);

export default UsersList;
