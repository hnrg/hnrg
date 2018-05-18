import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Form
} from 'semantic-ui-react';

class UserView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    const { fields } = props;

    this.setState({
      fields,
    });
  }

  componentDidMount() {
    const { fields } = this.props;

    this.setState({ fields });
  }

  handleChange(e, {name, value}) {
    this.props.onFormFieldChange(name, value);
    console.log(this.state);

    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  }

  render() {
    console.log(this.state);
    const { fields } = this.state;

    return(
      <Form>
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
      </Form>
    );
  }
}

export default UserView;
