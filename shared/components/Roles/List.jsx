import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Confirm,
  Divider,
  Form,
  Header,
  Label,
  Message,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';

const options = [
  { key: 'active', value: false, icon: 'check', text: 'Activos' },
  { key: 'inactive', value: true, icon: 'lock', text: 'Inactivos' },
];

class RolesList extends Component {
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
    const totalPages = !this.props.count ? 0 : this.props.totalCount / this.props.count;

    return(
      <Segment>
        <Header as='h2' content='Listado de Roles' />
        <Button
          color='teal'
          icon='add'
          title='Agregar rol'
          content='Registrar rol'
          onClick={this.props.onAddButtonClick} />
        <Divider hidden />
        <Form>
          <Form.Group>
            <Form.Select
              placeholder='Estado'
              name='deleted'
              onChange={this.props.onSearchFieldChange}
              options={options} />
            <Form.Input
              name='rolname'
              onChange={this.props.onSearchFieldChange}
              placeholder='Nombre de usuario' />
          </Form.Group>
        </Form>
        {this.props.success && this.state.visible && <Message positive onDismiss={this.handleDismiss.bind(this)}>
          <Message.Header>La operación fué realizada con éxito.</Message.Header>
        </Message>}
        {this.props.error && this.state.visible && <Message negative onDismiss={this.handleDismiss.bind(this)}>
          <Message.Header>Existen errores</Message.Header>
          <p>{this.props.error}</p>
        </Message>}
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nombre</Table.HeaderCell>
              <Table.HeaderCell>Cantidad de Permisos</Table.HeaderCell>
              <Table.HeaderCell>Opciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.roles && this.props.roles.map((rol, id) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <Header as='h5' content={<Link to={`${this.props.url}/${rol.name}`}>{rol.name}</Link>} />
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
                      <Button circular size='tiny' color='teal' as={Link} to={`${this.props.url}/${rol.name}`} icon='edit' title={`Ver ${rol.name}`} />
                      <Button circular size='tiny' color='red' icon='remove' title={`Eliminar ${rol.name}`} onClick={this.handleStrategy(this.props.deleteAction(rol.name))} />
                    </div> :
                    <Button circular size='tiny' color='blue' icon='add' title={`Habilitar rol ${rol.name}`} onClick={this.handleStrategy(this.props.enableAction(rol.name))} />
                  }
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
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

export default RolesList;
