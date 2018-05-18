import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Form
} from 'semantic-ui-react';

class UserView extends Component {
  constructor(props) {
    super(props);

    const { user, fields } = this.props;

    this.state = {
      user,
      fields,
    };
  }

  componentWillReceiveProps(props) {
    const { user, fields } = props;

    this.setState({
      user,
      fields,
    });
  }

  componentDidMount() {
    const { user, fields } = this.props;

    this.setState({
      user,
      fields
    });
  }

  render() {
    const { fields } = this.state;

    return(
      <Form>
        <Form.Group>
          <Form.Input
            label='Nombre'
            placeholder='Nombre'
            width={8}
            value={fields.firstName || ""} />
          <Form.Input
            label='Apellido'
            placeholder='Apellido'
            width={8}
            value={fields.lastName || ""} />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label='Nombre de Usuario'
            placeholder='Nombre de Usuario'
            width={5}
            value={fields.username} />
          <Form.Input
            label='Email'
            placeholder='Email'
            width={6}
            value={fields.email} />
          <Form.Input
            label='Contraseña'
            placeholder='Contraseña'
            width={5}
            value={fields.password || ""} />
        </Form.Group>
      </Form>
    );
  }
}

export default UserView;
