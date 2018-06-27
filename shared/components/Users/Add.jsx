import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';

class Add extends Component {
  constructor(props) {
    super(props);

    this.props.onMount();
  }

  handleChange(e, {name, value}) {
    this.props.onFormFieldChange(name, value);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { fields } = this.props;

    this.props.addUser(
      fields.username,
      fields.email,
      fields.password,
      fields.firstName,
      fields.lastName,
      null
    );
  }

  render() {
    const { fields, isValid, isFetching, error, success } = this.props;

    return(
      <Segment padded>
        {success && <Message positive>
          <Message.Header>La operación fué realizada con éxito.</Message.Header>
        </Message>}
        {error && <Message negative>
          <Message.Header>Existen errores</Message.Header>
          <p>{error}</p>
        </Message>}
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group>
            <Form.Input
              label={fields.firstNameErrorMsg || 'Nombre'}
              name='firstName'
              placeholder='Nombre'
              width={8}
              onChange={this.handleChange.bind(this)}
              value={fields.firstName}
              error={fields.firstNameHasError} />
            <Form.Input
              label={fields.lastNameErrorMsg || 'Apellido'}
              name='lastName'
              placeholder='Apellido'
              width={8}
              onChange={this.handleChange.bind(this)}
              value={fields.lastName}
              error={fields.lastNameHasError} />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label={fields.usernameErrorMsg || 'Nombre de Usuario'}
              name='username'
              required
              placeholder='Nombre de Usuario'
              width={5}
              onChange={this.handleChange.bind(this)}
              value={fields.username}
              error={fields.usernameHasError} />
            <Form.Input
              label={fields.emailErrorMsg || 'Email'}
              name='email'
              required
              placeholder='Email'
              width={6}
              onChange={this.handleChange.bind(this)}
              value={fields.email}
              error={fields.emailHasError} />
            <Form.Input
              type='password'
              label={fields.passwordErrorMsg || 'Contraseña'}
              name='password'
              placeholder='Contraseña'
              width={5}
              onChange={this.handleChange.bind(this)}
              value={fields.password}
              error={fields.passwordHasError} />
          </Form.Group>
          <Button disabled={!isValid || isFetching} color='teal' fluid size='large'>
            <Icon name='save' size='small' />
            Guardar
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default Add;
