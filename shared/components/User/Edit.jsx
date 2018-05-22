import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Icon,
} from 'semantic-ui-react';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalUser: {
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      },
      fields: {
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const { user, fields } = props;

    this.setState({
      originalUser: user,
      fields,
    });
  }

  componentDidMount() {
    const { user, fields } = this.props;

    this.setState({ originalUser: user, fields });
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
      null
    );
  }

  render() {
    const { fields } = this.state;

    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            label='Nombre'
            name='firstName'
            placeholder='Nombre'
            width={8}
            onChange={this.handleChange}
            value={fields.firstName} />
          <Form.Input
            label='Apellido'
            name='lastName'
            placeholder='Apellido'
            width={8}
            onChange={this.handleChange}
            value={fields.lastName} />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label='Nombre de Usuario'
            name='username'
            placeholder='Nombre de Usuario'
            width={5}
            onChange={this.handleChange}
            value={fields.username} />
          <Form.Input
            label='Email'
            name='email'
            placeholder='Email'
            width={6}
            onChange={this.handleChange}
            value={fields.email} />
          <Form.Input
            label='Contraseña'
            name='password'
            placeholder='Contraseña'
            width={5}
            onChange={this.handleChange}
            value={fields.password} />
        </Form.Group>
        <Button color='teal' fluid size='large'>
          <Icon name='save' size='small' />
          Guardar
        </Button>
      </Form>
    );
  }
}

export default Edit;
