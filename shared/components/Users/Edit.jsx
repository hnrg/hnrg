import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Message,
  Icon,
} from 'semantic-ui-react';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: this.props.isValid,
      isFetching: this.props.isFetching,
      originalUser: this.props.user,
      fields: this.props.fields,
      error: this.props.error,
      success: this.props.success,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const { user, fields, isValid, isFetching, error, success } = props;

    this.setState({
      originalUser: user,
      fields,
      isValid,
      isFetching,
      error,
      success,
    });
  }

  componentDidMount() {
    const { user, fields, isValid, isFetching, error, success, } = this.props;

    this.setState({
      originalUser: user,
      fields,
      isValid,
      isFetching,
      error,
      success,
    });
  }

  handleChange(e, {name, value}) {
    this.props.onFormFieldChange(name, value);

    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { originalUser, fields } = this.state;

    this.props.updateUser(
      originalUser.username,
      fields.username,
      fields.email,
      fields.firstName,
      fields.lastName,
      fields.password,
      null
    );
  }

  render() {
    const { fields, isValid, isFetching, error, success } = this.state;

    return(
      <Form onSubmit={this.handleSubmit}>
        {success && <Message positive>
          <Message.Header>La operación fué realizada con éxito.</Message.Header>
        </Message>}
        {error && <Message negative>
          <Message.Header>Existen errores</Message.Header>
          <p>{error}</p>
        </Message>}
        <Form.Group>
          <Form.Input
            label={fields.firstNameErrorMsg || 'Nombre'}
            name='firstName'
            placeholder='Nombre'
            width={8}
            onChange={this.handleChange}
            value={fields.firstName}
            error={fields.firstNameHasError} />
          <Form.Input
            label={fields.lastNameErrorMsg || 'Apellido'}
            name='lastName'
            placeholder='Apellido'
            width={8}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
            value={fields.username}
            error={fields.usernameHasError} />
          <Form.Input
            label={fields.emailErrorMsg || 'Email'}
            name='email'
            required
            placeholder='Email'
            width={6}
            onChange={this.handleChange}
            value={fields.email}
            error={fields.emailHasError} />
          <Form.Input
            type='password'
            label={fields.passwordErrorMsg || 'Contraseña'}
            name='password'
            placeholder='Contraseña'
            width={5}
            onChange={this.handleChange}
            value={fields.password}
            error={fields.passwordHasError} />
        </Form.Group>
        <Button disabled={!isValid || isFetching} color='teal' fluid size='large'>
          <Icon name='save' size='small' />
          Guardar
        </Button>
      </Form>
    );
  }
}

export default Edit;
