import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Confirm,
  Container,
  Divider,
  Form,
  Header,
  Message,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';

const options = [
  { key: 'active', value: true, icon: 'check', text: 'Activos' },
  { key: 'inactive', value: false, icon: 'lock', text: 'Inactivos' },
];

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      visible: false,
      strategy: null,
    };
  }

  close() {
    this.setState({
      open: false,
    });
  }

  handleDismiss() {
    this.setState({
      visible: false,
    });
  }

  handleStrategy(callback) {
    const self = this;

    return function(e, data) {
      self.setState({ open: true, visible: true, strategy: callback });
    }
  }

  onConfirm(e, data) {
    const {strategy} = this.state;

    strategy(e, data);

    this.setState({
        open: false,
    });
  }

  render() {
    const totalPages = !this.props.count ? 0 : Math.round(this.props.totalCount / this.props.count);
    console.log(this.props.totalCount);
    console.log(this.props.count);
    console.log(totalPages);
    return(
      <Segment>
        <Header as='h2' content='Listado de Usuarios' />
        <Button
          color='teal'
          icon='add user'
          title='Agregar usuario'
          content='Registrar usuario'
          onClick={this.props.onAddButtonClick} />
        <Divider hidden />
        <Form>
          <Form.Group>
            <Form.Select
              placeholder='Estado'
              name='active'
              onChange={this.props.onSearchFieldChange}
              options={options} />
            <Form.Input
              name='username'
              onChange={this.props.onSearchFieldChange}
              placeholder='Nombre de usuario' />
          </Form.Group>
        </Form>
        {this.props.success && this.state.visible && <Message positive icon='check' onDismiss={this.handleDismiss.bind(this)} content='La operación fué realizada con éxito.' />}
        {this.props.error && this.state.visible && <Message negative icon='warning sign' onDismiss={this.handleDismiss.bind(this)} content={this.props.error} />}
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
            {this.props.users && this.props.users.map((user, id) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <Header as='h5' content={<Link to={`${this.props.url}/${user.username}`}>{user.username}</Link>} />
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
                <Table.Cell>
                  {
                    (user.active) ?
                    <div>
                      <Button circular size='tiny' disabled={!this.props.granted.show} color='teal' as={Link} to={`${this.props.url}/${user.username}`} icon='user' title={`Ver ${user.username}`} />
                      <Button circular size='tiny' disabled={!this.props.granted.destroy} color='red' icon='remove user' title={`Eliminar ${user.username}`} onClick={this.handleStrategy(this.props.deleteAction(user.username))} />
                    </div>:
                    <Button circular size='tiny' disabled={!this.props.granted.update} color='blue' icon='add user' title={`Habilitar ${user.username}`} onClick={this.handleStrategy(this.props.enableAction(user.username))} />
                  }
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {this.props.users && this.props.users.length === 0 && <Message info>
          <Message.Header>No hay usuarios que mostrar</Message.Header>
        </Message>}
        <Confirm
          open={this.state.open}
          onCancel={this.close.bind(this)}
          onConfirm={this.onConfirm.bind(this)}
          content={this.state.strategy
            && '¿Está seguro de que desea realizar la operación?'
          } />
        <Divider hidden />
        <Container textAlign='center'>
          <Pagination
            defaultActivePage={this.props.pageNumber + 1}
            ellipsisItem={undefined}
            totalPages={totalPages}
            onPageChange={(e, { activePage }) => {
              this.props.onSearchFieldChange(e, { name: 'pageNumber', value: activePage - 1 });
            }} />
        </Container>
      </Segment>
    );
  }
}

export default UsersList;
