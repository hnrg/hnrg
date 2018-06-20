import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Icon,
} from 'semantic-ui-react';

const options = (permissions) => {
  return permissions.map(permission => {
    return {
      key: permission,
      value: permission,
      text: permission,
    };
  });
};

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: this.props.isValid,
      isFetching: this.props.isFetching,
      originalRol: this.props.rol,
      fields: this.props.fields,
      permissions: this.props.permissions.map(p => p.name),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const { rol, fields, isValid, isFetching, permissions } = props;

    this.setState({
      originalRol: rol,
      fields,
      isValid,
      isFetching,
      permissions: permissions.map(p => p.name),
    });
  }

  componentDidMount() {
    const { rol, fields, isValid, isFetching, permissions } = this.props;

    this.setState({
      originalRol: rol,
      fields,
      isValid,
      isFetching,
      permissions: permissions.map(p => p.name),
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

    const { originalRol, fields } = this.state;

    this.props.updateRol(
      originalRol.name,
      fields.name,
      fields.permissions,
      null
    );
  }

  render() {
    const { originalRol, fields, isValid, isFetching, permissions } = this.state;
    console.log(fields);
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            label={fields.nameErrorMsg || 'Nombre'}
            name='name'
            placeholder='Nombre'
            width={16}
            onChange={this.handleChange}
            value={fields.name}
            error={fields.nameHasError} />
          <Form.Select
            label={fields.nameErrorMsg || 'Permisos'}
            name='permissions'
            placeholder='Permisos'
            width={16}
            multiple
            onChange={this.handleChange}
            value={fields.permissions}
            options={options(permissions)}
            error={fields.nameHasError} />
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
