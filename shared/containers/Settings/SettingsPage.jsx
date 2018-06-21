import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment-timezone';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { dateToString } from 'helpers/date';
import {
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Tab
} from 'semantic-ui-react';


import * as configurationActions from 'reducers/actions/configuration-actions';

class ConfigurationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmSubmit: false,
      ...this.props.configuration,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...props.configuration,
    });
  }

  componentDidMount() {
    const {current} = this.props.configuration;

    if (current.user === null) {
      this.props.actions.getConfiguration();
      return;
    }

    this.setState({
      ...this.props.configuration,
    });
  }

  handleChange(e, {name, value}) {
    const newValue = name === 'maintenance' ?
      !this.state.fields.maintenance :
      value;

    this.props.actions.onConfigurationFormFieldChange(name, newValue);

    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        [name]: value,
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      fields,
      confirmSubmit,
      isValid,
      isFetching
    } = this.state;

    if (!isValid || isFetching || !confirmSubmit) {
      return;
    }

    const {
      name,
      amountPerPage,
      email,
      description,
      from,
      delta,
      amount,
      maintenance,
    } = fields;

    this.props.actions.addConfiguration(
      name,
      amountPerPage,
      email,
      description,
      from,
      delta,
      amount,
      maintenance
    );
  }

  render() {
    const {current, fields, isValid, isFetching, confirmSubmit, error, success} = this.state;
    const {user, updatedAt} = current;

    return (
      <Segment>
        <Header as='h3'>
          Última actualización
          <Header.Subheader>
            El usuario {user ? user.username : ''} actualizó la configuration del sistema por última vez el día {dateToString(updatedAt, 'LLLL')}.
          </Header.Subheader>
        </Header>
        <Divider hidden />
        {success && <Message positive>
          <Message.Header>La operación fué realizada con éxito.</Message.Header>
        </Message>}
        {error && <Message negative>
          <Message.Header>Existen errores</Message.Header>
          <p>{error}</p>
        </Message>}
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Header as='h3'>
            Configuración del Sitio
          </Header>
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              label={fields.nameErrorMsg || 'Nombre'}
              placeholder='Nombre'
              name='name'
              value={fields.name}
              error={fields.nameHasError}
              onChange={this.handleChange.bind(this)} />
            <Form.Input
              fluid
              label={fields.emailErrorMsg || 'Mail de contacto'}
              placeholder='Mail de contacto'
              name='email'
              value={fields.email}
              error={fields.emailHasError}
              onChange={this.handleChange.bind(this)} />
            <Form.Input
              fluid
              type='number'
              label={fields.amountPerPageErrorMsg || 'Cantidad por página'}
              placeholder='Cantidad por página'
              name='amountPerPage'
              value={fields.amountPerPage || 0}
              error={fields.amountPerPageHasError}
              onChange={this.handleChange.bind(this)} />
          </Form.Group>
          <Form.Group inline widths='equal'>
            <Form.Checkbox
              label={fields.maintenanceErrorMsg || 'Sitio en mantenimiento'}
              checked={fields.maintenance}
              value={fields.maintenance ? 'on' : 'off'}
              name='maintenance'
              error={fields.maintenanceHasError}
              onChange={this.handleChange.bind(this)} />
          </Form.Group>
          <Form.TextArea
            label={fields.descriptionErrorMsg || 'Descripción'}
            placeholder='Descripción...'
            name='description'
            value={fields.description}
            error={fields.descriptionHasError}
            onChange={this.handleChange.bind(this)} />
          <Divider hidden />
          <Header as='h3'>
            Configuración de sistema de turnos
          </Header>
          <Form.Group inline widths='equal'>
            <Form.Input
              fluid
              type='number'
              label={fields.fromErrorMsg || 'Comienzo de turnos'}
              placeholder='Comienzo de turnos'
              name='from'
              value={fields.from || 0}
              error={fields.fromHasError}
              onChange={this.handleChange.bind(this)} />
            <Form.Input
              fluid
              type='number'
              label={fields.deltaErrorMsg || 'Intervalo entre turnos'}
              placeholder='Intervalo entre turnos'
              name='delta'
              value={fields.delta || 0}
              error={fields.deltaHasError}
              onChange={this.handleChange.bind(this)} />
            <Form.Input
              fluid
              type='number'
              label={fields.amountErrorMsg || 'Cantidad de turnos por día'}
              placeholder='Cantidad de turnos por día'
              name='amount'
              value={fields.amount || 0}
              error={fields.amountHasError}
              onChange={this.handleChange.bind(this)} />
          </Form.Group>
          <Divider hidden />
          <Form.Checkbox
            label='Confirmar cambios'
            onChange={((e, data) => {
              this.setState({
                confirmSubmit: !this.state.confirmSubmit,
              });
            }).bind(this)} />
          <Form.Button disabled={!isValid || isFetching}>Guardar</Form.Button>
        </Form>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    configuration: state.configuration
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...configurationActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationContainer);
