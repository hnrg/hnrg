import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Table } from 'semantic-ui-react';

const TableExamplePadded = (props) => (
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
          <Table.Cell></Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default TableExamplePadded;
