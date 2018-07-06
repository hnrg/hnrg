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

import { dateToString } from 'helpers/date';

class HealthControlsList extends Component {
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

    return(
      <Segment>
        <Header as='h2' content='Listado de Controles de Salud' />
        {this.props.success && this.state.visible && <Message positive icon='check' onDismiss={this.handleDismiss.bind(this)} content='La operación fué realizada con éxito.' />}
        {this.props.error && this.state.visible && <Message negative icon='warning sign' onDismiss={this.handleDismiss.bind(this)} content={this.props.error} />}
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Paciente</Table.HeaderCell>
              <Table.HeaderCell>Usuario</Table.HeaderCell>
              <Table.HeaderCell>Fecha</Table.HeaderCell>
              <Table.HeaderCell>Opciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.healthControls && this.props.healthControls.map((healthControl, id) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <Header as='h5' content={<Link to={`patients/${healthControl.patient._id}`}>{healthControl.patient.firstName} {healthControl.patient.lastName}</Link>} />
                </Table.Cell>
                <Table.Cell>
                  <Header as='h5' content={healthControl.user ? healthControl.user.username : ''} />
                </Table.Cell>
                <Table.Cell>
                  {dateToString(healthControl.date, 'LLLL')}
                </Table.Cell>
                <Table.Cell>
                  {
                    !healthControl.deleted ?
                    <div>
                      <Button circular size='tiny' disabled={!this.props.granted.show} color='teal' as={Link} to={`${this.props.url}/${healthControl._id}`} icon='edit' title={`Ver control de salud`} />
                      <Button circular size='tiny' disabled={!this.props.granted.destroy} color='red' icon='remove' title={`Eliminar control de salud`} onClick={this.handleStrategy(this.props.deleteAction(healthControl._id))} />
                    </div> :
                    <Button circular size='tiny' disabled={!this.props.granted.update} color='blue' icon='add' title={`Habilitar control de salud`} onClick={this.handleStrategy(this.props.enableAction(healthControl._id))} />
                  }
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {this.props.healthControls && this.props.healthControls.length === 0 && <Message info>
          <Message.Header>No hay controles de salud que mostrar</Message.Header>
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

export default HealthControlsList;
