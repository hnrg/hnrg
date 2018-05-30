import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';

const options = [
  { key: 'active', value: true, icon: 'check', text: 'Activos' },
  { key: 'inactive', value: false, icon: 'lock', text: 'Inactivos' },
];

const UsersList = (props) => {
  const totalPages = !props.count ? 0 : props.totalCount / props.count;

  return(
    <Segment>
      <Header as='h2' content='Listado de Usuarios' />
      <Form>
        <Form.Group>
          <Form.Select
            placeholder='Estado'
            name='active'
            onChange={props.onSearchFieldChange}
            options={options} />
          <Form.Input
            name='username'
            onChange={props.onSearchFieldChange}
            placeholder='Nombre de usuario' />
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
      <Divider hidden />
      <Container textAlign='center'>
        <Pagination
          defaultActivePage={props.pageNumber + 1}
          ellipsisItem={undefined}
          totalPages={totalPages}
          onPageChange={(e, { activePage }) => {
            props.onSearchFieldChange(e, { name: 'pageNumber', value: activePage - 1 });
          }} />
      </Container>
    </Segment>
  );
};

export default UsersList;
