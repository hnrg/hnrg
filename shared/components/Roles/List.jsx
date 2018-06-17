import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Label,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';

const options = [
  { key: 'active', value: false, icon: 'check', text: 'Activos' },
  { key: 'inactive', value: true, icon: 'lock', text: 'Inactivos' },
];

const UsersList = (props) => {
  const totalPages = !props.count ? 0 : props.totalCount / props.count;

  return(
    <Segment>
      <Header as='h2' content='Listado de Roles' />
      <Form>
        <Form.Group>
          <Form.Select
            placeholder='Estado'
            name='deleted'
            onChange={props.onSearchFieldChange}
            options={options} />
          <Form.Input
            name='rolname'
            onChange={props.onSearchFieldChange}
            placeholder='Nombre de usuario' />
        </Form.Group>
      </Form>
      <Table padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Cantidad de Permisos</Table.HeaderCell>
            <Table.HeaderCell>Opciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.roles && props.roles.map((rol, id) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Header as='h5' content={<Link to={`${props.url}/${rol.name}`}>{rol.name}</Link>} />
              </Table.Cell>
              <Table.Cell>
                <Label circular color='blue'>
                  {rol.permissions.length}
                </Label>
              </Table.Cell>
              <Table.Cell>
                {
                  !rol.deleted ?
                  <div>
                    <Button circular size='tiny' color='teal' as={Link} to={`${props.url}/${rol.name}`} icon='edit' title={`Ver ${rol.name}`} />
                    <Button circular size='tiny' color='red' icon='remove' title={`Eliminar ${rol.name}`} onClick={props.deleteAction(rol.name)} />
                  </div> :
                  <Button circular size='tiny' color='blue' icon='add' title={`Habilitar rol ${rol.name}`} onClick={props.enableAction(rol.name)} />
                }
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
